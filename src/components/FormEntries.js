import React from 'react';
import Moment from 'react-moment';
import { debounce } from '../utils/utils';
import styled from 'styled-components';
import colors from '../styles/colors';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formEntries: null,
      page: 1,
      perPage: 100,
      filtersFromServer: null,
      filterArrayForServer: {},
      filterStringForServer: null
    };
    this.debouncer = new debounce();
  }

  handlePageNumberChange = (event) => {
    this.setState({page: event.target.value}, () => {
      if(this.state.page.length && Number(this.state.page > 0)) {
        this.debouncer.debounce(this, {name:'fetchFormEntries'}, 200);
      }
    });
  }

  handlePerPageChange = (event) => {
    this.setState({perPage: event.target.value}, () => {
      if(this.state.perPage.length && Number(this.state.perPage > 0)) {
        this.debouncer.debounce(this, 'fetchFormEntries', 200);
      }
    });
  }

  handleFilterArrayChange = (e) => {
    let fg = e.target.dataset.filtergroup,
        fafs = this.state.filterArrayForServer,
        fgExists = fafs.hasOwnProperty(fg);
    if(!fgExists) {
      fafs[fg] = [];
      fafs[fg].push(e.target.value);
    }
    else {
      let index = fafs[fg].indexOf(e.target.value)
      if(e.target.checked && index === -1) {
        fafs[fg].push(e.target.value);
      }
      else {
        fafs[fg].splice(index, 1);
      }
    }
    this.setState({filterArrayForServer: fafs}, () => {
      let fsfs = ``;
      let filterGroups = [];
      let pieces = [];
      for(let prop in fafs) {
        if(fafs[prop].length) {
          filterGroups.push(prop);
        }
      }
      filterGroups.forEach((fg) => {
        let filters = [];
        if(fafs.hasOwnProperty(fg) && fafs[fg].length) {
          filters.push(...fafs[fg]);
        }
        filters = filters.join('.');
        pieces.push(`${fg}:${filters}`);
      });
      if(pieces.length) {
        pieces = pieces.join('+');
        fsfs = `add-filters=${pieces}`;
      }
      this.setState({filterStringForServer: fsfs}, function() {
        this.debouncer.debounce(this, 'fetchFormEntries', 200);
      })
    });
  }

  componentDidMount() {
    this.fetchFormEntries();
    this.fetchFilters();
  }

  fetchFormEntries() {
    let url = `http://local.formapp.api.com/api/v1/form-entries?page=${ this.state.page }&per-page=${ this.state.perPage }`
    if(this.state.filterStringForServer) {
      url += `&${this.state.filterStringForServer}`
    }
    fetch(url, 
      {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ localStorage.formentrytoken }`
        },
      })
      .then(
        (response) => {
          response.json().then(
            (responseData) => {
              this.setState({
                formEntries: responseData
              });
            },
            (error) => {
              console.log('error: ', error);
            },
          );
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  fetchFilters() {
    fetch(`
      http://local.formapp.api.com/api/v1/form-entries/filters
      `, 
      {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ localStorage.formentrytoken }`
        },
      })
      .then(
        (response) => {
          response.json().then(
            (responseData) => {
              this.setState({
                filtersFromServer: responseData
              });
            },
            (error) => {
              console.log('error: ', error);
            },
          );
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  renderListNumber = (i) => {
    return null;
  }


  render() {

    if (this.state.formEntries) {

      let listItems = this.state.formEntries.data.map((fe, i) => {
        let date = new Date(fe.created_at);
        return (
          <tr key={fe.id}>
            <td>{ (i + 1) + ((this.state.page * this.state.perPage) - this.state.perPage) }</td>
            <td>{fe.first_name} {fe.last_name}</td>
            <td>{fe.email}</td>
            <td>{fe.phone}</td>
            <td><Moment format="MM/DD/YYYY hh:mm:ssa" subtract={{ hours: 4 }}>{date}</Moment></td>
            <td>{JSON.parse(fe.additional_fields).program_code}</td>
            <td>{JSON.parse(fe.additional_fields).vendor}</td>
          </tr>
        )
      });

      return (
        <StyledFormEntryTable>
          <div className="form-entries-table">
            <div className="container form-entries-table">
              <div className="row">
                <aside className="col-md-2 filters">
                  <h1>Filters</h1>
                  {
                    this.state.filtersFromServer && this.state.filtersFromServer.success
                      ? this.state.filtersFromServer.data.map(f => {
                          let cbs = f.values.map(v => {
                            return (
                              <div className="filter-checkbox" key={v}>
                                <label>
                                  <input type="checkbox" data-filtergroup={f.name} value={v} onChange={this.handleFilterArrayChange} />
                                  <span>{v}</span>
                                </label>
                              </div>
                            );
                          });
                          return (
                            <div className="filter-section" key={f.name}>
                              <h2>{f.name}</h2>
                              <div>{cbs}</div>
                            </div>
                          )
                        })
                      : null
                  } 
                </aside>
                <div className="col-md-10 entries">
                  <div className="d-flex toprow">
                    <div className="control-container">
                      <div className="control__item">Total Entries: { this.state.formEntries.total_entries }</div>
                      <div className="d-inline-flex control__item">
                        <div className="flex-item">Page</div>
                        <div className="flex-item"> <input type="number" value={ this.state.page } onChange={ this.handlePageNumberChange } /></div>
                        <div className="flex-item">of { Math.ceil(this.state.formEntries.total_entries / this.state.perPage) }</div>
                      </div>
                      <div className="d-inline-flex control__item">
                        <div className="flex-item">Show</div>
                        <div className="flex-item"><input type="number" value={this.state.perPage} onChange={ this.handlePerPageChange } /></div>
                        <div className="flex-item">Results</div>
                      </div>
                    </div>
                    <div className="page-arrows">
                      <button onClick={() => {
                        let event = {};
                        event.target = {};
                        event.target.value = (Number(this.state.page) - 1).toString();
                        this.handlePageNumberChange(event)
                      }}>
                        <div className="sr-only">Previous Page</div>
                        <i className="fas fa-arrow-left"></i>
                      </button>
                      <button onClick={() => {
                        let event = {};
                        event.target = {};
                        event.target.value = (Number(this.state.page) + 1).toString();
                        this.handlePageNumberChange(event)
                      }}>
                        <div className="sr-only">Next Page</div>
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Submitted (EST)</th>
                        <th>Program</th>
                        <th>Vendor</th>
                      </tr>
                    </thead>
                    <tbody>
                      { listItems }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </StyledFormEntryTable>
      )

    }

    return null;

  }

}

const StyledFormEntryTable = styled.div`

  font-size: 0.75rem;

  h1, h2, h3, h4, h5, h6 {
    font-size: 1em;
  }

  table {
    font-size: 0.75rem;
  }

  .entries .toprow {
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;

    .control-container {
      flex: 1 1 auto;
      input {
        max-width: 50px;
      }
    }

    .control__item {
      align-items: center;
      background-color: ${ colors.grayLightest };
      border-radius: 2px;
      display: flex;
      padding: 5px;
      margin: 5px;
      text-align: center;
      width: 175px;

      &:first-of-type {
        background-color: transparent;
        padding-top: 0;
        margin: 0;
        width: 100%;
      }

      &:nth-of-type(2) {
        margin-left: 0;
      }

      .flex-item {
        margin: 0 2px;
      }

      

    }
  }



  .entries .page-arrows button {

    background-color: ${ colors.grayLightest };
    border: 0;
    border-radius: 2px;
    color: ${ colors.bluePale };
    cursor: pointer;
    padding: 5px;
    transition: all 0.2s ease-in-out;

    &:last-of-type {
      margin-left: 5px;
    }

    &:active,
    &:focus,
    &:hover {
      color: ${ colors.blueBright };
    }

    i {
      font-size: 1.5rem;
    }

  }

  .filters {
    margin-top: 30px;
    h1 {
      font-size: 1.5em;
    }
    .filter-section {
      margin: 15px 0;
    }
    .filter-checkbox {
      input {
        margin-right: 5px;
      }
    }
  }

  th {
    padding-top: 0;
  }

`;
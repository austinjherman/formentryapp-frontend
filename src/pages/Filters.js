import React from 'react';
import styled from 'styled-components';
import { debounce } from '../utils/utils';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';
import Spinner from '../components/Spinner';
import colors from '../styles/colors';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: null,
      filterGroups: null,
      filterGroupsToDisplay: 0,
      filterGroupsForServer: {}
    };
    this.debouncer = new debounce();
  }

  componentDidMount() {
    this.fetchFilterGroups();
    this.fetchFilters();
  }

  handleAddNewFilterGroupBtn = (e) => {
    this.setState({filterGroupsToDisplay: this.state.filterGroupsToDisplay + 1});
  }

  handleRemoveFilterGroupBtn = () => {
    this.setState({filterGroupsToDisplay: this.state.filterGroupsToDisplay - 1});
  }

  updateFilterGroupName = (e) => {
    let filterGroupsForServer = this.state.filterGroupsForServer;
    if(typeof filterGroupsForServer[e.target.dataset.id] == 'undefined') {
      filterGroupsForServer[e.target.dataset.id] = {
        name: null,
        key: null
      }
    }
    filterGroupsForServer[e.target.dataset.id]["name"] = e.target.value;
    this.setState({filterGroupsForServer});
    console.log('state: ', this.state);
  }

  updateFilterGroupKey = (e) => {
    let filterGroupsForServer = this.state.filterGroupsForServer;
    if(typeof filterGroupsForServer[e.target.dataset.id] == 'undefined') {
      filterGroupsForServer[e.target.dataset.id] = {
        name: null,
        key: null
      }
    }
    filterGroupsForServer[e.target.dataset.id]["key"] = e.target.value;
    this.setState({filterGroupsForServer});
    console.log('state: ', this.state);
  }

  saveFilterGroup = () => {

  }

  fetchFilters() {
    let url = `http://local.formapp.api.com/api/v1/filters`;
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
                filters: responseData
              });
              console.log(responseData);
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

  fetchFilterGroups() {
    let url = `http://local.formapp.api.com/api/v1/filter-groups`;
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
                filterGroups: responseData
              });
              console.log(responseData);
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

  renderContent = () => {

    let inputs  = null,
        filterGroups = null, 
        haveFilters = this.state.filters && this.state.filters.data.length,
        haveFilterGroups = this.state.filterGroups && this.state.filterGroups.data.length;

    inputs = [...Array(this.state.filterGroupsToDisplay).keys()].map(x => (
      <div key={x} className="add-filter-group">
        <div>
          <label>
            <span className="d-block">Filter Group Name:</span>
            <input type="text" data-id={x} value={this.state.filterGroupsForServer.x} onChange={this.updateFilterGroupName} />
          </label>
        </div>
        <div>
          <label>
            <span className="d-block">Filter Group Key:</span>
            <input type="text" data-id={x} value={this.state.filterGroupsForServer.x} onChange={this.updateFilterGroupKey} />
          </label>
        </div>
        <div>
          <button onClick={this.saveFilterGroup}>Save</button>
          <Spinner />
        </div>
      </div>
    ));

    if(haveFilterGroups) {
      filterGroups = this.state.filterGroups.data.map(fg => (
        <div key={fg.id} className="filter-group">
          <h3>{fg.name}</h3>
          <p>Filter Group Key: {fg.group_key}</p>
          <div class="filter-group__table-container">
            <table>
              <tbody>
                {fg.filters.map(f => (
                  <tr key={f.id}>
                    <td>
                      <span>{f.value}</span>
                      <span>
                        <i class="fas fa-plus"></i>
                        <i class="far fa-edit"></i>
                        <i class="fas fa-times"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ));
    }

    return(
      <>
      <div className="row">
        <div className="col-md-8">
          {
            !haveFilters
              ? (
                  <div>
                    <p>You don't have any filters.</p>
                    <p>Get started by adding a new filter group.</p>
                  </div>
                )
              : (
                  <div>
                    <h1>Your Filter Groups</h1>
                    {filterGroups}
                  </div>
                )
          }
        </div>
        <div className="col-md-4">
          {inputs}
          {
            <div>
              <button onClick={this.handleAddNewFilterGroupBtn} className="btn btn--add-filter-group">Add new filter group</button>
              {
                this.state.filterGroupsToDisplay > 0
                  ? <button onClick={this.handleRemoveFilterGroupBtn} className="btn btn--remove-filter-group">Remove filter group</button>
                  : null
              }
            </div>
          }
        </div>
      </div>
      </>
    );
  }

  render() {

    return (
      <>
        <PrivateRoute />
        <Header pageName="Filters" />
        <StyledFiltersPage>
          <div className="container">
            {this.renderContent()}
          </div>
        </StyledFiltersPage>
      </>
    )
  }

}

const StyledFiltersPage = styled.div`

  margin: 15px 0;

  button {
    background-color: ${colors.blueMedium};
    border: none;
    border-radius: 2px;
    color: ${colors.offWhite};
    padding: 5px 10px;
    transition: all 0.2s ease-in-out;

    &:active,
    &:focus,
    &:hover {
      background-color: ${colors.blueBright};
      color: ${colors.offWhite};
    }

  }

  .btn--add-filter-group,
  .btn--remove-filter-group {
    margin-top: 30px;
    margin-right: 5px;
  }

  .add-filter-group {
    margin-top: 30px;
    margin-bottom: 30px;

    input {
      margin-right: 15px;
    }
  }

  .filter-group {
    //box-shadow: 0 0 1px 0 ${colors.grayDarkest};
    //padding: 15px;
    margin: 30px 30px 30px 0;

    .filter-group__table-container {
      margin: 0 15px;

      table {
        font-size: 0.75rem;

        td {
          display: flex;
          justify-content: space-between;

          i {
            color: ${colors.bluePale};
            font-size: 1rem;
            margin: 0 10px;
            transition: all 0.2s ease-in-out;

            &:active,
            &:focus,
            &:hover {
              color: ${colors.blueBright};
              cursor: pointer;
            }
          }
        }
      }
    }
  }

`;
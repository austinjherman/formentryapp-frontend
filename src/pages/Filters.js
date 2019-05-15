import React from 'react';
import styled from 'styled-components';
import { debounce } from '../utils/utils';
import Header from '../components/Header';
import FilterGroup from '../components/FilterGroup';
import PrivateRoute from '../components/PrivateRoute';
import Spinner from '../components/Spinner';
import colors from '../styles/colors';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterGroups: null
    };
    this.debouncer = new debounce();
  }

  componentDidMount() {
    this.fetchFilterGroups();
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

    let filterGroups = null, 
        haveFilterGroups = this.state.filterGroups && this.state.filterGroups.data.length;

    if(haveFilterGroups) {
      filterGroups = this.state.filterGroups.data.map(fg => (
        <FilterGroup key={fg.id} filterGroup={fg} />
      ));
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {
              !haveFilterGroups
                ? (
                    <div>
                      <p>You don't have any filters.</p>
                      <p>Get started by adding a new filter group.</p>
                    </div>
                  )
                : (
                    <>
                      <div className="page-title">
                        <h1>Your Filter Groups</h1>
                        <button>Add Filter Group</button>
                      </div>
                      <div>
                        {filterGroups}
                      </div>
                    </>
                  )
            }
          </div>
        </div>
      </div>
    );
  }

  render() {

    return (
      <>
        <PrivateRoute />
        <Header pageName="Filters" />
        <StyledFiltersPage>
          { this.renderContent() }
        </StyledFiltersPage>
      </>
    )
  }

}

const StyledFiltersPage = styled.div`

  margin: 15px 0;

  .page-title {
    h1 {
      display: inline-block;
      margin: 0 15px 0 0;
      vertical-align: middle;
    }
    button {
      display: inline-block;
      vertical-align: middle;
    }
  }

  button {
    background-color: ${colors.blueMedium};
    border: none;
    border-radius: 2px;
    color: ${colors.offWhite};
    font-size: 0.75rem;
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

`;
import React from 'react';
import Moment from 'react-moment';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false,
      totalEntries: null,
      formEntries: null,
      page: 1,
      perPage: 100
    };
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
    this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
  }

  handlePageNumberChange(event) {
    this.setState({page: event.target.value}, () => {
      if(this.state.page.length && Number(this.state.page > 0)) {
        this.fetchFormEntries();
      }
    });
  }

  handlePerPageChange(event) {
    this.setState({perPage: event.target.value}, () => {
      if(this.state.perPage.length && Number(this.state.perPage > 0)) {
        this.fetchFormEntries();
      }
    });
  }

  componentDidMount() {
    this.fetchFormEntries();
  }

  fetchFormEntries() {
    //console.log(this.state);
    fetch(`
      http://local.formapp.api.com/api/v1/form-entries?page=${ this.state.page }&per-page=${ this.state.perPage }
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
              //console.log(responseData);
              this.setState({
                success: responseData.success,
                totalEntries: responseData.total_entries,
                formEntries: responseData.data,
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


  render() {

    if (this.state.formEntries) {

      let listItems = this.state.formEntries.map(fe => {
        let date = new Date(fe.created_at);
        return (
          <tr key={fe.id}>
            <td>{fe.first_name} {fe.last_name}</td>
            <td>{fe.email}</td>
            <td>{fe.phone}</td>
            <td><Moment format="MM/DD/YYYY hh:mm:ssa" subtract={{ hours: 4 }}>{date}</Moment></td>
          </tr>
        )
      });

      return (
        <>
        <div>
          Total Entries: { this.state.totalEntries }
          <br />
          Showing <input type="tel" value={this.state.perPage} onChange={ this.handlePerPageChange } /> Results
          <br />
          Page: <input type="tel" value={ this.state.page } onChange={ this.handlePageNumberChange } />
          &nbsp;of { Math.ceil(this.state.totalEntries / this.state.perPage) }
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            { listItems }
          </tbody>
        </table>
        </>
      )

    }

    return null;

  }

}
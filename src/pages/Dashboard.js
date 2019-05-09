import React from 'react';
import Header from '../components/Header';
import Moment from 'react-moment';
import 'moment-timezone';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responseData: null
    };
  }

  componentDidMount() {
    fetch('http://local.formapp.api.com/api/v1/form-entries', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.formentrytoken }`
      },
    }).then(
      (response) => {
        response.json().then(
          (responseData) => {
            this.setState({responseData: responseData});
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
    return (
      <>
        <Header pageName="Dashboard" />
        <div className="container">
          { 
            this.state.responseData
              ? <FormEntries formEntries={this.state.responseData.data} />
              : null
          }
        </div>
      </>
    )
  }

}

const FormEntries = (formEntries) => {
  const listItems = formEntries.formEntries.map(fe => {
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
    <table>
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Submitted</th>
      </thead>
      <tbody>
        { listItems }
      </tbody>
    </table>
  )
}

export default Dashboard;
import React from 'react';

class Dashboard extends React.Component {

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
            console.log('responseData: ', responseData);
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
      <h1>Dashboard</h1>
    )
  }

}

export default Dashboard;
import React from 'react';
import Header from '../components/Header';

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
            console.log('responseData: ', responseData.data);
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
  const listItems = formEntries.formEntries.map(fe => <li key={fe.id}>{fe.email}</li>);
  return (
    <ul>
      { listItems }
    </ul>
  )
}

export default Dashboard;
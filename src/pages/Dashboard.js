import React from 'react';
import Header from '../components/Header';
import FormEntries from '../components/FormEntries';

class Dashboard extends React.Component {

  render() {
    return (
      <>
        <Header pageName="Dashboard" />
        <FormEntries />
      </>
    )
  }

}

export default Dashboard;
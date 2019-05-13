import React from 'react';
import Header from '../components/Header';
import FormEntries from '../components/FormEntries';
import PrivateRoute from '../components/PrivateRoute';

class Dashboard extends React.Component {

  render() {
    return (
      <>
        <PrivateRoute />
        <Header pageName="Dashboard" />
        <FormEntries />
      </>
    )
  }

}

export default Dashboard;
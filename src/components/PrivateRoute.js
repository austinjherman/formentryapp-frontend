import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

//export default function withAuth(ComponentToProtect) {

  export default class extends Component {
    
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {

      fetch('http://local.formapp.api.com/auth/validate-token', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ localStorage.getItem('formentrytoken') }`
        },
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          }
          else {
            this.setState({ loading: false, redirect: true });
            // const error = new Error(res.error);
            // throw error;
          }
        })
        .catch(err => {
          //console.error(err);
          this.setState({ loading: false, redirect: true });
        });

    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return null;
      // return (
      //   <ComponentToProtect { ...this.props } />
      // );
    }

  }

//}

//   const [authed, setAuthed] = useState(false);

//   let token = localStorage.getItem("formentrytoken");
//   let response = null;

//   if(token) {

//     response = fetch('http://local.formapp.api.com/auth/validate-token', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${ token }`
//       }
//     })

//     response.then((res) => {
//       if (res.status === 200) {
//         setAuthed(true);
//       }
//     });

//   }

//   return (
//     <Route
//       { ...rest }
//       render={ props => 
//         response && authed ? (
//           <Component { ...props } />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   )

// };
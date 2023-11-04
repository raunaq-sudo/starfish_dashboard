import React, { Component } from 'react';
import NavBar from '../components/navBar';
import RegistrationForm from '../components/registration/registrationForm2';
import RegistrationMini from '../components/registration/registrationMini';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import apiEndpoint from '../components/config/data';

class Register extends Component {
  state = {
    mini: false,
    register: false
  };
  componentDidMount = () => {

    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code")
    if (code === null) {
      this.setState({ mini: true })
    } else {
      var formData = new FormData()
      formData.append('code', code)
      // verify code
      fetch(apiEndpoint + '/api/verifyCode/', {
        method: 'POST',
        body: formData
      }).then((response) => response.json()).then(data => {
        if (data['verified'] === 'pass') {
          this.setState({ register: true, code: code, companyName: data['companyName'], companyEmail: data['companyEmail'] })

        } else {
          alert('The link has expired.')
          this.setState({ mini: true })
        }
      }
      ).catch(err => {
        console.error(err)
        alert('The link has expired.')
        this.setState({ mini: true })
      })


    }
  }
  render() {
    return (
      <>
        <Box>
          {this.state.mini ? <RegistrationMini /> : <></>}
          {this.state.register ? <RegistrationForm code={this.state.code} companyName={this.state.companyName} companyEmail={this.state.companyEmail} /> : <></>}
        </Box>
      </>
    );
  }
}

export default Register;

import React, { Component } from 'react';
import NavBar from '../components/navBar';
import RegistrationForm from '../components/registration/registrationForm2';
import RegistrationMini from '../components/registration/registrationMini';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

class Register extends Component {
  state = {};
  render() {
    return (
      <>
        <Box>
          <Routes>
            <Route exact path="" element={<RegistrationMini />}></Route>
            <Route path="2" element={<RegistrationForm />}></Route>
          </Routes>
        </Box>
      </>
    );
  }
}

export default Register;

import React, { Component } from 'react';
import LoginForm from '../components/login/loginForm';
import NavBar from '../components/navBar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../components/login/forgotPassword';
import { Box, Container, Flex, Spacer } from '@chakra-ui/react';

class Login extends Component {
  state = {};
  render() {
    return (
      <>
        <Box >
          <Routes>
            <Route path="" element={<LoginForm />}></Route>
            <Route path="resetPass" element={<ForgotPassword />}></Route>
          </Routes>
        </Box>
      </>
    );
  }
}

export default Login;

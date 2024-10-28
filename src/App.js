import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './layout/login';
import Register from './layout/register';
import Dashboard from './layout/dashboard';
import CallbackHandler from './components/callback/handleCallback';
import ResetPassword from './components/login/resetPasswordComponent';
import AISummaryOneDemand from './components/widgets/aiSummary/aiSummary_ondemand';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login/*" element={<Login />}></Route>
          <Route path="/register/*" element={<Register />}></Route>
          <Route path="/reset_password/*" element={<ResetPassword />}></Route>
          <Route path="/" element={<Navigate to="/login/" />}></Route>
          <Route path="/Dash" element={<Dashboard />}></Route>
          <Route path="/callback" element={<CallbackHandler />}></Route>
          <Route path="/ai_ondemand" element={<AISummaryOneDemand />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

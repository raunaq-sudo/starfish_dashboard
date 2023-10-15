import { Button } from '@chakra-ui/react';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BtnNavigate(props) {
  const navigate = useNavigate();

  if (props.auth) {
    navigate(props.link)
  }
  

  return (
    <Button
      {...props}
      
      
    >
      {props.children}
    </Button>
  );
}

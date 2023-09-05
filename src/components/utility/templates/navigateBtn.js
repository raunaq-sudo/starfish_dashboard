import { Button } from '@chakra-ui/react';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BtnNavigate(props) {
  const navigate = useNavigate();
  return (
    <Button
      {...props}
      onClick={() => {
        navigate(props.link);
      }}
    >
      {props.children}
    </Button>
  );
}

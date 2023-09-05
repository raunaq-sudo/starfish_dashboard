import { Link } from '@chakra-ui/react';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LnkNavigate(props) {
  const navigate = useNavigate();
  return (
    <Link
      {...props}
      onClick={() => {
        navigate(props.link);
      }}
    >
      {props.children}
    </Link>
  );
}

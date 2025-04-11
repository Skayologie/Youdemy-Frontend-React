import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function ContainerS({children}) {
  return (
    <React.Fragment>
      <div className='mt-[80px]!'>
        <Container maxWidth="xl" >
            {children}
        </Container>
      </div>
    </React.Fragment>
  );
}
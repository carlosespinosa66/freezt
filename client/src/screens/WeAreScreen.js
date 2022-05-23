import React from 'react';
import { Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

export default function WeAre() {

  return (
    <Container>
      {[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          <Alert.Heading>
          This is a {variant} alert with{' '}
          </Alert.Heading>
          <Alert.Link href='#'>an example link</Alert.Link>. Give it a click if
          you like.  {variant}
        </Alert>
      ))}
    </Container>
  );
}


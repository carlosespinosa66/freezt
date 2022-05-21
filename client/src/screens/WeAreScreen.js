import React from 'react';
import { Container,Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

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

// import React from 'react';
// // import 'bootstrap/dist/css/bootstrap.css';
// import Container from 'react-bootstrap/Container';

// export default function App() {
//   return (
//     <div style={{ display: 'block',
//                   width: 700, padding: 30 }}>
//       <h4>React-Bootstrap Container Component</h4>
//       <Container
//         style={{
//           backgroundColor: 'green'
//         }}
//       >
//         <h3>Sample Text, Greetings from GeeksforGeeks</h3>
//       </Container>
//     </div>
//   );
// }

// import React, { useState } from 'react';

// // import CheckBox from '../components/check-box'

// import SidebarMenu from 'react-bootstrap-sidebar-menu';
// import { EventKey } from '@restart/ui/types';

// const Theme = {
//   Light: 'light',
//   Dark: 'dark',
// };

// export default function WeAre() {
//   const [isRtl, setIsRtl] = useState(false);
//   const [isDarkTheme, setIsDarkTheme] = useState(true);
//   const [collapseOnSelect, setCollapseOnSelect] = useState(false);
//   const [exclusiveExpand, setExclusiveExpand] = useState(false);

//   const themeName = isDarkTheme ? Theme.Dark : Theme.Light;

//   const onSelect = (eventKey) => {
//     // if (eventKey)
//     // document.getElementById(`${eventKey}`)?.scrollIntoView({ behavior: 'smooth' })
//   };

//   return (
//     <div className='main-wrapper'>
//       {/* <div className='main-wrapper main-wrapper-responsive-lg'> */}
//       <SidebarMenu
//         exclusiveExpand={exclusiveExpand}
//         collapseOnSelect={collapseOnSelect}
//         onSelect={onSelect}
//         variant={themeName}
//         bg={themeName}
//         rtl={isRtl}
//         expand='lg'
//         hide='md'
//       >
//         <SidebarMenu.Collapse>
//           <SidebarMenu.Header>
//             <SidebarMenu.Toggle />
//           </SidebarMenu.Header>
//           <SidebarMenu.Body>
//             <SidebarMenu.Nav>
//               <SidebarMenu.Nav.Link eventKey='setup'>
//                 <SidebarMenu.Nav.Icon>1</SidebarMenu.Nav.Icon>
//                 <SidebarMenu.Nav.Title>How to install</SidebarMenu.Nav.Title>
//               </SidebarMenu.Nav.Link>
//               <SidebarMenu.Nav.Link eventKey='usage'>
//                 <SidebarMenu.Nav.Icon>2</SidebarMenu.Nav.Icon>
//                 <SidebarMenu.Nav.Title>Usage</SidebarMenu.Nav.Title>
//               </SidebarMenu.Nav.Link>
//               <SidebarMenu.Nav.Link eventKey='overview'>
//                 <SidebarMenu.Nav.Icon>3</SidebarMenu.Nav.Icon>
//                 <SidebarMenu.Nav.Title>Overview</SidebarMenu.Nav.Title>
//               </SidebarMenu.Nav.Link>
//             </SidebarMenu.Nav>
//           </SidebarMenu.Body>
//         </SidebarMenu.Collapse>
//       </SidebarMenu>
//       <main className='main-container container-fluid'></main>
//     </div>
//   );
// }

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
          <Alert.Heading>This is a {variant} alert with </Alert.Heading>
          <Alert.Link href='#'>an example link</Alert.Link>. Give it a click if
          you like. {variant}
        </Alert>
      ))}
    </Container>
  );
}

// import SidebarMenu from 'react-bootstrap-sidebar-menu';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// export default function WeAre() {
//   return (
// <div>

// <SidebarMenu
//       exclusiveExpand={exclusiveExpand}
//       collapseOnSelect={collapseOnSelect}
//       onSelect={onSelect}
//       variant={themeName}
//       bg={themeName}
//       rtl={isRtl}
//       expand="lg"
//       hide="md"
//     >
//       <SidebarMenu.Collapse>
//         <SidebarMenu.Header>
//           <SidebarMenu.Brand title="React-Bootstrap" href="https://github.com/react-bootstrap/react-bootstrap">
//             <span className="react-bootstrap-img" />
//           </SidebarMenu.Brand>
//           <SidebarMenu.Toggle />
//         </SidebarMenu.Header>
//         <SidebarMenu.Body>
//           <SidebarMenu.Nav>
//             <SidebarMenu.Nav.Link eventKey="setup">
//               <SidebarMenu.Nav.Icon>1</SidebarMenu.Nav.Icon>
//               <SidebarMenu.Nav.Title>How to install</SidebarMenu.Nav.Title>
//             </SidebarMenu.Nav.Link>
//             <SidebarMenu.Nav.Link eventKey="usage">
//               <SidebarMenu.Nav.Icon>2</SidebarMenu.Nav.Icon>
//               <SidebarMenu.Nav.Title>Usage</SidebarMenu.Nav.Title>
//             </SidebarMenu.Nav.Link>
//             <SidebarMenu.Nav.Link eventKey="overview">
//               <SidebarMenu.Nav.Icon>3</SidebarMenu.Nav.Icon>
//               <SidebarMenu.Nav.Title>Overview</SidebarMenu.Nav.Title>
//             </SidebarMenu.Nav.Link>
//             <SidebarMenu.Sub eventKey={0}>
//               <SidebarMenu.Sub.Toggle>
//                 <SidebarMenu.Nav.Icon />
//                 <SidebarMenu.Nav.Title>Api</SidebarMenu.Nav.Title>
//               </SidebarMenu.Sub.Toggle>
//               <SidebarMenu.Sub.Collapse>
//                 <SidebarMenu.Nav>
//                   <SidebarMenu.Nav.Link eventKey="sidebarmenu">
//                     <SidebarMenu.Nav.Icon>4</SidebarMenu.Nav.Icon>
//                     <SidebarMenu.Nav.Title>SidebarMenu</SidebarMenu.Nav.Title>
//                   </SidebarMenu.Nav.Link>
//                   <SidebarMenu.Sub eventKey={1}>
//                     <SidebarMenu.Sub.Toggle>
//                       <SidebarMenu.Nav.Icon />
//                       <SidebarMenu.Nav.Title>Built-in elements</SidebarMenu.Nav.Title>
//                     </SidebarMenu.Sub.Toggle>
//                     <SidebarMenu.Sub.Collapse>
//                       <SidebarMenu.Nav>
//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.nav">
//                           <SidebarMenu.Nav.Icon>4.1</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Nav</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>

//                         <SidebarMenu.Sub eventKey={2}>
//                           <SidebarMenu.Sub.Toggle>
//                             <SidebarMenu.Nav.Icon />
//                             <SidebarMenu.Nav.Title>Built-in elements</SidebarMenu.Nav.Title>
//                           </SidebarMenu.Sub.Toggle>
//                           <SidebarMenu.Sub.Collapse>
//                             <SidebarMenu.Nav>
//                               <SidebarMenu.Nav.Link eventKey="sidebarmenu.nav.link">
//                                 <SidebarMenu.Nav.Icon>4.1.1</SidebarMenu.Nav.Icon>
//                                 <SidebarMenu.Nav.Title>SidebarMenu.Nav.Link</SidebarMenu.Nav.Title>
//                               </SidebarMenu.Nav.Link>
//                               <SidebarMenu.Nav.Link eventKey="sidebarmenu.nav.item">
//                                 <SidebarMenu.Nav.Icon>4.1.2</SidebarMenu.Nav.Icon>
//                                 <SidebarMenu.Nav.Title>SidebarMenu.Nav.Item</SidebarMenu.Nav.Title>
//                               </SidebarMenu.Nav.Link>
//                               <SidebarMenu.Nav.Link eventKey="sidebarmenu.nav.icon">
//                                 <SidebarMenu.Nav.Icon>4.1.3</SidebarMenu.Nav.Icon>
//                                 <SidebarMenu.Nav.Title>SidebarMenu.Nav.Icon</SidebarMenu.Nav.Title>
//                               </SidebarMenu.Nav.Link>
//                               <SidebarMenu.Nav.Link eventKey="sidebarmenu.nav.title">
//                                 <SidebarMenu.Nav.Icon>4.1.4</SidebarMenu.Nav.Icon>
//                                 <SidebarMenu.Nav.Title>SidebarMenu.Nav.Title</SidebarMenu.Nav.Title>
//                               </SidebarMenu.Nav.Link>
//                             </SidebarMenu.Nav>
//                           </SidebarMenu.Sub.Collapse>
//                         </SidebarMenu.Sub>

//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.sub">
//                           <SidebarMenu.Nav.Icon>4.2</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Sub</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>

//                         <SidebarMenu.Sub eventKey={3}>
//                           <SidebarMenu.Sub.Toggle>
//                             <SidebarMenu.Nav.Icon />
//                             <SidebarMenu.Nav.Title>Built-in elements</SidebarMenu.Nav.Title>
//                           </SidebarMenu.Sub.Toggle>
//                           <SidebarMenu.Sub.Collapse>
//                             <SidebarMenu.Nav>
//                               <SidebarMenu.Nav.Link eventKey="sidebarmenu.sub.collapse">
//                                 <SidebarMenu.Nav.Icon>4.2.1</SidebarMenu.Nav.Icon>
//                                 <SidebarMenu.Nav.Title>SidebarMenu.Sub.Collapse</SidebarMenu.Nav.Title>
//                               </SidebarMenu.Nav.Link>
//                               <SidebarMenu.Nav.Link eventKey="sidebarmenu.sub.toggle">
//                                 <SidebarMenu.Nav.Icon>4.2.2</SidebarMenu.Nav.Icon>
//                                 <SidebarMenu.Nav.Title>SidebarMenu.Sub.Toggle</SidebarMenu.Nav.Title>
//                               </SidebarMenu.Nav.Link>
//                             </SidebarMenu.Nav>
//                           </SidebarMenu.Sub.Collapse>
//                         </SidebarMenu.Sub>

//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.brand">
//                           <SidebarMenu.Nav.Icon>4.3</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Brand</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>
//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.toggle">
//                           <SidebarMenu.Nav.Icon>4.4</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Toggle</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>
//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.collapse">
//                           <SidebarMenu.Nav.Icon>4.5</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Collapse</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>
//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.text">
//                           <SidebarMenu.Nav.Icon>4.6</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Text</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>
//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.header">
//                           <SidebarMenu.Nav.Icon>4.7</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Header</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>
//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.body">
//                           <SidebarMenu.Nav.Icon>4.8</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Body</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>
//                         <SidebarMenu.Nav.Link eventKey="sidebarmenu.footer">
//                           <SidebarMenu.Nav.Icon>4.9</SidebarMenu.Nav.Icon>
//                           <SidebarMenu.Nav.Title>SidebarMenu.Footer</SidebarMenu.Nav.Title>
//                         </SidebarMenu.Nav.Link>
//                       </SidebarMenu.Nav>
//                     </SidebarMenu.Sub.Collapse>
//                   </SidebarMenu.Sub>
//                 </SidebarMenu.Nav>
//               </SidebarMenu.Sub.Collapse>
//             </SidebarMenu.Sub>
//           </SidebarMenu.Nav>
//         </SidebarMenu.Body>
//         <SidebarMenu.Footer>
//         </SidebarMenu.Footer>
//       </SidebarMenu.Collapse>
//     </SidebarMenu>

// </div>

{
  /* <Routes>
    <Route path='/products' element={<Search />} />
    <Route path='/productsAdminMode' element={<Search />} />
    <Route path='/products' element={<CartIcon />} />
    <Route path='/cart' element={<CartIcon />} />
    <Route path='/detail/:id' element={<CartIcon />} />
  </Routes> */
}

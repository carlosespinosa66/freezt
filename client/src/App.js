import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetailScreen';
import MenClothes from './screens/ProductMenClothesScreen';
import WomenClothes from './screens/ProductWomenClothesScreen';
import WeAre from './screens/WeAreScreen';
import Order from './screens/OrderScreen';
import UsersSignup from './screens/UsersSignupScreen';
import PaymentMethod from './screens/PaymentMethodScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Button, Form } from 'react-bootstrap';

import Cart from './screens/CartScreen';
import UsersSignin from './screens/UsersSigninScreen';
import OrderHistory from './screens/OrderHistoryScreen';
import OrderDetail from './screens/OrderDetailScreen';
import ShippingAddress from './screens/ShippingAddressScreen';
import OrdersAdmin from './screens/OrdersAdminScreen';
import OrdersAdminEdit from './screens/OrdersAdminEditScreen';
import ProductsAdmin from './screens/ProductsAdminScreen';
import ProductAdd from './screens/ProductsAdminAddScreen';
import ProductEdit from './screens/ProductsAdminEditScreen';
import UsersProfile from './screens/UsersProfileScreen';
import UsersAdmin from './screens/UsersAdminScreen';
import UsersSignOut from './screens/UsersSignOutScreen';
import UsersAdminEdit from './screens/UsersAdminEditScreen';
import UsersAdd from './screens/UsersAdminAddScreen';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const allCart = useSelector((state) => state.cart);
  const allUserInfo = useSelector((state) => state.userInfo);

  return (
    <Router>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container className='mt-1'>
              <LinkContainer to='/'>
                <Navbar.Brand>
                  <img
                    src='/freezt.png'
                    width='60'
                    height='25'
                    className='d-inline-block align-top'
                    alt='freezt logo'
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                  <LinkContainer to='/WeAre'>
                    <Navbar.Brand>FREEZT</Navbar.Brand>
                  </LinkContainer>
                  <LinkContainer to='/MenClothes'>
                    <Navbar.Brand>HOMBRE</Navbar.Brand>
                  </LinkContainer>
                  <LinkContainer to='/WomenClothes'>
                    <Navbar.Brand>MUJER</Navbar.Brand>
                  </LinkContainer>
                  {allUserInfo ? (
                    <NavDropdown
                      title={allUserInfo.name}
                      id='basic-nav-dropdown'
                    >
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Perfil</NavDropdown.Item>
                      </LinkContainer>
                      {allUserInfo.role !== 'admin' && (
                        <LinkContainer to='/orderhistory'>
                          <NavDropdown.Item>Mis Ordenes</NavDropdown.Item>
                        </LinkContainer>
                      )}
                      {allUserInfo.role === 'admin' && (
                        <LinkContainer to='/orderadmin'>
                          <NavDropdown.Item>
                            Administrar Ordenes
                          </NavDropdown.Item>
                        </LinkContainer>
                      )}
                      {allUserInfo.role === 'admin' && (
                        <LinkContainer to='/productsadmin'>
                          <NavDropdown.Item>
                            Administrar Productos
                          </NavDropdown.Item>
                        </LinkContainer>
                      )}
                      {allUserInfo.role === 'admin' && (
                        <LinkContainer to='/usersadmin'>
                          <NavDropdown.Item>
                            Administrar Usuarios
                          </NavDropdown.Item>
                        </LinkContainer>
                      )}
                      <NavDropdown.Divider />
                      <LinkContainer to='/signout'>
                        <NavDropdown.Item>Salir</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to='/signin'>
                      Ingresar
                    </Link>
                  )}
                </Nav>
                <Nav>
                  <Form className='d-flex'>
                    <Form.Control
                      type='search'
                      placeholder='Buscar'
                      className='me-1'
                      name='search'
                      aria-label='Search'
                    />
                    <Button variant='outline-info'>Buscar</Button>
                  </Form>
                  <Link to='/cart' className='nav-link'>
                    <i className='bi bi-cart3'></i>
                    {allCart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {allCart.cartItems.reduce(
                          (acum, currItem) => acum + currItem.quantity,
                          0
                        )}
                      </Badge>
                    )}
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/MenClothes' element={<MenClothes />} />
              <Route path='/WomenClothes' element={<WomenClothes />} />
              <Route path='/WeAre' element={<WeAre />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/signin' element={<UsersSignin />} />
              <Route path='/signup' element={<UsersSignup />} />
              <Route path='/shipping' element={<ShippingAddress />} />
              <Route path='/payment' element={<PaymentMethod />} />
              <Route path='/placeorder' element={<PlaceOrder />} />
              <Route path='/profile' element={<UsersProfile />} />
              <Route path='/order' element={<Order />} />
              <Route path='/order/:id' element={<Order />} />
              <Route path='/orderdetail/:id' element={<OrderDetail />} />
              <Route path='/orderhistory' element={<OrderHistory />} />
              <Route path='/orderadmin' element={<OrdersAdmin />} />
              <Route path='/orderadminedit/:id' element={<OrdersAdminEdit />} />
              <Route path='/productsadmin' element={<ProductsAdmin />} />
              <Route path='/productsadd' element={<ProductAdd />} />
              <Route path='/productedit/:id' element={<ProductEdit />} />
              <Route path='/useradminedit/:id' element={<UsersAdminEdit />} />
              <Route path='/usersadmin' element={<UsersAdmin />} />
              <Route path='/usersadd' element={<UsersAdd />} />
              <Route path='/signout' element={<UsersSignOut />} />
            </Routes>
          </Container>
        </main>

        <footer class='p-1 bg-dark text-white text-center position-relative'>
          <div class='container'>
            <p class='lead'>Todos los Derechos Reservados</p>
            <a href='/'>
              <i className='bi bi-twitter text-white mx-2'></i>
            </a>
            <a href='https://www.facebook.com/freeztwear'>
              <i className='bi bi-facebook text-white mx-2'></i>
            </a>
            <a href='#'>
              <i className='bi bi-linkedin text-white mx-2'></i>
            </a>
            <a href='https://www.instagram.com/freezt.co'>
              <i className='bi bi-instagram text-white mx-2'></i>
            </a>
            <a href='/' className='position-absolute bottom-0 end-0 p-3'>
              <i className='bi bi-arrow-up-circle h1'></i>
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

{
  /* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
<Container>
<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="me-auto">
    <Nav.Link href="#features">Features</Nav.Link>
    <Nav.Link href="#pricing">Pricing</Nav.Link>
    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown>
  </Nav>
  <Nav>
    <Nav.Link href="#deets">More deets</Nav.Link>
    <Nav.Link eventKey={2} href="#memes">
      Dank memes
    </Nav.Link>
  </Nav>
</Navbar.Collapse>
</Container>
</Navbar> */
}

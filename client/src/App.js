import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetailScreen';
import ProductClothes from './screens/ProductClothesScreen';
import WomenClothes from './screens/WomenClothesScreen';
import WeAre from './screens/WeAreScreen';
import Order from './screens/OrderScreen';
import Signup from './screens/SignupScreen';
import PaymentMethod from './screens/PaymentMethodScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropDown from 'react-bootstrap/NavDropDown';
import Container from 'react-bootstrap/Container';
import Cart from './screens/CartScreen';
import Signin from './screens/SigninScreen';
import Profile from './screens/ProfileScreen';
import OrderHistory from './screens/OrderHistoryScreen';
import OrderDetail from './screens/OrderDetailScreen';
import ShippingAddress from './screens/ShippingAddressScreen';
import OrdersAdmin from './screens/OrdersAdminScreen';
import ProductsAdmin from './screens/ProductsAdminScreen';
import ProductEdit from './screens/ProductsAdminEditScreen';
import UsersAdmin from './screens/UsersAdminScreen';
import SignOut from './screens/SignOutScreen';
import UsersAdminEdit from './screens/UsersAdminEditScreen';
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
          <Navbar bg='dark' variant='dark'>
            <Container className='mt-2'>
              <LinkContainer to='/'>
                <Navbar.Brand>
                  <img
                    src='/freezt.png'
                    width='100'
                    height='45'
                    className='d-inline-block align-top'
                    alt='freezt logo'
                  />
                </Navbar.Brand>
              </LinkContainer>
              <LinkContainer to='/WeAre'>
                <Navbar.Brand>Freezt</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to='/MenClothes'>
                <Navbar.Brand>Hombre</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to='/WomenClothes'>
                <Navbar.Brand>Mujer</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  {/* Cart */}
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
                {allUserInfo ? (
                  <NavDropDown title={allUserInfo.name} id='basic-nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropDown.Item>User Profile</NavDropDown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropDown.Item>Order History</NavDropDown.Item>
                    </LinkContainer>
                    {/* <NavDropDown.Divider /> */}
                    {allUserInfo.role === 'admin' && (
                      <LinkContainer to='/orderadmin'>
                        <NavDropDown.Item>Admin Orders</NavDropDown.Item>
                      </LinkContainer>
                    )}
                    {allUserInfo.role === 'admin' && (
                      <LinkContainer to='/productsadmin'>
                        <NavDropDown.Item>Admin Products</NavDropDown.Item>
                      </LinkContainer>
                    )}

                    {allUserInfo.role === 'admin' && (
                      <LinkContainer to='/usersadmin'>
                        <NavDropDown.Item>Admin Users</NavDropDown.Item>
                      </LinkContainer>
                    )}
                    <NavDropDown.Divider />
                    <LinkContainer to='/signout'>
                      <NavDropDown.Item>Sign Out</NavDropDown.Item>
                    </LinkContainer>
                  </NavDropDown>
                ) : (
                  <Link className='nav-link' to='/signin'>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/MenClothes' element={<ProductClothes />} />
              <Route path='/WomenClothes' element={<WomenClothes />} />
              <Route path='/WeAre' element={<WeAre />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/shipping' element={<ShippingAddress />} />
              <Route path='/payment' element={<PaymentMethod />} />
              <Route path='/placeorder' element={<PlaceOrder />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/order' element={<Order />} />
              <Route path='/order/:id' element={<Order />} />
              <Route path='/orderdetail/:id' element={<OrderDetail />} />
              <Route path='/orderhistory' element={<OrderHistory />} />
              <Route path='/orderadmin' element={<OrdersAdmin />} />
              <Route path='/productsadmin' element={<ProductsAdmin />} />
              <Route path='/productedit/:id' element={<ProductEdit />} />
              <Route path='/useradminedit/:id' element={<UsersAdminEdit />} />              
              <Route path='/usersadmin' element={<UsersAdmin />} />
              <Route path='/signout' element={<SignOut />} />
            </Routes>
          </Container>
        </main>

        <footer class='p-1 bg-dark text-white text-center position-relative'>
          <div class='container'>
            <p class='lead'>All Rights Reserved</p>
            <a href='#'>
              <i className='bi bi-twitter text-white mx-2'></i>
            </a>
            <a href='#'>
              <i className='bi bi-facebook text-white mx-2'></i>
            </a>
            <a href='#'>
              <i className='bi bi-linkedin text-white mx-2'></i>
            </a>
            <a href='#'>
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

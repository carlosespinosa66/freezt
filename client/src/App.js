import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";
import ProductClothes from "./screens/ProductClothes";
import WomenClothes from "./screens/WomenClothes";
import WeAre from "./screens/WeAre";
import OrderScreen from "./screens/OrderScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropDown from 'react-bootstrap/NavDropDown';
import Container from 'react-bootstrap/Container';
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ShippingAddress from "./screens/ShippingAddress";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { putUserSignOut } from "./actions";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch();
  const allCart = useSelector((state) => state.cart);
  const allUserInfo = useSelector((state) => state.userInfo);

  function signoutHandler() {
    dispatch(putUserSignOut());
  }

  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}/>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container className="mt-2">
              <LinkContainer to="/">
                <Navbar.Brand>
                  Home
                </Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/WeAre">
                <Navbar.Brand>
                  Freezt
                </Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/MenClothes">
                <Navbar.Brand>
                  Men
                </Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/WomenClothes">
                <Navbar.Brand>
                  Woman
                </Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link" >
                  Cart
                  {allCart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {allCart.cartItems.reduce((acum, currItem) => acum + currItem.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {allUserInfo ? (<NavDropDown title={allUserInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropDown.Item>User Profile</NavDropDown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropDown.Item>Order History</NavDropDown.Item>
                  </LinkContainer>
                  <NavDropDown.Divider />
                  <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </NavDropDown>) : (
                  <Link className="nav-link" to="/signin" >Sign In</Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              {/* <Route path="/product/:slug" element={<WomenDetail />} /> */}
              <Route path="/MenClothes" element={<ProductClothes />} />
              <Route path="/WomenClothes" element={<WomenClothes />} />
              <Route path="/WeAre" element={<WeAre />} />
              {/* <Route path="/WeAre" element={<OrderScreen />} /> */}
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentMethodScreen />}/>
              <Route path="/placeorder" element={<PlaceOrderScreen />}/>
              <Route path="/order/:id" element={<OrderScreen />}/>
              {/* <Route path="/order" element={<OrderScreen />}/> */}
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </Router >
  );
}

export default App;
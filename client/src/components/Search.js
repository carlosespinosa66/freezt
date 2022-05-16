import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../assets/icons/search-symbol.png";
import { Form,Button } from 'react-bootstrap';
import {getSearchProducts} from '../redux/actions/Products'

export default function SearchBar(){
  
  const dispatch = useDispatch();
  const table = useSelector((state) => state.products.productSearch);
  const artefacts = useSelector((state) => state.products.copyProducts);

  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const [realValue, setRealValue] = useState("");

  const SearchRequest = (event) => {
    event.preventDefault();
    setProducts([]);
    let selectArtefacts = artefacts.filter((product) => {
      if (product.name.toLowerCase().includes(realValue.toLowerCase())) {
        return product;
      }
    });
    if (selectArtefacts.length > 0) {
      dispatch(getSearchProducts(selectArtefacts));
    } else {
      // dispatch(filterByBrand("nada"))
    }
    setValue("");
  };

  const SearchChange = (event) => {
    event.preventDefault();
    if (event.target.value.trim()) {
      setProducts(table.autocomplete(event.target.value.trim()));
      setRealValue(event.target.value);
    } else {
      setProducts([]);
    }
    setValue(event.target.value);
  };

  return (
    <Form
      className="d-flex me-lg-4"
      autoComplete="off"
      onSubmit={SearchRequest}
    >
      <div className="desplegable">
        <input
          onChange={SearchChange}
          className="form-control "
          type="text"
          placeholder="Search..."
          name="search"
          value={value}
          list="products"
        />
      </div>
      <Button variant='outline-info' type="submit">Buscar</Button>
      <datalist id="products">
        {products.map((product, i) => {
          return <option key={i} id={product} value={product} />;
        })}
      </datalist>
    </Form>
  );
};


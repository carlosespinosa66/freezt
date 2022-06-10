import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Form,Button } from 'react-bootstrap';
import {getSearchProducts} from '../redux/actions/Products'

export default function SearchBar(){
  
  const dispatch = useDispatch();
  const table = useSelector((state) => state.products.productSearch);
  const artefacts = useSelector((state) => state.products.copyProducts);
  const navigateTo = useNavigate()
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
      dispatch(getSearchProducts(selectArtefacts[0].name));
      // navigateTo('/MenClothes')
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
          placeholder="Buscar..."
          name="search"
          value={value}
          list="products"
        />
      </div>
      <Button variant='outline-info' className="text-black" type="submit">Buscar</Button>
      <datalist id="products">
        {products.map((product, i) => {
          return <option key={i} id={product} value={product} />;
        })}
      </datalist>
    </Form>
  );
};



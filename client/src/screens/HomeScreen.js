import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { getProducts } from '../redux/actions/Products';
import 'react-multi-carousel/lib/styles.css';

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const navigateTo = useNavigate();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const first_responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  function handleTrainningMen() {
    navigateTo('/MenClothes');
  }
  function handleTrainningWomen() {
    navigateTo('/MenClothes');
  }
  function handleRunningMen() {
    navigateTo('/WomenClothes');
  }
  function handleRunningWomen() {
    navigateTo('/WomenClothes');
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Carrusel principal */}

      <section>
        <Carousel
          responsive={first_responsive}
          swipeable={false}
          draggable={false}
          showDots={true}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition='all .5'
          transitionDuration={1000}
          containerClass='carousel-container'
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
        >
          <div>
            <img className='w-100 img-fluid' src='cs1.jpeg' alt='First slide' />
          </div>
          <div>
            <img
              className='w-100 img-fluid'
              src='cs2.jpeg'
              alt='Second slide'
            />
          </div>
          <div>
            <img className='w-100 img-fluid' src='cs3.jpeg' alt='Third slide' />
          </div>
        </Carousel>
      </section>

      {/*  Trainning Running*/}

      <section id='section_tax' className='p-5'>
        <div className='row text-center trainning_title'>
          <h3 className='col-12 h3_first'>THIS MAKES ME FEEL</h3>
          <h3 className='col-12 h3_second display-4 p-4'>THE FREEZT</h3>
        </div>
        <div className='container'>
          <div className='row text-center g-4'>
            {/* Tarjeta nueva */}

            <div className='row text-center g-6'>
              <div className='col-12 col-md-6'>
                <Card className='position-relative div_running_freezt'>
                  <Card.Img variant='top' src='running.jpeg' />
                  <Card.Body className='position-absolute w-100 text-center summary_item'>
                    <Card.Title>

                      <h3>RUNNING</h3>
                      <p className='card-title card-text mb-3 '>
                        FOR THE FASTEST
                      </p>
                      <a href='/MenClothes' className='col-12 btn_freezt'>HOMBRE</a>                      
                        {/* onClick={handleRunningMen} */}
                      <a href='/WomenClothes' className='col-12 btn_freezt'>MUJER</a>
                        {/* onClick={handleRunningWomen} */}
                    </Card.Title>

                  </Card.Body>
                </Card>
              </div>

              <div className='col-12 col-md-6'>
                <Card className='position-relative  div_running_freezt'>
                  <Card.Img variant='top' src='trainning.jpeg' />
                  <Card.Body className='position-absolute w-100 text-center summary_item'>
                    <Card.Title>
                      <h3>TRAINNING</h3>
                      <p className='card-title card-text mb-3 '>
                        FOR THE STRONGEST
                      </p>

                      <a
                        href='/MenClothes'
                        className='col-12 btn_freezt'
                        // onClick={handleRunningMen}
                      >
                        HOMBRE
                      </a>
                      <a
                        href='/WomenClothes'
                        className='col-12 btn_freezt'
                        // onClick={handleRunningWomen}
                      >
                        MUJER
                      </a>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Tarjetas Categor??as  */}

      <section className='p-4'>
        <div className='container'>
          <div className='row text-center trainning_title'>
            <h3 className='col-12 h3_second display-2'>FEEL THE FREEDOM</h3>
          </div>
          <div className='row text-center g-6'>
            <div className='col-12 col-md-4'>
              <Card className='position-relative '>
                <Card.Img variant='top' src='espalda.jpeg' />
                <Card.Body className='position-absolute w-100 text-center summary_item'>
                  <Card.Title>
                    <h1>Pantalonetas</h1>
                  </Card.Title>
                  <Button className='btn_freezt'>Comprar</Button>
                </Card.Body>
              </Card>
            </div>
            <div className='col-12 col-md-4'>
              <Card className='position-relative'>
                <Card.Img variant='top' src='tennis.jpeg' />
                <Card.Body className='position-absolute w-100 text-center summary_item'>
                  <Card.Title>
                    <h1>Camisetas</h1>
                  </Card.Title>
                  <Button className='btn_freezt'>Comprar</Button>
                </Card.Body>
              </Card>
            </div>
            <div className='col-12 col-md-4'>
              <Card className='position-relative'>
                <Card.Img variant='top' src='bascket.jpeg' />
                <Card.Body className='position-absolute w-100 text-center summary_item'>
                  <Card.Title>
                    <h1>Conjuntos</h1>
                  </Card.Title>
                  <Button className='btn_freezt'>Comprar</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/*Carrusel final tres imagenes */}
      <section className='container'>
        <div className='row text-center trainning_title'>
          <h3 className='h3_third'>ANTOJATE</h3>
        </div>
        <div className='row text-center trainning_title'>
          <h3 h3_first>INVIERTELE A TU PASION</h3>
        </div>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          showDots={true}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition='all .5'
          transitionDuration={1000}
          containerClass='carousel-container'
          // removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
        >
          {allProducts.map((product) => (
            <div className='item_c col-12 thumbnail' key={product.id}>
              <div>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    className='w-100 img-fluid picture1'
                    alt={product.name}
                  />
                </Link>
              </div>
              <div>
                <div>
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.imagesec}
                      className='w-100 img-fluid picture2'
                      alt={product.name}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Informaci??n de Contacto */}

      <section class='p-5'>
        <div class='container'>
          <div class='row g-4'>
            <div class='col-md'>
              <h2 class='text-center mb-4'>Informaci??n de Contacto</h2>
              <ul class='list-group list-group-flush lead'>
                <li class='list-group-item'>
                  <span class='fw-bold'>Oficinas:</span> Cra 27 B Nro 27 D Sur
                  99. Envigado (Ant.)
                </li>
                <li class='list-group-item'>
                  <span class='fw-bold'>Tel??fono de Contacto:</span> +57
                  311-334-28-83
                </li>
                <li class='list-group-item'>
                  <span class='fw-bold'>Pedidos:</span> pedidos@freezt.co
                </li>
                <li class='list-group-item'>
                  <span class='fw-bold'>Servicio al Cliente:</span>{' '}
                  servicioalcliente@freezt.co
                </li>
              </ul>
            </div>
            <div class='col-md'>
              <div id='map'></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

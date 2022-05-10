import React from 'react';
import { Card, Carousel, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Carousel variant='dark' interval={2000}>
        <Carousel.Item>
          <img className='d-block w-20' src='cs1.jpeg' alt='First slide' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-20' src='cs2.jpeg' alt='Second slide' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-20' src='cs3.jpeg' alt='Third slide' />
        </Carousel.Item>
      </Carousel>

      <section id='section_tax' className='p-5'>
        <div className='container'>
          <div className='row text-center g-4'>
            <div className='col-md-6'>
              <div className='card bg-dark text-light div_running_freezt'>
                <img
                  src='running.jpeg'
                  alt='Third slide'
                  className='div-section-running'
                />
                <div className='card-body text-center '>
                  <h3 className='card-title mb-3'>RUNNING</h3>
                  <p className='card-text'>FOR THE FASTEST</p>
                  <a href='#' className='btn_freezt'>
                    HOMBRE
                  </a>
                  <a href='#' className='btn_freezt'>
                    MUJER
                  </a>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card bg-secondary text-light div_running_freezt'>
                <img
                  src='trainning.jpeg'
                  alt='Third slide'
                  className='div-section-running'
                />
                <div className='card-body text-center'>
                  <h3 className='card-title mb-3'>TRAINNING</h3>
                  <p className='card-text'>FOR THE STRONGEST</p>
                  <a href='#' className='btn_freezt'>
                    HOMBRE
                  </a>
                  <a href='#' className='btn_freezt'>
                    MUJER
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='p-4'>
        <div className='container'>
          <div className='row text-center g-6'>
            <div className='col-12 col-md-4'>
              <Card className='position-relative card_item'>
                <Card.Img variant='top' src='espalda.jpeg' />
                <Card.Body className='position-absolute w-100 text-center summary_item'>
                  <Card.Title>Pantalonetas</Card.Title>
                  <Button variant='primary' className='btn_freezt'>
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className='col-12 col-md-4'>
              <Card className='position-relative card_item'>
                <Card.Img variant='top' src='tennis.jpeg' />
                <Card.Body className='position-absolute w-100 text-center summary_item'>
                  <Card.Title>Camisetas</Card.Title>
                  <Button variant='primary' className='btn_freezt'>
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className='col-12 col-md-4'>
              <Card className='position-relative card_item'>
                <Card.Img variant='top' src='bascket.jpeg' />
                <Card.Body className='position-absolute w-100 text-center summary_item'>
                  <Card.Title>Conjuntos</Card.Title>
                  <Button variant='primary' className='btn_freezt'>
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/*Carrusel final  */}

      <div id='reviews_car' className='owl-carousel'>
        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>

        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>

        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>

        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>

        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>

        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>

        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>

        <div className='item_c'>
          <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
        </div>
      </div>

      <section class='p-5'>
        <div class='container'>
          <div class='row g-4'>
            <div class='col-md'>
              <h2 class='text-center mb-4'>Información de Contacto</h2>
              <ul class='list-group list-group-flush lead'>
                <li class='list-group-item'>
                  <span class='fw-bold'>Oficinas:</span> Cra 27 B Nro 27 D Sur
                  99. Envigado (Ant.)
                </li>
                <li class='list-group-item'>
                  <span class='fw-bold'>Teléfono de Contacto:</span> +57
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

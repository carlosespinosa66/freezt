import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Carousel variant='dark' interval={2000}>
        <Carousel.Item>
          <img className='d-block w-20' src='c1.jpg' alt='First slide' />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-20' src='c2.jpg' alt='Second slide' />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-20' src='c3.jpg' alt='Third slide' />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-20' src='c4.jpg' alt='Third slide' />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-20' src='c5.jpg' alt='Third slide' />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section class='p-5'>
        <div class='container'>
          <div class='row text-center g-4'>
            <div class='col-md'>
              <div class='card bg-dark text-light'>
                <div class='card-body text-center'>
                  <div class='h1 mb-3'>
                    <i class='bi bi-laptop'></i>
                  </div>
                  <h3 class='card-title mb-3'>Virtual</h3>
                  <p class='card-text'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                  </p>
                  <a href='#' class='btn btn-primary'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div class='col-md'>
              <div class='card bg-secondary text-light'>
                <div class='card-body text-center'>
                  <div class='h1 mb-3'>
                    <i class='bi bi-person-square'></i>
                  </div>
                  <h3 class='card-title mb-3'>Hybrid</h3>
                  <p class='card-text'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                  </p>
                  <a href='#' class='btn btn-dark'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div class='col-md'>
              <div class='card bg-dark text-light'>
                <div class='card-body text-center'>
                  <div class='h1 mb-3'>
                    <i class='bi bi-people'></i>
                  </div>
                  <h3 class='card-title mb-3'>In Person</h3>
                  <p class='card-text'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                  </p>
                  <a href='#' class='btn btn-primary'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <span class='fw-bold'>Servicio al Cliente:</span> servicioalcliente@freezt.co
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

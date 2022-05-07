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

      <section class="p-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-md">
              <h2 class="text-center mb-4">Contact Info</h2>
              <ul class="list-group list-group-flush lead">
                <li class="list-group-item">
                  <span class="fw-bold">Main Location:</span> 50 Main st Boston MA
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Enrollment Phone:</span> (555) 555-5555
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Student Phone:</span> (333) 333-3333
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Enrollment Email:</span> (555)
                  enroll@frontendbc.test
                </li>
                <li class="list-group-item">
                  <span class="fw-bold">Student Email:</span>
                  student@frontendbc.test
                </li>
              </ul>
            </div>
            <div class="col-md">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

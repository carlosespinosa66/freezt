import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Home() {
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

  return (
    <Container>
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
          <div className='item_c'>
            <img className='w-100 img-fluid' src='cs1.jpeg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img
              className='w-100 img-fluid'
              src='cs2.jpeg'
              alt='Second slide'
            />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='cs3.jpeg' alt='Third slide' />
          </div>
        </Carousel>
      </section>

      {/*  Trainning Running*/}

      <section id='section_tax' className='p-5'>
        <div className='row text-center trainning_title'>
          <h4>THIS MAKES ME FEEL</h4>
        </div>
        <div className='row text-center trainning_title'>
          <h1 className='display-3'>THE FREEZT</h1>
        </div>
        <div className='container'>
          <div className='row text-center g-4'>
            <div className='col-md-6'>
              <div className='card bg-dark text-light div_running_freezt'>
                <img src='running.jpeg' alt='Third slide' />
                <div className='card-body text-center '>
                  <h3 className='card-title mb-3'>RUNNING</h3>
                  <p className='card-text'>FOR THE FASTEST</p>
                  <a href='/' className='btn_freezt' onClick={handleRunningMen}>
                    HOMBRE
                  </a>
                  <a
                    href='/'
                    className='btn_freezt'
                    onClick={handleRunningWomen}
                  >
                    MUJER
                  </a>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card bg-secondary text-light div_running_freezt'>
                <img src='trainning.jpeg' alt='Third slide' />
                <div className='card-body text-center'>
                  <h3 className='card-title mb-3'>TRAINNING</h3>
                  <p className='card-text'>FOR THE STRONGEST</p>
                  <a
                    href='/'
                    className='btn_freezt'
                    onClick={handleTrainningMen}
                  >
                    HOMBRE
                  </a>
                  <a
                    href='/'
                    className='btn_freezt'
                    onClick={handleTrainningWomen}
                  >
                    MUJER
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Tarjetas Categorías  */}

      <section className='p-4'>

        <div className='container'>
        <div className='row text-center trainning_title'>
          <h4>FEEL THE FREEDOM</h4>
        </div>
          <div className='row text-center g-6'>
            <div className='col-12 col-md-4'>
              <Card className='position-relative card_item'>
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
              <Card className='position-relative card_item'>
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
              <Card className='position-relative card_item'>
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
      <section>
      <div className='row text-center trainning_title'>
          <h1 className='display-2'>ANTOJATE</h1>
        </div>
        <div className='row text-center trainning_title'>
          <h1>INVIERTELE A TU PASION</h1>
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
          <div className='item_c'>
            <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='c2.jpg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='c3.jpg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='c4.jpg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='c5.jpg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='c6.jpg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='c7.jpeg' alt='First slide' />
          </div>

          <div className='item_c'>
            <img className='w-100 img-fluid' src='d4.jpg' alt='First slide' />
          </div>
          <div className='item_c'>
            <img className='w-100 img-fluid' src='p1.jpg' alt='First slide' />
          </div>
          <div className='item_c'>
            <img className='w-100 img-fluid' src='p2.jpg' alt='First slide' />
          </div>
          <div className='item_c'>
            <img className='w-100 img-fluid' src='p3.jpg' alt='First slide' />
          </div>
          <div className='item_c'>
            <img className='w-100 img-fluid' src='p4.jpg' alt='First slide' />
          </div>
        </Carousel>
      </section>

      {/* Información de Contacto */}

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
    </Container>
  );
}

//   return (
//     <Container>

//       {/* Carrusel principal */}

//       <section>
//         <Carousel
//           responsive={first_responsive}
//           swipeable={false}
//           draggable={false}
//           showDots={true}
//           ssr={false} // means to render carousel on server-side.
//           infinite={true}
//           autoPlay={true}
//           autoPlaySpeed={2000}
//           keyBoardControl={true}
//           customTransition='all .5'
//           transitionDuration={1000}
//           containerClass='carousel-container'
//           dotListClass='custom-dot-list-style'
//           itemClass='carousel-item-padding-40-px'
//         >
//           <div className='item_c'>
//             <img
//               className='w-100 img-fluid'
//               src='cs1.jpeg'
//               alt='First slide'
//             />
//           </div>

//           <div className='item_c'>
//             <img
//               className='w-100 img-fluid'
//               src='cs2.jpeg'
//               alt='Second slide'
//             />
//           </div>

//           <div className='item_c'>
//             <img
//               className='w-100 img-fluid'
//               src='cs3.jpeg'
//               alt='Third slide'
//             />
//           </div>
//         </Carousel>
//       </section>

//       {/*  Trainning Running*/}

//       <section id='section_tax' className='p-5'>
//         <div className='container'>
//           <div className='row text-center g-4'>
//             <div className='col-md-6'>
//               <div className='card bg-dark text-light div_running_freezt'>
//                 <img
//                   src='running.jpeg'
//                   alt='Third slide'
//                 />
//                 <div className='card-body text-center '>
//                   <h3 className='card-title mb-3'>RUNNING</h3>
//                   <p className='card-text'>FOR THE FASTEST</p>
//                   <a href='/' className='btn_freezt' onClick={handleRunningMen}>
//                     HOMBRE
//                   </a>
//                   <a
//                     href='/'
//                     className='btn_freezt'
//                     onClick={handleRunningWomen}
//                   >
//                     MUJER
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-6'>
//               <div className='card bg-secondary text-light div_running_freezt'>
//                 <img
//                   src='trainning.jpeg'
//                   alt='Third slide'
//                 />
//                 <div className='card-body text-center'>
//                   <h3 className='card-title mb-3'>TRAINNING</h3>
//                   <p className='card-text'>FOR THE STRONGEST</p>
//                   <a
//                     href='/'
//                     className='btn_freezt'
//                     onClick={handleTrainningMen}
//                   >
//                     HOMBRE
//                   </a>
//                   <a
//                     href='/'
//                     className='btn_freezt'
//                     onClick={handleTrainningWomen}
//                   >
//                     MUJER
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/*Tarjetas Categorías  */}

//       <section className='p-4'>
//         <div className='container'>
//           <div className='row text-center g-6'>
//             <div className='col-12 col-md-4'>
//               <Card className='position-relative card_item'>
//                 <Card.Img variant='top' src='espalda.jpeg' />
//                 <Card.Body className='position-absolute w-100 text-center summary_item'>
//                   <Card.Title>
//                     <h1>Pantalonetas</h1>
//                   </Card.Title>
//                   <Button className='btn_freezt'>Comprar</Button>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div className='col-12 col-md-4'>
//               <Card className='position-relative card_item'>
//                 <Card.Img variant='top' src='tennis.jpeg' />
//                 <Card.Body className='position-absolute w-100 text-center summary_item'>
//                   <Card.Title>
//                     <h1>Camisetas</h1>
//                   </Card.Title>
//                   <Button className='btn_freezt'>Comprar</Button>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div className='col-12 col-md-4'>
//               <Card className='position-relative card_item'>
//                 <Card.Img variant='top' src='bascket.jpeg' />
//                 <Card.Body className='position-absolute w-100 text-center summary_item'>
//                   <Card.Title>
//                     <h1>Conjuntos</h1>
//                   </Card.Title>
//                   <Button className='btn_freezt'>Comprar</Button>
//                 </Card.Body>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/*Carrusel final tres imagenes */}
//       <section>
//         <Carousel
//           responsive={responsive}
//           swipeable={false}
//           draggable={false}
//           showDots={true}
//           ssr={false} // means to render carousel on server-side.
//           infinite={true}
//           autoPlay={true}
//           autoPlaySpeed={2000}
//           keyBoardControl={true}
//           customTransition='all .5'
//           transitionDuration={1000}
//           containerClass='carousel-container'
//           // removeArrowOnDeviceType={['tablet', 'mobile']}
//           dotListClass='custom-dot-list-style'
//           itemClass='carousel-item-padding-40-px'
//         >
//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='c1.jpg' alt='First slide' />
//           </div>

//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='c2.jpg' alt='First slide' />
//           </div>

//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='c3.jpg' alt='First slide' />
//           </div>

//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='c4.jpg' alt='First slide' />
//           </div>

//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='c5.jpg' alt='First slide' />
//           </div>

//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='c6.jpg' alt='First slide' />
//           </div>

//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='c7.jpeg' alt='First slide' />
//           </div>

//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='d4.jpg' alt='First slide' />
//           </div>
//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='p1.jpg' alt='First slide' />
//           </div>
//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='p2.jpg' alt='First slide' />
//           </div>
//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='p3.jpg' alt='First slide' />
//           </div>
//           <div className='item_c'>
//             <img className='w-100 img-fluid' src='p4.jpg' alt='First slide' />
//           </div>
//         </Carousel>
//       </section>

//       {/* Información de Contacto */}

//       <section class='p-5'>
//         <div class='container'>
//           <div class='row g-4'>
//             <div class='col-md'>
//               <h2 class='text-center mb-4'>Información de Contacto</h2>
//               <ul class='list-group list-group-flush lead'>
//                 <li class='list-group-item'>
//                   <span class='fw-bold'>Oficinas:</span> Cra 27 B Nro 27 D Sur
//                   99. Envigado (Ant.)
//                 </li>
//                 <li class='list-group-item'>
//                   <span class='fw-bold'>Teléfono de Contacto:</span> +57
//                   311-334-28-83
//                 </li>
//                 <li class='list-group-item'>
//                   <span class='fw-bold'>Pedidos:</span> pedidos@freezt.co
//                 </li>
//                 <li class='list-group-item'>
//                   <span class='fw-bold'>Servicio al Cliente:</span>{' '}
//                   servicioalcliente@freezt.co
//                 </li>
//               </ul>
//             </div>
//             <div class='col-md'>
//               <div id='map'></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Container>
//   );
// }

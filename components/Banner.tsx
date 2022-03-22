import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
function Banner() {
  return (
    <div className="w-full  ">
      <div className="mx-auto sm:max-w-screen-2xl">
        <Carousel
          infiniteLoop
          autoPlay
          emulateTouch
          interval={5000}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
        >
          <div>
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/61dAdsgvc+L._SX3000_.jpg"
            />{' '}
          </div>

          <div>
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/71DNcA8VTQL._SX3000_.jpg"
            />
          </div>

          <div>
            <img
              loading="lazy"
              src="https://m.media-amazon.com/images/I/51sND5BcIeL._SX3000_.jpg"
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default Banner

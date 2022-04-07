import React from "react";
import { Carousel } from "react-bootstrap"

import './style.scss'
import img1 from '../../assets/img/img1.jpg'
import img2 from '../../assets/img/img2.jpg'
import img3 from '../../assets/img/img3.jpg'

export default function Headline() {
    return (
      <Carousel className="headline-news">
        <Carousel.Item>
          <img src={img1} alt="photo" height="400" width="100%"/>
          <Carousel.Caption>
            {/* <h3>first slide</h3>
            <p>lorem ipsum</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} alt="photo" height="400" width="100%" />
          <Carousel.Caption>
            {/* <h3>second slide</h3>
            <p>lorem ipsum</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={img3} alt="photo" height="400" width="100%" />
          <Carousel.Caption>
            {/* <h3>third slide</h3>
            <p>lorem ipsum</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}
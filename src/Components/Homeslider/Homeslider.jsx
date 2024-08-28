import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import purpleImage from "../../assets/images/purple bag.jpg"
import bags from "../../assets/images/bags.jpg"
import musictools from "../../assets/images/music tools.jpg"
import acces from "../../assets/images/exesories.jpg"
import babychair from "../../assets/images/babychair.jpg"
export default function Homeslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay: true
      };
      return (
        <Slider {...settings}>
          <div >
            <img src={acces}  className='w-full' alt="accesories" />
          </div>
          <div >
          <img src={purpleImage} className='w-full'  alt="backbag" />

          </div>
          <div >
          <img src={babychair} className='w-full'  alt="babychair" />

          </div>
          
        </Slider>
      );
    }

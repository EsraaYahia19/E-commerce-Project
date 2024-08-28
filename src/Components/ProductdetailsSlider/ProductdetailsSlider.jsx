import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export default function ProductdetailsSlider({ images }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,

    };
    return (
        <Slider {...settings} >
            {images.map((img,index) => <div key={index} >
                <img src={img} className='w-full cursor-grab'  />
            </div>)}



        </Slider>
    );
}

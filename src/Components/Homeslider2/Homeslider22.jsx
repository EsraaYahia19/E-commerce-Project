import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import airpods from "../../assets/images/airpods.png"
import bags from "../../assets/images/bags.jpg"
import childrenbooks from "../../assets/images/childrenbooks.png"
import coffemachine from "../../assets/images/coffemachine.png"
import musictools from "../../assets/images/music tools.jpg"
import daipers from "../../assets/images/daipers.png"
import dresses from "../../assets/images/dresses.jpeg"
import gitar from "../../assets/images/gitar.jpeg"
import kitchen from "../../assets/images/kitchen.png"
import mobile from "../../assets/images/mobile.png"
import skincare from "../../assets/images/skincare.png"



export default function Homeslider22() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
        autoplay: true

    };
    return (
        <Slider {...settings}>

            <div className='h-full  text-center'>
                <img src={bags} className="h-[250px] w-full" alt="bags" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Bags</h4>
            </div>
            <div className='h-full  text-center' >
                <img src={airpods} className="h-[250px] w-full" alt="airpods" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Electronics</h4>

            </div>
            <div className='h-full  text-center'>
                <img src={musictools} className="h-[250px] w-full" alt="musictools" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Music</h4>

            </div>

            <div  className='h-full  text-center'>
                <img src={childrenbooks} className="h-[250px] w-full" alt="childrenbooks" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Books</h4>

            </div>

            <div className='h-full  text-center' >
                <img src={coffemachine} className="h-[250px] w-full" alt="coffemachine" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Home</h4>

            </div>

            <div className='h-full  text-center'>
                <img src={dresses} className="h-[250px] w-full" alt="dresses" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Women's Fashion</h4>

            </div >

            <div className='h-full  text-center'>
                <img src={daipers} className="h-[250px] w-full" alt="daipers" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Baby & Toys</h4>

            </div>

            <div className='h-full  text-center'>
                <img src={gitar} className="h-[250px] w-full" alt="gitar" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Music</h4>

            </div>
            <div className='h-full  text-center' >
                <img src={kitchen} className="h-[250px] w-full" alt="kitchen" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>SuperMarket</h4>

            </div>
            <div className='h-full  text-center'>
                <img src={mobile} className="h-[250px] w-full" alt="mobile" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>mobile</h4>

            </div>
            <div className='h-full  text-center' >
                <img src={skincare} className="h-[250px] w-full" alt="skincare" />
                <h4 className='font-semibold text-[18px] lg:text-[28px]'>Beauty & Health</h4>

            </div>


        </Slider>
    );
}

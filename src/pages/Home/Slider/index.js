import React, { useContext } from 'react'
import Slider from "react-slick";
import './index.css';
import Slide1 from '../../../assets/images/slider-1.png';
import Slide2 from '../../../assets/images/slider-2.png';
import Newsletter from '../../../components/newsletter';
import Button from '@mui/material/Button';


import { MyContext } from '../../../App';


const HomeSlider = () => {
    const context = useContext(MyContext);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows:true,
        autoplay:true
    };
  return (
    <section className='homeSlider'>
    <div className='container-fluid position-relative'>
        <Slider {...settings} className='home_slider_Main'>
            <div className="item">
                <img src={Slide1} className='w-100' />
                <div className='info'>
                    <h2 class="mb-4">
                        Don’t miss amazing<br />
                        grocery deals
                    </h2>
                    <p>Sign up for the daily newsletter</p>
                </div>
            </div>
            <div className="item">
                <img src={Slide2} className='w-100' />
                <div className='info'>
                    <h2 class="mb-3">
                        Fresh Vegetables<br />
                        Big discount
                    </h2>
                    <p>Sign up for the daily newsletter</p>
                </div>
            </div>
        </Slider>
        { 
            <Newsletter/>
        }       
    </div>
</section>
  )
}

export default HomeSlider;

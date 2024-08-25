// Hero.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage1 from '../assets/image/hero.png';
import heroImage2 from '../assets/image/2.png';
import helmet from '../assets/image/image.png' // Add another image
import Button from '../ButtonComponent/Button';


const Hero = () => {
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };
  
  

  return (
    <div className="relative" >
      <Slider {...settings}>
        <div className='flex items-center' >
          <div className='flex '>
            <img src={heroImage1} alt="Motorbike" className='h-[620px] mt-12 object-cover' id="im" />
            <div className=' flex flex-col justify-center pr-5'>
              <div className='text-[40px] font-extrabold' id='head1'>
                <h1 className='text-black inline'>Welcome to </h1>
                <h1 className='text-red-500 inline'>Motor's</h1>
                <h1 className='text-black inline'> Nepal</h1>
              </div>
              <p className='text-[20px] text-gray-500 mt-4' id='p'>
                Experience the freedom of the road with Motor's Nepal<br />
                Your premier destination for motorcycle rentals and <br /> unforgettable adventures.
              </p>
              <div className='flex gap-5 mt-4' id='btn'>
                <Button text="RENT NOW" />
                <Button text="LEARN MORE" />
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center '>
          <div className='flex '>
            <img src={heroImage2} alt="Motorbike" className='h-[550px] mt-[120px] object-cover' />
            <div className='w-1/2 flex flex-col justify-center p-12'>
              <div className='text-[40px] font-extrabold'>
                <h1 className='text-black inline'>Explore with </h1>
                <h1 className='text-red-500 inline'>Motor's</h1>
                <h1 className='text-black inline'> Nepal</h1>
              </div>
              <p className='text-[20px] text-gray-500 mt-4'>
                Discover new destinations and enjoy the journey<br />
                with our top-notch motorcycles and exceptional service.
              </p>
              <div className='flex gap-5 mt-4'>
                <Button text="BOOK NOW" />
                <Button text="CONTACT US" />
              </div>
            </div>
          </div>
        </div>

      
        <div className='bg-red-600 bg-opacity-80 h-[600px] w-[100px] mt-[10px] '>
          <div  className='bg-slate-50 h-[600px] w-[700px]'>
            <div className='absolute ml-[500px] mt-[155px] '>
               <img src={helmet} className='h-[400px]' />
            </div>
          </div>
          <div className='relative my-[-350px] p-12 '>
            <div className='font-bold text-[32px] flex gap-2'>
              <h1 className=''>GET ACESSORIES FOR YOUR </h1>
              <h1 className='text-red-500'>RIDE</h1>
            </div>
            <p className='text-[18px] text-gray-500'>We provide you the best acessories for your ride.</p>
            <div className='mt-4'>
               <Button text='SHOP NOW'></Button>

            </div>
           

                
              </div>
        </div>

      </Slider>
    </div>
  );
}

export default Hero;

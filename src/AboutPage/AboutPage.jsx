import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutSection from '../Components/AboutSection';
import CounterUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import FooterComponent from '../Footer/FooterComponent';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const About = () => {
  const [counterOn, setCounterOn] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const TestimonialSection = [
    {
      id: 1,
      description: 'This is my first A licence bike. Within 2 minutes of riding I was comfortable and happy. Its allot more nimble than the R nine T I test rode and so much more exciting than my mates Enfields',
      image: 'https://autobike.templaza.net/wp-content/uploads/2023/05/29-768x768.jpg',
      name: 'Thomas Davies',
    },
    {
      id: 2,
      description: 'Getting on the RT after selling my K1300S was a revelation in all aspects of motorcycle touring. For context, I live in Cape Town South Africa and tour extensively throughout our borders.',
      image: 'https://autobike.templaza.net/wp-content/uploads/2022/07/27-768x768.jpg',
      name: 'Benjamin Diaz',
    },

     {
      id: 3,
      description: 'Getting on the RT after selling my K1300S was a revelation in all aspects of motorcycle touring. For context, I live in Cape Town South Africa and tour extensively throughout our borders.',
      image: 'https://autobike.templaza.net/wp-content/uploads/2023/05/junior-reis-GVsO8wqNuAw-unsplash-768x768.jpg',
      name: 'Diana Rug',
    },

     {
      id: 4,
      description: 'Getting on the RT after selling my K1300S was a revelation in all aspects of motorcycle touring. For context, I live in Cape Town South Africa and tour extensively throughout our borders.',
      image: 'https://autobike.templaza.net/wp-content/uploads/2022/07/27-768x768.jpg',
      name: 'Benjamin Diaz',
    },
    // Add more testimonials as needed
  ];

  const testimonialsToShow = 2; // Number of testimonials to show at once
  const totalSlides = Math.ceil(TestimonialSection.length / testimonialsToShow);

  const handleNext = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrev = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      <div >
        <div className='relative h-[400px] bg-cover bg-center' style={{ backgroundImage: 'url("https://ajpmotoschile.cl/wp-content/uploads/2023/04/breadcrumb.jpg")' }}>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='relative flex flex-col pt-[200px] pl-5 text-center'>
            <h1 className='text-2xl font-bold text-white text-center'><Link to='/'>HOME </Link> / About</h1>
            <h5 className='text-white'>About</h5>
          </div>
        </div>
      </div>

      <div className="">
        <AboutSection />
      </div>

      <ScrollTrigger className="" onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
        <div className="mt-[120px] flex gap-10 justify-evenly ">
          <div className="flex">
            <div className="flex text-[70px] font-bold text-red-500">
              {counterOn && <CounterUp start={0} end={1000} duration={2} delay={0} />}
              <p>+</p>
            </div>
            <div className="absolute pt-[6rem] text-gray-500">
              <h1>Happy Clients</h1>
            </div>
          </div>

          <div className="flex">
            <div className="flex text-[70px] font-bold text-red-500">
              {counterOn && <CounterUp start={0} end={600} duration={2} delay={0} />}
              <p>+</p>
            </div>
            <div className="absolute pt-[6rem] text-gray-500">
              <h1>Successful Rides</h1>
            </div>
          </div>

          <div className="flex">
            <div className="flex text-[70px] font-bold text-red-500">
              {counterOn && <CounterUp start={0} end={150} duration={2} delay={0} />}
              <p>+</p>
            </div>
            <div className="absolute pt-[6rem] text-gray-500">
              <h1>Dealer Branches</h1>
            </div>
          </div>
          <div className="flex">
            <div className="flex text-[70px] font-bold text-red-500">
              {counterOn && <CounterUp start={0} end={30} duration={2} delay={0} />}
              <p>+</p>
            </div>
            <div className="absolute pt-[6rem] text-gray-500">
              <h1>Certification Hold</h1>
            </div>
          </div>
        </div>
      </ScrollTrigger>

      {/* Testimonials */}
      <div className="mt-[120px] ml-10" >
        <div className="bg-red-500 h-8 w-[8rem] text-center">
          <h3 className='text-white pt-1'>TESTIMONIALS</h3>
        </div>
        <h1 className='text-black font-bold text-4xl pt-2'>What Clients Say about Us</h1>
        <div className="relative mt-10 overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
            {TestimonialSection.map((items, index) => (
              <div key={items.id} className={`w-full flex-shrink-0 ${index % testimonialsToShow === 0 ? 'flex' : 'hidden'}`}>
                {TestimonialSection.slice(index, index + testimonialsToShow).map((item) => (
                  <div key={item.id} className="h-[200px] w-[500px] border-[1px] border-gray-400 mx-auto">
                    <h1 className='italic text-[12px] p-4'>{item.description}</h1>
                    <div className="pl-4 flex">
                      <img src={item.image} className='h-[50px] rounded-full' />
                      <p className='p-2'>{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10 gap-5">
          <button onClick={handlePrev} className='bg-red-500 h-[32px] w-[40px] text-white pl-3' id='btns'><FiArrowLeft /></button>
          <button onClick={handleNext} className='bg-red-500 h-[32px] w-[40px] text-white pl-3' id='btns'><FiArrowRight /></button>
        </div>
      </div>

      {/* Footer */}
      <div className=""><FooterComponent /></div>
    </>
  );
}

export default About;

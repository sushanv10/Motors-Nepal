import React from 'react'
import aboutImage from '../assets/image/image copy 3.png'
import Button from '../ButtonComponent/Button'
import { Link } from 'react-router-dom'

const AboutSection = () => {
  return (
    <div className='flex justify-between mt-[140px]' >
        <div className='pl-[55px] pt-[100px]' data-aos="fade-up"> 
            <div className='text-[30px]  gap-2 font-bold '>
                <h1 >HELPS  YOU TO FIND YOUR NEXT</h1>
                <h1 className='text-red-500 '>MOTORBIKE EASILY</h1> 
            </div>
            <p className='pt-5 text-[20px] text-gray-600' data-aos="fade-up">Weather offering organized motorcycling trips to the<br/>
            most beautiful places in the country. Our passion for<br/>motorcycling, combined with a deep love for nature and exploration.</p>
            <div data-aos="fade-right" className='mt-2'>
              <Link to='/about'>
                <Button text="LEARN MORE"></Button>
              </Link>

            </div>
            
        </div>
       
        <div data-aos="fade-left"> 
            <img src={aboutImage} alt='AboutImage' className='h-[450px] rounded-[14px] mr-[20px]'/>
            
        </div>
      
    </div>
  )
}

export default AboutSection

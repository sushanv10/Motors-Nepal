import React from 'react';
import { RiCalendar2Line, RiLayoutRowLine, RiMotorbikeLine } from 'react-icons/ri';
import { PiCylinder, PiSpeedometer } from 'react-icons/pi';
import Button from '../ButtonComponent/Button';
import { SiBrandfolder } from 'react-icons/si';
import { Link } from 'react-router-dom';

const FeatureBikeData = ({ data }) => {
  return (
    <div className='p-5 flex flex-wrap gap-5 justify-evenly'>
      {data.map((bike) => (
        <div key={bike._id} className='bg-[#222222] h-[28rem] w-[300px] shadow-lg shadow-gray-500' data-aos="fade-up" id='feature'>
          <div className="text-white text-[20px] p-4">
            <h1>{bike.name}</h1>
          </div>
          <div className="flex justify-center">
            <img src={bike.bikeImage} className='h-[10rem]' alt={bike.name} />
          </div>
          <div className="details">
            <div className="flex flex-col gap-5 p-3">
              <div className="flex gap-2">
                <RiMotorbikeLine className='text-red-500 text-[20px]' />
                <h5 className='text-white text-[12px]'>{bike.name}</h5>
              </div>
              <div className="flex gap-2">
                <PiSpeedometer className='text-red-500 text-[20px]' />
                <h5 className='text-white text-[12px]'>{bike.bikeSpeed} km/h</h5>
              </div>
              <div className="flex gap-2 flex-col">
                <div className="flex gap-2">
                  <RiCalendar2Line className='text-red-500 text-[20px]' />
                  <h5 className='text-white text-[12px]'>{bike.registrationYear}</h5>
                </div>
                <h3 className='text-gray-400 text-[12px] pl-6 italic mt-[-10px]'>Registration Year</h3>
              </div>

              <div className="flex flex-col justify-center items-center gap-5 my-[-138px] ml-[120px]">
                <div className="flex gap-2">
                  <PiCylinder className='text-red-500 text-[20px]' />
                  <h5 className='text-white text-[12px]'>{bike.bikeCylinder}-cylinder</h5>
                </div>
                <div className="flex gap-2">
                  <RiLayoutRowLine className='text-red-500 text-[20px]' />
                  <h5 className='text-white text-[12px]'>{bike.bikeType}</h5>
                </div>
                <div className="flex gap-2 ml-5">
                  <SiBrandfolder className='text-red-500 text-[20px]' />
                  <h5 className='text-white text-[12px]'>{bike.brand}</h5>
                </div>
              </div>
              
            </div>
          </div>
          <div className="mt-[22vh] flex justify-center">
            <Link to={`/bikes/${bike._id}`}>
              <Button text="View More" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBikeData;
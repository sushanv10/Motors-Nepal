import React from 'react'
import { Link } from 'react-router-dom'
import FooterConponent from '../Footer/FooterComponent'
import {  RiMailAddLine,  } from 'react-icons/ri'
import {  PiMapPinArea, PiPhone } from 'react-icons/pi'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import Button from '../ButtonComponent/Button'


export default function ContactPage() {
  return (
    <>
    <div>
        <div className='relative h-[400px] bg-cover bg-center' style={{ backgroundImage: 'url("https://ajpmotoschile.cl/wp-content/uploads/2023/04/breadcrumb.jpg")' }}>
            <div className='absolute inset-0 bg-black opacity-50'></div>
             <div className='relative flex flex-col pt-[200px] pl-5 text-center'>
                <h1 className='text-2xl font-bold text-white text-center'><Link to='/'>HOME </Link> / Contact</h1>
                <h5 className='text-white'>Contact</h5>
             </div>
        </div>
    </div>

    <div className="mt-[100px] flex gap-10">
        <div className="bg-[#222222] h-[26rem] w-[22rem] ml-[2rem]">
            <div className="p-5 text-white">
                <h3 className='font-bold text-lg'>CONTACT INFO</h3>
                <p className='text-gray-400 text-sm pt-5'>We pride ourselves on being a helping hand for people during good days, bad days and everything in between.</p>
            </div>
            <div className="p-4 flex flex-col">
                <div className="flex gap-4">
                    <PiPhone className='text-red-500 text-[20px]'/>
                    <p className='text-white'>+977 9848769773 </p>
                </div>
                <div className="flex gap-4 pt-4">
                    <PiMapPinArea className='text-red-500 text-[20px]'/>
                    <p className='text-white italic'>4420, NayaBazar, Nepal</p>
                </div>
                <div className="flex gap-4 pt-4">
                    <RiMailAddLine className='text-red-500 text-[20px]'/>
                    <p className='text-white italic'>info@MotorsNepal.com</p>
                </div>
                <div className="flex space-x-4 pt-10 text-white">
                        <a href="https://www.facebook.com" className="text-2xl hover:text-blue-500"><FaFacebookF /></a>
                        <a href="https://www.twitter.com" className="text-2xl hover:text-blue-400"><FaTwitter /></a>
                        <a href="https://www.instagram.com" className="text-2xl hover:text-pink-500"><FaInstagram /></a>
                        <a href="https://www.linkedin.com" className="text-2xl hover:text-blue-700"><FaLinkedinIn /></a>
                </div>
            </div>
            
            
        </div>
        <div className=''>
            <div className="flex flex-col gap-2">
                <h2 className='text-2xl text-red-500 font-bold'>Get In Touch</h2>
                <p>We welcome and value your feedback. Use the form below to send us an email with your comments, questions, or concerns. Every customer is welcome to request a transfer or return call from a Senior Agent or Supervisor on an arising issue.</p>
            </div>
            <form >
                <div className="flex gap-4">
                    <input type="text" placeholder='Name' className='bg-slate-200 text-black p-2 w-[18rem] mt-5 border border-gray-300 rounded'/>
                    <input type='email' placeholder='Email' className='bg-slate-200 text-black p-2 w-[18rem] mt-5 border border-gray-300 rounded'/>
                </div>
                <input type="text" placeholder='Your Message' className='bg-slate-200 text-black p-2 pb-20 h-[10rem] w-[38rem] mt-5 border border-gray-300 rounded'/>
                
            </form>
            <div className='mt-4'>
                <Button text={'Send Message'}/>
            </div>

        </div>
    </div>

    <div className="mt-10">
        <div><iframe width="100%" height="600"  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kathmandu,Nepal+(MotorsNepal)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div>
       
      </div>

    <div>
        <FooterConponent/>
    </div>
    
    </>
    
    
  )
}

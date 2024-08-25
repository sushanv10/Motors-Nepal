import React from "react";
import Video from "../assets/Video/video.mp4";

function VideoSection() {
  
    return (
        <>
        <div className=" flex gap-2 justify-center items-center pt-[100px] text-[35px] font-bold" data-aos="fade-left">
            <h1 className=" text-red-500 text-center ">Ride</h1>
            <h1 className="text-center">With Us</h1>
        </div>
        <div className="">
         <div className="flex justify-center items-center" data-aos="fade-up">
            <video src={Video} autoPlay muted loop playsInline className="w-full h-full"/>

         </div> 
      </div>
        
        </>
        
      
    );
  }


export default VideoSection;
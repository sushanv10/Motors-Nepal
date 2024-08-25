import Button from "../../ButtonComponent/Button"
import { Link } from "react-router-dom"


const Banner = () => {
  return (
    <div className="flex items-center justify-center h-[500px] bg-fixed bg-parallax bg-cover w-full mt-[140px]" >
        <div>
            <h1 className="text-2xl text-white" data-aos="fade-right">FREE SERVICE FOR </h1>
            <h1 className="text-5xl text-red-500 font-bold" data-aos="fade-left">PREMIUM MEMBERS</h1>
            <div data-aos="fade-up" className="mt-4">
              <Link to='/contact'><Button text="CONTACT US"/></Link>
               

            </div>
           

        </div>
        
        
      
    </div>
  )
}

export default Banner

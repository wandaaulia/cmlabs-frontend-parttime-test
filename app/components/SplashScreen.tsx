"use client"

import CountUp from "react-countup";

export default function SplashScreen() {

    return (
   
      <div className="hidden md:flex flex-col h-screen relative min-h-full text-center items-center justify-center">

    <div className="absolute z-20 w-full flex backdrop-brightness-100 bg-cover h-screen min-h-full">
            <video poster={"./banner-img-header.png"} width="400" autoPlay muted loop className='z-10 w-full h-full min-h-full object-cover object-center backdrop-brightness-50'>
                <source src={"./video/cook_banner.webm"} type="video/webm"/>
                Your Browser does not support HTML video.
            </video>
    </div>

    <div className="relative text-white text-4xl font-bold text-center z-100"> 
        Find <span className=""><CountUp end={200} duration={3} />+</span> Recipes
    </div>
      </div>

    )

}
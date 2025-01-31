import React from "react";
import {useState} from 'react'



const Intro = () => {
    return (
   
   <div className="flex flex-col p-2 justify-center items-center rounded-xl w-full bg-gradient-to-r from-gray-400 to to-gray-600  shadow-md ring-1 ring-grey-300 w-100vw text-center">
    <h1 className="mb-10 text-4xl font-bold font-mono text-zinc-50">Target Trading</h1>
      <h5 className="mb-2 text-2xl  font-mono text-zinc-50">Effortless stock tracking and selling with AI.</h5>
      <p className="font-mono tracking-wider leading-10 text-zinc-50 mt-10 text-center">Maximize your stock returns with AI-powered insights. Our platform tracks your stocks and uses historical data and current market trends to advise you on the optimal selling times. Make smarter decisions and unlock greater profits with our intelligent stock selling tool.</p>
      <div className="flex justify-center mt-20">
        <a href="/SignIn">
<button className="text-sm bg-white text-gray-900 px-4 py-2 w-[90px] rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 ml-5 ">
Log In
</button></a>
<a href="/SignUp">
<button className="text-sm bg-white text-gray-900 px-4 py-2 w-[90px] rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 mr-5 ml-10">
Sign Up
</button>
</a>
</div>
    </div>


    )
  }

  export default Intro;
  
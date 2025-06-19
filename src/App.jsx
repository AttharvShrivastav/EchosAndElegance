import React, { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar/Navbar"
import '../src/App.scss'
import Header from "./components/Header/Header";
import Featured from "./components/Featured/Featured";
import About from "./components/About/About"
import Gallery from "./components/Gallery/Gallery";
import Footer from "./components/Footer/Footer"
import useLocoScroll from "./useLocoScroll";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);


const App = () =>{

  
  const [preloader, setPreloader] = useState(true);
  const [timer, setTimer] = useState(3);

  const cont = useRef(null)
  const content =useRef(null)


  const id = useRef(null);

  const clear = () =>{
    window.clearInterval(id.current)
    setPreloader(false)
  }

  useEffect(()=>{
    id.current = window.setInterval(()=>{
      setTimer((timer) => timer-1)
    }, 1000)
  }, [])

  useEffect(()=>{
    console.log(timer)
    if (timer <= 0){
      clear();

    }
  }, [timer])

    return (

      <>
      {preloader? (
        <div className="loader-wrapper absolute">
          <h1>Echos And Elegance</h1>
          <h2>Indore, India</h2>
        </div>
      ):(
        <div ref={cont} className="main-container" id="main-container"
        data-scroll-container
        >
          <div id="scroll-content"
          ref={content}>
            <Navbar />
            <Header />
            <Featured />
            <About />
            <Gallery />
            <Footer />

          </div>
        </div>)}
      </>
    )
  }
  
export default App;
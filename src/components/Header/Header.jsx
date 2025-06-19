import React, { useEffect } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";



gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

import "./Header.scss"
function Header() {
  useEffect(() => {
    const split = new SplitText("#header-text", {
      type: "words"
    });

    gsap.from(split.words, {
      duration: 1,
      opacity: 0,
      y: 400,
      stagger: 0.1,
      ease: "power2.out"
    });

    return () => {
      split.revert();
    };
  }, []);




  return (
    <section className='header-container'
    data-scroll-section>
      <div className="header-menu">
        <p>Intro</p>
        <p>About</p>
        <p>Featured</p>
      </div>
      <h1 id='header-text'>Echo & Harmony</h1>
    </section>
  )
}

export default Header
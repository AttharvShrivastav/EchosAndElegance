import React, { useEffect, useRef } from 'react';
import './Featured.scss';
import image from '../../assets/featured2.png';
import image2 from '../../assets/featured4.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Featured() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const bigImage = sectionRef.current.querySelector(
      '.featured-column-layout img'
    );
    const smallImage = sectionRef.current.querySelector(
      '.featured-row-layout img'
    );

    // Big image - animate earlier
    gsap.fromTo(
      bigImage,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bigImage,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Small image - animate slightly later
    gsap.fromTo(
      smallImage,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: smallImage,
          start: 'top 70%', // Adjust this for later trigger
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      className='featured-section'
      data-scroll-section
      ref={sectionRef}
    >
      <div className='featured-row-layout'>
        <h6>Ruins</h6>
        <img src={image} alt='Ruins' />
      </div>
      <div className='featured-column-layout'>
        <h6>Apocalypse</h6>
        <img src={image2} alt='Apocalypse' />
      </div>
    </section>
  );
}

export default Featured;

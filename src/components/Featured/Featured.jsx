import React, { useEffect, useRef } from 'react';
import './Featured.scss';
import image from '../../assets/featured2.png'; // Assuming correct path
import image2 from '../../assets/featured4.png'; // Assuming correct path
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Featured() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Ensure sectionRef.current exists before querying
    if (!sectionRef.current) return;

    const bigImage = sectionRef.current.querySelector(
      '.featured-column-layout img'
    );
    const smallImage = sectionRef.current.querySelector(
      '.featured-row-layout img'
    );

    // --- Big image animation ---
    // Create a ScrollTrigger for the big image
    ScrollTrigger.create({
      trigger: bigImage,
      start: 'top 80%', // Animation starts when top of image hits 80% down from viewport top
      toggleActions: 'play none none reverse', // Play on enter, reverse on leave back
      animation: gsap.fromTo( // Attach a GSAP animation to this ScrollTrigger
        bigImage,
        { clipPath: 'inset(100% 0% 0% 0%)' }, // Start from bottom of image
        {
          clipPath: 'inset(0% 0% 0% 0%)', // Animate to full visibility
          duration: 1.5,
          ease: 'power2.out',
        }
      ),
      // markers: true, // Uncomment for debugging
      id: "featuredBigImage" // Give it an ID for cleanup
    });

    // --- Small image animation ---
    // Create a ScrollTrigger for the small image
    ScrollTrigger.create({
      trigger: smallImage,
      start: 'top 70%', // Animation starts when top of image hits 70% down from viewport top
      toggleActions: 'play none none reverse', // Play on enter, reverse on leave back
      animation: gsap.fromTo( // Attach a GSAP animation to this ScrollTrigger
        smallImage,
        { clipPath: 'inset(100% 0% 0% 0%)' }, // Start from bottom of image
        {
          clipPath: 'inset(0% 0% 0% 0%)', // Animate to full visibility
          duration: 1.2,
          ease: 'power2.out',
        }
      ),
      // markers: true, // Uncomment for debugging
      id: "featuredSmallImage" // Give it an ID for cleanup
    });

    return () => {
      // Cleanup ScrollTriggers on component unmount
      ScrollTrigger.getById("featuredBigImage")?.kill();
      ScrollTrigger.getById("featuredSmallImage")?.kill();
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section
      className='featured-section'
      data-scroll-section
      ref={sectionRef} // Attach the ref to the section
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
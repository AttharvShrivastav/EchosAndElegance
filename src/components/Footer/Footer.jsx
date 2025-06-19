import React, { useEffect, useRef } from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import './Footer.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

function Footer() {
  const locationRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(locationRef.current, {
      type: 'words',
    });

    gsap.from(split.words, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: locationRef.current,
        start: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      split.revert(); // Clean up
    };
  }, []);

  return (
    <section className="footer-section" data-scroll-section>
      <SectionHeader title="Made in" />
      <div className="location" id="location">
        <h3 ref={locationRef}>Indore, India</h3>
      </div>
    </section>
  );
}

export default Footer;

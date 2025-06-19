import React, { useEffect } from 'react';
import './About.scss';
import SectionHeader from '../SectionHeader/SectionHeader';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

function About() {
  useEffect(() => {
    const split = new SplitText('.headline', {
      type: 'lines',
      linesClass: 'line-mask', // custom class for styling overflow
    });

    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      split.revert(); // Clean up
    };
  }, []);

  return (
    <section className="about-section" data-scroll-section>
      <SectionHeader title="About" />
      <p className="headline">
        Echoes & Elegance is more than an aesthetic; it's a philosophy. Born from a desire to find beauty in unexpected places, and to articulate the resilience of the human spirit through art and design. We believe in craftsmanship that tells a story, and aesthetics that evoke emotion. Join us in this journey of rediscovery.
      </p>
    </section>
  );
}

export default About;

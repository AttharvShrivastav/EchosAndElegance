import React, { useEffect, useRef, useState } from 'react';

import "./Gallery.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);
import Gallery1 from '../../assets/gallery1.png';
import Gallery2 from '../../assets/gallery2.png';
import Gallery3 from '../../assets/gallery3.png';
import Gallery4 from '../../assets/gallery4.png';

function GalleryItem({ src, category, subtitle, title, updateActiveImage, index }) {
  return (
    <div 
      className='gallery-item-wrapper'
      data-scroll-section

    >
      <div></div>
      <div className="gallery-item">
        <div className="gallery-item-info">
          <h1 className='gallery-info-title'>{title}</h1>
          <h6 className='gallery-info-subtitle'>{subtitle}</h6>
          <p className='gallery-info-category'>{category}</p>
        </div>
        <div
          className="gallery-item-image"
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      </div>
      <div></div>
    </div>
  );
}

function Gallery() {
  const [activeImage, setActiveImage] = useState(1);
  const ref = useRef(null)

  useEffect(() => {
  if (!ref.current) return; 

  const sections = gsap.utils.toArray(".gallery-item-wrapper");

  gsap.to(sections, {
    xPercent: -100,
    scrollTrigger: {
      trigger: ref.current,
      start: 'top top',
      end: () => `+=${ref.current.scrollWidth}`,
      // markers: true,
      pin: true,
      scrub: 0.5,
      snap: 1 / (sections.length - 1),
    },
  });

  ScrollTrigger.refresh();

}, []);


  const images = [
    {
      src: Gallery3,
      title: "The Lost Score",
      subtitle: "A symphony scattered, a memory in the wind.",
      category: "Narrative / Solitude",
    },
    {
      src: Gallery2,
      title: "Fading Echoes",
      subtitle: "Unwinding the silence of forgotten melodies.",
      category: "Detail / Nostalgia",
    },
    {
      src: Gallery4,
      title: "The Resolute Chord",
      subtitle: "Where fingers meet history, and music endures.",
      category: "Focus / Resilience",
    },
    {
      src: Gallery1,
      title: "The Unbroken Stand",
      subtitle: "Amidst the rubble, a silent anthem begins.",
      category: "Grandeur / Persistence",
    },
  ];

  return (
    <section className='section-wrapper gallery-wrap'
    data-scroll-section>
      <div className='gallery' ref={ref}>
        <div className="gallery-counter">
          <span>{activeImage}</span>
          <span className='divider' />
          <span>{images.length}</span>
        </div>

        {images.map((image, index) => (
          <GalleryItem
            key={index}
            index={index}
            {...image}
            updateActiveImage={(idx) => setActiveImage(idx + 1)}
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
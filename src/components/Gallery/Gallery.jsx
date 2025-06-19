import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cn from 'classnames'; // Using classnames for conditional classes

import './Gallery.scss';

// Import your images
import Gallery1 from '../../assets/gallery1.png';
import Gallery2 from '../../assets/gallery2.png';
import Gallery3 from '../../assets/gallery3.png';
import Gallery4 from '../../assets/gallery4.png';

gsap.registerPlugin(ScrollTrigger);

// Custom hook to determine if an element is on screen
const useOnScreen = (ref, threshold = 0) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]); // Dependencies array includes ref and threshold

  return isIntersecting;
};

function GalleryItem({ src, category, subtitle, title, updateActiveImage, index }) {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, 0.5); // 50% of the item visible to be considered "on screen"

  useEffect(() => {
    if (onScreen) {
      updateActiveImage(index);
    }
  }, [onScreen, index, updateActiveImage]); // Add updateActiveImage to dependencies

  return (
    <div
      className={cn('gallery-item-wrapper', { 'is-reveal': onScreen })}
      ref={ref}
    >
      <div></div> {/* This div is for grid-template-columns layout */}
      <div className="gallery-item">
        <div className="gallery-item-info">
          <h1 className="gallery-info-title">{title}</h1>
          <h6 className="gallery-info-subtitle">{subtitle}</h6>
          <p className="gallery-info-category">{category}</p>
        </div>
        <div
          className="gallery-item-image"
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      </div>
      <div></div> {/* This div is for grid-template-columns layout */}
    </div>
  );
}

function Gallery() {
  const [activeImage, setActiveImage] = useState(1);
  const galleryRef = useRef(null); // Renamed ref to avoid conflict

  const images = [
    {
      src: Gallery3,
      title: 'The Lost Score',
      subtitle: 'A symphony scattered, a memory in the wind.',
      category: 'Narrative / Solitude',
    },
    {
      src: Gallery2,
      title: 'Fading Echoes',
      subtitle: 'Unwinding the silence of forgotten melodies.',
      category: 'Detail / Nostalgia',
    },
    {
      src: Gallery4,
      title: 'The Resolute Chord',
      subtitle: 'Where fingers meet history, and music endures.',
      category: 'Focus / Resilience',
    },
    {
      src: Gallery1,
      title: 'The Unbroken Stand',
      subtitle: 'Amidst the rubble, a silent anthem begins.',
      category: 'Grandeur / Persistence',
    },
  ];

  useEffect(() => {
    if (!galleryRef.current) return;

    // A small delay to ensure ref.current.offsetWidth is correct after initial render
    const timer = setTimeout(() => {
      const sections = gsap.utils.toArray('.gallery-item-wrapper');
      const totalWidth = galleryRef.current.offsetWidth * (sections.length - 1); // Total scrollable width

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1), // Scroll by 100% of each section's width
        ease: 'none',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`, // Scroll until the total width of all sections has passed
          pin: true,
          scrub: 0.5,
          snap: 1 / (sections.length - 1), // Snap to each section
          // markers: true, // Uncomment for debugging scroll trigger
        },
      });

      ScrollTrigger.refresh(); // Refresh ScrollTrigger to account for new layout
    }, 100); // Small delay, adjust if needed

    return () => clearTimeout(timer); // Clean up timeout on unmount
  }, []); // Empty dependency array means this runs once on mount

  const handleUpdateActiveImage = (index) => {
    setActiveImage(index + 1);
  };

  return (
    <section data-scroll-section className="section-wrapper gallery-wrap">
      <div className="gallery" ref={galleryRef}>
        <div className="gallery-counter">
          <span>{activeImage}</span>
          <span className="divider" />
          <span>{images.length}</span>
        </div>

        {images.map((image, index) => (
          <GalleryItem
            key={index} // Using index as key for now
            index={index}
            {...image}
            updateActiveImage={handleUpdateActiveImage}
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
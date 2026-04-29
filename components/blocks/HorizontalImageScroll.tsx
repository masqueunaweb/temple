'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80',
    title: 'El comienzo',
    subtitle: 'Cada día es una oportunidad para empezar de nuevo.',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
    title: 'La constancia',
    subtitle: 'No se trata de hacerlo perfecto. Se trata de no parar.',
  },
  {
    url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&q=80',
    title: 'El silencio',
    subtitle: 'La constancia silenciosa es el ruido más fuerte.',
  },
  {
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&q=80',
    title: 'La perseverancia',
    subtitle: 'El que trabaja cuando nadie mira.',
  },
  {
    url: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=1920&q=80',
    title: 'La lealtad',
    subtitle: 'Ser fiel a tu palabra, día tras día.',
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
    title: 'El legado',
    subtitle: 'Al final acabamos donde tiene sentido quedarse.',
  },
];

export default function HorizontalImageScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const windowWidth = window.innerWidth;

    // Horizontal scroll
    gsap.to(scrollRef.current, {
      x: () => -(scrollWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth - windowWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Text reveal animations
    textRefs.current.forEach((text, index) => {
      if (!text) return;
      
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-temple-bg">
      <div ref={scrollRef} className="flex h-full">
        {SECTIONS.map((section, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-screen h-full relative"
          >
            <img
              src={section.url}
              alt={section.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <div
                ref={(el) => { textRefs.current[index] = el }}
                className="text-center space-y-4 max-w-2xl"
              >
                <h2 className="font-satoshi text-display font-bold tracking-tight text-temple-text-primary">
                  {section.title}
                </h2>
                <p className="font-satoshi text-body text-temple-text-secondary">
                  {section.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

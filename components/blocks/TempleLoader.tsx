'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TEMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&q=80',
];

export default function TempleLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const growingImageRef = useRef<HTMLDivElement>(null);
  const headingStartRef = useRef<HTMLDivElement>(null);
  const headingEndRef = useRef<HTMLDivElement>(null);
  const coverImageExtraRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const letters = lettersRef.current;
    const box = boxRef.current;
    const growingImage = growingImageRef.current;
    const headingStart = headingStartRef.current;
    const headingEnd = headingEndRef.current;
    const coverImageExtra = coverImageExtraRef.current;

    container.classList.remove('is--hidden');

    const tl = gsap.timeline({
      defaults: {
        ease: 'expo.inOut',
      },
      onComplete: () => {
        setTimeout(() => {
          onComplete();
        }, 500);
      },
    });

    // Letras aparecen
    if (letters.length) {
      tl.from(letters, {
        yPercent: 100,
        stagger: 0.025,
        duration: 1.25,
      });
    }

    // Caja se expande
    if (box) {
      tl.fromTo(
        box,
        { width: '0em' },
        { width: '1em', duration: 1.25 },
        '< 1.25'
      );
    }

    // Imagen crece
    if (growingImage) {
      tl.fromTo(
        growingImage,
        { width: '0%' },
        { width: '100%', duration: 1.25 },
        '<'
      );
    }

    // Letras se separan
    if (headingStart) {
      tl.fromTo(
        headingStart,
        { x: '0em' },
        { x: '-0.05em', duration: 1.25 },
        '<'
      );
    }

    if (headingEnd) {
      tl.fromTo(
        headingEnd,
        { x: '0em' },
        { x: '0.05em', duration: 1.25 },
        '<'
      );
    }

    // Imágenes extra aparecen y desaparecen
    if (coverImageExtra.length) {
      tl.fromTo(
        coverImageExtra,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.05,
          ease: 'none',
          stagger: 0.5,
        },
        '-=0.05'
      );
    }

    // Imagen crece a pantalla completa
    if (growingImage) {
      tl.to(growingImage, {
        width: '100vw',
        height: '100dvh',
        duration: 2,
      }, '< 1.25');
    }

    // Caja crece más allá de pantalla
    if (box) {
      tl.to(box, {
        width: '110vw',
        duration: 2,
      }, '<');
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="temple-loader is--loading is--hidden fixed inset-0 z-[100] bg-temple-bg"
    >
      <div className="temple-loader-inner flex justify-center items-center w-full h-full absolute top-0 left-0 overflow-hidden">
        <div className="temple__h1 whitespace-nowrap justify-center font-satoshi text-[12.5em] font-medium leading-[0.75] flex relative text-temple-text-primary">
          <div
            ref={headingStartRef}
            className="temple__h1-start justify-end w-[1.5256em] flex overflow-hidden"
          >
            <span ref={(el) => { if (el) lettersRef.current[0] = el }} className="temple__letter block relative">T</span>
            <span ref={(el) => { if (el) lettersRef.current[1] = el }} className="temple__letter block relative">E</span>
            <span ref={(el) => { if (el) lettersRef.current[2] = el }} className="temple__letter block relative">M</span>
          </div>
          <div ref={boxRef} className="temple-loader__box flex flex-col justify-center items-center w-0 relative">
            <div className="temple-loader__box-inner justify-center items-center min-w-[1em] h-[95%] flex relative">
              <div ref={growingImageRef} className="temple__growing-image justify-center items-center w-0 h-full flex absolute overflow-hidden">
                <div className="temple__growing-image-wrap w-full min-w-[1em] h-full absolute">
                  {TEMPLE_IMAGES.slice(0, 3).map((url, index) => (
                    <img
                      key={index}
                      ref={(el) => { if (el) coverImageExtraRef.current[index] = el }}
                      src={url}
                      alt=""
                      className={`temple__cover-image-extra is--${index + 1} pointer-events-none object-cover w-full h-full absolute top-0 left-0 opacity-40`}
                    />
                  ))}
                  <img
                    src={TEMPLE_IMAGES[3]}
                    alt=""
                    className="temple__cover-image pointer-events-none object-cover w-full h-full absolute top-0 left-0 opacity-40"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            ref={headingEndRef}
            className="temple__h1-end justify-start w-[1.5256em] flex overflow-hidden"
          >
            <span ref={(el) => { if (el) lettersRef.current[3] = el }} className="temple__letter block relative">P</span>
            <span ref={(el) => { if (el) lettersRef.current[4] = el }} className="temple__letter block relative">L</span>
            <span ref={(el) => { if (el) lettersRef.current[5] = el }} className="temple__letter block relative">E</span>
          </div>
        </div>
      </div>
    </div>
  );
}

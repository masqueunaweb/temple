'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const QUOTES = [
  'Buenos días a los que dan ese último esfuerzo que lo cambia todo.',
  'Será más difícil de lo que crees, pero mejor de lo que puedas llegar a imaginarte.',
  'Si eres capaz de sobrepensar en lo malo, hazlo también en todas esas veces que sale bien.',
  'No se trata de hacerlo perfecto. Se trata de no parar.',
  'El arte de no estar listo y hacerlo de todos modos.',
  'El que trabaja cuando nadie mira.',
  '27.',
  'Al final acabamos donde tiene sentido quedarse.',
  'La constancia silenciosa es el ruido más fuerte.',
  'Lo que haces cuando nadie ve es lo que realmente eres.',
];

export default function InspirationQuote() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const quote = QUOTES[currentQuote];
    let index = 0;
    let direction = 1;

    const typeText = () => {
      if (direction === 1) {
        if (index < quote.length) {
          setDisplayText(quote.slice(0, index + 1));
          index++;
          setTimeout(typeText, 50);
        } else {
          direction = -1;
          setTimeout(typeText, 3000);
        }
      } else {
        if (index > 0) {
          setDisplayText(quote.slice(0, index - 1));
          index--;
          setTimeout(typeText, 30);
        } else {
          direction = 1;
          setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
          setTimeout(typeText, 500);
        }
      }
    };

    typeText();
  }, [currentQuote]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="py-12">
      <p
        ref={textRef}
        className="font-satoshi text-body text-temple-text-secondary text-center leading-relaxed"
      >
        {displayText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}

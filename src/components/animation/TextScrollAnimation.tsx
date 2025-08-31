import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextScrollAnimationProps {
  children: React.ReactNode;
  triggerClassName: string;
}

const TextScrollAnimation: React.FC<TextScrollAnimationProps> = ({ children, triggerClassName }) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 1023 && textRef.current) {
      const textElements = gsap.utils.toArray<HTMLElement>(`.${triggerClassName}`);
      textElements.forEach((text) => {
        gsap.to(text, {
          backgroundSize: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'center 100%',
            end: 'center 50%',
            scrub: true,
          },
        });
      });
    }
  }, [triggerClassName]);

  return <div ref={textRef}>{children}</div>;
};

export default TextScrollAnimation;

/* eslint-disable no-unused-vars */

import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

const SplitTextV2 = ({
    children,
    className = '',
    delay = 100,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = 'easeOutCubic',
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete,
}) => {
    const ref = useRef();
    const animatedCount = useRef(0);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    // Function to extract letters from JSX elements
    const extractLetters = (node) => {
        if (typeof node === 'string') {
            return node.split('');
        }
        if (Array.isArray(node)) {
            return node.flatMap(extractLetters);
        }
        if (typeof node === 'object' && node) {
            return [node]; // Preserve JSX elements (e.g., <strong>)
        }
        return [];
    };

    const elements = extractLetters(children);
    const letters = elements.filter((el) => typeof el === 'string').flat();

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing },
        }))
    );

    let letterIndex = 0;

    return (
        <span
            ref={ref}
            className={`split-parent ${className}`}
            style={{ textAlign, overflow: 'hidden', display: 'inline', whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
            {elements.map((el, i) => {
                if (typeof el === 'string') {
                    return el.split('').map((letter, j) => {
                        const index = letterIndex++;
                        return (
                            <animated.span
                                key={index}
                                style={{
                                    ...springs[index],
                                    display: 'inline-block',
                                    willChange: 'transform, opacity',
                                }}
                            >
                                {letter}
                            </animated.span>
                        );
                    });
                }
                return <span key={i} style={{ display: 'inline-block' }}>{el}</span>;
            })}
        </span>
    );
};

export default SplitTextV2;
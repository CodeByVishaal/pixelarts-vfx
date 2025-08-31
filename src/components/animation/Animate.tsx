import { ReactElement, cloneElement, useState, useEffect, useRef } from 'react';

interface AnimationProps {
    delay?: string;
    duration?: string;
    className?: string;
    children: ReactElement<{ style?: React.CSSProperties; className?: string; ref?: React.Ref<HTMLElement> }>;
}

const Animate: React.FC<AnimationProps> = ({ delay = '0s', duration = '1s', className, children }) => {
    const [isInView, setIsInView] = useState(false);
    const childRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (childRef.current) {
            observer.observe(childRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const style: React.CSSProperties = isInView ? {
        animationDelay: delay,
        animationDuration: duration,
        ...children.props.style,
    } : { ...children.props.style };

    const combinedClassName = [
        children.props.className,
        isInView ? className : ''
    ].filter(Boolean).join(' ');

    // Proper ref handling with TypeScript types
    const mergedRef = (node: HTMLElement | null) => {
        childRef.current = node;

        // Handle existing refs
        if (children.props.ref) {
            if (typeof children.props.ref === 'function') {
                children.props.ref(node);
            } else {
                (children.props.ref as React.MutableRefObject<HTMLElement | null>).current = node;
            }
        }
    };

    return cloneElement(children, {
        ...children.props,
        style,
        className: combinedClassName,
        ref: mergedRef as unknown as React.Ref<HTMLElement> // Type assertion for ref
    });
};

export default Animate;
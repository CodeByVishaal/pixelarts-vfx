import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

type LoaderProps = {
  /** Set to true when your app/data is ready. If omitted, the loader auto-waits for images + fonts. */
  isReady?: boolean;
  /** Called after the fade-out completes. */
  onComplete?: () => void;
  /** If true, also wait for fonts & images (default: true when isReady is undefined). */
  autoWait?: boolean;
};

const waitForImages = () => {
  const imgs = Array.from(document.images).filter((img) => !img.complete);
  if (imgs.length === 0) return Promise.resolve();
  return Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    )
  );
};

const waitForFonts = () => {
  // Some browsers may not support document.fonts
  const anyDoc = document as any;
  if (anyDoc.fonts && typeof anyDoc.fonts.ready?.then === "function") {
    return anyDoc.fonts.ready as Promise<void>;
  }
  return Promise.resolve();
};

const Loader: React.FC<LoaderProps> = ({ isReady, onComplete, autoWait }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Decide waiting strategy once
  const shouldAutoWait = useMemo(
    () => (typeof isReady === "boolean" ? false : autoWait ?? true),
    [isReady, autoWait]
  );

  // Animate IN immediately after mount
  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const text = textRef.current;
    if (!loader || !text) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const letters = Array.from(text.querySelectorAll<HTMLSpanElement>("span"));
    if (letters.length === 0) return;

    // initial state
    gsap.set(letters, { y: 100 });
    // Use a numeric CSS variable for reliable tweening
    letters.forEach((el) => el.style.setProperty("--reveal", "100%"));

    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    if (reduceMotion) {
      // Respect users who prefer less motion
      gsap.set(letters, { y: 0 });
      gsap.set(loader, { opacity: 1 });
      return; // We'll still handle OUT animation when ready
    }

    tl.to(letters, {
      duration: 0.6,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
    })
      // Animate the variable --reveal from 100% to 0% (used by ::before clip-path)
      .to(
        letters,
        {
          duration: 0.8,
          ease: "power1.inOut",
          // TS-friendly way to set CSS var with units
          onStart: () => {},
          onUpdate: function () {
            // interpolate based on progress and write to each span
            const p = this.progress();
            const value = `${(1 - p) * 100}%`;
            letters.forEach((el) => el.style.setProperty("--reveal", value));
          },
        },
        "<+=0.3"
      )
      .to(letters, {
        duration: 0.6,
        y: 100,
        stagger: 0.05,
        delay: 0.5,
        ease: "power2.in",
      });

    tl.play();

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  // Decide when to dismiss (animate OUT)
  useEffect(() => {
    let cancelled = false;

    const runOut = () => {
      if (cancelled) return;
      const loader = loaderRef.current;
      if (!loader) return;

      // If an IN timeline exists and is mid-flight, chain the fade-out after it.
      const chain =
        tlRef.current && tlRef.current.totalProgress() < 1
          ? tlRef.current
          : gsap.timeline();

      chain
        .to(loader, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .add(() => {
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
          onComplete?.();
        });
    };

    const go = async () => {
      if (typeof isReady === "boolean") {
        if (isReady) runOut();
        return;
      }
      if (shouldAutoWait) {
        await Promise.all([waitForFonts(), waitForImages()]);
        runOut();
      }
    };

    void go();

    return () => {
      cancelled = true;
    };
  }, [isReady, onComplete, shouldAutoWait]);

  return (
    <>
      <style>{`
        :root { color-scheme: dark; }
        body {
          font-family: "Oswald", "Bebas Neue", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          height: 100vh;
          margin: 0;
          background-color: #111;
          overflow: hidden;
        }
        .loader {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: #111;
          opacity: 1;
          z-index: 9999;
        }
        .text {
          display: flex;
          gap: 0.05em;
          font-size: 6.5rem;
          font-weight: 700;
          line-height: 1;
          position: relative;
          will-change: transform, opacity;
        }
        .text span {
          display: inline-block;
          position: relative;
          color: rgba(255, 255, 255, 0.2);
          transform: translateY(100px);
          /* numeric var that GSAP updates; default 100% (hidden) */
          --reveal: 100%;
        }
        .text span::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background-image: linear-gradient(45deg, #ff0000, #ff3333, #e30513, #cc0000);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          clip-path: inset(var(--reveal) 0 0 0);
          -webkit-clip-path: inset(var(--reveal) 0 0 0);
        }
        @media (max-width: 480px) { .text { font-size: 2.5rem; } }
        @media (min-width: 481px) and (max-width: 768px) { .text { font-size: 4rem; } }
        @media (min-width: 769px) and (max-width: 1024px) { .text { font-size: 5rem; } }
      `}</style>

      <div className="loader" ref={loaderRef}>
        <div className="text" ref={textRef}>
          <span data-text="P">P</span>
          <span data-text="I">I</span>
          <span data-text="X">X</span>
          <span data-text="E">E</span>
          <span data-text="L">L</span>
          <span data-text="A">A</span>
          <span data-text="R">R</span>
          <span data-text="T">T</span>
          <span data-text="S">S</span>
        </div>
      </div>
    </>
  );
};

export default Loader;


//import React from "react";

// const Preloader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
//   const handleVideoEnd = () => {
//     onFinish(); // only call after video finishes
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "black",
//         zIndex: 9999,
//       }}
//     >
//       <video
//         src="/assets/video/Loading Animation.mov"
//         autoPlay
//         muted
//         playsInline
//         onEnded={handleVideoEnd} // wait for full video
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "contain", // show full video
//         }}
//       />
//     </div>
//   );
// };

// export default Preloader;
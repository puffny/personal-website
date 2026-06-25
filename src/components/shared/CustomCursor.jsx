import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const canUseCursor = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!canUseCursor.matches) return undefined;

    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    let frameId = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let hasPointer = false;

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frameId = requestAnimationFrame(render);
    };

    const createRipple = (x, y) => {
      const ripple = document.createElement("span");
      ripple.className = "custom-cursor-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.pointerEvents = "none";
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
      document.body.appendChild(ripple);
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.toggle("custom-cursor--native", Boolean(event.target.closest(".selected-work-visual-link")));
      if (!hasPointer) {
        hasPointer = true;
        currentX = targetX;
        currentY = targetY;
        cursor.classList.add("custom-cursor--visible");
      }
    };

    const handlePointerDown = () => {
      cursor.classList.add("custom-cursor--pressed");
    };

    const handlePointerUp = (event) => {
      cursor.classList.remove("custom-cursor--pressed");
      createRipple(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.querySelectorAll(".custom-cursor-ripple").forEach((ripple) => ripple.remove());
    };
  }, []);

  return <span ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

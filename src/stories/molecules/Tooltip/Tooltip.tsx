import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useToggle } from "../../../hooks/useToggle.ts";
import { Button } from "../../atoms/button/Button.tsx";
import { createPortal } from "react-dom";

const ANIMATION_DURATION = 300;

type TooltipProps = {
  message: string;
};

export function Tooltip({ message }: TooltipProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timer);
    } else if (shouldRender) {
      setIsAnimating(false);
      const timer = setTimeout(
        () => setShouldRender(false),
        ANIMATION_DURATION
      );
      return () => clearTimeout(timer);
    }
  }, [shouldRender, isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <Button
        ref={parentRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={handleClose}
      >
        Tooltip
      </Button>
      {shouldRender &&
        createPortal(
          <TooltipComponent
            parentRef={parentRef}
            message={message}
            isAnimating={isAnimating}
          />,
          document.body
        )}
    </>
  );
}

type TooltipComponentProps = {
  message: string;
  isAnimating?: Boolean;
  parentRef: RefObject<HTMLButtonElement | null>;
};
export function TooltipComponent({
  message,
  isAnimating = false,
  parentRef,
}: TooltipComponentProps) {
  const childRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const positionTooltip = () => {
      if (!parentRef.current || !childRef.current) {
        return;
      }

      const parent = parentRef.current;
      const child = childRef.current;
      const parentRect = parent.getBoundingClientRect();

      let top = parentRect.bottom + 8;
      let left = parentRect.left;

      if (top + child.offsetHeight > window.innerHeight) {
        top = parentRect.top - child.offsetHeight - 8;
      }

      if (left + child.offsetWidth > window.innerWidth) {
        left = window.innerWidth - child.offsetWidth - 16;
      }

      if (left < 16) {
        left = 16;
      }

      child.style.top = `${top + window.scrollY}px`;
      child.style.left = `${left + window.scrollX}px`;
      child.style.minWidth = `${parent.offsetWidth}px`;
    };

    positionTooltip();
    window.addEventListener("resize", positionTooltip);

    return () => window.removeEventListener("resize", positionTooltip);
  }, [parentRef]);
  return (
    <div
      className="component"
      ref={childRef}
      style={{
        position: "absolute",
        background: "#2b2d32",
        borderRadius: "6px",
        width: "max-content",
        height: "max-content",
        padding: "0.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        maxHeight: "400px",
        maxWidth: "400px",
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Animation CSS
        opacity: isAnimating ? 1 : 0,
        transform: isAnimating
          ? "translateY(0) scale(1)"
          : "translateY(-10px) scale(0.95)",
        transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        transformOrigin: "top center",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "0.9rem",
          width: "100%",
          height: "100%",
        }}
      >
        {message}
      </div>
    </div>
  );
}

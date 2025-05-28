import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

const ANIMATION_DURATION = 300;

type TooltipProps = {
  message: string;
};

type TooltipInstance = {
  id: string;
  message: string;
  parentRef: RefObject<HTMLElement>;
  shouldRender: boolean;
  isAnimating: boolean;
};

type TooltipContextType = {
  showTooltip: (
    id: string,
    tooltip: TooltipProps,
    parentRef: RefObject<HTMLElement>
  ) => void;
  hideTooltip: (id: string) => void;
};

const TooltipContext = createContext<TooltipContextType>({
  showTooltip: () => {},
  hideTooltip: () => {},
});

export function TooltipContextProvider({ children }: PropsWithChildren) {
  const [tooltips, setTooltips] = useState<Map<string, TooltipInstance>>(
    new Map()
  );

  const showTooltip = useCallback(
    (id: string, tooltip: TooltipProps, parentRef: RefObject<HTMLElement>) => {
      setTooltips((prev) => {
        const newTooltips = new Map(prev);
        newTooltips.set(id, {
          id,
          message: tooltip.message,
          parentRef,
          shouldRender: true,
          isAnimating: false,
        });
        return newTooltips;
      });

      // Déclencher l'animation après le rendu
      setTimeout(() => {
        setTooltips((prev) => {
          const newTooltips = new Map(prev);
          const existing = newTooltips.get(id);
          if (existing) {
            newTooltips.set(id, { ...existing, isAnimating: true });
          }
          return newTooltips;
        });
      }, 50);
    },
    []
  );

  const hideTooltip = useCallback((id: string) => {
    setTooltips((prev) => {
      const newTooltips = new Map(prev);
      const existing = newTooltips.get(id);
      if (existing) {
        newTooltips.set(id, { ...existing, isAnimating: false });
      }
      return newTooltips;
    });

    // Supprimer du DOM après l'animation
    setTimeout(() => {
      setTooltips((prev) => {
        const newTooltips = new Map(prev);
        newTooltips.delete(id);
        return newTooltips;
      });
    }, ANIMATION_DURATION);
  }, []);

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {Array.from(tooltips.values()).map(
        (tooltip) =>
          tooltip.shouldRender && (
            <TooltipComponent
              key={tooltip.id}
              message={tooltip.message}
              parentRef={tooltip.parentRef}
              isAnimating={tooltip.isAnimating}
            />
          )
      )}
    </TooltipContext.Provider>
  );
}

export function useTooltip(ref: RefObject<HTMLElement>) {
  const { showTooltip, hideTooltip } = useContext(TooltipContext);
  const tooltipId = useRef(
    `tooltip-${Math.random().toString(36).substr(2, 9)}`
  );

  const show = useCallback(
    (tooltip: TooltipProps) => {
      showTooltip(tooltipId.current, tooltip, ref);
    },
    [showTooltip, ref]
  );

  const hide = useCallback(() => {
    hideTooltip(tooltipId.current);
  }, [hideTooltip]);

  // Gérer les événements mouse sur l'élément référencé
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      // Ne rien faire ici, on laisse le composant gérer via onMouseMove
    };

    const handleMouseLeave = () => {
      hide();
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      hide(); // Nettoyer le tooltip si le composant se démonte
    };
  }, [ref, hide]);

  return { show, hide };
}

type TooltipComponentProps = {
  message: string;
  parentRef: RefObject<HTMLElement>;
  isAnimating: boolean;
};

function TooltipComponent({
  message,
  parentRef,
  isAnimating,
}: TooltipComponentProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const positionTooltip = () => {
      if (!parentRef.current || !tooltipRef.current) {
        return;
      }

      const parent = parentRef.current;
      const tooltip = tooltipRef.current;
      const parentRect = parent.getBoundingClientRect();

      let top = parentRect.bottom + 8;
      let left = parentRect.left;

      if (top + tooltip.offsetHeight > window.innerHeight) {
        top = parentRect.top - tooltip.offsetHeight - 8;
      }

      if (left + tooltip.offsetWidth > window.innerWidth) {
        left = window.innerWidth - tooltip.offsetWidth - 16;
      }

      if (left < 16) {
        left = 16;
      }

      tooltip.style.top = `${top + window.scrollY}px`;
      tooltip.style.left = `${left + window.scrollX}px`;
    };

    positionTooltip();
    window.addEventListener("resize", positionTooltip);
    window.addEventListener("scroll", positionTooltip);

    return () => {
      window.removeEventListener("resize", positionTooltip);
      window.removeEventListener("scroll", positionTooltip);
    };
  }, [parentRef]);

  return createPortal(
    <div
      ref={tooltipRef}
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
        pointerEvents: "none", // Empêche les interactions avec le tooltip
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
    </div>,
    document.body
  );
}

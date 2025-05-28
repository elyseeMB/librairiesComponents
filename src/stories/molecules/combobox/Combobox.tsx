import styles from "./Combobox.module.css";
import { Button, Icon } from "../../index.ts";
import { classNames } from "../../../utils/dom.ts";
import { useToggle } from "../../../hooks/useToggle.ts";
import { createPortal } from "react-dom";
import { useEffect, useRef, useCallback, useState, useId } from "react";
import { useTooltip } from "../Tooltip/TooltipContext.tsx";

const options = [
  { id: "1", name: "React" },
  { id: "2", name: "Vue" },
  { id: "3", name: "Angular" },
];

const ANIMATION_DURATION = 300; // ms

export function Combobox({ info }: { info?: string }) {
  const [isOpen, toggleOpen, closeCombobox] = useToggle(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const comboboxId = useId();
  const { show } = useTooltip(buttonRef);

  // Gérer les transitions d'animation
  useEffect(() => {
    if (isOpen) {
      // Ouverture : ajouter au DOM puis animer
      setShouldRender(true);
      // Petit délai pour que l'élément soit dans le DOM
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else if (shouldRender) {
      // Fermeture : animer puis retirer du DOM
      setIsAnimating(false);
      const timer = setTimeout(
        () => setShouldRender(false),
        ANIMATION_DURATION
      );
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  const handleClose = useCallback(() => {
    closeCombobox();
  }, [closeCombobox]);

  const handleSelect = useCallback(
    (option: (typeof options)[0]) => {
      setSelectedOption(option.name);
      handleClose();
      buttonRef.current?.focus();
    },
    [handleClose]
  );

  // Fermeture au clic extérieur et Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleTooltip = useCallback(() => {
    if (!info) {
      return;
    }
    show({
      message: info,
    });
  }, [show, info]);

  return (
    <>
      <Button
        ref={buttonRef}
        className={classNames(styles.Combobox)}
        variant="neutre"
        onClick={toggleOpen}
        onMouseEnter={handleTooltip}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? `${comboboxId}-listbox` : undefined}
      >
        <span>{selectedOption || "Select framework..."}</span>
        <Icon name="ExpandUpDownLine" />
      </Button>

      {shouldRender &&
        createPortal(
          <DropdownList
            id={`${comboboxId}-listbox`}
            parentRef={buttonRef}
            options={options}
            onSelect={handleSelect}
            onClose={handleClose}
            isAnimating={isAnimating}
          />,
          document.body
        )}
    </>
  );
}

interface DropdownListProps {
  id: string;
  parentRef: React.RefObject<HTMLButtonElement | null>;
  options: typeof options;
  onSelect: (option: (typeof options)[0]) => void;
  onClose: () => void;
  isAnimating: boolean;
}

function DropdownList({
  id,
  parentRef,
  options,
  onSelect,
  onClose,
  isAnimating,
}: DropdownListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current || !listRef.current) return;

    const positionList = () => {
      const parent = parentRef.current;
      const list = listRef.current;

      if (!parent || !list) return;

      const parentRect = parent.getBoundingClientRect();

      // Position par défaut : sous le bouton
      let top = parentRect.bottom + 4;
      let left = parentRect.left;

      // Vérifier si ça dépasse en bas
      if (top + list.offsetHeight > window.innerHeight) {
        top = parentRect.top - list.offsetHeight - 4;
      }

      if (left + list.offsetWidth > window.innerWidth) {
        left = window.innerWidth - list.offsetWidth - 8;
      }

      if (left < 8) {
        left = 8;
      }

      list.style.top = `${top + window.scrollY}px`;
      list.style.left = `${left + window.scrollX}px`;
      list.style.minWidth = `${parent.offsetWidth}px`;
    };

    positionList();

    window.addEventListener("resize", positionList);
    window.addEventListener("scroll", positionList);

    return () => {
      window.removeEventListener("resize", positionList);
      window.removeEventListener("scroll", positionList);
    };
  }, [parentRef]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = document.activeElement
      ? Array.from(listRef.current?.children || []).indexOf(
          document.activeElement as Element
        )
      : -1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, options.length - 1);
        (listRef.current?.children[nextIndex] as HTMLElement)?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        (listRef.current?.children[prevIndex] as HTMLElement)?.focus();
        break;
      case "Enter":
        event.preventDefault();
        if (currentIndex >= 0) {
          onSelect(options[currentIndex]);
        }
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  return (
    <div
      ref={listRef}
      id={id}
      role="listbox"
      onKeyDown={handleKeyDown}
      style={{
        position: "absolute",
        background: "#2b2d32",
        border: "1px solid #444",
        borderRadius: "4px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        maxHeight: "200px",
        overflowY: "auto",
        // Animation CSS
        opacity: isAnimating ? 1 : 0,
        transform: isAnimating
          ? "translateY(0) scale(1)"
          : "translateY(-10px) scale(0.95)",
        transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        transformOrigin: "top center",
      }}
    >
      {options.map((option, index) => (
        <div
          key={option.id}
          role="option"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation(); // Empêche la propagation
            e.preventDefault(); // Empêche les comportements par défaut
            onSelect(option);
          }}
          onMouseDown={(e) => {
            e.stopPropagation(); // Aussi sur mouseDown pour être sûr
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onSelect(option);
            }
          }}
          style={{
            padding: "8px 12px",
            color: "white",
            cursor: "pointer",
            borderBottom:
              index < options.length - 1 ? "1px solid #444" : "none",
            transition: "background-color 0.15s ease",
            userSelect: "none", // Empêche la sélection de texte
          }}
          onMouseEnter={(e) => {
            e.currentTarget.focus();
            e.currentTarget.style.backgroundColor = "#3a3d42";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
}

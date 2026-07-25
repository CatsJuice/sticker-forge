"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HexColorInput, HexColorPicker } from "react-colorful";

type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className: string;
  swatchClassName: string;
  swatchPosition?: "start" | "end";
  children?: ReactNode;
  onTriggerMouseDown?: MouseEventHandler<HTMLButtonElement>;
};

export function ColorPicker({
  value,
  onChange,
  label,
  className,
  swatchClassName,
  swatchPosition = "end",
  children,
  onTriggerMouseDown,
}: ColorPickerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const swatch = (
    <span
      className={swatchClassName}
      style={{ background: value }}
      aria-hidden="true"
    />
  );

  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    const updatePosition = () => {
      const bounds = trigger.getBoundingClientRect();
      const width = 240;
      const height = 258;
      const gap = 8;
      const left = Math.min(
        window.innerWidth - width - 12,
        Math.max(12, bounds.right - width),
      );
      const top =
        bounds.bottom + gap + height <= window.innerHeight
          ? bounds.bottom + gap
          : Math.max(12, bounds.top - height - gap);
      setPosition({ left, top });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className={className}
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={label}
        onMouseDown={onTriggerMouseDown}
        onClick={() => setOpen((current) => !current)}
      >
        {swatchPosition === "start" ? swatch : null}
        {children}
        {swatchPosition === "end" ? swatch : null}
      </button>
      {open
        ? createPortal(
            <div
              ref={popoverRef}
              className="app-color-picker-popover"
              role="dialog"
              aria-label={label}
              style={position}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <HexColorPicker
                className="app-color-picker-wheel"
                color={value}
                onChange={onChange}
              />
              <label className="app-color-picker-input-row">
                <span>HEX</span>
                <HexColorInput
                  color={value}
                  onChange={onChange}
                  prefixed
                  aria-label={`${label} HEX`}
                />
                <span
                  className="app-color-picker-input-swatch"
                  style={{ background: value }}
                  aria-hidden="true"
                />
              </label>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

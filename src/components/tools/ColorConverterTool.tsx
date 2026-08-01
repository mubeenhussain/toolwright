"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const lightness = (max + min) / 2;
  if (max === min) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) };
  }
  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;
  switch (max) {
    case rn:
      hue = (gn - bn) / delta + (gn < bn ? 6 : 0);
      break;
    case gn:
      hue = (bn - rn) / delta + 2;
      break;
    default:
      hue = (rn - gn) / delta + 4;
  }
  return {
    h: Math.round(hue * 60),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  const sat = s / 100;
  const light = l / 100;
  const chroma = (1 - Math.abs(2 * light - 1)) * sat;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - chroma / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [chroma, x, 0];
  else if (h < 120) [r, g, b] = [x, chroma, 0];
  else if (h < 180) [r, g, b] = [0, chroma, x];
  else if (h < 240) [r, g, b] = [0, x, chroma];
  else if (h < 300) [r, g, b] = [x, 0, chroma];
  else [r, g, b] = [chroma, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function ColorConverterTool() {
  const [hex, setHex] = useState("#1d4ed8");
  const [r, setR] = useState(29);
  const [g, setG] = useState(78);
  const [b, setB] = useState(216);
  const [h, setH] = useState(224);
  const [s, setS] = useState(76);
  const [l, setL] = useState(48);

  const cssSnippet = useMemo(
    () =>
      [
        `/* HEX */`,
        `color: ${hex};`,
        ``,
        `/* RGB */`,
        `color: rgb(${r}, ${g}, ${b});`,
        ``,
        `/* HSL */`,
        `color: hsl(${h}, ${s}%, ${l}%);`,
      ].join("\n"),
    [hex, r, g, b, h, s, l],
  );

  function applyRgb(nextR: number, nextG: number, nextB: number) {
    const nextHex = rgbToHex(nextR, nextG, nextB);
    const nextHsl = rgbToHsl(nextR, nextG, nextB);
    setR(nextR);
    setG(nextG);
    setB(nextB);
    setHex(nextHex);
    setH(nextHsl.h);
    setS(nextHsl.s);
    setL(nextHsl.l);
  }

  function onHexChange(value: string) {
    setHex(value);
    const rgb = hexToRgb(value);
    if (!rgb) return;
    applyRgb(rgb.r, rgb.g, rgb.b);
  }

  function onHslChange(nextH: number, nextS: number, nextL: number) {
    const rgb = hslToRgb(nextH, nextS, nextL);
    setH(nextH);
    setS(nextS);
    setL(nextL);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <div
          className="h-40 rounded border border-line"
          style={{ background: hexToRgb(hex) ? hex : "#cccccc" }}
          aria-hidden
        />
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            HEX
          </span>
          <input
            className="field font-mono"
            value={hex}
            onChange={(event) => onHexChange(event.target.value)}
            aria-label="HEX color"
          />
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              ["R", r, (value: number) => applyRgb(value, g, b)],
              ["G", g, (value: number) => applyRgb(r, value, b)],
              ["B", b, (value: number) => applyRgb(r, g, value)],
            ] as const
          ).map(([label, value, setter]) => (
            <label key={label} className="block">
              <span className="mb-2 block text-sm font-semibold text-ink-muted">
                {label}
              </span>
              <input
                className="field"
                type="number"
                min={0}
                max={255}
                value={value}
                onChange={(event) =>
                  setter(clamp(Number(event.target.value) || 0, 0, 255))
                }
              />
            </label>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              ["H", h, 360, (value: number) => onHslChange(value, s, l)],
              ["S", s, 100, (value: number) => onHslChange(h, value, l)],
              ["L", l, 100, (value: number) => onHslChange(h, s, value)],
            ] as const
          ).map(([label, value, max, setter]) => (
            <label key={label} className="block">
              <span className="mb-2 block text-sm font-semibold text-ink-muted">
                {label}
              </span>
              <input
                className="field"
                type="number"
                min={0}
                max={max}
                value={value}
                onChange={(event) =>
                  setter(clamp(Number(event.target.value) || 0, 0, max))
                }
              />
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-ink-muted">CSS values</span>
          <CopyButton value={cssSnippet} />
        </div>
        <textarea
          className="field textarea min-h-80"
          value={cssSnippet}
          readOnly
          aria-label="CSS color values"
        />
      </div>
    </div>
  );
}

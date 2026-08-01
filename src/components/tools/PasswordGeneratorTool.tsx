"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

function secureRandomIndex(max: number) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword(
  length: number,
  options: { lower: boolean; upper: boolean; numbers: boolean; symbols: boolean },
) {
  let alphabet = "";
  if (options.lower) alphabet += LOWER;
  if (options.upper) alphabet += UPPER;
  if (options.numbers) alphabet += NUMBERS;
  if (options.symbols) alphabet += SYMBOLS;
  if (!alphabet) return "";

  return Array.from({ length }, () => alphabet[secureRandomIndex(alphabet.length)]).join(
    "",
  );
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(20);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState(() =>
    generatePassword(20, {
      lower: true,
      upper: true,
      numbers: true,
      symbols: true,
    }),
  );

  function regenerate() {
    setPassword(generatePassword(length, { lower, upper, numbers, symbols }));
  }

  return (
    <div className="space-y-6">
      <div className="tool-panel px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
          Generated password
        </p>
        <p className="mt-3 break-all font-mono text-xl font-semibold tracking-wide text-ink sm:text-2xl">
          {password || "Select at least one character set"}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={regenerate}>
            Generate
          </button>
          <CopyButton value={password} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-2 flex items-center justify-between text-sm font-semibold text-ink-muted">
            Length
            <span className="font-display text-lg text-ink">{length}</span>
          </span>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="w-full accent-[var(--accent)]"
            aria-label="Password length"
          />
        </label>
        {(
          [
            ["Lowercase (a-z)", lower, setLower],
            ["Uppercase (A-Z)", upper, setUpper],
            ["Numbers (0-9)", numbers, setNumbers],
            ["Symbols (!@#…)", symbols, setSymbols],
          ] as const
        ).map(([label, value, setter]) => (
          <label
            key={label}
            className="flex cursor-pointer items-center gap-3 rounded border border-line bg-white px-4 py-3"
          >
            <input
              type="checkbox"
              checked={value}
              onChange={(event) => setter(event.target.checked)}
              className="size-4 accent-[var(--accent)]"
            />
            <span className="text-sm font-medium text-ink">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

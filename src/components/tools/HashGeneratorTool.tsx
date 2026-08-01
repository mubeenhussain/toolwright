"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const algorithms = ["SHA-256", "SHA-384", "SHA-512"] as const;

async function digest(algorithm: (typeof algorithms)[number], text: string) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] =
    useState<(typeof algorithms)[number]>("SHA-256");
  const [hash, setHash] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!input) {
        setHash("");
        return;
      }
      const value = await digest(algorithm, input);
      if (!cancelled) setHash(value);
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [input, algorithm]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {algorithms.map((item) => (
          <button
            key={item}
            type="button"
            className={`btn ${algorithm === item ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setAlgorithm(item)}
          >
            {item}
          </button>
        ))}
        <CopyButton value={hash} />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink-muted">
          Input text
        </span>
        <textarea
          className="field textarea"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Text to hash…"
          aria-label="Text to hash"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink-muted">
          {algorithm} hash
        </span>
        <textarea
          className="field textarea min-h-32"
          value={hash}
          readOnly
          aria-label="Hash output"
        />
      </label>
    </div>
  );
}

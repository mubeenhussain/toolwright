"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function encode() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError(null);
    } catch {
      setError("Unable to encode this text.");
      setOutput("");
    }
  }

  function decode() {
    try {
      const decoded = decodeURIComponent(escape(atob(input.trim())));
      setOutput(decoded);
      setError(null);
    } catch {
      setError("Invalid Base64 string.");
      setOutput("");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={encode}>
          Encode
        </button>
        <button type="button" className="btn btn-secondary" onClick={decode}>
          Decode
        </button>
        <CopyButton value={output} />
      </div>
      {error ? (
        <p className="rounded border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}
      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            Input
          </span>
          <textarea
            className="field textarea"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Text or Base64…"
            aria-label="Base64 input"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            Output
          </span>
          <textarea
            className="field textarea"
            value={output}
            readOnly
            aria-label="Base64 output"
          />
        </label>
      </div>
    </div>
  );
}

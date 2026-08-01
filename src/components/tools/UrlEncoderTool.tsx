"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function encode() {
    try {
      setOutput(encodeURIComponent(input));
      setError(null);
    } catch {
      setError("Unable to encode this value.");
      setOutput("");
    }
  }

  function decode() {
    try {
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch {
      setError("Invalid URL-encoded string.");
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
            placeholder="hello world & more"
            aria-label="URL encode input"
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
            aria-label="URL encode output"
          />
        </label>
      </div>
    </div>
  );
}

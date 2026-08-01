"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function format(minify = false) {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={() => format(false)}>
          Beautify
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => format(true)}>
          Minify
        </button>
        <CopyButton value={output} />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setInput("");
            setOutput("");
            setError(null);
          }}
        >
          Clear
        </button>
      </div>
      {error ? (
        <p className="rounded border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}
      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            Input JSON
          </span>
          <textarea
            className="field textarea min-h-80"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder='{"hello":"world"}'
            aria-label="JSON input"
            spellCheck={false}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            Output
          </span>
          <textarea
            className="field textarea min-h-80"
            value={output}
            readOnly
            aria-label="Formatted JSON output"
            spellCheck={false}
          />
        </label>
      </div>
    </div>
  );
}

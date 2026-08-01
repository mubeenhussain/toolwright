"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function createUuid() {
  return crypto.randomUUID();
}

export function UuidGeneratorTool() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState(() => [createUuid()]);

  function regenerate() {
    const nextCount = Math.min(Math.max(count, 1), 100);
    setUuids(Array.from({ length: nextCount }, () => createUuid()));
  }

  const output = uuids.join("\n");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            How many
          </span>
          <input
            className="field w-28"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(event) => setCount(Number(event.target.value) || 1)}
          />
        </label>
        <button type="button" className="btn btn-primary" onClick={regenerate}>
          Generate UUID v4
        </button>
        <CopyButton value={output} label="Copy all" />
      </div>
      <textarea
        className="field textarea min-h-72"
        value={output}
        readOnly
        aria-label="Generated UUIDs"
      />
    </div>
  );
}

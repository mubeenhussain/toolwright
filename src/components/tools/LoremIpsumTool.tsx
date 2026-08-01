"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

function sentence(wordCount: number) {
  const words = Array.from({ length: wordCount }, (_, index) => {
    const word = WORDS[(index * 7 + wordCount * 3) % WORDS.length];
    return index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  });
  return `${words.join(" ")}.`;
}

function generate(mode: "paragraphs" | "sentences" | "words", count: number) {
  if (mode === "words") {
    return Array.from({ length: count }, (_, index) => WORDS[index % WORDS.length]).join(
      " ",
    );
  }
  if (mode === "sentences") {
    return Array.from({ length: count }, (_, index) =>
      sentence(8 + ((index * 3) % 6)),
    ).join(" ");
  }
  return Array.from({ length: count }, (_, index) => {
    const sentences = 3 + (index % 3);
    return Array.from({ length: sentences }, (__, sIndex) =>
      sentence(8 + ((sIndex + index) % 7)),
    ).join(" ");
  }).join("\n\n");
}

export function LoremIpsumTool() {
  const [mode, setMode] = useState<"paragraphs" | "sentences" | "words">(
    "paragraphs",
  );
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState(0);

  const output = useMemo(
    () => generate(mode, Math.min(Math.max(count, 1), 50)),
    [mode, count, seed],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            Type
          </span>
          <select
            className="field"
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as "paragraphs" | "sentences" | "words")
            }
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            Count
          </span>
          <input
            className="field w-28"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(event) => setCount(Number(event.target.value) || 1)}
          />
        </label>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setSeed((value) => value + 1)}
        >
          Regenerate
        </button>
        <CopyButton value={output} />
      </div>
      <textarea
        className="field textarea min-h-72"
        value={output}
        readOnly
        aria-label="Generated lorem ipsum"
      />
    </div>
  );
}

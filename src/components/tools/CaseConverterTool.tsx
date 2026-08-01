"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const smallWords = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "the",
  "to",
  "up",
  "yet",
]);

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (!word) return word;
      if (index > 0 && smallWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function toSentenceCase(value: string) {
  const lower = value.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
}

function toCamelCase(value: string) {
  const parts = value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/);
  if (parts.length === 0 || parts[0] === "") return "";
  return parts
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join("");
}

function toPascalCase(value: string) {
  const camel = toCamelCase(value);
  return camel ? camel.charAt(0).toUpperCase() + camel.slice(1) : "";
}

function toSnakeCase(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.toLowerCase())
    .join("_");
}

function toKebabCase(value: string) {
  return toSnakeCase(value).replace(/_/g, "-");
}

const modes = [
  { id: "upper", label: "UPPERCASE", transform: (v: string) => v.toUpperCase() },
  { id: "lower", label: "lowercase", transform: (v: string) => v.toLowerCase() },
  { id: "title", label: "Title Case", transform: toTitleCase },
  { id: "sentence", label: "Sentence case", transform: toSentenceCase },
  { id: "camel", label: "camelCase", transform: toCamelCase },
  { id: "pascal", label: "PascalCase", transform: toPascalCase },
  { id: "snake", label: "snake_case", transform: toSnakeCase },
  { id: "kebab", label: "kebab-case", transform: toKebabCase },
] as const;

export function CaseConverterTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>("title");

  const output = useMemo(() => {
    const selected = modes.find((item) => item.id === mode)!;
    return selected.transform(text);
  }, [text, mode]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`btn ${mode === item.id ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setMode(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink-muted">
            Input
          </span>
          <textarea
            className="field textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type text to convert…"
            aria-label="Text to convert"
          />
        </label>
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-ink-muted">Output</span>
            <CopyButton value={output} />
          </div>
          <textarea
            className="field textarea"
            value={output}
            readOnly
            aria-label="Converted text"
          />
        </div>
      </div>
    </div>
  );
}

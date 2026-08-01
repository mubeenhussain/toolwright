"use client";

import { useMemo, useState } from "react";

function countStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((part) => part.trim().length > 0).length
    : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n+/).filter((part) => part.trim().length > 0).length
    : 0;
  const readingMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingMinutes,
  };
}

export function WordCounterTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countStats(text), [text]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink-muted">
          Your text
        </span>
        <textarea
          className="field textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste or type text to count words, characters, sentences, and reading time…"
          aria-label="Text to count"
        />
      </label>
      <div className="tool-panel px-5 py-2">
        <dl>
          <div className="stat">
            <dt className="stat-label">Words</dt>
            <dd className="stat-value">{stats.words.toLocaleString()}</dd>
          </div>
          <div className="stat">
            <dt className="stat-label">Characters</dt>
            <dd className="stat-value">{stats.characters.toLocaleString()}</dd>
          </div>
          <div className="stat">
            <dt className="stat-label">Characters (no spaces)</dt>
            <dd className="stat-value">
              {stats.charactersNoSpaces.toLocaleString()}
            </dd>
          </div>
          <div className="stat">
            <dt className="stat-label">Sentences</dt>
            <dd className="stat-value">{stats.sentences.toLocaleString()}</dd>
          </div>
          <div className="stat">
            <dt className="stat-label">Paragraphs</dt>
            <dd className="stat-value">{stats.paragraphs.toLocaleString()}</dd>
          </div>
          <div className="stat">
            <dt className="stat-label">Reading time</dt>
            <dd className="stat-value">
              {stats.words === 0 ? "0 min" : `${stats.readingMinutes} min`}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

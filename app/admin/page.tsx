"use client";

import { useState } from "react";

const categories = [
  "AI Tools",
  "How-To",
  "Comparisons",
  "Prompts",
  "Productivity",
  "Reviews",
  "Deals",
];

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("AI Tools");
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handlePublish = async () => {
    setMessage(null);

    if (!title || !content) {
      setMessage("Please add a title and content.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content }),
      });

      const data = await res.json();
      console.log("Publish response", res.status, data);

      if (!res.ok) {
        setMessage(data.error || "Failed to publish.");
      } else {
        setMessage(`✅ Published! View: /posts/${data.slug}`);
        setTitle("");
        setContent("");
      }
    } catch (err) {
      console.error("Publish error", err);
      setMessage("Network error — could not publish.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="wrapper py-10 space-y-8">
      <h1 className="text-2xl font-semibold mb-2">ToolsTide Admin</h1>
      <p className="text-sm text-slate-400 mb-6">
        Fill in the details, preview, and click Publish to send your article live.
      </p>

      <div className="p-6 space-y-4 bg-slate-900/80 border border-slate-800 rounded-xl">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Title</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Category</label>
          <select
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">
            Content (HTML or markdown)
          </label>
          <textarea
            className="w-full min-h-[200px] rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
          >
            Preview
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>

          {message && (
            <p className="text-xs text-slate-300 ml-3">{message}</p>
          )}
        </div>
      </div>

      {/* Preview */}
      {previewOpen && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-[11px] text-slate-400">
                {category.toUpperCase()} — PREVIEW
              </div>
              <h2 className="text-2xl font-semibold">
                {title || "Untitled"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Close
            </button>
          </div>

          <div
            className="text-sm text-slate-200"
            dangerouslySetInnerHTML={{
              __html:
                content.trim() ||
                "<p class='text-slate-500'>Start writing to see preview…</p>",
            }}
          />
        </div>
      )}
    </div>
  );
}

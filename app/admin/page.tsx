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
      setMessage("Please add at least a title and content.");
      return;
    }

    setSaving(true);

    // Simple slug: lowercase, hyphens, no special chars
    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `untitled-${Date.now()}`;

    const date = new Date().toISOString().slice(0, 10);
    const excerpt =
      content.replace(/<[^>]+>/g, "").slice(0, 180) + "...";

    const postObject = {
      slug,
      title,
      excerpt,
      content,
      date,
      category,
    };

    const json = JSON.stringify(postObject, null, 2);

    try {
      await navigator.clipboard.writeText(json);
      setMessage(
        "Post JSON copied to clipboard. Paste it into lib/api.ts inside the posts array."
      );
      console.log("Post JSON:", json);
    } catch (err) {
      console.log("Post JSON (copy manually):", json);
      setMessage(
        "Couldn't access clipboard. Open console, copy the JSON, and paste it into lib/api.ts."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="wrapper py-10 space-y-8">
      <h1 className="text-2xl font-semibold mb-2">ToolsTide Admin</h1>
      <p className="text-sm text-slate-400 mb-6">
        Create a new article by filling in the fields below. Preview shows how
        it will look before you publish.
      </p>

      {/* FORM */}
      <div className="card p-6 space-y-4 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Title</label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Gemini vs ChatGPT: Which is better for daily work?"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">
            Category
          </label>
          <select
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-400"
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

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">
            Content (HTML or markdown for now)
          </label>
          <textarea
            className="w-full min-h-[160px] rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article content here..."
          />
        </div>

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
            {saving ? "Generating..." : "Publish JSON"}
          </button>

          {message && (
            <p className="text-xs text-slate-300 ml-3">{message}</p>
          )}
        </div>
      </div>

      {/* PREVIEW */}
      {previewOpen && (
        <div className="card p-6 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="article-meta text-[11px]">
                {category.toUpperCase()} · PREVIEW
              </div>
              <h2 className="article-title text-2xl">
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
            className="article-body text-sm"
            dangerouslySetInnerHTML={{
              __html:
                content.trim() || "<p>Start writing to see a preview here…</p>",
            }}
          />
        </div>
      )}
    </div>
  );
}

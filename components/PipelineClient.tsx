"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { PipelineResponse, PipelineStage } from "../lib/types";

const DEFAULT_SCRIPT = `Welcome To The AI-First YouTube Automation Pipeline.
In the next two minutes you'll see how we turn this script into a finished
video, complete with voiceover, visuals, music, SEO, and a scheduled upload.`;

const STATIC_STAGES: PipelineStage[] = [
  {
    key: "script_analysis",
    title: "Analyze script context",
    status: "idle",
    summary: "Understand tone, topics, and hook to map the rest of the workflow."
  },
  {
    key: "voiceover",
    title: "Synthesize AI voiceover",
    status: "idle",
    summary: "Select a neural narrator and convert the script to studio audio."
  },
  {
    key: "visuals",
    title: "Plan visual storyboard",
    status: "idle",
    summary: "Match each beat with stock footage, b-roll, and motion graphics."
  },
  {
    key: "music",
    title: "Select background music",
    status: "idle",
    summary: "Generate or source a soundtrack aligned to pacing and mood."
  },
  {
    key: "subtitle_generation",
    title: "Generate subtitles",
    status: "idle",
    summary: "Auto-caption the voiceover with multilingual support."
  },
  {
    key: "thumbnail",
    title: "Craft thumbnail",
    status: "idle",
    summary: "Design a high-CTR thumbnail prompt and render."
  },
  {
    key: "seo",
    title: "Optimize SEO metadata",
    status: "idle",
    summary: "Create a title, description, and tags ready for upload."
  },
  {
    key: "assembly",
    title: "Assemble final video",
    status: "idle",
    summary: "Timeline voiceover, visuals, captions, and audio bed."
  },
  {
    key: "upload",
    title: "Upload to YouTube",
    status: "idle",
    summary: "Publish immediately or schedule via the YouTube Data API."
  }
];

interface StageDisplayProps {
  stage: PipelineStage;
  index: number;
}

const StageDisplay = ({ stage, index }: StageDisplayProps) => {
  const statusColor = stage.status === "completed" ? "bg-emerald-500/20" : stage.status === "running" ? "bg-brand-500/20" : stage.status === "failed" ? "bg-red-500/20" : "bg-slate-800/60";
  const dotColor = stage.status === "completed" ? "bg-emerald-400" : stage.status === "running" ? "bg-brand-400 animate-pulse" : stage.status === "failed" ? "bg-red-500" : "bg-slate-600";

  return (
    <motion.div
      key={stage.key}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-white/5",
        "p-4 sm:p-6 backdrop-blur bg-slate-900/60",
        statusColor
      )}
    >
      <div className="flex items-start gap-4">
        <span className={clsx("mt-1 h-3 w-3 shrink-0 rounded-full", dotColor)} />
        <div className="space-y-2">
          <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Step {index + 1}
          </div>
          <h3 className="text-lg font-semibold text-slate-50">{stage.title}</h3>
          <p className="text-sm text-slate-300/80 leading-relaxed">
            {stage.summary ?? "Pending..."}
          </p>
          {stage.error && (
            <p className="text-sm text-red-400">{stage.error}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function PipelineClient() {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [projectName, setProjectName] = useState("AI Tube Automation");
  const [voiceProfile, setVoiceProfile] = useState("21m00Tcm4TlvDq8ikWAM");
  const [autoUploadEnabled, setAutoUploadEnabled] = useState(false);
  const [scheduleAt, setScheduleAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PipelineResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runPipeline = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          projectName,
          voiceProfile,
          targetLanguage: "en-US",
          autoUploadEnabled,
          scheduleAt
        })
      });

      if (!res.ok) {
        const data = (await res.json()) as { message?: string; error?: string };
        throw new Error(data.message ?? data.error ?? "Workflow failed");
      }

      const data = (await res.json()) as PipelineResponse;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [script, projectName, voiceProfile, autoUploadEnabled, scheduleAt]);

  const downloadLinks = useMemo(() => {
    if (!result) return [];
    return [
      {
        label: "Assembled Video",
        href: result.assets.videoUrl
      },
      {
        label: "Voiceover",
        href: result.assets.voiceoverUrl
      },
      {
        label: "Subtitles (.vtt)",
        href: result.assets.subtitlesUrl
      },
      {
        label: "Thumbnail",
        href: result.assets.thumbnailUrl
      }
    ].filter((item) => Boolean(item.href));
  }, [result]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-10">
      <section className="grid gap-6 rounded-3xl border border-white/5 bg-slate-950/70 p-6 shadow-2xl backdrop-blur sm:grid-cols-[1.3fr_1fr] sm:gap-10 sm:p-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Fully Automated YouTube Production Agent
            </h1>
            <p className="mt-3 max-w-xl text-base text-slate-300">
              Convert a raw script into a publish-ready YouTube video with AI voiceover, visuals, subtitles, SEO, and optional auto-upload. Provide your script and let the pipeline orchestrate the rest.
            </p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Project Name
            </span>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="Automation Series Episode 1"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Script
            </span>
            <textarea
              className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm leading-relaxed text-slate-100 outline-none transition focus:border-brand-400"
              value={script}
              onChange={(event) => setScript(event.target.value)}
              placeholder="Paste your YouTube script here..."
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Voice Profile
              </span>
              <input
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400"
                value={voiceProfile}
                onChange={(event) => setVoiceProfile(event.target.value)}
                placeholder="Voice ID or preset"
              />
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={autoUploadEnabled}
                onChange={(event) => setAutoUploadEnabled(event.target.checked)}
                className="h-4 w-4 rounded border border-white/30 bg-slate-950 text-brand-400"
              />
              <span className="font-medium">Auto-upload to YouTube (requires credentials)</span>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Schedule (optional)
              </span>
              <input
                type="datetime-local"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400"
                value={scheduleAt ?? ""}
                onChange={(event) => setScheduleAt(event.target.value || null)}
                disabled={!autoUploadEnabled}
              />
            </label>
          </div>

          <button
            onClick={runPipeline}
            disabled={loading}
            className={clsx(
              "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition",
              loading ? "bg-brand-500/40" : "bg-brand-500 hover:bg-brand-400",
              "shadow-lg shadow-brand-500/30"
            )}
          >
            {loading ? "Executing Pipeline..." : "Run Automation"}
          </button>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
        </div>

        <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Delivery Package</h2>
            <p className="mt-2 text-sm text-slate-300">
              Download assets generated by the pipeline or copy SEO metadata for the upload console.
            </p>
          </div>

          {result ? (
            <div className="space-y-5 text-sm text-slate-200">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Assets
                </h3>
                <ul className="space-y-2">
                  {downloadLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/60 px-3 py-2 text-xs uppercase tracking-wide text-brand-200 transition hover:border-brand-300 hover:text-brand-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  SEO Metadata
                </h3>
                <div className="space-y-1 rounded-xl border border-white/5 bg-slate-950/50 p-4 text-left">
                  <p className="font-semibold text-brand-200">{result.seo.title}</p>
                  <p className="text-slate-300">{result.seo.description}</p>
                  <p className="text-xs text-slate-400">Tags: {result.seo.tags.join(", ")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Upload Status
                </h3>
                <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4 text-xs uppercase tracking-wide text-slate-300">
                  {result.upload?.status === "queued" && "Upload queued - download and upload manually."}
                  {result.upload?.status === "uploaded" && (
                    <a className="text-brand-200" href={result.upload.url} target="_blank" rel="noreferrer">
                      Uploaded: {result.upload.url}
                    </a>
                  )}
                  {result.upload?.status === "scheduled" && (
                    <span>
                      Scheduled for {result.upload.scheduledFor}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center text-sm text-slate-400">
              <span className="rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-widest text-slate-400">
                No run yet
              </span>
              <p>
                Execute the pipeline to generate artifacts, metadata, and optionally trigger an upload.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Automation Timeline</h2>
        <p className="max-w-3xl text-sm text-slate-300">
          Every run tracks progress across script analysis, asset generation, assembly, and publishing. Connect your API keys via environment variables (OpenAI, ElevenLabs, Pexels, Soundraw/Beatoven, Recraft, YouTube OAuth) to switch from demo assets to fully AI-generated deliverables.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {(result?.stages ?? STATIC_STAGES).map((stage, index) => (
              <StageDisplay key={stage.key} stage={stage} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI YouTube Automation Agent",
  description: "Automate YouTube video production from script to upload",
  openGraph: {
    title: "AI YouTube Automation Agent",
    description: "Automate YouTube video production from script to upload.",
    url: "https://agentic-046d257e.vercel.app",
    siteName: "AI YouTube Automation Agent",
    images: [
      {
        url: "https://images.pexels.com/photos/5319720/pexels-photo-5319720.jpeg",
        width: 1200,
        height: 630,
        alt: "Storyboard of AI automation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI YouTube Automation Agent",
    description: "Automate YouTube video production from script to upload.",
    creator: "@agentic",
    images: ["https://images.pexels.com/photos/5319720/pexels-photo-5319720.jpeg"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-slate-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {children}
      </body>
    </html>
  );
}

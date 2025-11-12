import { NextResponse } from "next/server";
import { z } from "zod";
import { runPipeline } from "../../../lib/pipeline";

const schema = z.object({
  script: z.string().min(20, "Script must include at least 20 characters."),
  projectName: z.string().min(3).max(80),
  voiceProfile: z.string().optional(),
  targetLanguage: z.string().optional(),
  autoUploadEnabled: z.boolean().optional(),
  scheduleAt: z.string().nullable().optional()
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        details: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  try {
    const result = await runPipeline(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Pipeline failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import { analyzeResume, matchJobDescription } from "@/lib/gemini";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Extract text from PDF
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text?.trim();

    if (!resumeText || resumeText.length < 50) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. Please ensure it is a text-based PDF." },
        { status: 400 }
      );
    }

    // AI analysis
    const analysisResult = await analyzeResume(resumeText);

    let jobMatchResult = null;
    if (jobDescription && jobDescription.trim().length > 20) {
      jobMatchResult = await matchJobDescription(resumeText, jobDescription);
    }

    // Save to DB
    await connectDB();
    const userId = (session.user as { id?: string }).id ?? session.user.email!;
    const analysis = await Analysis.create({
      userId,
      fileName: file.name,
      resumeText,
      score: analysisResult.score,
      atsScore: analysisResult.atsScore,
      summary: analysisResult.summary,
      strengths: analysisResult.strengths,
      weaknesses: analysisResult.weaknesses,
      skills: analysisResult.skills,
      missingKeywords: analysisResult.missingKeywords,
      improvements: analysisResult.improvements,
      ...(jobMatchResult && {
        jobMatch: {
          jobDescription,
          matchScore: jobMatchResult.matchScore,
          matchedSkills: jobMatchResult.matchedSkills,
          missingSkills: jobMatchResult.missingSkills,
          tailoringSuggestions: jobMatchResult.tailoringSuggestions,
          summary: jobMatchResult.summary,
        },
      }),
    });

    return NextResponse.json({
      id: analysis._id.toString(),
      ...analysisResult,
      jobMatch: jobMatchResult,
      fileName: file.name,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}

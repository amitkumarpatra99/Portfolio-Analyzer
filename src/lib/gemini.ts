import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
  const prompt = `You are an expert career coach and ATS (Applicant Tracking System) specialist. Analyze the following resume and return a JSON object with EXACTLY this structure:

{
  "score": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "skills": ["<skill 1>", "<skill 2>", ...],
  "missingKeywords": ["<keyword 1>", "<keyword 2>", ...],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3>", "<specific improvement 4>"],
  "atsScore": <number 0-100>
}

Score criteria:
- 80-100: Excellent, ready to apply
- 60-79: Good, minor improvements needed
- 40-59: Average, significant improvements needed
- 0-39: Poor, major rewrite needed

Respond ONLY with valid JSON, no markdown, no explanation.

RESUME:
${resumeText}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/```$/, "").trim();
  return JSON.parse(cleaned) as AnalysisResult;
}

export async function matchJobDescription(
  resumeText: string,
  jobDescription: string
): Promise<JobMatchResult> {
  const prompt = `You are an expert recruiter and ATS specialist. Compare this resume against the job description and return a JSON object with EXACTLY this structure:

{
  "matchScore": <number 0-100>,
  "matchedSkills": ["<skill 1>", "<skill 2>", ...],
  "missingSkills": ["<missing skill 1>", "<missing skill 2>", ...],
  "tailoringSuggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "summary": "<2-3 sentence assessment of the fit>"
}

Respond ONLY with valid JSON, no markdown, no explanation.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const cleaned = text.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/```$/, "").trim();
  return JSON.parse(cleaned) as JobMatchResult;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  missingKeywords: string[];
  improvements: string[];
  atsScore: number;
}

export interface JobMatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  tailoringSuggestions: string[];
  summary: string;
}

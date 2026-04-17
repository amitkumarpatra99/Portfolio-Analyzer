import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await connectDB();
    const userId = (session.user as { id?: string }).id ?? session.user.email!;
    const analysis = await Analysis.findOne({ _id: id, userId }).lean();
    if (!analysis) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    return NextResponse.json(analysis);
  } catch (error: unknown) {
    console.error("History detail error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

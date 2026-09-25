import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Checks if the current request has a valid admin session.
 * Returns the session if valid, otherwise returns a 401 Response.
 */
export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, error: null };
}

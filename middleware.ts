import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, ProtectedRoutes } from "./routes";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = (await cookies()).get("token")?.value;
  const path = req.nextUrl;
  const isProtectedRoute = ProtectedRoutes.includes(path.pathname);
  const isAuthRoutes = authRoutes.includes(path.pathname);
  if (token && isAuthRoutes) {
    path.pathname = "/";
    return NextResponse.redirect(path);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path", "/((?!.*\\..*|_next).*)"],
};

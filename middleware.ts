import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  const publicPaths = ["/sign-in", "/sign-up"];
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next(); 
  }

  if (!userId) {
    console.error("Unauthorized access attempt:", request.nextUrl.pathname);

    const signInUrl = new URL("/sign-in", request.nextUrl.origin);
    signInUrl.searchParams.set("return_url", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  request.headers.delete("cookie"); 
});

export const config = {
  matcher: [
    "/((?!_next|_static|_vercel|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

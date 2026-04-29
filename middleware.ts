import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
    headers: request.headers,
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  // Handle Supabase auth code from magic link
  const code = request.nextUrl.searchParams.get('code');
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    // Redirect to dashboard without the code parameter
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated and trying to access app routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard') ||
      !user && request.nextUrl.pathname.startsWith('/bloque') ||
      !user && request.nextUrl.pathname.startsWith('/registro')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

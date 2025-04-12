import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	// Get the pathname of the request
	const path = request.nextUrl.pathname

	// Check if the path is related to tests
	if (path.startsWith('/test')) {
		// Get the Supabase session cookie
		const supabaseCookie = request.cookies.get('sb-ribcayxeubylkmwsqnef-auth-token')

		// If there's no Supabase cookie, redirect to the login page
		if (!supabaseCookie) {
			const loginUrl = new URL('/login', request.url)
			// Add the current path as a redirect parameter
			loginUrl.searchParams.set('redirect', path)
			return NextResponse.redirect(loginUrl)
		}
	}

	return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
	matcher: '/test/:path*'
}

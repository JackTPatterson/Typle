import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Updates the session for a given request by setting cookies and managing authentication.
 *
 * @param {NextRequest} request - The incoming request containing session information and cookies.
 * @return {NextResponse} Returns the response object with updated cookies and session data.
 */
export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	createServerClient(
		"https://ribcayxeubylkmwsqnef.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYmNheXhldWJ5bGttd3NxbmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MTQ4NjIsImV4cCI6MjA1NDE5MDg2Mn0.6ia2H0ADkleHwzBDbuzI8UfAgaMTEWL7tc3wY1SDahI",
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value)
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// IMPORTANT: Avoid writing any logic between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
	// creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}

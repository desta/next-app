import { auth } from './auth'
import { NextResponse } from 'next/server';

const protectedRoutes =[
    "/dashboard",
    "/dashboard/account",
    "/dashboard/article",
    "/dashboard/gallery",
    "/dashboard/mikrotik",
    "/dashboard/product",
    "/dashboard/sales_invoice",
    "/dashboard/sales_quotatation",
    "/dashboard/setting_app",
    "/dashboard/setting_customers",
    "/dashboard/setting_faq",
    "/dashboard/setting_smtp",
    "/dashboard/setting_ticket",
    "/dashboard/setting_user",
    "/dashboard/ticket",
    "/dashboard/website",
]

export default async function middleware(request) {
    const session = await auth()
    
    const isProtected = protectedRoutes.some((route) => 
    request.nextUrl.pathname.startsWith(route)
    );
    
    if (!session && isProtected) {
        const absoluteURL = new URL("/login", request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString())
    }
    
    return NextResponse.next()
    
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }
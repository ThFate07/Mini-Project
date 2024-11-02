// middleware.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;
    
    if (!token && request.nextUrl.pathname === '/login') return NextResponse.next();
    if (!token && request.nextUrl.pathname === '/signup') return NextResponse.next();

    if(!token) return NextResponse.redirect(new URL('/login', request.url), {status: 302});

    try { 
        const response = await axios.post('http://localhost:3000/api/validate', {token});
        
        const nextResponse = NextResponse.next();

        nextResponse.headers.set('user', response.data.username);
        nextResponse.headers.set('user-id', response.data.userId);


        if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
            console.log('redirecting to /app');
            return NextResponse.redirect(new URL('/app', request.url), {status: 302});
        }

        return nextResponse
    } catch (error) { 
        if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url), {status: 302});
    }

}

// Specify which paths should be protected
export const config = {
    matcher: ['/app', '/login', '/signup', "/api/updateTodoList","/api/updateTodo", "/api/addTodo", "/api/addTodoList", "/api/fetchTodo"],
};

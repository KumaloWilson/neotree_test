'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
    useEffect(() => {
        // Log the 404 error for monitoring purposes
        console.error('404 page not found error occurred');
    }, []);
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center px-6 py-16 rounded-lg shadow-md bg-white max-w-md">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The page you are looking for does not exist or has been moved.
                </p>
                <div className="flex flex-col space-y-3">
                    <Link
                        href="/"
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Return to Dashboard
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

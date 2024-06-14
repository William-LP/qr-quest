import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Thank you!</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                        We&apos;ve sent you an email will all details.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                >
                    Return to Homepage
                </Link>
            </div>
        </div>
    )
}

export default page

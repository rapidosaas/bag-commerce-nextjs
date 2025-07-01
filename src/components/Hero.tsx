"use client"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"

function Hero () {
    return (
    <section className="relative isolate px-6 pt-8 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-balance text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Find The Right 
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
                Cabas
              </span>{' '}
              And More
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8">
                CabasBusiness is a platform designed to connect micro-importers with customers searching for particular products.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/bags"
                className={`${buttonVariants({ variant: "default" })}`}
              >
                Find a Cabas
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-blue-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>
    
    )
}

export default Hero
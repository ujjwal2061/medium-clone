import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Theme } from '@/components/ui/theme'
export default function Themenavabar() {
  return (
     <nav className=" fixed z-20 w-full bg-white dark:bg-black  border-b dark:text-white">
        <div className="max-w-7xl  justify-between mx-auto px-4 py-3 flex items-center">
          <Link
            href="/"
            className="flex items-center font-medium transition-colors duration-200">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        <button className=" cursor-pointer mr-5">
          <Theme />
        </button>
        </div>
      </nav>

  )
}

"use client";
import { Button } from "@/components/ui/button";

import { Turtle, Github, Star, Menu, X } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

interface NavbarViewProps {
  username?: string; 
}
export const NavbarView = ({username}:NavbarViewProps) => {
  
  const [isExpanded, setIsExpanded] = useState(false);


  const renderUserButton = () => {

    if (username) {
      return (
        <Button asChild
          variant="outline"
          className="font-semibold px-4 py-1.5 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center">
          <Link href={`/profile/${username}`}>
          {username.charAt(0).toUpperCase()}
          </Link> 
        </Button>
      );
    }
    return (
      <Button asChild variant="outline" className="font-semibold px-6 py-1.5">
        <Link href="/auth/login">Start</Link>
      </Button>
    );
  };

  return (
    <div className="w-full z-20 bg-neutral-100 flex justify-center fixed ">
      <div className="  max-w-7xl  mx-auto  w-full ">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex gap-2 items-center">
          <Turtle size={25} />
          <h1 className="font-semibold text-base">Turly</h1>
        </div>

        <div className="hidden md:flex gap-2 items-center">
          {renderUserButton()}
          <Button className="cursor-pointer flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <a href="https://github.com/ujjwal2061/turly" target="_blank" rel="noopener noreferrer">
              Star on
            </a>
            <Github className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
          {isExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isExpanded && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="flex flex-col gap-3 p-4">
            <Button className="cursor-pointer flex items-center justify-center gap-1 w-full">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <a
                href="https://github.com/ujjwal2061/turly"
                target="_blank"
                rel="noopener noreferrer">
                Star on
              </a>
              <Github className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
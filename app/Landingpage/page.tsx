import Image from "next/image";
import { Bookmark, SquareArrowUpRight } from "lucide-react";

export const Page = () => {
  return (
    <div className="min-h-screen flex justify-center bg-slate-100">
      <div className="max-w-5xl w-full p-2 flex flex-col gap-1">
        {/* Post Section */}
        <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
              <Image
                src="/images/kw.jpeg"
                alt="post page"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-3 flex items-center">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi doloribus
                repellat saepe obcaecati hic quam officiis soluta. At dolorum autem quisquam modi,
                mollitia animi cumque quod temporibus.<br />
                Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                reprehenderit blanditiis amet expedita fugit eum laborum.
              </p>
            </div>
          </div>
          <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
            <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
              <Bookmark size={20} className="text-black" />
            </button>
            <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
              <SquareArrowUpRight size={20} className="text-black" />
            </button>
          </div>

        </div>
                <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
              <Image
                src="/images/kw.jpeg"
                alt="post page"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-3 flex items-center">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi doloribus
                repellat saepe obcaecati hic quam officiis soluta. At dolorum autem quisquam modi,
                mollitia animi cumque quod temporibus.<br />
                Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                reprehenderit blanditiis amet expedita fugit eum laborum.
              </p>
            </div>
          </div>
          <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
            <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
              <Bookmark size={20} className="text-black" />
            </button>
            <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
              <SquareArrowUpRight size={20} className="text-black" />
            </button>
          </div>

        </div>
                <div className="rounded-md flex flex-col border border-neutral-200 overflow-hidden bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-1/2 h-64 sm:h-auto ">
              <Image
                src="/images/kw.jpeg"
                alt="post page"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-3 flex items-center">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed tracking-tight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique animi doloribus
                repellat saepe obcaecati hic quam officiis soluta. At dolorum autem quisquam modi,
                mollitia animi cumque quod temporibus.<br />
                Ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tenetur accusamus
                reprehenderit blanditiis amet expedita fugit eum laborum.
              </p>
            </div>
          </div>
          <div className="flex border-t border-gray-200 bg-slate-50 justify-around items-center p-1.5">
            <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
              <Bookmark size={20} className="text-black" />
            </button>
            <button className="cursor-pointer hover:bg-neutral-300 transition-colors duration-300 rounded-full p-1.5">
              <SquareArrowUpRight size={20} className="text-black" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

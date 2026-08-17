import { categories } from "@/assets/assets";
import Link from "next/link";

const CategoriesMarquee = () => {

    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group py-4">
            <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="flex min-w-[200%] animate-[marqueeScroll_30s_linear_infinite] group-hover:[animation-play-state:paused] gap-3" >
                {[...categories, ...categories, ...categories].map((category, index) => (
                    <Link
                        key={index}
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-xs sm:text-sm hover:bg-emerald-600 hover:text-white active:scale-95 transition-all duration-300 whitespace-nowrap"
                    >
                        {category}
                    </Link>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;

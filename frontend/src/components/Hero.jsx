import { Star } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Hero = ({
  heading = "Drive with Ease - Your Automobile Partner",
  description = "Your one-stop solution for rental, purchase, and servicing needs.",
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}) => {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="container mx-auto max-w-7xl text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight animate-fade-in">
            {heading}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed animate-fade-in-up">
            {description}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="mx-auto mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex -space-x-3">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="w-14 h-14 border-2 border-[#0a1627] shadow-md hover:scale-110 transition-transform duration-300">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="size-6 fill-yellow-400 text-yellow-400 transition-transform duration-300 hover:scale-125" />
              ))}
              <span className="ml-2 font-semibold text-blue-200 text-lg">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-300 font-medium mt-1">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }
      `}</style>
    </section>
  );
};
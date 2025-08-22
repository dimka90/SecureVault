"use client";
import React from "react";
import Link from "next/link";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Crypto Investor",
      text: "This platform gave me peace of mind knowing my seed phrase is safe and recoverable.",
    },
    {
      name: "Michael Lee",
      role: "Web3 Developer",
      text: "The trustee feature is genius. I know my assets are protected in case of emergencies.",
    },
    {
      name: "Daniel Richard",
      role: "Student",
      text: "Finally, a solution that takes away my fear of losing access to my crypto. Highly recommended!",
    },
    {
      name: "Sophia Martinez",
      role: "NFT Collector",
      text: "I no longer worry about losing my access. Truly a lifesaver for blockchain users.",
    },
    {
      name: "David Kim",
      role: "DAO Contributor",
      text: "Sleek, secure, and reliable. It feels like the missing link for Web3 security.",
    },
  ];

  return (
    <section className="md:pt-20  min-h-screen">
      <div className="bg-indigo-100 pb-20">
        <h2 className="font-bold text-center text-[33px] sm:text-5xl bg-gradient-to-tr from-red-500 via-indigo-400 to-indigo-600 bg-clip-text text-transparent pt-10 sm:pt-20">
          What Our Users Say
        </h2>

        <div className="flex overflow-hidden mt-10 sm:mt-16">
          <div className="flex animate-scroll space-x-6 w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[300px] max-w-sm bg-gray-900/90 shadow-lg rounded-2xl px-6 py-14"
              >
                <p className="text-indigo-100 italic">“{t.text}”</p>
                <div className="mt-4">
                  <p className="font-semibold text-indigo-500">{t.name}</p>
                  <p className="text-sm text-indigo-100/70">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      
      <div className="w-full bg-black/40 py-15 xs:py-40 md:py-32 flex flex-col justify-center text-center items-center text-indigo-100">
        <h2 className="font-bold text-4xl sm:text-5xl  text-indigo-100 mb-6">
          Ready To Secure Your asset?
        </h2>
        <Link href='/signup' className="bg-indigo-500 md:px-14 px-10 py-3 md:py-5 rounded-lg text-white text-base md:text-xl font-bold hover:bg-indigo-600">Get Started</Link>
      </div>

      <style jsx>{`
        @keyframes scrollX {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: scrollX 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

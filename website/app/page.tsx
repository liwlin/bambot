"use client";

import { StarField } from "@/components/star-field";
import { robotConfigMap } from "@/config/robotConfig";

import Link from "next/link";

export default function Home() {
  const robots = Object.entries(robotConfigMap).map(([name, config]) => ({
    name,
    image: config.image,
    playLink: `/play/${name}`,
    assembleLink: config.assembleLink,
  }));

  return (
    <main className="relative">
      <div className="mt-32 mb-4 container mx-auto p-4 flex justify-center items-center relative z-10">
        <div className="text-center w-full">
          {" "}
          {/* Ensure text-center container takes full width */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full border border-green-400/50 bg-black/50 px-5 py-2 shadow-lg shadow-green-900/30 backdrop-blur-sm">
              <span className="text-lg font-bold tracking-wide text-green-300">
                MakerSeed
              </span>
              <span className="ml-2 text-sm font-medium text-zinc-300">
                SCS225 Edition
              </span>
            </div>
          </div>
          <h1 className="text-6xl mb-4 font-bold">BamBot</h1>
          <p className="text-2xl mb-8">Make it easy to play with robots 🤖</p>
          {/* Changed from grid to flex for flexible centering */}
          <div className="container mx-auto p-4 flex flex-wrap justify-center gap-8 relative z-10">
            {robots.map((robot) => (
              // Added width constraints for responsiveness and max 3 per row on large screens
              <div
                key={robot.name}
                className="rounded-2xl shadow-lg  shadow-zinc-800 border border-zinc-500 overflow-hidden w-[90%] sm:w-[40%] lg:w-[25%]" // Adjust percentages/basis as needed
              >
                <div className="relative z-10">
                  <img
                    src={robot.image}
                    alt={robot.name}
                    className="w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                </div>
                <h2 className="text-xl font-semibold -mt-8 ml-2 mb-4 text-left text-white relative z-20">
                  {robot.name}
                </h2>
                <div className="flex">
                  <Link
                    href={robot.playLink}
                    className={`bg-black text-white py-2 text-center hover:bg-zinc-800 border-t border-zinc-500 ${
                      robot.assembleLink ? "w-1/2 border-r" : "w-full"
                    }`}
                  >
                    Play
                  </Link>
                  {robot.assembleLink && (
                    <Link
                      href={robot.assembleLink}
                      className="bg-black text-white w-1/2 py-2 text-center hover:bg-zinc-800 border-t border-zinc-500"
                    >
                      Assemble
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" style={{ overflow: "hidden" }}>
        <StarField />
      </div>
    </main>
  );
}

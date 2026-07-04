"use client";

import RobotLoader from "@/components/playground/RobotLoader";

type PlayPageClientProps = {
  slug: string;
};

export function PlayPageClient({ slug }: PlayPageClientProps) {
  return (
    <div className="relative w-screen h-dvh">
      <RobotLoader robotName={slug} />
    </div>
  );
}

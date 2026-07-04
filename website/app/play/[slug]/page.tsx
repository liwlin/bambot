import { notFound } from "next/navigation";

import { robotConfigMap } from "@/config/robotConfig";
import { PlayPageClient } from "./PlayPageClient";

export function generateStaticParams() {
  return Object.keys(robotConfigMap).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!robotConfigMap[slug]) {
    notFound();
  }

  return <PlayPageClient slug={slug} />;
}

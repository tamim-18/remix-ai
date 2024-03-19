"use client";
import { Card } from "@/components/ui/card";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashBoardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className=" mb-8 space-y-4">
        <h2 className=" text-2xl md:text-4xl font-bold text-center">
          Explpre the Power of AI with Remix AI
        </h2>
        <p className=" text-muted-foreground font-light text-sm md:text-lg text-center">
          Remix AI is a platform that allows you to generate music, videos and
          code using the power of AI.
        </p>
      </div>
      <div className=" p-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            className=" p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className=" flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className=" font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-6 h-6" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashBoardPage;

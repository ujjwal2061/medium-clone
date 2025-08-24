"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostCardLoading() {
  const skeletonCount = 3; 

  return (
    <div className="space-y-6">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <Card key={i} className="shadow-md m-2  mx-auto">
          <CardHeader>
            <div className="flex border-neutral-200 bg-neutral-200 w-fit p-1.5 rounded-md flex-row items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full bg-zinc-300" />
              <Skeleton className="h-4 w-20 rounded-md bg-zinc-300" />
            </div>
            <CardTitle className="text-xl mt-2">
              <div className="space-y-2">
                <Skeleton className="h-6 w-full rounded-md" />
                {i % 2 === 0 && (
                  <Skeleton className="h-6  rounded-md" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </CardContent>
          <CardFooter className="flex items-center space-x-4">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
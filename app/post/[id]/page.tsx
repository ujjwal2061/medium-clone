import PostIdpage from "@/components/ui/psot-id-card"
import { prisma } from "@/lib/prisma"

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function page({ params }: Params) {
  // Await the params since it's now a Promise in Next.js 15
  const { id } = await params;
  
  const parsedId = parseInt(id, 10);
  
  const posts = await prisma.post.findUnique({
    where: { id: parsedId },
    select: {
      title: true,
      content: true,
      authorId: true,
      author: {
        select: {
          username: true,
        }
      }
    }
  });
  
  return <PostIdpage posts={posts} />;
}
 import PostIdpage from "@/components/ui/psot-id-card"
 import  {prisma} from "@/lib/prisma"

 export default  async function page({params}:{params:{id:string}}) {
    const id=parseInt( params.id ,10);
    const posts=await prisma.post.findUnique({
     where:{id},
     select:{
        title:true,
        content:true,
        authorId:true,
        author:{
            select:{
                username:true,
            }
        }
    }
   })
    return<PostIdpage  posts={posts}/>
 }
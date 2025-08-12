
import  {hash ,compare} from "bcrypt-ts"
import   {PrismaClient} from "@/lib/generated/prisma/client"



const prisma_client=new PrismaClient();

interface Signup{
    username?:string,
    email?:string,
    password?:string
};
// get rquest


export async function POST(req:Request) {
    try{
        const body =await req.json();
        const {username ,email,password}:Signup=body;
        if(!email || !username || !password){
            return new Response(JSON.stringify({error:"Email &&  Username required"}))
        }
        // checking user existing or not
        const isUserexits=await prisma_client.user.findUnique({
            where:{email},
        });
        if(isUserexits){
            return new Response(JSON.stringify({error:"user already exits "}),{
                status:409,headers:{"Content-Type":"application/json"}
            })
        }
        const hashpassword= await hash(password ,10);
        // this for the request part
         await prisma_client.user.create({
            data:{
                username,
                email,
                password:hashpassword,
            }
         })
         // response
          return new Response(JSON.stringify(
            { message: "User created successfully" }),
            { status: 201,headers: { "Content-Type": "application/json" },});
    }catch(error){
        console.log(error)
        return  new Response (JSON.stringify({message:"Interal sever error"}),{
            status:500,
            headers:{ "Content-Type": "application/json" }
        })
    }
    
}
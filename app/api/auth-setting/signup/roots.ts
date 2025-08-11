

export async function Post(req:Request) {
    try{
        const {email,username,password}=await req.json();
        if(!email || !username || !password){
            return new Response(JSON.stringify({error:"Email &&  Username required"}))
        }
        // checking user existing or not
    }catch(error){
        console.log(error)
    }
    
}
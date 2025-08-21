import { auth } from "@/app/auth";
import  { SingInView } from "@/modules/UI/auth-view/Sing-view-page";
import { redirect } from "next/navigation";

 async function Page(){
    const session=await auth()
    if(session) redirect("/");
    return <SingInView />
}
export default Page;
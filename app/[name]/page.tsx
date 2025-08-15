 import  Profile from "@/modules/auth/UI/views/user-profile-view/profile-view"

 export default  async function page(
    {params}:{params:Promise<{name:string}>}) {
    const {name}=await params;
    // pasing the name as the props
    return <Profile name={name} />
 }
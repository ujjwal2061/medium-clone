 export default  async function page(
    {params}:{params:Promise<{id:number}>}) {
    const {id}=await params
    console.log(id);
    return(
        <div>
            <h1>Let see what happend here {id}</h1>
        </div>
    )
 }
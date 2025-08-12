"use client"
import { Card,CardContent } from "@/components/ui/card"
import { FormField,Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import  *  as  z from  'zod';
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { error } from "console";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";

export const LoginPage=()=>{
const SignupScheam=z.object({
    email:z.string().email(),
    password:z.string().min(1,{message:"Password is required"}),
    confirmPassword:z.string().min(1,{message:"Paaword is required"})
}).refine((pass)=>pass.password===pass.confirmPassword,{
    message:"Password don't match",
    path:["confirmPassword"]
})
  
     const [loading ,setIsLoading]=useState<boolean>(false)
// form
const form=useForm<z.infer<typeof SignupScheam>>({
    resolver:zodResolver(SignupScheam),
    defaultValues:{
       email:"",
       password:"",
       confirmPassword:"",  
    }
})
    return(
    <div className="flex  flex-col items-center  justify-center gap-6 ">
        <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col gap-4  justify-center ">
            <Form {...form}>
              <form className="p-2 md:p-4">
               <div className="flex flex-col gap-2   ">
                  <div className="flex flex-col   items-center text-center">
                    <h1 className="text-2xl font-bold font-sans">Welcome Back</h1>
                 </div>
                   <div className="flex  flex-row mt-4 w-full">
                 <FormField 
                  control={form.control}
                  name="email"
                  render={({field})=>(
                 <FormItem className="w-full px-2  py-0.5 items-start">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input  type="email" placeholder="ujjwal@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                  />
                 </div>

                   <div className="flex  flex-row  mt-4 w-full">
                 <FormField 
                  control={form.control}
                  name="password"
                  render={({field})=>(
                    <FormItem className="w-full px-2  py-0.5 items-start">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                  />
                 </div>
                   <div className="flex flex-row mt-4  w-full ">
                 <FormField  control={form.control}  name="confirmPassword" render={({field})=>(
                   <FormItem className=" w-full px-2 py-0.5 items-start ">
                   <FormLabel>Confirm Password</FormLabel>
                    <FormControl >
                      <Input
                        type="password" placeholder="********" {...field} />
                    </FormControl>
                     <FormMessage />
                    </FormItem>
                 )} />
                </div>
              
                <Button 
                disabled={loading}
                className=" w-full cursor-pointer"
                >Login</Button>
                </div>
              </form>
                     <div className="text-center text-sm">
                        Did't have an account ?{" "}
                     <Link href={"/auth/signup"} className=" font-semibold tex-[14px]   underline underline-offset-4">Sign-up</Link>   
                    </div>
            </Form>
        </CardContent>
       </Card>
    </div>
    )
}
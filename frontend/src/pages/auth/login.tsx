import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/CustomFormField"; // Only import it once
import { Apple, Facebook, LockKeyhole, Mail } from 'lucide-react';
import {
    Form
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFieldType } from "@/constants/common";

const Login = () => {
    const formSchema = z.object({
        email: z.string().email("Invalid email address"), // Email validation
        password: z.string().min(6, "Password must be at least 6 characters"), // Password validation
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values); // Do something with the form values.
        // <img src="../../../public/TaskManager_baner.webp" alt="" />

    }

    return (
        <div className="bg-[#f0f2f3] mt-5 flex h-screen overflow-hidden">
         
          {/* Left Div (Form) */}
          <div className="w-1/2 h-[calc(100vh-80px)] flex items-center justify-center">
            <div className="p-[30px] px-[50px] max-w-[420px] bg-white rounded-[40px] flex flex-col gap-[28px] shadow-2xs">
              <h2 className="text-3xl font-medium">User Login</h2>
              <p className="font-medium">
                Hey, Enter your details to sign in to your account
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="flex flex-col gap-3.5 items-start">
                    <CustomFormField
                      fieldType={formFieldType.INPUT}
                      control={form.control}
                      name="email"
                      placeholder="Enter Email/Phone No"
                      iconSrc={<Mail />}
                      iconAlt="email"
                    />
                    <CustomFormField
                      fieldType={formFieldType.INPUT}
                      control={form.control}
                      name="password"
                      placeholder="Enter Password"
                      iconSrc={<LockKeyhole />}
                      iconAlt="password"
                    />
                    <p className="font-medium text-[14px]">Having trouble signing in?</p>
                  </div>
    
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
                    type="submit"
                    disabled={form.formState.isSubmitting} // Disable button while submitting
                  >
                    {form.formState.isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M4 12a8 8 0 1 0 16 0 8 8 0 1 0-16 0" stroke="none" />
                      </svg>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
    
                  <p className="font-medium text-[14px]">-- Or Sign in with --</p>
    
                  <div className="flex items-center justify-between">
                    <Button variant="outline">
                      <span>G</span> Google
                    </Button>
                    <Button variant="outline">
                      <span><Apple /></span>Apple
                    </Button>
                    <Button variant="outline">
                      <span><Facebook /></span>Facebook
                    </Button>
                  </div>
                  <p className="font-medium text-[14px]">
                    Don't have an account? <span className="font-bold">Sign up</span>
                  </p>
                </form>
              </Form>
            </div>
          </div>

           {/* Right Div (Image) */}
           <div className="w-1/2 h-[calc(100vh-80px)]"> {/* Adjust height to fit the screen minus the header height */}
            <img 
              src="../../../public/TaskManager_baner.webp" 
              alt="Task Manager Banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      );
      
};

export default Login;

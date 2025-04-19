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
import { Link } from "react-router-dom";

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
        // #f0f2f3
        // <img src="../../../public/TaskManager_baner.webp" alt="" />

    }
    return (
        <div className="bg-[#e4e7ea] mt-5 flex h-screen overflow-hidden">

            {/* Left Div (Form) */}
            <div className="w-1/2 flex items-center justify-center h-full px-4">
                <div className="w-full max-w-[440px] bg-white p-[30px] px-[50px] rounded-[40px] flex flex-col gap-[28px] shadow-2xs">
                    <h2 className="text-3xl font-medium">Welcome Back</h2>
                    <p className="font-medium text-[14px]">
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
                                    iconSrc={<Mail size={16} />}
                                    iconAlt="email"
                                />
                                <CustomFormField
                                    fieldType={formFieldType.INPUT}
                                    control={form.control}
                                    name="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    iconSrc={<LockKeyhole size={16} />}
                                    iconAlt="password"
                                />
                                <p className="font-medium text-[12px]">Having trouble signing in?</p>
                            </div>

                            <Button
                                className="bg-blue-500 text-white w-full hover:bg-blue-600 flex items-center justify-center cursor-pointer"
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

                            <p className="font-medium text-[12px]">-- Or Sign in with --</p>

                            <div className="flex items-center justify-between">
                                <Button variant="outline" className="cursor-pointer">
                                    <span>G</span> Google
                                </Button>
                                <Button variant="outline" className="cursor-pointer">
                                    <span><Apple /></span>Apple
                                </Button>
                                <div className="hidden lg:inline">
                                <Button variant="outline" className="cursor-pointer">
                                    <span className="hidden md:inline"><Facebook /></span>Facebook
                                </Button>
                                </div>
                              
                            </div>
                            <p className="font-medium text-[12px]">
                                Don't have an account? <span className="font-bold"><Link to={"/register"}>Sign up</Link></span>
                            </p>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Right Div (Image) */}
            <div className="w-1/2 h-full relative">
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

import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/CustomFormField"; // Only import it once
import { Apple, Facebook, LockKeyhole, Mail, ShieldCheck, User } from 'lucide-react';
import {
    Form
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFieldType } from "@/constants/common";
import { Link } from "react-router-dom";
import ImagePreview from "@/components/ImagePreview";

const Register = () => {
    const formSchema = z.object({
        name: z.string(),
        email: z.string().email("Invalid email address"), // Email validation
        password: z.string().min(6, "Password must be at least 6 characters"), // Password validation
        adminInviteToken: z.string(),
        profileImageUrl: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            adminInviteToken: "",
            profileImageUrl: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values); // Do something with the form values.
        // <img src="../../../public/TaskManager_baner.webp" alt="" />

    }
    return (
        <div className="bg-[#e4e7ea] mt-5 flex h-screen overflow-hidden">

            {/* Left Div (Form) */}
            <div className="w-1/2 flex items-center justify-center h-full px-4">
                <div className="w-full max-w-[440px] bg-white p-[30px] px-[50px] rounded-[34px] flex flex-col gap-[28px] shadow-2xs">
                    <h2 className="text-3xl font-medium">Create an account</h2>
                    <p className="font-medium text-[14px]">
                        Join us today, By entering the details below.
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-3.5 items-start">
                            <ImagePreview />   
                            <CustomFormField
                                    fieldType={formFieldType.INPUT}
                                    control={form.control}
                                    name="name"
                                    placeholder="Enter Name"
                                    iconSrc={<User size={16} />}
                                    iconAlt="name"
                                />
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
                                <CustomFormField
                                    fieldType={formFieldType.INPUT}
                                    control={form.control}
                                    name="adminInviteToken"
                                    placeholder="Enter Token"
                                    type="password"
                                    iconSrc={<ShieldCheck size={16} />}
                                    iconAlt="token"
                                />
                                <p className="font-medium text-[12px]">Having trouble signing up?</p>
                            </div>

                            <Button
                                className="bg-blue-500 text-white w-full hover:bg-blue-600 flex items-center justify-center"
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
                                    "Sign up"
                                )}
                            </Button>

                            {/* <p className="font-medium text-[12px]">-- Or Sign in with --</p> */}

                            {/* <div className="flex items-center justify-between">
                                <Button variant="outline">
                                    <span>G</span> Google
                                </Button>
                                <Button variant="outline">
                                    <span><Apple /></span>Apple
                                </Button>
                                <div className="hidden lg:inline">
                                <Button variant="outline">
                                    <span className="hidden md:inline"><Facebook /></span>Facebook
                                </Button>
                                </div>
                              
                            </div> */}
                            <p className="font-medium text-[12px]">
                                Already have an account? <span className="font-bold"><Link to={"/login"}>Sign in</Link></span>
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

export default Register;

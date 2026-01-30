"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { IRegisterRequest } from "@models/register";
import { useRouter } from "next/navigation";
import authService from "@services/auth";
import { ROUTES } from "@routes";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const router = useRouter();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IRegisterRequest>();

    const [loading, setLoading] = useState(false)
    const onSubmit = async (data: IRegisterRequest) => {
        try {
            setLoading(true);

            const res = await authService.register(data) as any
            if (res.statusCode === 201) {
                const res = await authService.sendMailConfirm(data.email) as any
                if (res.statusCode === 200) {
                    sessionStorage.setItem("pending_email", data.email);
                    router.push(ROUTES.AUTH.VERIFY_EMAIL)
                } else {
                    toast.error("Đăng ký thành công nhưng gửi mail thất bại.");
                }
            }
        } catch (error: any) {
            toast.error(error?.message || "Đăng ký thất bại");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const password = watch("password");


    return (
        <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0a0f0f] via-[#0f1a1a] to-[#162a2a] px-4 py-12">

            {/* Nút Back to Login ở góc trên bên trái */}
            <div className="absolute left-6 top-6">
                <Link
                    href={ROUTES.AUTH.LOGIN}
                    className="flex items-center gap-2 rounded-md border border-gray-700 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition-hover hover:bg-white/10 hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>
            </div>

            <div className="w-full max-w-[420px] space-y-8">
                <h1 className="text-center text-2xl font-semibold text-white">Create Account</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">First Name</label>
                            <input
                                {...register("firstName", { required: "Vui lòng nhập họ" })}
                                className="w-full rounded-md border border-gray-700 bg-white/5 p-2.5 text-white outline-none focus:border-teal-500 transition-all"
                                placeholder="anh"
                            />
                            {errors.firstName && <p className="text-[10px] text-red-400">{errors.firstName.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Last Name</label>
                            <input
                                {...register("lastName", { required: "Vui lòng nhập tên" })}
                                className="w-full rounded-md border border-gray-700 bg-white/5 p-2.5 text-white outline-none focus:border-teal-500 transition-all"
                                placeholder="le"
                            />
                            {errors.lastName && <p className="text-[10px] text-red-400">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</label>
                        <input
                            {...register("email", {
                                required: "Email là bắt buộc",
                                pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
                            })}
                            type="email"
                            className="w-full rounded-md border border-gray-700 bg-white/5 p-2.5 text-white outline-none focus:border-teal-500 transition-all"
                            placeholder="aleduc+323232@"
                        />
                        {errors.email && <p className="text-[10px] text-red-400">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: "Mật khẩu là bắt buộc",
                                    minLength: { value: 6, message: "Tối thiểu 6 ký tự" }
                                })}
                                type={showPass ? "text" : "password"}
                                className="w-full rounded-md border border-gray-700 bg-white/5 p-2.5 pr-10 text-white outline-none focus:border-teal-500 transition-all"
                                placeholder="aaaaa1A1"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-[10px] text-red-400">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Confirm Password</label>
                        <div className="relative">
                            <input
                                {...register("confirmPassword", {
                                    required: "Vui lòng xác nhận mật khẩu",
                                    validate: (value) => value === password || "Mật khẩu không khớp"
                                })}
                                type={showConfirmPass ? "text" : "password"}
                                className="w-full rounded-md border border-gray-700 bg-white/5 p-2.5 pr-10 text-white outline-none focus:border-teal-500 transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-[10px] text-red-400">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-teal-600 py-3 font-semibold text-white transition-all hover:bg-teal-500 active:scale-[0.98] cursor-pointer disabled:bg-gray-600"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>
            </div>
        </main>
    );
}
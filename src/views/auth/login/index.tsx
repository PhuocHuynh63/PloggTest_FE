"use client";

import { COOKIES } from "@constants/common";
import { ILoginRequest } from "@models/login";
import { ROUTES } from "@routes";
import authService from "@services/auth";
import { CookiesService } from "@utils/helpers/Cookies";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginRequest>();

    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = async (data: ILoginRequest) => {
        try {
            setLoading(true);

            const res = await authService.login(data) as any

            if (res.statusCode === 201) {
                CookiesService.set(COOKIES.ACCESS_TOKEN, res.data.access_token)
                router.push(ROUTES.PRIVATE.ROOT)
            } 
        } catch (err: any) {
            if (err.statusCode === 403) {
                await authService.sendMailConfirm(data.email)
            }
            toast.error(err?.message || "Đã xảy ra lỗi, vui lòng thử lại");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] space-y-8 text-center">
            <h1 className="text-2xl font-semibold text-white">Log in</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300" htmlFor="email">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "Email là bắt buộc",
                            pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
                        })}
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-gray-700 bg-white/5 p-3 text-white outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                        placeholder="Nhập email của bạn"
                    />
                    {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-gray-300" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            {...register("password", { required: "Mật khẩu là bắt buộc" })}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full rounded-md border border-gray-700 bg-white/5 p-3 text-white outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full rounded-md bg-[#3d4f4f] py-3 font-semibold text-gray-300 transition-colors hover:bg-[#4a5e5e] hover:text-white cursor-pointer"
                >
                    Login
                </button>
            </form>

            {/* Footer */}
            <div className="space-y-2">
                <p className="text-sm text-gray-400">
                    Don't have an account?{" "}
                    <button onClick={() => router.push(ROUTES.AUTH.REGISTER)} className="text-teal-400 hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
"use client";

import { ROUTES } from "@routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfirmEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("pending_email");
    if (savedEmail) setEmail(savedEmail);
    return () => {
      sessionStorage.removeItem("pending_email");
    }
  }, []);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Đã gửi lại email xác nhận!");
    setIsResending(false);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0a0f0f] via-[#0f1a1a] to-[#162a2a] px-4">

      {/* Nút Back to Login */}
      <div className="absolute left-6 top-6">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="flex items-center gap-2 rounded-md border border-gray-700 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-all hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Login
        </Link>
      </div>

      <div className="w-full max-w-[550px] space-y-8 text-center">
        {/* Tiêu đề chính */}
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Please confirm your email address
        </h1>

        {/* Danh sách thông báo */}
        <div className="space-y-4 text-left inline-block">
          <ul className="list-disc space-y-3 text-sm text-gray-300 ml-5 marker:text-gray-500">
            <li>
              We have sent a confirmation link to: <span className="font-semibold text-white">{email}</span>
            </li>
            <li>
              Confirmation email may take up to 5 minutes to appear in your inbox
            </li>
            <li>
              Please confirm through the link in the email to create your account
            </li>
          </ul>
        </div>

        {/* Nút Resend email */}
        <div className="pt-4">
          <button
            onClick={handleResend}
            disabled={isResending}
            className="w-full max-w-[400px] rounded-md bg-[#008b8b] py-2.5 font-medium text-white transition-all hover:bg-[#00a3a3] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? "Sending..." : "Resend email"}
          </button>
        </div>
      </div>
    </main>
  );
}
"use client";

import { ROUTES } from "@routes";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ThankyouConfirmPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0a0f0f] via-[#0f1a1a] to-[#162a2a] px-4 text-center">
      <div className="w-full max-w-[500px] space-y-8 flex flex-col items-center">
        
        {/* Icon Xác nhận lớn */}
        <div className="text-white">
          <BadgeCheck size={100} strokeWidth={1.5} className="opacity-90" />
        </div>

        {/* Nội dung thông báo */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Thank you!
          </h1>
          <p className="text-sm text-gray-400">
            Your email address has been confirmed.
          </p>
        </div>

        {/* Nút tiếp tục */}
        <div className="w-full pt-4">
          <button
            onClick={handleContinue}
            className="w-full max-w-[400px] rounded-md bg-[#008b8b] py-2.5 text-xs font-medium text-white transition-all hover:bg-[#00a3a3] active:scale-[0.98]"
          >
            Continue with account creation
          </button>
        </div>
      </div>
    </main>
  );
}
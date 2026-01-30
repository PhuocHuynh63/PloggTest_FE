"use client";

export default function AuthLayoutClient({ children }: { children: React.ReactNode }) {
 
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0a0f0f] via-[#0f1a1a] to-[#162a2a] px-4">
            {children}
        </div>
    );
}
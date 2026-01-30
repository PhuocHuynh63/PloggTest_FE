import AuthLayoutClient from "@components/Templates/AuthLayout";
import { COOKIES } from "@constants/common";
import { ROUTES } from "@routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value;

    if (token) {
        redirect(ROUTES.PRIVATE.ROOT);
    }
    return (
        <AuthLayoutClient>
            {children}
        </AuthLayoutClient>
    );
}

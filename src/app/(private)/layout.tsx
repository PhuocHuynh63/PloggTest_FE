import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIES } from "@constants/common";
import { ROUTES } from "@routes";

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIES.ACCESS_TOKEN)?.value;

    if (!token) {
        redirect(ROUTES.AUTH.LOGIN);
    }

    return (
        <>
            {children}
        </>
    );
}
'use client'

import { COOKIES } from "@constants/common";
import { ROUTES } from "@routes";
import { CookiesService } from "@utils/helpers/Cookies";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const handleCookies = () => {
        CookiesService.remove(COOKIES.ACCESS_TOKEN)
        router.push(ROUTES.AUTH.LOGIN)
    }
    return (
        <button className="bg-red-500 p-4" onClick={handleCookies}>Clear Token</button>
    )
}

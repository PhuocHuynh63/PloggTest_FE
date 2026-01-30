import { ROUTES } from "@routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.AUTH.LOGIN)
}
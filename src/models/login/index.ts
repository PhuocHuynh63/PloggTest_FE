import z from "zod";

const loginRequest = z.object({
    email: z.string().email(),
    password: z.string(),
})
export type ILoginRequest = z.infer<typeof loginRequest>
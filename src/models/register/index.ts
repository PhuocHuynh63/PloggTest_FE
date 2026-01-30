import z from "zod";

const registerRequest = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
})
export type IRegisterRequest = z.infer<typeof registerRequest>
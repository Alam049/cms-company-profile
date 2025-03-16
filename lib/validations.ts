import {z} from "zod"

export const paymentSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  amount: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val), 
    z.number().min(1, "Amount is required and must be greater than 0")
  ),
  status: z.enum(["pending", "processing", "success", "failed"], {
    required_error: "Status is required",
  }),
});

import type { TransactionSchema } from "@/forms/schemas/TransactionSchema";
import type z from "zod";

export type TransactionPayloadType = z.infer<typeof TransactionSchema>;
export type TransactionUpdatePayloadType = Partial<z.infer<typeof TransactionSchema>>;
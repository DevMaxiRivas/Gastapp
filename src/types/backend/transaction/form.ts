import type { FormStateType } from "@/types/forms/FormStateType";
import type { TransactionPayloadType } from "./payload";

export type TransactionFormStateType = TransactionPayloadType & FormStateType;
import { CurrencyTypeObject } from "@/enums/profile/CurrencyType";
import { z } from "zod";

export const ProfileSchema = z.object({
    avatar: z.array(z.instanceof(File))
        .min(1, "At least one file is required")
        .max(5, "You can upload a maximum of 5 files")
    // .superRefine((files: File[], ctx: z.RefinementCtx) => {
    //     files.forEach((file, index) => {
    //         if (file.size > 1) {
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `File ${file.name} exceeds the 1MB limit`,
    //                 path: [index],
    //             });
    //         }

    //         if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: `File ${file.name} is an invalid format. Only JPG, PNG, and WEBP are allowed`,
    //                 path: [index],
    //             });
    //         }
    //     });
    // })
    ,
    currency: z.enum(Object.values(CurrencyTypeObject) as [string, ...string[]]),
    budget: z.number().positive(),
})

export const formProfileInitialState = {
    avatar: [],
    currency: "",
    budget: 0,
}
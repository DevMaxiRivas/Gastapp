import { CurrencyTypeObject } from "@/enums/profile/CurrencyType";
import { z } from "zod";

const avatarSchema = z.array(z.instanceof(File))
    .superRefine((files: File[] | undefined, ctx: z.RefinementCtx) => {
        if (!files) return;
        files.forEach((file) => {
            if (file.size > 10 * 1024 * 1024) {
                ctx.addIssue({
                    code: "custom",
                    message: `File ${file.name} exceeds the 10MB limit`,
                    input: files,
                });
            }
            if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
                ctx.addIssue({
                    code: "custom",
                    message: `File ${file.name} is an invalid format. Only JPG, PNG, and WEBP are allowed`,
                    input: files,
                });
            }
        });
    });

const baseProfileFields = {
    avatar: avatarSchema,
    currency: z.enum(Object.values(CurrencyTypeObject) as [string, ...string[]]),
    budget: z.number().positive(),
};

export const ProfileSchema = z.object(baseProfileFields);
export const ProfileUpdateSchema = z.object(baseProfileFields).partial();

export const formProfileInitialState = {
    avatar: [],
    currency: "",
    budget: 0,
};
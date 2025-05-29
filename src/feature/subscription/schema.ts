import { z } from "zod";

export const Plans = {
    'Arcade': {
        priceMonthly: 9,
        priceYearly: 90
    },
    'Advanced':{
        priceMonthly: 12,
        priceYearly: 120
    },
    'Pro':{
        priceMonthly: 15,
        priceYearly: 150
    },
} as const;

export const Addons = {
    'OnlineService': {
        priceMonthly: 1,
        priceYearly: 10
    },
    'LargerStorage': {
        priceMonthly: 2,
        priceYearly: 20
    },
    'CustomizableProfile': {
        priceMonthly: 2,
        priceYearly: 20
    },
} as const;

const PlanEnum = Object.keys(Plans) as [keyof typeof Plans];

export const subscriptionSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
    plan: z.enum(PlanEnum, {
        errorMap: () => ({ message: "Please select a plan" }),
    }),
    addons: z.object(
        Object.keys(Addons).reduce((acc, key) => {
        acc[key as keyof typeof Addons] = z.boolean().optional();
        return acc;
    }, {} as Record<keyof typeof Addons, z.ZodOptional<z.ZodBoolean>>)
    ).optional(),
    billingCycle: z.enum(["monthly", "yearly"], {
        errorMap: () => ({ message: "Please select a billing cycle" }),
    })
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
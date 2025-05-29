"use client";
import { subscriptionSchema } from "@/feature/subscription/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./PlanForm.module.scss";
import clsx from "clsx";
import { useSubscriptionStore } from "@/app/store";
import { useEffect } from "react";
import Headline from "../Headline/Headline";
import Button from "../Button/Button";

const planSchema = subscriptionSchema.pick({
  billingCycle: true,
  plan: true,
});

type PlanSchema = z.infer<typeof planSchema>;

const PlanForm = () => {
  const setData = useSubscriptionStore((state) => state.setData);
  const billingCycle = useSubscriptionStore((state) => state.billingCycle);
  const plan = useSubscriptionStore((state) => state.plan);
  const name = useSubscriptionStore((state) => state.name);
  const email = useSubscriptionStore((state) => state.email);
  const phone = useSubscriptionStore((state) => state.phone);

  const router = useRouter();
  const { handleSubmit, control } = useForm<PlanSchema>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      plan: plan ?? "Arcade", // Default plan
      billingCycle: billingCycle ?? "monthly", // Default billing cycle
    },
  });

  const onSubmit = (data: PlanSchema) => {
    setData(data);
    router.push("/addons");
  };

  useEffect(() => {
    if (!useSubscriptionStore.persist.hasHydrated) return;

    if (!name || !email || !phone) {
      router.push("./userinfo");
    }
  }, [useSubscriptionStore.persist.hasHydrated, name, email, phone, router]);

  return (
    <div>
      <Headline
        title="Select your plan"
        subtitle="You have the option of monthly or yearly billing."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="plan"
          control={control}
          render={({ field }) => (
            <div>
              <button
                type="button"
                className={clsx(styles.planForm__option, {
                  [styles["planForm__option--selected"]]:
                    field.value === "Arcade",
                })}
                onClick={() => {
                  field.onChange("Arcade");
                }}
              >
                <img />
                <div>
                  <p>Arcade</p>
                  <p>$9/mo</p>
                </div>
              </button>
              <button
                type="button"
                className={clsx(styles.planForm__option, {
                  [styles["planForm__option--selected"]]:
                    field.value === "Advanced",
                })}
                onClick={() => field.onChange("Advanced")}
              >
                <img />
                <div>
                  <p>Advanced</p>
                  <p>$12/mo</p>
                </div>
              </button>
              <button
                type="button"
                className={clsx(styles.planForm__option, {
                  [styles["planForm__option--selected"]]: field.value === "Pro",
                })}
                onClick={() => field.onChange("Pro")}
              >
                <img />
                <div>
                  <p>Pro</p>
                  <p>$15/mo</p>
                </div>
              </button>
            </div>
          )}
        />
        <Controller
          name="billingCycle"
          control={control}
          render={({ field }) => (
            <div>
              <span>Monthly</span>
              <input
                type="checkbox"
                checked={field.value === "yearly"}
                onChange={(e) => {
                  field.onChange(e.target.checked ? "yearly" : "monthly");
                }}
              />
              <span>Yearly</span>
            </div>
          )}
        />
        <Button
          type="button"
          onClick={() => {
            router.push("/userinfo");
          }}
          variant="minimal"
          text="Go Back"
        />
        <Button type="submit" text="Next Step" />
      </form>
    </div>
  );
};

export default PlanForm;

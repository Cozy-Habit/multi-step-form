"use client";
import { useSubscriptionStore } from "@/app/store";
import { Plans, subscriptionSchema } from "@/feature/subscription/schema";
import formatPrice from "@/utils/formatPrice";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../Button/Button";
import Headline from "../Headline/Headline";
import Select from "../Select/Select";
import styles from "./PlanForm.module.scss";

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

  const [cycle, setCycle] = useState(billingCycle ?? "monthly");

  const router = useRouter();
  const { handleSubmit, control } = useForm<PlanSchema>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      plan: plan ?? "Arcade", // Default plan
      billingCycle: cycle, // Default billing cycle
    },
  });

  const onSubmit = (data: PlanSchema) => {
    setData(data);
    router.push("/addons");
  };

  useEffect(() => {
    if (!name || !email || !phone) {
      router.push("./userinfo");
    }
  }, [name, email, phone, router]);

  return (
    <div className={styles.planForm}>
      <Headline
        title="Select your plan"
        subtitle="You have the option of monthly or yearly billing."
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.planForm__form}>
        <div className={styles.planForm__inputContainer}>
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <div className={styles.planForm__selection}>
                {Object.entries(Plans).map((plan, index) => {
                  const price =
                    cycle === "monthly"
                      ? plan[1].priceMonthly
                      : plan[1].priceYearly;

                  if (price)
                    return (
                      <Select
                        key={index}
                        img={`./icon-${plan[0].toString().toLowerCase()}.svg`}
                        onClick={() => {
                          field.onChange(plan[0]);
                        }}
                        subtitle={formatPrice(price.toString(), cycle)}
                        title={plan[0]}
                        isSelected={field.value === plan[0]}
                        extra={cycle === "yearly" ? "2 months free" : undefined}
                      />
                    );
                })}
              </div>
            )}
          />
          <Controller
            name="billingCycle"
            control={control}
            render={({ field }) => (
              <div className={styles.planForm__cycle}>
                <span
                  className={clsx({
                    [styles["planForm__cycle--selected"]]:
                      field.value === "monthly",
                  })}
                >
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCycle(field.value === "monthly" ? "yearly" : "monthly");
                    field.onChange(
                      field.value === "monthly" ? "yearly" : "monthly"
                    );
                  }}
                  className={clsx(styles.planForm__toggle, {
                    [styles["planForm__toggle--selected"]]:
                      field.value === "yearly",
                  })}
                >
                  <div className={styles.planForm__toggleSwitch}></div>
                </button>
                <span
                  className={clsx({
                    [styles["planForm__cycle--selected"]]: cycle === "yearly",
                  })}
                >
                  Yearly
                </span>
              </div>
            )}
          />
        </div>
        <footer className={styles.planForm__buttons}>
          <Button
            type="button"
            onClick={() => {
              router.push("/userinfo");
            }}
            variant="minimal"
            text="Go Back"
          />
          <Button type="submit" text="Next Step" />
        </footer>
      </form>
    </div>
  );
};

export default PlanForm;

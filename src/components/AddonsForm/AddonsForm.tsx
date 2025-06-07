"use client";
import { useSubscriptionStore } from "@/app/store";
import { Addons, subscriptionSchema } from "@/feature/subscription/schema";
import formatPrice from "@/utils/formatPrice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import Headline from "../Headline/Headline";
import styles from "./AddonsForm.module.scss";

const addonsSchema = subscriptionSchema.pick({
  addons: true,
});

type PlanSchema = z.infer<typeof addonsSchema>;

const SubtitleMap = {
  OnlineService: "Access to multiplayer games",
  LargerStorage: "Extra 1 TB of cloud save",
  CustomizableProfile: "Custom theme on your profile",
};

const AddonsForm = () => {
  const setData = useSubscriptionStore((state) => state.setData);
  const addons = useSubscriptionStore((state) => state.addons);
  const plan = useSubscriptionStore((state) => state.plan);
  const billingCycle = useSubscriptionStore((state) => state.billingCycle);

  const router = useRouter();
  const { handleSubmit, control } = useForm<PlanSchema>({
    resolver: zodResolver(addonsSchema),
    defaultValues: {
      addons: addons ?? {},
    },
  });

  const onSubmit = (data: PlanSchema) => {
    setData(data);
    router.push("/summary");
  };

  useEffect(() => {
    if (!plan || !billingCycle) {
      router.push("./plan");
    }
  }, [plan, billingCycle, router]);

  return (
    <div className={styles.addonsForm}>
      <Headline
        title="Pick add-ons"
        subtitle="Add-ons help enhance your gaming experience"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.addonsForm__form}
      >
        <div className={styles.addonsForm__addons}>
          <Controller
            control={control}
            name="addons"
            render={({ field }) => (
              <>
                {Object.entries(Addons).map((addon, index) => {
                  const key: keyof typeof Addons =
                    addon[0] as keyof typeof Addons;
                  const price =
                    billingCycle === "monthly"
                      ? addon[1].priceMonthly
                      : addon[1].priceYearly;

                  if (billingCycle)
                    return (
                      <Checkbox
                        key={index}
                        price={formatPrice(price.toString(), billingCycle)}
                        subtitle={SubtitleMap[key]}
                        title={addon[0].replace(/([A-Z])/g, " $1").trim()}
                        isSelected={field.value?.[key] ?? false}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            [key]: e.target.checked ? true : false,
                          })
                        }
                      />
                    );
                })}
              </>
            )}
          />
        </div>
        <footer className={styles.addonsForm__buttons}>
          <Button
            onClick={() => router.push("/plan")}
            text="Go Back"
            variant="minimal"
          />
          <Button type="submit" text="Next Step" />
        </footer>
      </form>
    </div>
  );
};

export default AddonsForm;

"use client";
import { subscriptionSchema } from "@/feature/subscription/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./AddonsForm.module.scss";
import clsx from "clsx";
import { useSubscriptionStore } from "@/app/store";
import { useEffect } from "react";
import Headline from "../Headline/Headline";

const addonsSchema = subscriptionSchema.pick({
  addons: true,
});

type PlanSchema = z.infer<typeof addonsSchema>;

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
    console.log(data);
    setData(data);
    router.push("/summary");
  };

  useEffect(() => {
    if (!useSubscriptionStore.persist.hasHydrated) return;

    if (!plan || !billingCycle) {
      router.push("./plan");
    }
  }, [useSubscriptionStore.persist.hasHydrated, plan, billingCycle, router]);

  return (
    <div>
      <Headline
        title="Pick add-ons"
        subtitle="Add-ons help enhance your gaming experience"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="addons"
          render={({ field }) => (
            <div>
              <div
                className={clsx(styles.addonsForm__option, {
                  [styles["addonsForm__option--selected"]]:
                    field.value?.OnlineService,
                })}
              >
                <input
                  type="checkbox"
                  checked={field.value?.OnlineService}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      OnlineService: e.target.checked ? true : false,
                    })
                  }
                />
                <p>Online service</p>
                <p>Access the multiplayer games</p>
                <span>+$1/mo</span>
              </div>
              <div
                className={clsx(styles.addonsForm__option, {
                  [styles["addonsForm__option--selected"]]:
                    field.value?.LargerStorage,
                })}
              >
                <input
                  type="checkbox"
                  checked={field.value?.LargerStorage}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      LargerStorage: e.target.checked ? true : false,
                    })
                  }
                />
                <p>Larger storage</p>
                <p>Extra 1TB of cloud save</p>
                <span>+$2/mo</span>
              </div>
              <div
                className={clsx(styles.addonsForm__option, {
                  [styles["addonsForm__option--selected"]]:
                    field.value?.CustomizableProfile,
                })}
              >
                <input
                  type="checkbox"
                  checked={field.value?.CustomizableProfile}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      CustomizableProfile: e.target.checked ? true : false,
                    })
                  }
                />
                <p>Customizable profile</p>
                <p>Custom theme on your profile</p>
                <span>+$2/mo</span>
              </div>
            </div>
          )}
        />
        <button type="button" onClick={() => router.push("/plan")}>
          Go back
        </button>
        <button type="submit">Next Step</button>
      </form>
    </div>
  );
};

export default AddonsForm;

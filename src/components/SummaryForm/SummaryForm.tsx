"use client";
import { useSubscriptionStore } from "@/app/store";
import { Addons, Plans } from "@/feature/subscription/schema";
import formatPrice from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Headline from "../Headline/Headline";
import styles from "./SummaryForm.module.scss";

type AddonsProps = { name: string; price: number }[];
type PricingProps = {
  planPrice: number;
  addonsPrice?: AddonsProps;
  fullPrice: number;
};

const SummaryForm = () => {
  const [pricing, setPricing] = useState<PricingProps>();
  const plan = useSubscriptionStore((state) => state.plan);
  const billingCycle = useSubscriptionStore((state) => state.billingCycle);
  const addons = useSubscriptionStore((state) => state.addons);

  const router = useRouter();

  const handleSubmit = () => {
    useSubscriptionStore.persist.clearStorage();
    router.push("/success");
  };

  const getFullPrice = () => {
    if (plan) {
      const planPrice =
        billingCycle === "monthly"
          ? Plans[plan].priceMonthly
          : Plans[plan].priceYearly;

      const addonsPrice: AddonsProps = [];

      if (addons != undefined) {
        if (Object.entries(addons).length === 0)
          return { planPrice, fullPrice: planPrice };

        Object.entries(addons).map(([key]) => {
          const price =
            billingCycle === "monthly"
              ? Addons[key as keyof typeof Addons].priceMonthly
              : Addons[key as keyof typeof Addons].priceYearly;

          addonsPrice.push({
            name: key,
            price,
          });
        });
      }
      const fullPrice =
        planPrice +
        addonsPrice.reduce(({ price: accPrice }, { price: curPrice }) => {
          return { name: "", price: accPrice + curPrice };
        }).price;

      return { planPrice, addonsPrice, fullPrice };
    }
  };

  useEffect(() => {
    if (!addons) {
      router.push("./addons");
    } else setPricing(getFullPrice());
  }, [addons, router]);

  if (pricing && billingCycle)
    return (
      <div className={styles.summaryForm}>
        <div>
          <Headline
            title="Finishing up"
            subtitle="Double-check everything looks OK before confirming."
          />

          <div className={styles.summaryForm__info}>
            <div className={styles.summaryForm__planWrapper}>
              <div className={styles.summaryForm__plan}>
                <span>
                  {plan} ({billingCycle})
                </span>
                <span>
                  <a onClick={() => router.push("/plan")} href="">
                    Change
                  </a>
                </span>
              </div>
              <span>
                {formatPrice(pricing.planPrice.toString(), billingCycle)}
              </span>
            </div>
            {pricing.addonsPrice && (
              <>
                <div className={styles.summaryForm__divider}></div>
                <div className={styles.summaryForm__addonWrapper}>
                  {pricing.addonsPrice &&
                    pricing.addonsPrice.map(({ name, price }, index) => {
                      return (
                        <div key={index} className={styles.summaryForm__addon}>
                          <p>{name.replace(/([A-Z])/g, " $1").trim()}</p>
                          <span>
                            +{formatPrice(price.toString(), billingCycle)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
          <div className={styles.summaryForm__total}>
            <p>Total (per {billingCycle === "monthly" ? "month" : "year"})</p>
            <span>
              +{formatPrice(pricing.fullPrice.toString(), billingCycle)}
            </span>
          </div>
        </div>
        <footer className={styles.summaryForm__buttons}>
          <Button
            onClick={() => router.push("/addons")}
            text="Go Back"
            variant="minimal"
          />
          <Button
            className={styles.summaryForm__confirmButton}
            onClick={handleSubmit}
            text="Confirm"
          />
        </footer>
      </div>
    );
};

export default SummaryForm;

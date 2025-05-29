"use client";
import { useSubscriptionStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { Addons, Plans } from "@/feature/subscription/schema";
import { useEffect, useState } from "react";
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
  const name = useSubscriptionStore((state) => state.name);
  const email = useSubscriptionStore((state) => state.email);
  const phone = useSubscriptionStore((state) => state.phone);
  const plan = useSubscriptionStore((state) => state.plan);
  const billingCycle = useSubscriptionStore((state) => state.billingCycle);
  const addons = useSubscriptionStore((state) => state.addons);

  const router = useRouter();

  const handleSubmit = () => {
    useSubscriptionStore.persist.clearStorage();
    router.push("/success");
  };

  const formatPrice = (price: string) => {
    if (billingCycle)
      return billingCycle === "monthly" ? `+$${price}/mo` : `+$${price}/yr`;
    else console.error("BillingCycle is not set");
  };

  const getFullPrice = () => {
    const planPrice =
      billingCycle === "monthly"
        ? Plans[plan].priceMonthly
        : Plans[plan].priceYearly;

    const addonsPrice: AddonsProps = [];

    if (Object.entries(addons).length === 0)
      return { planPrice, fullPrice: planPrice };

    Object.entries(addons).map(([key]) => {
      const price =
        billingCycle === "monthly"
          ? Addons[key].priceMonthly
          : Addons[key].priceYearly;

      addonsPrice.push({
        name: key,
        price,
      });
    });

    const fullPrice =
      planPrice +
      addonsPrice.reduce(({ price: accPrice }, { price: curPrice }) => {
        return { name: "", price: accPrice + curPrice };
      }).price;

    return { planPrice, addonsPrice, fullPrice };
  };

  useEffect(() => {
    if (!useSubscriptionStore.persist.hasHydrated) return;

    if (!addons) {
      router.push("./addons");
    } else setPricing(getFullPrice());
  }, [useSubscriptionStore.persist.hasHydrated, addons, router]);

  if (pricing)
    return (
      <div>
        <Headline
          title="Finishing up"
          subtitle="Double-check everything looks OK before confirming."
        />

        <div>
          <div>
            <div>
              <span>
                {plan} ({billingCycle})
              </span>
              <a onClick={() => router.push("/plan")}>Change</a>
            </div>
            <span>{formatPrice(pricing.planPrice.toString())}</span>
          </div>
          <br></br>
          {pricing.addonsPrice &&
            pricing.addonsPrice.map(({ name, price }) => {
              return (
                <div>
                  <p>{name}</p>
                  <span>{formatPrice(price.toString())}</span>
                </div>
              );
            })}
        </div>
        <div>
          <p>Total (per {billingCycle === "monthly" ? "month" : "year"})</p>
          <p>{formatPrice(pricing.fullPrice.toString())}</p>
        </div>
        <button onClick={() => router.push("/addons")}>Go Back</button>
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    );
};

export default SummaryForm;

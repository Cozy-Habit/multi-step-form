"use client";

import { useSubscriptionStore } from "@/app/store";
import { subscriptionSchema } from "@/feature/subscription/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./UserInfoForm.module.scss";
import InputField from "../InputField/InputField";
import Headline from "../Headline/Headline";
import Button from "../Button/Button";
const userInfoSchema = subscriptionSchema.pick({
  name: true,
  email: true,
  phone: true,
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;

const UserInfoForm = () => {
  const setData = useSubscriptionStore((state) => state.setData);
  const name = useSubscriptionStore((state) => state.name);
  const email = useSubscriptionStore((state) => state.email);
  const phone = useSubscriptionStore((state) => state.phone);

  const router = useRouter();
  const { handleSubmit, control } = useForm<UserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: name,
      email: email,
      phone: phone,
    },
  });

  const onSubmit = (data: UserInfoSchema) => {
    setData(data);
    router.push("/plan");
  };

  useEffect(() => {
    if (!useSubscriptionStore.persist.hasHydrated) return;
  }, [useSubscriptionStore.persist.hasHydrated, router]);

  return (
    <div className={styles.userInfoForm}>
      <Headline
        title="Personal info"
        subtitle="Please provide your name, email address, and phone number."
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.userInfoForm__form}
      >
        <div className={styles.userInfoForm__inputContainer}>
          <InputField
            name="name"
            control={control}
            label="Name"
            placeholder="e.g. Stephan King"
          />
          <InputField
            name="email"
            control={control}
            label="Email Address"
            placeholder="e.g. stephanking@lorem.com"
          />
          <InputField
            name="phone"
            control={control}
            label="Phone Number"
            placeholder="e.g. +1 234 567 890"
          />
        </div>
        <Button
          type="submit"
          text="Next Step"
          className={styles.userInfoForm__button}
        />
      </form>
    </div>
  );
};

export default UserInfoForm;

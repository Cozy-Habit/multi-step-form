"use client";

import { useSubscriptionStore } from "@/app/store";
import { subscriptionSchema } from "@/feature/subscription/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userInfoSchema = subscriptionSchema.pick({
  name: true,
  email: true,
  phone: true,
});

type UserInfoSchema = z.infer<typeof userInfoSchema>;

const UserInfoForm = () => {
  const setData = useSubscriptionStore((state) => state.setData);
  const name = useSubscriptionStore((state) => state.name);
  const email = useSubscriptionStore((state) => state.email);
  const phone = useSubscriptionStore((state) => state.phone);

  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<UserInfoSchema>({
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
    <div>
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input placeholder="e.g. Stephan King" {...register("name")} />
          {formState.errors.name && <p>{formState.errors.name.message}</p>}
        </div>
        <div>
          <label>Email Address</label>
          <input
            placeholder="e.g. stephanking@lorem.com"
            {...register("email")}
          />
          {formState.errors.email && <p>{formState.errors.email.message}</p>}
        </div>
        <div>
          <label>Phone Number</label>
          <input placeholder="e.g. +1 234 567 890" {...register("phone")} />
          {formState.errors.phone && <p>{formState.errors.phone.message}</p>}
        </div>
        <button type="submit">Next Step</button>
      </form>
    </div>
  );
};

export default UserInfoForm;

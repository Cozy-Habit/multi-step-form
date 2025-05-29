import { SubscriptionSchema } from '@/feature/subscription/schema';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SubscriptionState = Partial<SubscriptionSchema> & {
    setData: (data: Partial<SubscriptionSchema>) => void;
};

export const useSubscriptionStore = create<SubscriptionState>()(
    persist(
        (set) => ({
            setData: (data) => set(data),
        }),
        {
            name: "subscription-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
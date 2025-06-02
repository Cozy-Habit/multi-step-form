const formatPrice = (price: string, billingCycle: "monthly" | "yearly") => {
  return billingCycle === "monthly" ? `$${price}/mo` : `$${price}/yr`;
};

export default formatPrice;

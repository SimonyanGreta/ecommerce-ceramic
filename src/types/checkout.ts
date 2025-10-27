export type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes: string;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>> & {
  form?: string;
};

export type CheckoutField =
  | "fullName"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "country";

export type CheckoutErrorCode = "required" | "invalid";

export type CheckoutErrorCodes = Partial<
  Record<CheckoutField, CheckoutErrorCode>
>;

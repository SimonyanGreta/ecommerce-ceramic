export type CheckoutItemIssue =
  | {
      type: "out_of_stock";
      requested: number;
      available: number;
    }
  | {
      type: "unavailable";
    };

export type CheckoutItemIssuesMap = Record<string, CheckoutItemIssue>;

import type { ApiScope } from "./types";

export const API_SCOPES: ApiScope[] = [
  {
    name: "view_profile",
    description: "read-only access to the user's public information and products.",
  },
  {
    name: "edit_products",
    description: "read/write access to the user's products and their variants, offer codes, and custom fields.",
  },
  {
    name: "view_sales",
    description:
      "read access to the user's products' sales information, including sales counts. This scope is also required in order to subscribe to the user's sales.",
  },
  {
    name: "view_payouts",
    description: "read access to the user's payouts information.",
  },
  {
    name: "mark_sales_as_shipped",
    description: "write access to mark the user's products' sales as shipped.",
  },
  {
    name: "edit_sales",
    description: "write access to refund the user's products' sales and resend purchase receipts to customers.",
  },
];

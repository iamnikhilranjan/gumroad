import { usePage } from "@inertiajs/react";
import React from "react";
import { cast } from "ts-safe-cast";

import { default as PaymentsPageComponent, type PaymentsPageProps } from "$app/components/Settings/PaymentsPage";

const PaymentsPage = () => {
  const props = cast<PaymentsPageProps>(usePage().props);

  return <PaymentsPageComponent {...props} />;
};

export default PaymentsPage;

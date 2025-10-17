import { usePage } from "@inertiajs/react";
import React from "react";

import CustomersPage, { type CustomerPageProps } from "$app/components/Audience/Customers";

function index() {
  const { customers_presenter } = usePage<{ customers_presenter: CustomerPageProps }>().props;

  return <CustomersPage {...customers_presenter} />;
}

export default index;

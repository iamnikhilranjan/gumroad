import { usePage } from "@inertiajs/react";
import React from "react";
import { cast } from "ts-safe-cast";

import {
  default as ThirdPartyAnalyticsPageComponent,
  type ThirdPartyAnalyticsPageProps,
} from "$app/components/Settings/ThirdPartyAnalyticsPage";

function ThirdPartyAnalyticsPage() {
  const props = cast<ThirdPartyAnalyticsPageProps>(usePage().props);

  return <ThirdPartyAnalyticsPageComponent {...props} />;
}

export default ThirdPartyAnalyticsPage;

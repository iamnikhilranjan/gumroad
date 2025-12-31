import { usePage } from "@inertiajs/react";
import * as React from "react";
import { cast } from "ts-safe-cast";

import type { UtmLinkFormContext, UtmLink } from "$app/types/utm_link";

import { UtmLinkForm } from "$app/components/UtmLinksPage/UtmLinkForm";

type NewUtmLinkProps = {
  context: UtmLinkFormContext;
  utm_link: UtmLink | null;
};

export default function UtmLinksNew() {
  const props = cast<NewUtmLinkProps>(usePage().props);

  return <UtmLinkForm context={props.context} utm_link={props.utm_link} />;
}

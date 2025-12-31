import { usePage } from "@inertiajs/react";
import * as React from "react";
import { cast } from "ts-safe-cast";

import type { UtmLinkFormContext, SavedUtmLink } from "$app/types/utm_link";

import { UtmLinkForm } from "$app/components/UtmLinksPage/UtmLinkForm";

type EditUtmLinkProps = {
  context: UtmLinkFormContext;
  utm_link: SavedUtmLink;
};

export default function UtmLinksEdit() {
  const props = cast<EditUtmLinkProps>(usePage().props);

  return <UtmLinkForm context={props.context} utm_link={props.utm_link} />;
}

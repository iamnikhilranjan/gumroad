import { cast } from "ts-safe-cast";

import { request, ResponseError } from "$app/utils/request";

import type {
  UtmLinkDestinationOption,
  UtmLink,
  SavedUtmLink,
  UtmLinkStats,
  UtmLinksStats,
  UtmLinkFormContext,
  SortKey,
} from "$app/types/utm_link";

export type {
  UtmLinkDestinationOption,
  UtmLink,
  SavedUtmLink,
  UtmLinkStats,
  UtmLinksStats,
  UtmLinkFormContext,
  SortKey,
};

export function getUtmLinksStats({ ids }: { ids: string[] }) {
  const abort = new AbortController();
  const response = request({
    method: "GET",
    accept: "json",
    url: Routes.internal_utm_links_stats_path({ ids }),
    abortSignal: abort.signal,
  })
    .then((res) => res.json())
    .then((json) => cast<UtmLinksStats>(json));

  return {
    response,
    cancel: () => abort.abort(),
  };
}

export async function getUniquePermalink() {
  const response = await request({
    method: "GET",
    accept: "json",
    url: Routes.internal_utm_link_unique_permalink_path(),
  });
  if (!response.ok) throw new ResponseError();
  return cast<{ permalink: string }>(await response.json());
}

import React from "react";

import { type UrlRedirect } from "$app/components/Admin/Purchases/PurchaseDetails";

type Props = {
  url_redirect?: UrlRedirect | undefined;
};

const AdminPurchaseInfoUrlRedirect = ({ url_redirect }: Props) =>
  url_redirect && (
    <a href={url_redirect.download_page_url} target="_blank" rel="noopener noreferrer">
      {url_redirect.download_page_url} ({url_redirect.uses} uses)
    </a>
  );

export default AdminPurchaseInfoUrlRedirect;

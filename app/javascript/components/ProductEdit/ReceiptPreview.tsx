import * as React from "react";

import { request, assertResponseError, ResponseError } from "$app/utils/request";

import { useProductEditContext } from "$app/components/ProductEdit/state";
import { useDebouncedCallback } from "$app/components/useDebouncedCallback";
import { useOnChange } from "$app/components/useOnChange";
import { useRunOnce } from "$app/components/useRunOnce";

export const ReceiptPreview = () => {
  const {
    uniquePermalink,
    product: { custom_receipt_text, custom_view_content_button_text },
  } = useProductEditContext();
  const [receiptHtml, setReceiptHtml] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchReceiptPreview = React.useCallback(async () => {
    if (!uniquePermalink) return;

    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (custom_receipt_text) {
        params.append("custom_receipt_text", custom_receipt_text);
      }
      if (custom_view_content_button_text) {
        params.append("custom_view_content_button_text", custom_view_content_button_text);
      }

      const url = `/internal/products/${uniquePermalink}/receipt_preview${params.toString() ? `?${params.toString()}` : ""}`;

      const response = await request({
        method: "GET",
        url,
        accept: "html",
      });

      if (!response.ok) throw new ResponseError("Server returned error response");

      const html = await response.text();

      setReceiptHtml(html);
    } catch (e) {
      assertResponseError(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [uniquePermalink, custom_receipt_text, custom_view_content_button_text]);

  const debouncedFetchReceiptPreview = useDebouncedCallback(() => void fetchReceiptPreview(), 300);

  useRunOnce(() => void fetchReceiptPreview());
  useOnChange(debouncedFetchReceiptPreview, [uniquePermalink, custom_receipt_text, custom_view_content_button_text]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-secondary">Loading receipt preview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: receiptHtml }} />;
};

import * as React from "react";

import { Layout } from "$app/components/ProductEdit/Layout";
import { CustomReceiptTextInput } from "$app/components/ProductEdit/ProductTab/CustomReceiptTextInput";
import { CustomViewContentButtonTextInput } from "$app/components/ProductEdit/ProductTab/CustomViewContentButtonTextInput";
import { ReceiptPreview } from "$app/components/ProductEdit/ReceiptPreview";
import { useProductEditContext } from "$app/components/ProductEdit/state";

export const ReceiptTab = () => {
  const { product, updateProduct } = useProductEditContext();

  return (
    <Layout preview={<ReceiptPreview />} previewScaleFactor={1} withBorder={false} withNavigationButton={false}>
      <div className="squished">
        <form>
          <section className="p-4! md:p-8!">
            <CustomViewContentButtonTextInput
              value={product.custom_view_content_button_text}
              onChange={(value) => updateProduct({ custom_view_content_button_text: value })}
              maxLength={product.custom_view_content_button_text_max_length}
            />
            <CustomReceiptTextInput
              value={product.custom_receipt_text}
              onChange={(value) => updateProduct({ custom_receipt_text: value })}
              maxLength={product.custom_receipt_text_max_length}
            />
          </section>
        </form>
      </div>
    </Layout>
  );
};

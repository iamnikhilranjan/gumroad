import React from "react";
import { Link } from "@inertiajs/react";
import AdminPurchasesState from "$app/components/Admin/Search/Purchases/State";
import { CopyToClipboard } from "$app/components/CopyToClipboard";
import { WithTooltip } from "$app/components/WithTooltip";
import { Icon } from "$app/components/Icons";
import DateTimeWithRelativeTooltip from "$app/components/Admin/DateTimeWithRelativeTooltip";

type ProductRefundPolicy = {
  title: string;
  max_refund_period_in_days: number;
};

type PurchaseRefundPolicy = {
  title: string;
  max_refund_period_in_days: number;
};

type Seller = {
  id: number;
  email: string;
};

type Product = {
  id: number;
  long_url: string;
  name: string;
  product_refund_policy?: ProductRefundPolicy;
};

export type Purchase = {
  id: number;
  email: string;
  formatted_display_price: string;
  formatted_gumroad_tax_amount: string;
  link: Product;
  variants_list: string;
  purchase_states: string[];
  purchase_refund_policy?: PurchaseRefundPolicy;
  seller: Seller;
  failed: boolean;
  error_code: string;
  formatted_error_code: string;
  purchase_state: string;
  stripe_refunded: boolean;
  stripe_partially_refunded: boolean;
  chargedback_not_reversed: boolean;
  chargeback_reversed: boolean;
  created_at: string;
};

type Props = {
  purchase: Purchase;
};

const AdminPurchasesPurchase = ({ purchase }: Props) => {
  const productRefundPolicyTitle = purchase.link?.product_refund_policy?.title || "None";

  const isDifferentThanProductRefundPolicy = () => {
    if (!purchase.purchase_refund_policy) return true

    if (purchase.purchase_refund_policy.max_refund_period_in_days) {
      return purchase.purchase_refund_policy.max_refund_period_in_days !== purchase.link?.product_refund_policy?.max_refund_period_in_days
    }

    return purchase.purchase_refund_policy.title !== purchase.link?.product_refund_policy?.title
  }

  const shouldDisplayTooltip = !isDifferentThanProductRefundPolicy()

  return (
    <tr>
      <td data-label="Purchase">
        <Link href={Routes.admin_purchase_path(purchase.id)}>{purchase.formatted_display_price}</Link>
        <span>{purchase.formatted_gumroad_tax_amount ? ` + ${purchase.formatted_gumroad_tax_amount} VAT` : null}</span>

        <Link href={Routes.admin_product_url(purchase.link.id)} className="ml-2">{purchase.link.name}</Link>

        <span className="ml-2">{purchase.variants_list}</span>

        <Link href={purchase.link.long_url} target="_blank" className="no-underline ml-2 mr-1">
          <Icon name="arrow-up-right-square" />
        </Link>
        <AdminPurchasesState purchase={purchase} />

        <div className="text-sm">
          <ul className="inline">
            {
              purchase.purchase_refund_policy &&
                <>
                  <li>Refund policy: {purchase.purchase_refund_policy.title}</li>
                  {
                    shouldDisplayTooltip &&
                      <WithTooltip tip={`Current refund policy: ${productRefundPolicyTitle}`}>
                        <Icon name="solid-shield-exclamation" />
                      </WithTooltip>
                  }
                </>
            }
            <li>Seller: {purchase.seller.email}</li>
          </ul>
        </div>
      </td>

      <td data-label="By">
        <div className="inline-flex items-center space-x-1">
          <Link href={Routes.admin_search_purchases_path({ query: purchase.email })}>{purchase.email}</Link>
          <CopyToClipboard text={purchase.email}>
            <Icon name="outline-duplicate" className="cursor-pointer" />
          </CopyToClipboard>
        </div>

        <small><DateTimeWithRelativeTooltip date={purchase.created_at} /></small>
      </td>
    </tr>
  );
};

export default AdminPurchasesPurchase;

import React from "react";

import CodeSnippet from "$app/components/ui/CodeSnippet";

import { ApiEndpoint } from "../ApiEndpoint";
import { ApiParameter, ApiParameters } from "../ApiParameters";

export const GetPayouts = () => (
  <ApiEndpoint
    method="get"
    path="/payouts"
    description="Retrieves all of the payouts for the authenticated user. Available with the 'view_payouts' scope."
  >
    <ApiParameters>
      <ApiParameter
        name="after"
        description="(optional, date in form YYYY-MM-DD) - Only return payouts after this date"
      />
      <ApiParameter
        name="before"
        description="(optional, date in form YYYY-MM-DD) - Only return payouts before this date"
      />
      <ApiParameter
        name="page_key"
        description="(optional) - A key representing a page of results. It is given in the response as `next_page_key`."
      />
      <ApiParameter
        name="include_upcoming"
        description='(optional, default: "true") - Set to "false" to exclude the upcoming payout from the response.'
      />
    </ApiParameters>
    <CodeSnippet caption="cURL example">
      {`curl https://api.gumroad.com/v2/payouts \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "before=2021-09-03" \\
  -d "after=2020-09-03" \\
  -X GET`}
    </CodeSnippet>
    <CodeSnippet caption="Example response:">
      {`{
  "success": true,
  "next_page_url": "/v2/payouts?page_key=20240709081040000000-fEGTaE&before=2021-09-03&after=2020-09-03",
  "next_page_key": "20240709081040000000-fEGTaE",
  "payouts": [
    {
      "id": null,
      "amount": "75.00",
      "currency": "USD",
      "status": "payable",
      "created_at": "2021-01-14T00:00:00Z",
      "processed_at": null,
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    },
    {
      "id": "fEGTaEpuKDsnDvf_MfecTA==",
      "amount": "150.00",
      "currency": "USD",
      "status": "completed",
      "created_at": "2021-01-05T19:38:56Z",
      "processed_at": "2021-01-06T10:15:30Z",
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    },
    {
      "id": "32-nPainqpLj1B_WIwVlMw==",
      "amount": "275.50",
      "currency": "USD",
      "status": "pending",
      "created_at": "2021-01-04T14:22:10Z",
      "processed_at": null,
      "payment_processor": "paypal",
      "bank_account_visual": null,
      "paypal_email": "test@example.com"
    },
    {
      "id": "GazW4_NBcQy-o7Gjjng7lw==",
      "amount": "89.99",
      "currency": "EUR",
      "status": "failed",
      "created_at": "2021-01-03T09:45:32Z",
      "processed_at": null,
      "payment_processor": "stripe",
      "bank_account_visual": "******1234",
      "paypal_email": null
    }
  ]
}`}
    </CodeSnippet>
  </ApiEndpoint>
);

export const GetPayout = () => (
  <ApiEndpoint
    method="get"
    path="/payouts/:id"
    description="Retrieves the details of a specific payout by this user. Available with the 'view_payouts' scope."
  >
    <ApiParameters>
      <ApiParameter
        name="include_sales"
        description='(optional, default: "true") - Set to "false" to exclude the "sales", "refunded_sales", and "disputed_sales" details from the response.'
      />
      <ApiParameter
        name="include_transactions"
        description='(optional, default: "false") - Set to "true" to include the same transaction details as exported payout CSV in the response. All balance transactions included in the payout will be listed in a "transactions" array. Each transaction will be in format: ["Type", "Date", "Purchase ID", "Item Name", "Buyer Name", "Buyer Email", "Taxes ($)", "Shipping ($)", "Sale Price ($)", "Gumroad Fees ($)", "Net Total ($)"]. The "Type" of transactions can be "Sale", "Chargeback", "Full Refund", "Partial Refund", "PayPal Refund", "Stripe Connect Refund", "Affiliate Credit", "PayPal Connect Affiliate Fees", "Stripe Connect Affiliate Fees", "PayPal Payouts", "Stripe Connect Payouts", "Credit", "Payout Fee", and "Technical Adjustment".'
      />
    </ApiParameters>
    <CodeSnippet caption="cURL example">
      {`curl https://api.gumroad.com/v2/payouts/fEGTaEpuKDsnDvf_MfecTA== \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "include_transactions=true" \\
  -X GET`}
    </CodeSnippet>
    <CodeSnippet caption="Example response:">
      {`{
  "success": true,
  "payout": {
    "id": "fEGTaEpuKDsnDvf_MfecTA==",
    "amount": "150.00",
    "currency": "USD",
    "status": "completed",
    "created_at": "2021-01-15T19:38:56Z",
    "processed_at": "2021-01-16T10:15:30Z",
    "payment_processor": "stripe",
    "sales": ["A-m3CDDC5dlrSdKZp0RFhA==", "mN7CdHiwHaR9FlxKvF-n-g=="],
    "refunded_sales": ["mN7CdHiwHaR9FlxKvF-n-g=="],
    "disputed_sales": ["A-m3CDDC5dlrSdKZp0RFhA=="],
    "transactions": [[
          "Sale",
          "2021-01-04",
          "A-m3CDDC5dlrSdKZp0RFhA==",
          "Beautiful widget",
          "Jane Doe",
          "jane@example.com",
          0, 0, 200, 26.6, 173.4],
        [
          "Sale",
          "2021-01-05",
          "mN7CdHiwHaR9FlxKvF-n-g==",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, 10, 2.09, 7.91],
        [
          "Full Refund",
          "2021-01-05",
          "mN7CdHiwHaR9FlxKvF-n-g==",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, -10, 2.09, -7.91],
        [
          "Chargeback",
          "2021-01-05",
          "A-m3CDDC5dlrSdKZp0RFhA== ",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, -200, 26.6, -173.4],
        [
          "PayPal Payouts",
          "2021-01-06",
          "",
          "",
          "",
          "",
          "",
          "",
          -667, "",
          -667]]
  }
}`}
    </CodeSnippet>
  </ApiEndpoint>
);

export const GetUpcomingPayouts = () => (
  <ApiEndpoint
    method="get"
    path="/payouts/upcoming"
    description="Retrieves the details of upcoming payouts for this user. There can be up to 2 upcoming payouts at any given time. Available with the 'view_payouts' scope."
  >
    <ApiParameters>
      <ApiParameter
        name="include_sales"
        description='(optional, default: "true") - Set to "false" to exclude the "sales", "refunded_sales", and "disputed_sales" details from the response.'
      />
      <ApiParameter
        name="include_transactions"
        description='(optional, default: "false") - Set to "true" to include the same transaction details as exported payout CSV in the response. All balance transactions included in the payout will be listed in a "transactions" array. Each transaction will be in format: ["Type", "Date", "Purchase ID", "Item Name", "Buyer Name", "Buyer Email", "Taxes ($)", "Shipping ($)", "Sale Price ($)", "Gumroad Fees ($)", "Net Total ($)"]. The "Type" of transactions can be "Sale", "Chargeback", "Full Refund", "Partial Refund", "PayPal Refund", "Stripe Connect Refund", "Affiliate Credit", "PayPal Connect Affiliate Fees", "Stripe Connect Affiliate Fees", "PayPal Payouts", "Stripe Connect Payouts", "Credit", "Payout Fee", and "Technical Adjustment".'
      />
    </ApiParameters>
    <CodeSnippet caption="cURL example">
      {`curl https://api.gumroad.com/v2/payouts/upcoming \\
  -d "access_token=ACCESS_TOKEN" \\
  -d "include_transactions=true" \\
  -X GET`}
    </CodeSnippet>
    <CodeSnippet caption="Example response:">
      {`{
  "success": true,
  "payouts": [{
    "id": null,
    "amount": "150.00",
    "currency": "USD",
    "status": "payable",
    "created_at": "2021-01-15T19:38:56Z",
    "processed_at": "2021-01-16T10:15:30Z",
    "payment_processor": "stripe",
    "sales": ["A-m3CDDC5dlrSdKZp0RFhA==", "mN7CdHiwHaR9FlxKvF-n-g=="],
    "refunded_sales": ["mN7CdHiwHaR9FlxKvF-n-g=="],
    "disputed_sales": ["A-m3CDDC5dlrSdKZp0RFhA=="],
    "transactions": [[
          "Sale",
          "2021-01-04",
          "A-m3CDDC5dlrSdKZp0RFhA==",
          "Beautiful widget",
          "Jane Doe",
          "jane@example.com",
          0, 0, 200, 26.6, 173.4],
        [
          "Sale",
          "2021-01-05",
          "mN7CdHiwHaR9FlxKvF-n-g==",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, 10, 2.09, 7.91],
        [
          "Full Refund",
          "2021-01-05",
          "mN7CdHiwHaR9FlxKvF-n-g==",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, -10, 2.09, -7.91],
        [
          "Chargeback",
          "2021-01-05",
          "A-m3CDDC5dlrSdKZp0RFhA== ",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, -200, 26.6, -173.4],
        [
          "PayPal Payouts",
          "2021-01-06",
          "",
          "",
          "",
          "",
          "",
          "",
          -667, "",
          -667]]
  }, {
    "id": null,
    "amount": "275.50",
    "currency": "USD",
    "status": "payable",
    "created_at": "2021-01-22T19:38:56Z",
    "processed_at": "2021-01-23T10:15:30Z",
    "payment_processor": "stripe",
    "sales": ["A-m3CDDC5dlrSdKZp0RFhA==", "mN7CdHiwHaR9FlxKvF-n-g=="],
    "refunded_sales": ["mN7CdHiwHaR9FlxKvF-n-g=="],
    "disputed_sales": ["A-m3CDDC5dlrSdKZp0RFhA=="],
    "transactions": [[
          "Sale",
          "2021-01-04",
          "A-m3CDDC5dlrSdKZp0RFhA==",
          "Beautiful widget",
          "Jane Doe",
          "jane@example.com",
          0, 0, 200, 26.6, 173.4],
        [
          "Sale",
          "2021-01-05",
          "mN7CdHiwHaR9FlxKvF-n-g==",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, 10, 2.09, 7.91],
        [
          "Full Refund",
          "2021-01-05",
          "mN7CdHiwHaR9FlxKvF-n-g==",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, -10, 2.09, -7.91],
        [
          "Chargeback",
          "2021-01-05",
          "A-m3CDDC5dlrSdKZp0RFhA== ",
          "Demo",
          "John Doe",
          "john@example.com",
          0, 0, -200, 26.6, -173.4],
        [
          "PayPal Payouts",
          "2021-01-06",
          "",
          "",
          "",
          "",
          "",
          "",
          -667, "",
          -667]]
  }]
}`}
    </CodeSnippet>
  </ApiEndpoint>
);

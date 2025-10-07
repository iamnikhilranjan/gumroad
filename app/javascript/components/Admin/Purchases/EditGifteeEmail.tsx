import { useForm, usePage } from "@inertiajs/react";
import React from "react";

import { type Purchase } from "$app/components/Admin/Purchases/PurchaseDetails";
import { showAlert } from "$app/components/server-components/Alert";

type Props = {
  purchase: Purchase;
};

const AdminPurchasesEditGifteeEmail = ({ purchase }: Props) => {
  const { authenticity_token } = usePage().props;

  const form = useForm({
    authenticity_token: String(authenticity_token),
    update_giftee_email: {
      giftee_email: purchase.gift.giftee_email,
    },
  });
  const { data, setData } = form;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.post(Routes.update_giftee_email_admin_purchase_path(purchase.id), {
      onSuccess: () => {
        showAlert("Giftee email updated successfully!", "success");
        form.reset();
      },
    });
  };

  const setGifteeEmail = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setData("update_giftee_email.giftee_email", event.target.value);
    },
    [setData],
  );

  return (
    <details>
      <summary>
        <h3>Edit giftee email</h3>
      </summary>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="authenticity_token" value={data.authenticity_token} />
        <input
          type="text"
          name="giftee_email"
          placeholder="Enter new giftee email"
          value={data.update_giftee_email.giftee_email}
          onChange={setGifteeEmail}
        />
        <button type="submit" className="button">
          Update
        </button>
      </form>
    </details>
  );
};

export default AdminPurchasesEditGifteeEmail;

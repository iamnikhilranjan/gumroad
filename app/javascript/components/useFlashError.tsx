import { usePage } from "@inertiajs/react";
import * as React from "react";

import Alert, { showAlert, type AlertPayload } from "$app/components/server-components/Alert";

type PageProps = {
  flash?: AlertPayload;
};

export function useFlashError(): React.ReactNode {
  const { flash } = usePage<PageProps>().props;

  if (flash?.status === "warning" && flash?.message) {
    return (
      <>
        <div role="alert" className="danger">
          {flash.message}
        </div>
      </>
    );
  } else if (flash?.status === "success" && flash?.message) {
    showAlert(flash.message, "success");
    return (
      <>
        <Alert initial={flash ?? null} />
      </>
    );
  }

  return null;
}

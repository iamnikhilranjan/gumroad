import * as React from "react";
import { usePage } from "@inertiajs/react";

import CollaboratorForm from "$app/components/Collaborators/Form";

type Props = {
  collaborator: {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
    apply_to_all_products: boolean;
    dont_show_as_co_creator: boolean;
    percent_commission: number | null;
    setup_incomplete: boolean;
    products: {
      id: string;
      name: string;
      has_another_collaborator: boolean;
      has_affiliates: boolean;
      published: boolean;
      enabled: boolean;
      percent_commission: number | null;
      dont_show_as_co_creator: boolean;
    }[];
    collaborators_disabled_reason: string | null;
  };
};

export default function CollaboratorsEdit() {
  const { collaborator } = usePage<Props>().props;

  return <CollaboratorForm formData={collaborator} />;
}

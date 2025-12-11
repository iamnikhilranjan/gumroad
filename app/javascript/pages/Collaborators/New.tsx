import { usePage } from "@inertiajs/react";

import CollaboratorForm from "$app/components/Collaborators/Form";

type Props = {
  context: {
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

export default function CollaboratorsNew() {
  const { context } = usePage<Props>().props;

  return <CollaboratorForm formData={context} />;
}

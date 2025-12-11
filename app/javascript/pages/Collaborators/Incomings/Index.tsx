import { usePage } from "@inertiajs/react";

import { IncomingCollaborators as IncomingCollaboratorsList } from "$app/components/Collaborators/IncomingCollaborators";

type IncomingCollaborator = {
  id: string;
  seller_email: string;
  seller_name: string;
  seller_avatar_url: string;
  apply_to_all_products: boolean;
  affiliate_percentage: number;
  dont_show_as_co_creator: boolean;
  invitation_accepted: boolean;
  products: {
    id: string;
    url: string;
    name: string;
    affiliate_percentage: number;
    dont_show_as_co_creator: boolean;
  }[];
};

type Props = {
  collaborators: IncomingCollaborator[];
  collaborators_disabled_reason: string | null;
};

export default function IncomingsIndex() {
  const props = usePage<Props>().props;

  return <IncomingCollaboratorsList {...props} />;
}

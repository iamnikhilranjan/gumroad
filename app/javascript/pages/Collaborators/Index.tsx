import { usePage } from "@inertiajs/react";

import CollaboratorsPage, { CollaboratorsData } from "$app/components/Collaborators";

export default function CollaboratorsIndex() {
  const props = usePage<CollaboratorsData>().props;
  return <CollaboratorsPage {...props} />;
}

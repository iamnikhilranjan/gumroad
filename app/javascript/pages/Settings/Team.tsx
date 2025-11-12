import { usePage } from "@inertiajs/react";
import React from "react";
import { cast } from "ts-safe-cast";

import { default as TeamPageComponent, type TeamPageProps } from "$app/components/Settings/TeamPage";

const TeamPage = () => {
  const props = cast<TeamPageProps>(usePage().props);

  return <TeamPageComponent {...props} />;
};

export default TeamPage;

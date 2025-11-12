import { usePage } from "@inertiajs/react";
import React from "react";
import { cast } from "ts-safe-cast";

import { default as ProfileSettingsPageComponent, type ProfilePageProps } from "$app/components/Settings/ProfilePage";

const ProfileSettingsPage = () => {
  const props = cast<ProfilePageProps>(usePage().props);

  return <ProfileSettingsPageComponent {...props} />;
};

export default ProfileSettingsPage;

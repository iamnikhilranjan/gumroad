import { usePage } from "@inertiajs/react";
import React from "react";
import { cast } from "ts-safe-cast";

import { default as MainPageComponent, type MainPageProps } from "$app/components/Settings/MainPage";

const MainPage = () => {
  const props = cast<MainPageProps>(usePage().props);

  return <MainPageComponent {...props} />;
};

export default MainPage;

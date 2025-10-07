import React from "react";
import { cast } from "ts-safe-cast";

interface InertiaEvent extends Event {
  detail: {
    visit: {
      prefetch: boolean;
      preserveScroll: boolean;
      only: string[];
    };
  };
}

const useRouteLoading = () => {
  const [isRouteLoading, setIsRouteLoading] = React.useState(false);

  React.useEffect(() => {
    const startHandler = (event: Event) => {
      const { prefetch, preserveScroll, only = [] } = cast<InertiaEvent>(event).detail.visit;
      setIsRouteLoading(!prefetch && !preserveScroll && only.length === 0);
    };

    const finishHandler = (_event: Event) => setIsRouteLoading(false);

    document.addEventListener("inertia:start", startHandler);
    document.addEventListener("inertia:finish", finishHandler);

    return () => {
      document.removeEventListener("inertia:start", startHandler);
      document.removeEventListener("inertia:finish", finishHandler);
    };
  }, []);

  return isRouteLoading;
};

export default useRouteLoading;

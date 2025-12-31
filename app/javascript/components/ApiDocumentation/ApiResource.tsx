import React from "react";

import type { ApiResource as ApiResourceType } from "$app/data/apiDocumentation";

import { ApiMethod } from "./ApiMethod";

type ApiResourceProps = {
  resource: ApiResourceType;
};

export const ApiResource: React.FC<ApiResourceProps> = ({ resource }) => {
  const resourceId = resource.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="stack" id={resourceId}>
      <div>
        <h2>{resource.name}</h2>
      </div>
      {resource.methods.map((method) => (
        <ApiMethod key={`${method.type}-${method.path}`} method={method} />
      ))}
    </div>
  );
};

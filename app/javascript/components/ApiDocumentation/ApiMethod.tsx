import React from "react";

import type { ApiMethod as ApiMethodType } from "$app/data/apiDocumentation";

import CodeSnippet from "$app/components/ui/CodeSnippet";
import { Pill } from "$app/components/ui/Pill";

type ApiMethodProps = {
  method: ApiMethodType;
};

export const ApiMethod: React.FC<ApiMethodProps> = ({ method }) => {
  const methodId = `${method.type}-${method.path}`;
  const url = method.isOAuth ? `https://gumroad.com${method.path}` : `https://api.gumroad.com/v2${method.path}`;

  return (
    <div id={methodId}>
      <div className="flex flex-col gap-4">
        <div role="heading" aria-level={3} className="flex items-center gap-2">
          <Pill color="primary">{method.type.toUpperCase()}</Pill>
          <span>{method.path}</span>
        </div>
        <div className="space-y-4" dangerouslySetInnerHTML={{ __html: method.description }} />
        <CodeSnippet>{url}</CodeSnippet>
        {method.parameters && method.parameters.length > 0 ? (
          <figure className="overflow-hidden rounded border border-border bg-background">
            <figcaption className="p-4">Parameters:</figcaption>
            <div className="border-t border-border bg-active-bg p-4">
              {method.parameters.map((param, index) => (
                <React.Fragment key={param.name}>
                  <strong>{param.name}</strong>
                  {param.required ? null : (
                    <>
                      <br />
                      <span>{param.description || "optional, true or false"}</span>
                    </>
                  )}
                  {index < (method.parameters?.length ?? 0) - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </div>
          </figure>
        ) : null}
        {method.curlExample ? <CodeSnippet caption="cURL example">{method.curlExample}</CodeSnippet> : null}
        {method.responseExample ? (
          <CodeSnippet caption="Example response:">{method.responseExample}</CodeSnippet>
        ) : null}
      </div>
    </div>
  );
};

import React from "react";

import CodeSnippet from "$app/components/ui/CodeSnippet";
import { API_ERROR_CODES, ERROR_EXAMPLE } from "$app/data/apiDocumentation";

export const Errors: React.FC = () => {
  return (
    <div className="stack" id="api-errors">
      <div>
        <h2>API Errors</h2>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <p>
            Gumroad uses HTTP status codes to indicate the status of a request. Here's a run down on likely response
            codes.
          </p>
          <p>
            {API_ERROR_CODES.map((code, index) => (
              <div key={index}>
                <strong>{code.code}</strong>
                <span>{code.description}</span>
              </div>
            ))}
          </p>
          <p>
            To help you further, we provide a JSON object that goes more in-depth about the problem that led to the
            failed request. Errors responses from the api will follow the following format.
          </p>
          <CodeSnippet>{JSON.stringify(ERROR_EXAMPLE, null, 2)}</CodeSnippet>
          <p></p>
          <p>When present, the message will describe the particular problem and suggestions on what went wrong.</p>
        </div>
      </div>
    </div>
  );
};

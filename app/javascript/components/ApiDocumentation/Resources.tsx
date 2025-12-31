import React from "react";

import { API_RESOURCES, OAUTH_READING_LINKS } from "$app/data/apiDocumentation";

export const Resources: React.FC = () => {
  return (
    <>
      <div className="stack" id="api-resources">
        <div>
          <h2>Resources</h2>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {API_RESOURCES.map((resource, index) => (
              <p key={index}>
                {resource.url ? (
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.title}
                  </a>
                ) : (
                  <a href="#" data-helper-prompt={`How do I ${resource.title.toLowerCase()}?`}>
                    {resource.title}
                  </a>
                )}{" "}
                - {resource.description}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="stack" id="api-more">
        <div>
          <h2>More reading</h2>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <p>If you're interested in learning more about OAuth, here are some links that might be useful:</p>
            <ul>
              {OAUTH_READING_LINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

import type { ApiResourceLink, ApiLink } from "./types";

export const API_RESOURCES: ApiResourceLink[] = [
  {
    title: "Create an OAuth application",
    description: "A getting started guide for creating an application with our API.",
    isHelper: true,
  },
  {
    title: "omniauth-gumroad",
    url: "http://rubygems.org/gems/omniauth-gumroad",
    description: "(Ruby) an OmniAuth strategy for Gumroad OAuth.",
  },
];

export const OAUTH_READING_LINKS: ApiLink[] = [
  {
    title: "OAuth 2 spec",
    url: "http://tools.ietf.org/html/draft-ietf-oauth-v2-07",
  },
  {
    title: "Ruby OAuth2 library",
    url: "https://github.com/intridea/oauth2",
  },
  {
    title: "Python OAuth2 library",
    url: "https://github.com/dgouldin/python-oauth2",
  },
  {
    title: "PHP OAuth2 library",
    url: "https://github.com/adoy/PHP-OAuth2",
  },
];

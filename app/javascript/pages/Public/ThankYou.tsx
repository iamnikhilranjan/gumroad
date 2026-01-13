import { Link } from "@inertiajs/react";
import React from "react";

const ThankYou = () => (
  <section id="jobs-splash">
    <div className="container">
      <div className="row">
        <h1>Almost there...</h1>
      </div>
    </div>
    <div className="main-content">
      <p>One more step!</p>
      <p>
        We need to confirm your email address. To complete the subscription process (and get your free case study),
        please click the link in the email we just sent you.
      </p>
      <p>
        Best,
        <br />
        The Gumroad Team
      </p>
      <div className="mini-rule"></div>
      <Link href="/" className="button">
        Return to our website
      </Link>
      <a className="button" href="https://gumroad.com/gumroad/posts" target="_blank" rel="noreferrer">
        Return to our blog
      </a>
    </div>
    <div className="clear"></div>
  </section>
);

export default ThankYou;

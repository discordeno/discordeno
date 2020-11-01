import React from "react";
import { Helmet } from "react-helmet-async";

export default ({ children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          property="og:title"
          content={`${children.props.doc.value.name} | Discordeno`}
        />
        <meta
          property="og:description"
          content="This guide will help you learn every part of Discordeno, Advanced to create your own bot as you wish."
        />
        <meta property="og:url" content="https://discordeno.netlify.com" />
      </Helmet>
      {children}
    </>
  );
};

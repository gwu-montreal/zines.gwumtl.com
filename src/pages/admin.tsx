import React, { useEffect } from "react";
import CMS from "netlify-cms-app";

import type { GetStaticProps } from "next";

interface PageProps {
  repository: string;
}

const init = (props: PageProps) =>
  CMS.init({
    config: {
      backend: {
        name: "github",
        repo: props.repository,
      },
      publish_mode: "editorial_workflow",
      media_folder: "public/images",
      public_folder: "/images",
      // site_url: props.homepage,
      // logo_url: props.homepage + ...
      collections: [
        {
          label: "Articles",
          name: "articles",
          folder: "content/articles",
          create: false,
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
              required: true,
            },
            {
              label: "Type",
              name: "type",
              widget: "select",
              options: ["default", "unionfaqs", "bare", "map"],
              required: false,
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
              required: true,
            },
          ],
        },
        {
          label: "Extra Pages",
          name: "pages",
          files: [
            {
              label: "Endnotes",
              name: "endnotes",
              file: "content/extrapages/endnotes/en.md",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  widget: "string",
                  required: true,
                },
                {
                  label: "Body",
                  name: "body",
                  widget: "markdown",
                },
              ],
            },
          ],
        },
      ],
    },
  });

const Admin = (props: PageProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(props), []);
  return <div />;
};

export default Admin;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const {
    default: { repository, homepage },
  } = await import("../../package.json");

  return {
    props: {
      repository,
    },
  };
};

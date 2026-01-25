import { ClientPerspective, createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";

const getPerspective = (): string => {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SANITY_PERSPECTIVE) {
    return process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_PERSPECTIVE) {
    return import.meta.env.VITE_SANITY_PERSPECTIVE;
  }
  return 'published';
};

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: getPerspective() as ClientPerspective,
  stega: {
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});

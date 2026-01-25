const getToken = (): string | undefined => {
  if (typeof process !== 'undefined' && process.env?.SANITY_API_READ_TOKEN) {
    return process.env.SANITY_API_READ_TOKEN;
  }
  return undefined;
};

export const token = getToken();

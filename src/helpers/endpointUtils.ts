const paramRegex = new RegExp(/{\S+?}/g);

export const fillInEndpoint = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  const matches = endpoint.match(paramRegex);
  if (matches) {
    let newEndpoint = endpoint;
    matches.forEach((match) => {
      const key = match.replace("{", "").replace("}", "");
      if (params && params[key]) {
        // PLEASE FIX ME
        newEndpoint = newEndpoint.replace(match, params[key] as string);
      } else
        throw new Error(
          `No matching param to fill in endpoint at location ${match}`
        );
    });
    return newEndpoint;
  }
  return endpoint;
};

export const cleanParams = (
  endpoint: string,
  params: Record<string, unknown>
): Record<string, unknown> => {
  const matches = endpoint.match(paramRegex);
  if (matches) {
    const newParams: Record<string, unknown> = {};
    Object.keys(params).forEach((key) => {
      if (
        !matches.find(
          (match) => match.replace("{", "").replace("}", "") === key
        )
      ) {
        newParams[key] = params[key];
      }
    });
    return newParams;
  }

  return params;
};

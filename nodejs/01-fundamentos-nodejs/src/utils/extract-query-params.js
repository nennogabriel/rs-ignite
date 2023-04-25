export function extractQueryParams(query) {
  return query
    .substring(1)
    .split("&")
    .reduce((acc, cur) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {});
  // const queryParams = {};
  // const queryParts = query.split("&");
  // for (const queryPart of queryParts) {
  //   const [key, value] = queryPart.split("=");
  //   queryParams[key] = value;
  // }
  // return queryParams;
}

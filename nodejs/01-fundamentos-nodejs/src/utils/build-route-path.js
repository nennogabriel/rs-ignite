export function buildRoutePath(path) {
  const routeParameterRegex = /:([a-zA-Z0-9]+)/g;
  const pathWithParams = path.replaceAll(routeParameterRegex, "(?<$1>[a-z0-9-_]+)");
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;

  // const pathParts = path.split("/");
  // const pathParams = pathParts.filter((pathPart) => pathPart.startsWith(":")).map((pathPart) => pathPart.slice(1));

  // const pathRegex = new RegExp(
  //   `^${pathParts.map((pathPart) => (pathPart.startsWith(":") ? "([a-zA-Z0-9]+)" : pathPart)).join("/")}$`
  // );

  // return {
  //   pathRegex,
  //   pathParams,
  // };
}

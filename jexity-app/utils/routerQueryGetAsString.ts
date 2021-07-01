/**
 * Convinience function to get the property as string or undefined if it
 * is not a string. Since all of our use cases of useRouter.query always
 * assumes that a query param is a string and not an array of strings.
 */
const routerQueryGetAsString = (key: string | string[] | undefined): string | undefined => {
  return typeof key === 'string' ? key : undefined;
};

export default routerQueryGetAsString;

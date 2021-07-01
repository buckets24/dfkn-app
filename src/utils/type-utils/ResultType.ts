// export type ResultType<T, D extends keyof T> = Omit<Exclude<T[D], null>, '__typename'>;

import { GraphQLResult } from '@aws-amplify/api-graphql';

export type ResultType<T, D extends keyof T> = NonNullable<NonNullable<T>[D]>;

/**
 * NOTE:
 * This isn't the best, but provides enough. The typings on amplify
 * seem to use <any> on subscriptions
 */
export type PayloadType<T> = { value: GraphQLResult<T> };

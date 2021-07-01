import { GraphQLResult } from '@aws-amplify/api-graphql';
import { API } from 'aws-amplify';

interface HasId {
  id: string;
}

export async function wipeEntityFactory<T extends { [i: string]: { items: (HasId | null)[] | null } | null }>(
  query: string,
  key: keyof T
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(query);
  const res = (await API.graphql({
    query,
  })) as GraphQLResult<T>;

  if (!res.data?.[key]?.items) {
    return;
  }

  const items = res.data[key]?.items;
  const ids: string[] = [];

  // eslint-disable-next-line no-console
  console.log('Wipe factory results', items);
  if (items) {
    items.forEach((agent) => {
      if (agent?.id) {
        ids.push(agent.id);
      }
    });
  }
}

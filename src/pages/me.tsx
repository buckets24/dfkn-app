import { Auth } from 'aws-amplify';
import { FC, useEffect, useState } from 'react';

const Me: FC = () => {
  const [me, setMe] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setMe(user);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }, []);

  return <pre>{JSON.stringify(me, null, 2)}</pre>;
};

export default Me;

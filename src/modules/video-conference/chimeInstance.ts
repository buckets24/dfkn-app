import { Chime } from '@aws-sdk/client-chime';
// eslint-disable-next-line @typescript-eslint/no-var-requires

const credentials = {
  /**
   * TEMPORARY. Vercel env is not available client side which this file is imported by
   */
  accessKeyId: process.env.ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.SECRET_ACCESS_KEY ?? '',
};

const chime = new Chime({
  region: 'us-east-1',
  endpoint: 'https://service.chime.aws.amazon.com',
  credentials,
});

export default chime;

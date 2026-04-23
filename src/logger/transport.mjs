import { createWriteStream } from 'node:fs';

// https://getpino.io/#/docs/transports?id=v7-transports
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (options) => {
  return createWriteStream(options.destination);
};

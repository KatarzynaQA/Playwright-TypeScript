import fs from 'fs';
import path from 'path';
import pino from 'pino';

// https://getpino.io/#/

// make sure the logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Formats a Date object into a string with ISO format, replacing colons and dots with hyphens.
 *
 * @param date - The Date object to format
 * @returns A string representation of the date in modified ISO format where ':' and '.' are replaced with '-'
 * @example
 * // Returns "2023-12-25T10-30-45-789Z"
 * formatDate(new Date('2023-12-25T10:30:45.789Z'))
 */
function formatDate(date: Date): string {
  return date.toISOString().replace(/:/g, '-').replace(/\./g, '-');
}

// https://getpino.io/#/docs/api?id=transport-object
const transport = {
  target: './transport.mjs',
  options: {
    destination: path.join(logsDir, `logger-${formatDate(new Date())}.log`),
  },
};

// https://getpino.io/#/docs/api?id=formatters-object
const formatters = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
  bindings(bindings: pino.Bindings) {
    // Example of custom bindings
    return {};
    // return { pid: bindings.pid, hostname: bindings.hostname };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  level: (label: string) => {
    return { level: label.toUpperCase() };
  },
};

function initLogger(): pino.Logger {
  return pino({
    transport,
    formatters,
    timestamp: pino.stdTimeFunctions.isoTime,
    level: 'trace',
  });
}

function removeOldLogsOlderThan(days: number, hours: number = 0): void {
  const files = fs.readdirSync(logsDir);
  const now = new Date();
  const threshold = new Date(now.getTime() - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000);

  files.forEach((file) => {
    const filePath = path.join(logsDir, file);
    // https://www.geeksforgeeks.org/node-js-fs-statsync-method/
    // https://nodejs.org/api/fs.html#fsfstatsyncfd-options
    const stats = fs.statSync(filePath);
    if (stats.mtime < threshold && file.endsWith('.log')) {
      // Remove the file if it is older than the threshold and has a .log extension
      fs.unlinkSync(filePath);
    }
  });
}

removeOldLogsOlderThan(0, 1); // Remove logs older than 1 hour

let loggerInstance: pino.Logger;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getLogger = () => {
  if (!loggerInstance) {
    loggerInstance = initLogger();
  }
  return loggerInstance;
};

export { getLogger };

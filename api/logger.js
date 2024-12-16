// import { createLogger, format, transports } from "winston";
// const { combine, timestamp, json, colorize } = format;

// // Custom format for console logging with colors
// const consoleLogFormat = format.combine(
//   format.colorize(),
//   format.printf(({ level, message, timestamp }) => {
//     return `${level}: ${message}`;
//   })
// );

// // Create a Winston logger
// const logger = createLogger({
//   level: "info",
//   format: combine(colorize(), timestamp(), json()),
//   transports: [
//     new transports.Console({
//       format: consoleLogFormat,
//     }),
//     new transports.File({ filename: "app.log" }),
//   ],
// });

// export default logger;

import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file"; // Import daily rotate file

const { combine, timestamp, printf, colorize, json } = format;

// Custom format for console logging with colors
const consoleLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Configure the daily rotate file transport
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: "app-%DATE%.log", // Logs will include the date in their filename
  dirname: "./logs", // Directory to save logs
  datePattern: "YYYY-MM-DD", // Format for the date in the filename
  maxFiles: "2d", // Retain only the last 2 days of log files
  format: combine(timestamp(), json()), // Format for the file logs
});

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: combine(colorize(), consoleLogFormat),
    }),
    dailyRotateFileTransport, // Add the daily rotate file transport
  ],
});

export default logger;

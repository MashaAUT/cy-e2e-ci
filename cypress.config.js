import { defineConfig } from 'cypress';
import mysql from 'mysql';
import util from 'util';
import plugin from 'cypress-mochawesome-reporter/plugin.js';

const reportDir = process.env.REPORT_DIR || 'cypress/reports';
const reportName = process.env.REPORT_NAME || 'TestReport';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const queryAsync = util.promisify(connection.query.bind(connection));

async function queryDb(query, config) {
  try {
    const results = await queryAsync(query);
    return results;
  } catch (error) {
    console.error(`Error executing query: ${error}`);
    throw error;
  } finally {
    connection.end();
  }
}

export default defineConfig({
  projectId: "65r1sq",
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: `${reportDir}/${reportName}`, // Report directory based on environment variables
    overwrite: false, // Set to true to overwrite reports on each run
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        queryDb: query => queryDb(query, config),
      });
    },
  },
  env: {
    // Load environment variables from a separate file or secure storage solution
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
});
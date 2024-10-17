import MongoConnection from './src/config/mongoConnection';
import createExpressApp from './src/config/createExpressApp';
import 'dotenv/config';
import toxicRouter from './src/routes/toxic.route';

const main = async () => {
  // Listen for termination
  process.on('SIGTERM', () => process.exit());

  // Set up the datbase connection
  const dbConnection = await MongoConnection.getInstance();
  dbConnection.open();
  console.log(`MongoDB Connected: ${dbConnection}`);
  // Instantiate express app with configured routes and middleware
  const app = createExpressApp(dbConnection.createSessionStore());
  app.use('/api/toxicreal', toxicRouter);
  // Instantiate a server to listen on a specified port
  app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Control-C to stop\n');
  });
};

// Run the server
main();

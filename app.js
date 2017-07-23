const
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  compression = require('compression'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv'),
  mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.load();

// Controllers
import BusStop from './services/busStop';
import BusLog from './services/busLog';
// var HomeController = require('./controllers/home');
// var contactController = require('./controllers/contact');

const app = express();


// mongoose.connect(process.env.MONGODB);
mongoose.connect(`mongodb://${process.env.MONGODB}/busapp`);
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

BusStop.register(app);
BusLog.register(app);

// app.get('/', HomeController.index);
// app.get('/contact', contactController.contactGet);
// app.post('/contact', contactController.contactPost);

// app.get('/', (req, res) => res.json({message: 'hello!'}));

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

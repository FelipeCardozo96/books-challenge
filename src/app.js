const express = require('express');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes/main');
const session = require('express-session');
const methodOverride = require('method-override');
const cookiesMiddleware = require('./middlewares/cookiesMiddleware');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(session({secret: 'booksApp'}));
app.use(cookiesMiddleware);
app.use(sessionMiddleware);

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
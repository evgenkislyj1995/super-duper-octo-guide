require('dotenv').config();
let express = require('express');
let session = require('express-session');
let crypto = require('crypto');
let app = express();
let ejs = require('ejs');
const haikus = require('./haikus.json');
const port = process.env.PORT || 3000;

const AUTH_USERNAME = process.env.AUTH_USERNAME || 'admin';
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'admin';
if (!process.env.AUTH_PASSWORD) {
  console.warn('AUTH_PASSWORD is not set; using an insecure default. Set AUTH_USERNAME/AUTH_PASSWORD env vars before deploying.');
}

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-only-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' },
}));

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function requireAuth(req, res, next) {
  if (req.session.authenticated) return next();
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  if (req.session.authenticated) return res.redirect('/');
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    typeof username === 'string' &&
    typeof password === 'string' &&
    timingSafeEqual(username, AUTH_USERNAME) &&
    timingSafeEqual(password, AUTH_PASSWORD)
  ) {
    req.session.regenerate((err) => {
      if (err) return res.render('login', { error: 'Something went wrong. Please try again.' });
      req.session.authenticated = true;
      res.redirect('/');
    });
    return;
  }
  res.render('login', { error: 'Invalid username or password.' });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.get('/', requireAuth, (req, res) => {
  res.render('index', {haikus: haikus});
});

app.listen(port);

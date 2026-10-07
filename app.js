require('dotenv').config();
if (process.env.NODE_ENV !== 'production') {
  require('dns').setServers(['8.8.8.8', '1.1.1.1']);
}
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
app.set('trust proxy', 1);

app.engine('handlebars', engine({
  defaultLayout: 'main',
  helpers: { money: (n) => Number(n).toLocaleString('vi-VN') },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

// ===== SESSION: luu tren MongoDB Atlas =====
app.use(require('./config/session'));

app.use((req, res, next) => {
  req.session.visits = (req.session.visits || 0) + 1;
  res.locals.visits = req.session.visits;
  res.locals.sessionId = req.sessionID.slice(0, 8);
  next();
});


app.use('/', require('./routes/books'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Loi may chu: ' + err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server chay tai cong ' + PORT));
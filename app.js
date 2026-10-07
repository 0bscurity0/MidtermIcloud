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

// ===== SESSION (nhanh feature/session se bo sung o day) =====


app.use('/', require('./routes/books'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Loi may chu: ' + err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server chay tai cong ' + PORT));
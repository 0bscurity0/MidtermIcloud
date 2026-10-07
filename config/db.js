const mongoose = require('mongoose');
 
// Tai khoan WRITE khong co quyen doc/tao index -> tat autoIndex, autoCreate
const opts = { autoIndex: false, autoCreate: false };
 
// Hai ket noi doc lap, moi ket noi dung mot tai khoan rieng
const readConn = mongoose.createConnection(process.env.MONGO_URI_READ, opts);
const writeConn = mongoose.createConnection(process.env.MONGO_URI_WRITE, opts);
 
readConn.on('connected', () => console.log('[MongoDB] Ket noi READ thanh cong'));
writeConn.on('connected', () => console.log('[MongoDB] Ket noi WRITE thanh cong'));
readConn.on('error', (e) => console.error('[MongoDB] READ loi:', e.message));
writeConn.on('error', (e) => console.error('[MongoDB] WRITE loi:', e.message));
 
module.exports = { readConn, writeConn };

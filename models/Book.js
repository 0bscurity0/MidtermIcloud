const { Schema } = require('mongoose');
const { readConn, writeConn } = require('../config/db');
 
const bookSchema = new Schema(
  {
    maSach: { type: String, required: true, trim: true },
    tenSach: { type: String, required: true, trim: true },
    tacGia: { type: String, trim: true },
    giaGoc: { type: Number, required: true, min: 0 },
    vat: { type: Number, required: true },
    giaSauThue: { type: Number, required: true },
  },
  { timestamps: true, collection: 'books' }
);
 

module.exports = {
  BookRead: readConn.model('Book', bookSchema),   // chi dung de DOC
  BookWrite: writeConn.model('Book', bookSchema), // chi dung de GHI
};
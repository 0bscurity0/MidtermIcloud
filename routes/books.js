const express = require('express');
const router = express.Router();
const student = require('../config/student');
const { BookRead, BookWrite } = require('../models/Book');
 
// Dua thong tin ca nhan hoa xuong moi view (footer)
router.use((req, res, next) => {
  res.locals.student = student;
  next();
});
 
// XEM DANH SACH -> di qua tai khoan READ
router.get('/', async (req, res, next) => {
  try {
    const books = await BookRead.find().sort({ createdAt: -1 }).lean();
    res.render('home', { books });
  } catch (err) {
    next(err);
  }
});
 
router.get('/add', (req, res) => res.render('add', { form: {} }));
 
// THEM MOI -> di qua tai khoan WRITE
router.post('/add', async (req, res, next) => {
  try {
    const { maSach, tenSach, tacGia, giaGoc } = req.body;
    const ma = (maSach || '').trim();
 
    // Bo loc: ma san pham phai bat dau bang 3 so cuoi MSSV
    if (!ma.startsWith(student.prefix)) {
      return res.status(400).render('add', {
        form: req.body,
        error: 'Ma san pham phai bat dau bang ' + student.prefix + ' (3 so cuoi MSSV). He thong tu choi xu ly.',
      });
    }
 
    const gia = Number(giaGoc);
    if (!tenSach || !tenSach.trim() || Number.isNaN(gia) || gia < 0) {
      return res.status(400).render('add', {
        form: req.body,
        error: 'Ten sach khong duoc rong va gia phai la so >= 0.',
      });
    }
 
    // Tinh gia sau thue truoc khi luu xuong Atlas
    const giaSauThue = Math.round(gia * (1 + student.vat / 100) * 100) / 100;
 
    await BookWrite.create({
      maSach: ma,
      tenSach: tenSach.trim(),
      tacGia: (tacGia || '').trim(),
      giaGoc: gia,
      vat: student.vat,
      giaSauThue,
    });
 
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});
 
module.exports = router;

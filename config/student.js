// Thong tin ca nhan hoa lay tu bien moi truong
const id = String(process.env.STUDENT_ID || '');
const name = process.env.STUDENT_NAME || '';
 
module.exports = {
  id,
  name,
  prefix: id.slice(-3),                 // 3 so cuoi MSSV -> tien to ma san pham
  vat: Number(id.slice(-1)) + 6,        // VAT = (chu so cuoi + 6) %
};

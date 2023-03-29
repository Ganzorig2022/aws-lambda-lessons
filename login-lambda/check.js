const bcrypt = require('bcryptjs');
const password = '123456';
const hash = '$2a$10$96lizDWUPY31DFPIwqCVtO5gOjwyX/za4oEORELecxv9mRqtcWEGG';
const isPassword = bcrypt.compareSync(password, hash);
console.log('COMPARE VNEN BNUU?==>', isPassword);

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'birthday-shop.webp');
const dest = path.join(__dirname, 'public', 'birthday-shop.webp');

fs.copyFileSync(src, dest);
console.log('Image copied successfully!');

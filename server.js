const lz77 = require("lz77");

// Sıkıştırma
const originalData =
  "Bu bir örnek metin. Bu bir örnek metin. Bu bir örnek metin. Bu bir örnek metin. Bu bir örnek metin.Bu bir örnek metin. Bu bir örnek metin. Bu bir örnek metin. Bu bir örnek metin. Bu bir örnek metin.";
const compressedData = lz77.compress(originalData);

console.log("Orjinal Veri:", originalData);
console.log("Sıkıştırılmış Veri:", compressedData);

// Deşifreleme
const decompressedData = lz77.decompress(compressedData);
console.log("Deşifrelenmiş Veri:", decompressedData);

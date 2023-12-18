function compressLZ77(originalData) {
  let compressedData = [];
  let currentIndex = 0;

  while (currentIndex < originalData.length) {
    let match = findLongestMatch(originalData, currentIndex);
    if (match.length > 0) {
      compressedData.push({ offset: match.offset, length: match.length });
      currentIndex += match.length;
    } else {
      compressedData.push(originalData[currentIndex]);
      currentIndex++;
    }
  }

  return compressedData;
}

function decompressLZ77(compressedData) {
  let originalData = "";
  let currentIndex = 0;

  for (let i = 0; i < compressedData.length; i++) {
    if (typeof compressedData[i] === "object") {
      let offset = compressedData[i].offset;
      let length = compressedData[i].length;
      originalData += originalData.slice(
        currentIndex - offset,
        currentIndex - offset + length
      );
      currentIndex += length;
    } else {
      originalData += compressedData[i];
      currentIndex++;
    }
  }

  return originalData;
}

function findLongestMatch(data, currentIndex) {
  let maxLength = 0;
  let bestMatch = { offset: 0, length: 0 };

  for (let offset = 1; offset <= currentIndex; offset++) {
    let suffix = data.slice(currentIndex);
    let candidate = data.slice(
      currentIndex - offset,
      currentIndex - offset + suffix.length
    );

    let length = 0;
    while (length < suffix.length && suffix[length] === candidate[length]) {
      length++;
    }

    if (length > maxLength) {
      maxLength = length;
      bestMatch = { offset, length };
    }
  }

  return bestMatch;
}

// Örnek Kullanım
const longOriginalData = `
  Bu, LZ77 sıkıştırma algoritmasını denemek için daha uzun bir örnek metindir.
  LZ77 algoritması, tekrarlanan dizileri tespit ederek sıkıştırma yapar. 
  Bu tekrarlanan dizilerin başlangıç konumu ve uzunluğunu kullanarak sıkıştırma gerçekleştirir.
  Daha sonra, bu sıkıştırılmış veriyi orijinal veriye geri çevirmek için deşifreleme yapabilirsiniz.
  `;

const compressedDataLong = compressLZ77(longOriginalData);
console.log("Sıkıştırılmış Veri:", compressedDataLong);

const decompressedDataLong = decompressLZ77(compressedDataLong);
console.log("Deşifrelenmiş Veri:", decompressedDataLong);

function readableCompressedData(compressedData) {
  return compressedData.map((item) => {
    if (typeof item === "object") {
      return `[${item.offset}, ${item.length}]`;
    } else {
      return item;
    }
  });
}
const readableData = readableCompressedData(compressedDataLong);
console.log("Okunabilir Sıkıştırılmış Veri:", readableData);

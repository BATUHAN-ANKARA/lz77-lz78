const Lz77 = require("../models/lz77.model");
const lz77Dal = require("../dal/index");

exports.encode = async (req) => {
  const { originalData } = req.body;
  try {
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
    return { compressedData };
  } catch (error) {
    throw new Error(error);
  }
};

exports.decode = async (req) => {
  const { compressedData } = req.body;
  try {
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
    return { originalData };
  } catch (error) {
    throw new Error(error);
  }
};

exports.readableDecode = async (req) => {
  const { compressedData } = req.body;
  try {
    return compressedData.map((item) => {
      if (typeof item === "object") {
        return `[${item.offset}, ${item.length}]`;
      } else {
        return item;
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

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

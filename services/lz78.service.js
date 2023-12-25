const Lz78 = require("../models/lz78.model");
const lz78Dal = require("../dal/index");

exports.encode = async (req) => {
  const { metin } = req.body;
  try {
    const finalArr = [];
    const dict = {};
    let ind = 0;
    let cur = "";
    for (let i = 0; i < metin.length; i++) {
      const char = metin[i];
      const temp = cur + char;
      const ref = dict[cur] ? dict[cur].ind : null;
      const isEnd = i === metin.length - 1;
      if (!dict[temp] || isEnd) {
        dict[temp] = { ind, ref };
        finalArr.push(280);
        finalArr.push(char.charCodeAt(0));
        if (ref !== null) {
          [...ref.toString()].forEach((digit) => {
            finalArr.push(digit.charCodeAt(0));
          });
        }
        ind++;
        cur = "";
      } else {
        cur = temp;
      }
    }
    finalArr.push(281);
    const encoded = new Lz78({
      encodedText: finalArr,
      decodedText: metin,
    });

    const json = await lz78Dal.lz78.create(encoded);

    return { json };
  } catch (error) {
    throw new Error(error);
  }
};

exports.decode = async (req) => {
  const { someArr } = req.body;
  try {
    const arr = someArr.map((val) => parseInt(val, 10)); // convert to nums;
    const pairs = [];
    let decoded = "";
    let ind = 0;
    let ref = "";

    let nextIsChar = true;
    let endChar;
    let hitEnd = false;
    for (let i = 1; i < arr.length; i++) {
      let num = arr[i];
      switch (num) {
        case 281:
          hitEnd = true;
        case 280:
          const temp = ref ? pairs[parseInt(ref, 10)] + endChar : endChar;
          pairs.push(temp);
          decoded += temp;

          ind++;
          nextIsChar = true;
          ref = "";
          break;
        default:
          if (nextIsChar) {
            endChar = String.fromCharCode(num);
            nextIsChar = false;
          } else {
            ref += String.fromCharCode(num);
          }
      }

      if (hitEnd) {
        break;
      }
    }
    const json = { result: decoded };
    return { json };
  } catch (error) {
    throw new Error(error);
  }
};

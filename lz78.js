const fs = require("fs");
const inputText = "Merhaba selin burdaki her karakterin bir ascii kodu var bu koda göre burdaki metin sıkıştırılacak";
const encode = (arr) => {
    // escape char is 280
    // format is (280 + escaped char [+ ...reference]) for each dictionary entry
    const finalArr = [];
    const dict = {};
    let ind = 0;
    let cur = '';
    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
        const temp = cur + char;
        const ref = dict[cur] ? dict[cur].ind : null;
        const isEnd = i === arr.length - 1;
        if (!dict[temp] || isEnd) {
            dict[temp] = { ind, ref };
            // fill array
            finalArr.push(280);
            finalArr.push(char.charCodeAt(0)); // added char
            if (ref !== null) {
                [...ref.toString()].forEach(digit => { // reference nums
                    finalArr.push(digit.charCodeAt(0));
                });
            }
            ind++;
            cur = '';
        } else {
            cur = temp;
        }
    }
    finalArr.push(281);
    console.log(`Modified lz78 compression: ${arr.length} bytes to ${finalArr.length} bytes`);
    return finalArr;
}

const decode = (someArr) => {
    const arr = someArr.map(val => parseInt(val, 10)); // convert to nums;
    const pairs = [];
    let decoded = '';
    let ind = 0;
    let ref = '';

    let nextIsChar = true;
    let endChar;
    let hitEnd = false;

    for (let i = 1; i < arr.length; i++) {
        let num = arr[i];
        switch (num) {
            case 281: // end of file
                hitEnd = true;
            case 280: // escape char. enter previous char,ref into dictionary and decode
                const temp = ref ? pairs[parseInt(ref, 10)] + endChar : endChar;
                pairs.push(temp);
                decoded += temp;

                ind++;
                nextIsChar = true;
                ref = '';
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
    console.log(`Modified lz78 decompression: ${arr.length} bytes to ${decoded.length} bytes`);
    return decoded;
}

// Sıkıştırma
const encoded = encode(inputText);
// Sıkıştırılmış veriyi dosyaya yazma
fs.writeFileSync("encoded.txt", JSON.stringify(encoded), "utf8");
// Sıkıştırılmış veriyi okuma
const encodedFromFile = JSON.parse(fs.readFileSync("encoded.txt", "utf8"));
// Deşifreleme
const decoded = decode(encodedFromFile);
// Çıktıları yazdırma
console.log("encoded=>", encoded);
console.log("decoded=>", decoded);
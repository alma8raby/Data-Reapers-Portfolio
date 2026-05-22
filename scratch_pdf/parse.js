const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.resolve('D:/depi/final project/Grey and Beige Minimalist Professional Presentation.pdf');
const dataBuffer = fs.readFileSync(pdfPath);
const uint8Array = new Uint8Array(dataBuffer);

(async () => {
  try {
    const parser = new pdf.PDFParse(uint8Array);
    const result = await parser.getText();
    console.log("type of result:", typeof result, result.constructor.name, Object.keys(result));
    if (result.text) {
      console.log("Text length:", result.text.length);
      fs.writeFileSync('extracted_pdf.txt', result.text);
    } else {
      console.log("Result stringified:", JSON.stringify(result).substring(0, 500));
    }
  } catch (e) {
    console.error("Error during parse:", e);
  }
})();

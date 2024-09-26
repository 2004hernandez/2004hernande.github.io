document.getElementById('cipherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const message = document.getElementById('message').value.replace(/\s+/g, ''); 
    const key = parseInt(document.getElementById('key').value);
    const { resultText, matrixDisplay } = columnarCipher(message, key);

    document.getElementById('resultText').innerText = resultText;
    document.getElementById('matrixDisplay').innerHTML = matrixDisplay; 
});

function columnarCipher(message, key) {
    const numRows = Math.ceil(message.length / key);
    const grid = Array.from({ length: numRows }, (_, i) => 
        message.slice(i * key, i * key + key).split('')
    );

    let matrixDisplay = '<table>';
    for (let row of grid) {
        matrixDisplay += '<tr>' + row.map(cell => `<td>${cell || ''}</td>`).join('') + '</tr>';
    }
    matrixDisplay += '</table>';

    let result = '';
    for (let col = 0; col < key; col++) {
        for (let row = 0; row < numRows; row++) {
            if (grid[row][col]) {
                result += grid[row][col];
            }
        }
    }

    return { resultText: result, matrixDisplay };
}
document.getElementById('copyMessageBtn').addEventListener('click', function() {
    var mensajeCifrado = document.getElementById('resultText').innerText;
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = mensajeCifrado;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
});

document.getElementById('decipherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const decipherMessage = document.getElementById('decipherMessage').value.replace(/\s+/g, '');
    const decipherKey = parseInt(document.getElementById('decipherKey').value);
    const { resultText, matrixDisplay } = columnarDecipher(decipherMessage, decipherKey);

    document.getElementById('decipherResultText').innerText = resultText;
    document.getElementById('decipherMatrixDisplay').innerHTML = matrixDisplay; 
});
document.getElementById('copyDecipherMessageBtn').addEventListener('click', function() {
    var mensajeDescifrado = document.getElementById('decipherResultText').innerText;
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = mensajeDescifrado;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
});

function columnarDecipher(message, key) {
    const numRows = Math.ceil(message.length / key);
    const grid = Array.from({ length: numRows }, () => Array(key).fill(''));

    let result = '';
    let index = 0;

    for (let col = 0; col < key; col++) {
        for (let row = 0; row < numRows; row++) {
            if (index < message.length) {
                grid[row][col] = message[index++];
            }
        }
    }

    let matrixDisplay = '<table>';
    for (let row of grid) {
        matrixDisplay += '<tr>' + row.map(cell => `<td>${cell || ''}</td>`).join('') + '</tr>';
    }
    matrixDisplay += '</table>';

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < key; col++) {
            if (grid[row][col]) {
                result += grid[row][col];
            }
        }
    }

    return { resultText: result, matrixDisplay }; 
}

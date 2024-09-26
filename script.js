document.getElementById('cesarFormCifrar').addEventListener('submit', function (e) {
    e.preventDefault();

    const text = document.getElementById('textCifrar').value;
    const shift = parseInt(document.getElementById('shiftCifrar').value);
    const resultText = cesarCipher(text, shift);

    document.getElementById('resultTextCifrar').innerText = resultText;
});
document.getElementById('copyCifradoBtn').addEventListener('click', function() {
    var textoCifrado = document.getElementById('resultTextCifrar').innerText;

    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = textoCifrado;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand("copy");

    document.body.removeChild(tempTextArea);

});
document.getElementById('cesarFormDescifrar').addEventListener('submit', function (e) {
    e.preventDefault();

    const text = document.getElementById('textDescifrar').value;
    const shift = parseInt(document.getElementById('shiftDescifrar').value);
    const resultText = cesarCipher(text, -shift);

    document.getElementById('resultTextDescifrar').innerText = resultText;
});
document.getElementById('copyDescifradoBtn').addEventListener('click', function() {
    var textoDescifrado = document.getElementById('resultTextDescifrar').innerText;

    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = textoDescifrado;
    document.body.appendChild(tempTextArea)

    tempTextArea.select();
    document.execCommand("copy");

    document.body.removeChild(tempTextArea);

});

function cesarCipher(text, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i].toUpperCase();
        if (alphabet.includes(char)) {
            let newIndex = (alphabet.indexOf(char) + shift) % 26;
            if (newIndex < 0) newIndex += 26;
            result += alphabet[newIndex];
        } else {
            result += char;
        }
    }
    return result;
    
}

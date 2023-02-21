/**
 * @version 1.0
 */

const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById("passwortDisplay");

const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126))


characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", e => {
    e.preventDefault();    // verhindert das Zurücksetzen der Seite bei Klick auf submit button
    
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;

    passwordDisplay.innerText = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
})

// generiert Passwort
function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = LOWERCASE_CHAR_CODES;
    
    if (includeUppercase) {
        charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    }
    if (includeNumbers) {
        charCodes = charCodes.concat(NUMBERS_CHAR_CODES);
    }
    if (includeSymbols) {
        charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);
    }
    
    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}

// erstellt ein Array und füllt es mit Zahlen
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

// synchronisiert Anzahl Zeichen input Feld und Schieberegler
function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountRange.value = value;
    characterAmountNumber.value = value;
}

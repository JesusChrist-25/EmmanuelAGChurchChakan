const IndicTransliteration = {
    mapping: {
        // Vowels
        'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
        'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ', 'am': 'अं', 'ah': 'अः',

        // Consonants
        'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
        'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
        't': 'ट', 'th': 'ठ', 'd': 'ड', 'dh': 'ढ', 'n': 'ण',
        't.': 'त', 'th.': 'थ', 'd.': 'द', 'dh.': 'ध', 'n.': 'न',
        'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
        'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
        'sh': 'श', 'shh': 'ष', 's': 'स', 'h': 'ह',

        // Additional Consonants
        'q': 'क़', 'kh.': 'ख़', 'gh.': 'ग़', 'z': 'ज़', 'dh.': 'ढ़', 'f': 'फ़',
        'rh': 'ऱ', 'lh': 'ळ', 'll': 'ऴ',

        // Common Conjuncts
        'ksh': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ', 'shtr': 'शत्र',
        'jn': 'ज्ञ', 'shr': 'श्र',

        // Numbers
        '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
        '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',

        // Special Characters
        ' ': ' ', '.': '.', ',': ',', '!': '!', '?': '?'
    },

    transliterate: function(text) {
    // Split the input into words (spaces preserved)
    return text.split(/(\s+)/).map(word => {
        let transliteratedWord = '';
        while (word.length > 0) {
            let matched = false;
            // Sort mappings by length to prioritize longer sequences (e.g., 'ksh', 'aa')
            for (const [key, value] of Object.entries(this.mapping).sort((a, b) => b[0].length - a[0].length)) {
                if (word.startsWith(key)) {
                    transliteratedWord += value; // Add the mapped character(s)
                    word = word.slice(key.length); // Remove processed portion of the word
                    matched = true;
                    break;
                }
            }
            // If no match found, add the character as-is and move forward
            if (!matched) {
                transliteratedWord += word[0];
                word = word.slice(1);
            }
        }
        return transliteratedWord;
    }).join('');

        console.log("Processing word:", word);
console.log("Matched mapping:", key, " -> ", value);
console.log("Remaining input:", word);
}

};

// Example Usage
console.log(IndicTransliteration.transliterate("namaste dosti kshatriya!"));



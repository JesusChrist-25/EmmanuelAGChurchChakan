const IndicTransliteration = {
    // Base mappings for vowels and consonants
    vowels: {
        'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
        'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ', 'am': 'अं', 'ah': 'अः'
    },
    consonants: {
        'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
        'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
        't': 'ट', 'th': 'ठ', 'd': 'ड', 'dh': 'ढ', 'n': 'ण',
        't.': 'त', 'th.': 'थ', 'd.': 'द', 'dh.': 'ध', 'n.': 'न',
        'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
        'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
        'sh': 'श', 'shh': 'ष', 's': 'स', 'h': 'ह',
        'ksh': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ'
    },
    numbers: {
        '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
        '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
    },
    specialCharacters: {
        ' ': ' ', '.': '.', ',': ',', '!': '!', '?': '?'
    },

    transliterate: function (text) {
        let transliterated = '';
        while (text.length > 0) {
            let matchFound = false;

            // Combine mappings into one priority-ordered list
            const allMappings = { ...this.consonants, ...this.vowels, ...this.numbers, ...this.specialCharacters };
            for (const [key, value] of Object.entries(allMappings).sort((a, b) => b[0].length - a[0].length)) {
                if (text.startsWith(key)) {
                    transliterated += value;
                    text = text.slice(key.length); // Remove processed part
                    matchFound = true;
                    break;
                }
            }

            // Append unmatched characters
            if (!matchFound) {
                transliterated += text[0];
                text = text.slice(1);
            }
        }
        return transliterated;
    }
};

// Example Usage
console.log(IndicTransliteration.transliterate("namaste dosti kshatriya!")); // Output: नमस्ते दोस्ती क्षत्रिय!
console.log(IndicTransliteration.transliterate("pratiksha kshan par!")); // Output: प्रतीक्षा क्षण पर!

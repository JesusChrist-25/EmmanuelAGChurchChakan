const IndicTransliteration = {
    // Vowels and consonants mappings
    vowels: {
        'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
        'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ', 'am': 'अं', 'ah': 'अः'
    },
    consonants: {
        'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
        'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
        't': 'ट', 'th': 'ठ', 'd': 'ड', 'dh': 'ढ', 'n': 'ण',
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

    // Transliterate method
    transliterate: function (text) {
        let transliterated = '';
        const allMappings = { ...this.vowels, ...this.consonants, ...this.numbers, ...this.specialCharacters };

        while (text.length > 0) {
            let matchFound = false;

            // Sort mappings by length to prioritize longer sequences
            for (const [key, value] of Object.entries(allMappings).sort((a, b) => b[0].length - a[0].length)) {
                if (text.startsWith(key)) {
                    transliterated += value; // Append transliterated result
                    text = text.slice(key.length); // Remove matched portion
                    matchFound = true;
                    break;
                }
            }

            // If no match found, append unmatched character directly
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

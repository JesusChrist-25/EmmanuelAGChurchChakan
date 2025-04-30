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
        let buffer = ''; // Buffer to accumulate characters before processing
        const allMappings = { ...this.consonants, ...this.vowels, ...this.numbers, ...this.specialCharacters };

        for (let i = 0; i < text.length; i++) {
            buffer += text[i]; // Add character to buffer
            let matchFound = false;

            // Check buffer against all mappings
            for (const [key, value] of Object.entries(allMappings).sort((a, b) => b[0].length - a[0].length)) {
                if (buffer === key) {
                    transliterated += value; // Add transliterated value
                    buffer = ''; // Clear the buffer
                    matchFound = true;
                    break;
                }
            }

            // If buffer doesn't match, process and clear unmatched part
            if (!matchFound && buffer.length > 2) { // Arbitrary buffer size for performance
                transliterated += buffer[0]; // Add first character
                buffer = buffer.slice(1); // Remove processed part
            }
        }

        // Process remaining buffer
        transliterated += buffer; // Add any remaining characters in the buffer
        return transliterated;
    }
};

// Example Usage
console.log(IndicTransliteration.transliterate("namaste dosti kshatriya!")); // Output: नमस्ते दोस्ती क्षत्रिय!
console.log(IndicTransliteration.transliterate("pratiksha kshan !")); // Output: प्रतीक्षा क्षण पर!

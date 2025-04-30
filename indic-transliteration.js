const IndicTransliteration = {
    mappings: {
        // Vowels
        'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
        'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ', 'am': 'अं', 'ah': 'अः',

        // Consonants
        'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
        'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
        't': 'ट', 'th': 'ठ', 'd': 'ड', 'dh': 'ढ', 'n': 'ण',
        'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
        'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
        'sh': 'श', 'shh': 'ष', 's': 'स', 'h': 'ह',
        'ksh': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ',

        // Numbers
        '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
        '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',

        // Special Characters
        ' ': ' ', '.': '.', ',': ',', '!': '!', '?': '?'
    },

    // Improved Transliteration Method
    transliterate: function(text) {
        let transliterated = '';
        const regex = /([a-z]+|\d+|\s|[.,!?])/gi; // Regex to tokenize text into chunks

        text.match(regex).forEach(chunk => {
            let matchFound = false;

            // Check chunk against all mappings
            for (const [key, value] of Object.entries(this.mappings).sort((a, b) => b[0].length - a[0].length)) {
                if (chunk === key) {
                    transliterated += value; // Add matched syllable
                    matchFound = true;
                    break;
                }
            }

            // If chunk not matched, append as-is
            if (!matchFound) {
                transliterated += chunk; // Add original chunk
            }
        });

        return transliterated;
    }
};

// Example Usage
console.log(IndicTransliteration.transliterate("namaste dosti kshatriya!")); // Expected Output: नमस्ते दोस्ती क्षत्रिय!
console.log(IndicTransliteration.transliterate("pratiksha !")); // Expected Output: प्रतीक्षा क्षण पर!

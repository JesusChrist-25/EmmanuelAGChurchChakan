const IndicTransliteration = {
    mapping: {
        // Vowels and syllables
        'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
        'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ', 'am': 'अं', 'ah': 'अः',

        // Basic consonants
        'na': 'ना', 'ma': 'म', 'te': 'ते', 'do': 'दो', 'sti': 'स्ती',
        'ksha': 'क्ष', 'tri': 'त्र', 'gy': 'ज्ञ', 'sh': 'श', 'ch': 'च',
        
        // Numbers
        '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
        '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',

        // Special characters
        ' ': ' ', '.': '.', ',': ',', '!': '!', '?': '?'
    },

    transliterate: function(text) {
        let transliterated = '';
        while (text.length > 0) {
            let matchFound = false;
            for (const [key, value] of Object.entries(this.mapping).sort((a, b) => b[0].length - a[0].length)) {
                if (text.startsWith(key)) {
                    transliterated += value;
                    text = text.slice(key.length); // Remove processed part
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                transliterated += text[0]; // Append unmatched character
                text = text.slice(1);
            }
        }
        return transliterated;
    }
};

// Example Usage
console.log(IndicTransliteration.transliterate("namaste dosti kshatriya!"));
console.log(IndicTransliteration.transliterate("dusari"));

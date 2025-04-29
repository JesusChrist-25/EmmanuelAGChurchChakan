// indic-transliteration.js
const IndicTransliteration = {
    mapping: {
        'a': 'अ', 'b': 'ब', 'c': 'क', 'd': 'द', 'e': 'ए', 'f': 'फ',
        'g': 'ग', 'h': 'ह', 'i': 'इ', 'j': 'ज', 'k': 'क', 'l': 'ल',
        'm': 'म', 'n': 'न', 'o': 'ओ', 'p': 'प', 'q': 'क', 'r': 'र',
        's': 'स', 't': 'त', 'u': 'उ', 'v': 'व', 'w': 'व', 'x': 'क्ष',
        'y': 'य', 'z': 'ज'
    },

    transliterate: function(text) {
        return text.split('').map(char => this.mapping[char] || char).join('');
    }
};
console.log("Search Query:", "dusari");
console.log("Transliterated Query:", IndicTransliteration.transliterate("dusari"));
// Export for usage
if (typeof module !== "undefined") {
    module.exports = IndicTransliteration;
}

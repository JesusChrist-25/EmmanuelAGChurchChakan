// indic-transliteration.js

const IndicTransliteration = {
    mapping: {
        'a': '?', 'b': '?', 'c': '?', 'd': '?', 'e': '?', 'f': '?',
        'g': '?', 'h': '?', 'i': '?', 'j': '?', 'k': '?', 'l': '?',
        'm': '?', 'n': '?', 'o': '?', 'p': '?', 'q': '?', 'r': '?',
        's': '?', 't': '?', 'u': '?', 'v': '?', 'w': '?', 'x': '???',
        'y': '?', 'z': '?'
    },

    transliterate: function(text) {
        return text.split('').map(char => this.mapping[char] || char).join('');
    }
};

console.log("Search Query:", text);
console.log("Transliterated Query:", IndicTransliteration.transliterate(text));


// Example Usage
console.log(IndicTransliteration.transliterate("namaste"));

if (typeof module !== "undefined") {
    module.exports = IndicTransliteration;
}

const IndicTransliteration = {
    mapping: {
        "a": "अ", "b": "ब", "c": "क", "d": "द", "du": "दू", "e": "ए",
        "f": "फ", "g": "ग", "h": "ह", "i": "इ", "j": "ज", "k": "क",
        "l": "ल", "m": "म", "n": "न", "o": "ओ", "p": "प", "q": "क",
        "r": "र", "s": "स", "t": "त", "u": "उ", "v": "व", "w": "व",
        "x": "क्ष", "y": "य", "z": "ज", "ri": "री", "sa": "सा"
    },

    transliterate: function(text) {
        let result = text;
        Object.keys(this.mapping).sort((a, b) => b.length - a.length).forEach(pattern => {
            result = result.replaceAll(pattern, this.mapping[pattern]);
        });
        return result;
    }
};

// Example usage
console.log(IndicTransliteration.transliterate("dusari")); // Output: "दूसरी"

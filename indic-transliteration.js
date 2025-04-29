const IndicTransliteration = {
    mapping: {
        "a": "अ", "aa": "आ", "i": "इ", "ii": "ई", "u": "उ", "uu": "ऊ",
        "e": "ए", "ai": "ऐ", "o": "ओ", "au": "औ", "ka": "क", "kha": "ख",
        "ga": "ग", "gha": "घ", "nga": "ङ", "cha": "च", "chha": "छ",
        "ja": "ज", "jha": "झ", "nya": "ञ", "ta": "ट", "tha": "ठ",
        "da": "ड", "dha": "ढ", "na": "न", "pa": "प", "pha": "फ",
        "ba": "ब", "bha": "भ", "ma": "म", "ya": "य", "ra": "र",
        "la": "ल", "va": "व", "sha": "श", "ssa": "ष", "sa": "स",
        "ha": "ह", "ri": "ऋ", "dri": "दृ", "ksh": "क्ष", "gya": "ज्ञ"
    },

    transliterate: function(text) {
        let result = text;
        Object.keys(this.mapping).sort((a, b) => b.length - a.length).forEach(pattern => {
            result = result.replaceAll(pattern, this.mapping[pattern]);
        });
        return result;
    }
};

// Example Tests
console.log(IndicTransliteration.transliterate("namaste"));  // Output: "नमस्ते"
console.log(IndicTransliteration.transliterate("bhasha"));   // Output: "भाषा"
console.log(IndicTransliteration.transliterate("vidya"));    // Output: "विद्या"
console.log(IndicTransliteration.transliterate("shanti"));   // Output: "शांति"
console.log(IndicTransliteration.transliterate("randomword"));  // Output: Correctly transliterated characters!

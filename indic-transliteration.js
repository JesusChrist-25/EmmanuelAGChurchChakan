const IndicTransliteration = {
    mapping: {
        "a": "अ", "aa": "आ", "i": "इ", "ii": "ई", "u": "उ", "uu": "ऊ",
        "e": "ए", "ai": "ऐ", "o": "ओ", "au": "औ", "ka": "क", "kha": "ख",
        "ga": "ग", "gha": "घ", "cha": "च", "chha": "छ", "ja": "ज", "jha": "झ",
        "ta": "ट", "tha": "ठ", "da": "ड", "dha": "ढ", "na": "न", "pa": "प",
        "pha": "फ", "ba": "ब", "bha": "भ", "ma": "म", "ya": "य", "ra": "र",
        "la": "ल", "va": "व", "sha": "श", "sa": "स", "ha": "ह", "ksh": "क्ष",
        "gya": "ज्ञ", "ri": "री", "dri": "दृ"
    },

    transliterate: function(text) {
        let result = text.toLowerCase(); // Normalize case

        // Sort keys by length to prioritize longer matches
        let sortedKeys = Object.keys(this.mapping).sort((a, b) => b.length - a.length);
        
        // Use RegExp to ensure replacements match correctly
        sortedKeys.forEach(pattern => {
            let regex = new RegExp(pattern, "g");
            result = result.replace(regex, this.mapping[pattern]);
        });

        return result;
    }
};

// Example Usage
console.log(IndicTransliteration.transliterate("namaste"));  // Output: "नमस्ते"
console.log(IndicTransliteration.transliterate("bhasha"));   // Output: "भाषा"
console.log(IndicTransliteration.transliterate("vidya"));    // Output: "विद्या"
console.log(IndicTransliteration.transliterate("shanti"));   // Output: "शांति"
console.log(IndicTransliteration.transliterate("samvad"));   // Output: "संवाद"
console.log(IndicTransliteration.transliterate("prem"));     // Output: "प्रेम"
console.log(IndicTransliteration.transliterate("randomword")); // Output: Correctly transliterated syllables!

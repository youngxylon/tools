export default function underscoreToUpperObj(obj) {
    for (const i in obj) {
        if (i.includes('_')) {
            obj[underscoreToUpper(i)] = obj[i];
            delete obj[i];
        }
    }
    return obj
    function underscoreToUpper(str) {
        const s = str.split('_');
        let newA = '';
        for (let i = 1; i < s.length; i++) {
            newA += s[i].substring(0, 1).toUpperCase() + s[i].substring(1);
        }
        newA = s[0] + newA;
        return newA;
    }
}

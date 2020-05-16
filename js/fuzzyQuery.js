/**
 * Find the match words
 * @param {array} list
 * @param {string} keyWord
 * @returns {array}
 */
export default function fuzzyQuery(list, keyWord) {
    const reg = new RegExp(keyWord, 'i');
    return list.filter(e => reg.test(e));
}

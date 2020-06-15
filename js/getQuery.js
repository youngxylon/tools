/**
 * get location query by name
 * @param {string} variable
 * @returns {*}
 */
export default function getQuery(variable) {
    const link = decodeURIComponent(window.location.href);
    if (link.includes('?')) {
        let query = link.split('?')[1];
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (pair[0] == variable) {
                return pair[1];
            }
        }
    }
    return false;
}

function searchToObject() {
    let pairs = window.location.search.substring(1).split('&'),
        obj = {},
        pair;
    for (let i in pairs) {
        if (pairs[i] === '') continue;
        pair = pairs[i].split('=');
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return obj;
}

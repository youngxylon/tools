/**
 * get location query by name
 * @param {string} name
 * @returns {*}
 */
export default function getQuery(name) {
  let obj = searchToObject();
  if (obj.hasOwnProperty(name)) {
    return obj[name];
  } else {
    return;
  }
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

interface Api {
  [key: string]: any
}

let api: Api = {}

function createApi(arr: Api[]): void {
  arr.forEach(e => {
    const args: string[] = e.args
    e.type.forEach(i => {
      api[e.name] = new Function(
        'methods',
        ...args,
        'params',
        `return request(methods, ${parseUrl(e.url)},${args},'params')`
      )
    })
  })
}

function parseUrl(url: string): string {
  const reg = new RegExp('{', 'i')
  if (reg.test(url)) {
    return url.replace(reg, '${')
  } else {
    return url
  }
}

export default api

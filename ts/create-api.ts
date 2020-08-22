interface Api {
  [key: string]: any
}

export default function createApi(arr: string[]): object {
  let api: Api = {}
  arr.forEach(e => {
    let parseObj: object = parseUrl(e)
    api[parseObj['name']] = new Function(
      'method',
      'params',
      '...args',
      `return request({url:'${parseObj['url']}', method:method ,params})`
    )
  })
  return api
}

function parseUrl(url: string): object {
  const urlArr = url.split('/')
  if (urlArr.length > 0) {
    let name: string = ''
    urlArr.forEach(e => {
      if (e) {
        name += e.replace(e[0], e[0].toUpperCase())
      }
    })
    const regex = /{/gi
    const parsedUrl = url.replace(regex, '${')
    return {
      name: name.replace(name[0], name[0].toLowerCase()),
      url: parsedUrl,
    }
  } else {
    return {}
  }
}

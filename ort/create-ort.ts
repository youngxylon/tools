async function open(url: string) {
  let browserProcess

  switch (Deno.build.os) {
    case 'windows':
      browserProcess = Deno.run({ cmd: ['explorer', url] })
      break

    case 'darwin':
      browserProcess = Deno.run({ cmd: ['open', url] })
      break

    case 'linux':
      browserProcess = Deno.run({ cmd: ['sensible-browser', url] })
      break
  }

  await browserProcess.status()
}

function queryStringify(obj: any, prefix?: string): string {
  var pairs: any = []
  for (var key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue
    }

    var value: object = obj[key]
    var enkey = encodeURIComponent(key)
    var pair
    if (typeof value === 'object') {
      pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey)
    } else {
      pair =
        (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value)
    }
    pairs.push(pair)
  }
  return pairs.join('&')
}

function getDate(name: string): string {
  const date = new Date()
  if (name === 'tomorrow') {
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class Log {
  projectName: string
  actions: string[] = ['增加', '移除', '更改', '修复', '优化']
  pages: string[] = [
    '企业概况',
    '企业信息',
    '企业信息',
    '组织架构',
    '员工管理',
    '招聘管理',
    '考勤管理',
    '薪酬管理',
  ]
  components: string[] = [
    'button',
    'layout',
    'input',
    'form',
    'select',
    'picker',
    'search',
    'upload',
    'checkbox',
    'radio',
    'switch',
    'table',
  ]
  types: string[] = [
    '的interface',
    '的class',
    '的function',
    '的method',
    '的style',
    '的font',
    '的color',
  ]
  constructor(projectName: string) {
    this.projectName = projectName
  }

  createLog(): string {
    let newLog: string = `<h3 style="text-align:center">${this.projectName}</h3><ul>`
    let sentences = new Map()
    let sentencesNum: number = getRandomInt(4, 7)
    while (sentences.size < sentencesNum) {
      let sentence: string = ''
      sentence += '<li>' + this.actions[getRandomInt(0, this.actions.length - 1)]
      sentence += this.pages[getRandomInt(0, this.pages.length - 1)]
      sentence += this.components[getRandomInt(0, this.components.length - 1)]
      sentence += this.types[getRandomInt(0, this.types.length - 1)] + '</li>'
      sentences.set(sentence, sentence)
    }
    sentences.forEach(value => {
      newLog += value
    })
    return newLog + '</ul>'
  }

  async postLog() {
    const config = {
      method: 'POST',
      headers: {
        Cookie: `PHPSESSID=uhsg0g933v5p4dmc1rkatcq7g4`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryStringify({
        date: getDate('today'),
        work_text: this.createLog(),
        nextplandate: getDate('tomorrow'),
      }),
    }

   await fetch(
      `http://1629501zp6.51mypc.cn:58142/work/create/date/${getDate('today')}/id/3`,
      config
    )
    await open('http://1629501zp6.51mypc.cn:58142/work/create/id/3')
  }
}

const log = new Log('公司管理系统')
log.postLog()

//deno run --allow-all

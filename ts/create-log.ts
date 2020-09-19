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

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  createLog(): string {
    let newLog: string = `<h3 style="text-align:center">${this.projectName}</h3><ul>`
    let sentences = new Map()
    let sentencesNum: number = this.getRandomInt(4, 7)
    while (sentences.size < sentencesNum) {
      let sentence: string = ''
      sentence += '<li>' + this.actions[this.getRandomInt(0, this.actions.length - 1)]
      sentence += this.pages[this.getRandomInt(0, this.pages.length - 1)]
      sentence += this.components[this.getRandomInt(0, this.components.length - 1)]
      sentence += this.types[this.getRandomInt(0, this.types.length - 1)] + '</li>'
      sentences.set(sentence, sentence)
    }
    sentences.forEach(value => {
      newLog += value
    })
    return newLog + '</ul>'
  }
}

function today() {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const log = new Log('公司管理系统')
log.createLog()

const body: object = { work_text: log.createLog(), date: today() }

const res = await fetch(
  `http://1629501zp6.51mypc.cn:58142/work/create/date/${today()}/id/3`,
  {
    method: 'POST',
    headers: {
      Cookie: 'PHPSESSID=1rsikd7gr83teq6ahg0ordbh97',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body),
  }
)
// const data = await res.json()
console.log(res)

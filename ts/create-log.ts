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
  createLog(): void {
    let newLog: string = `<h3 style="text-align:center">${this.projectName}</h3><ul>`
    let sentences = new Map()
    let sentencesNum: number = this.getRandomInt(3, 7)
    for (let index = 0; index < sentencesNum; index++) {
      let sentence: string = ''
      sentence += '<li>' + this.actions[this.getRandomInt(0, this.actions.length - 1)]
      sentence += this.pages[this.getRandomInt(0, this.pages.length - 1)]
      sentence += this.components[this.getRandomInt(0, this.components.length - 1)]
      sentence += this.types[this.getRandomInt(0, this.types.length - 1)] + '</li>'
      newLog += sentence
      sentences.set(sentence, sentence)
    }
    if (sentences.size < 3) {
      this.createLog()
    } else {
      console.log(newLog + '</ul>')
    }
  }
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
const log = new Log('公司管理系统')
log.createLog()
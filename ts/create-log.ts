class Log {
  projectName: string
  actions: string[] = ['新增', '移除', '更改', '修复']
  objects: string[] = [
    '企业概况',
    '企业信息',
    '企业信息',
    '组织架构',
    '员工管理',
    '招聘管理',
    '考勤管理',
    '薪酬管理',
  ]
  constructor(projectName: string) {
    this.projectName = projectName
  }
  createLog() {
    console.log(this.projectName)
  }
}
const newLog = new Log('公司管理系统')
newLog.createLog()

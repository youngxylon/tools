// ==UserScript==
// @name         create ORT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://1629501zp6.51mypc.cn:58142/*
// @match        http://192.168.3.4:8081/*
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'

  // Your code here...
  console.log(location)
  if (location.pathname.includes('/company/login')) {
    document.getElementById('companyname').value = 'LY'
    document.getElementById('username').value = '程序员-杨健斌'
    document.getElementById('password').value = '123456'
    document.getElementsByTagName('form')[0].submit()
  }

  if (location.pathname.includes('/work/create')) {
    let createBtn = document.createElement('input')
    createBtn.type = 'button'
    createBtn.value = '生成日志'
    document
      .getElementsByClassName('tbhead')[0]
      .firstElementChild.appendChild(createBtn)

    createBtn.onclick = function toCreateLog() {
      const log = new Log('公司管理系统')
      const sourceTag = document.getElementsByClassName('xheEnabled')[20]
      if (sourceTag) {
        sourceTag.click()
      }
      document
        .getElementById('xhe0_iframe')
        .contentWindow.document.getElementById(
          'sourceCode'
        ).value = log.createLog()
      document.getElementsByClassName('bginput')[0].click()
    }

    class Log {
      projectName = ''
      actions = ['增加', '移除', '更改', '修复', '优化']
      pages = [
        '企业概况',
        '企业信息',
        '企业信息',
        '组织架构',
        '员工管理',
        '招聘管理',
        '考勤管理',
        '薪酬管理'
      ]
      components = [
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
        'table'
      ]
      types = [
        '的interface',
        '的class',
        '的function',
        '的method',
        '的style',
        '的font',
        '的color'
      ]
      constructor(projectName) {
        this.projectName = projectName
      }

      createLog() {
        function getRandomInt(min, max) {
          min = Math.ceil(min)
          max = Math.floor(max)
          return Math.floor(Math.random() * (max - min + 1)) + min
        }

        let newLog = `<h3 style="text-align:center">${this.projectName}</h3><ul>`
        let sentences = new Map()
        let sentencesNum = getRandomInt(4, 7)
        while (sentences.size < sentencesNum) {
          let sentence = ''
          sentence +=
            '<li>' + this.actions[getRandomInt(0, this.actions.length - 1)]
          sentence += this.pages[getRandomInt(0, this.pages.length - 1)]
          sentence += this.components[
            getRandomInt(0, this.components.length - 1)
          ]
          sentence +=
            this.types[getRandomInt(0, this.types.length - 1)] + '</li>'
          sentences.set(sentence, sentence)
        }
        sentences.forEach(value => {
          newLog += value
        })
        return newLog + '</ul>'
      }
    }
  }
})()

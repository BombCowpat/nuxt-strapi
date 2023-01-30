'use strict'

const fs = require('fs')
const path = require('path')
const { exec } = require('node:child_process')
const targetCwd = process.cwd().replace('/admin-api', '/user-ui-pc')
let serverProcess = null
let status = {
  serverStatus: 0, // 0:stop 1:running
  isBuilding: false,
  isGenerating: false,
}
module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Dashboard'
  },
  getStatus() {
    return status
  },
  generate() {
    if (!status.isGenerating) {
      status.isGenerating = true
      exec(
        'npm run generate',
        {
          cwd: targetCwd,
        },
        error => {
          if (error) {
            status.isGenerating = false
            console.error(`exec error: ${error}`)
            return
          }
          status.isGenerating = false
          const date = new Date()
          const time = `${date.getFullYear()}:${date.getMonth() + 1}:${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          fs.writeFileSync(path.resolve(targetCwd, 'dist/datetime.txt'), time)
        }
      )
    }
    return {
      status,
      cwd: process.cwd(),
      targetCwd,
    }
  },
  build() {
    if (!status.isBuilding) {
      status.isBuilding = true
      exec(
        'npm run build',
        {
          cwd: targetCwd,
        },
        error => {
          if (error) {
            status.isBuilding = false
            console.error(`exec error: ${error}`)
            return
          }
          status.isBuilding = false
          const date = new Date()
          const time = `${date.getFullYear()}:${date.getMonth() + 1}:${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          fs.writeFileSync(path.resolve(targetCwd, '.nuxt/datetime.txt'), time)
        }
      )
    }
    return {
      status,
      cwd: process.cwd(),
      targetCwd,
    }
  },
  start() {
    if (status.serverStatus === 0) {
      status.serverStatus = 1
      serverProcess = exec('npm run start', { cwd: targetCwd }, error => {
        // 进程终止时才会执行
        if (error) {
          console.error(`exec error: ${error}`)
        }
      })
      return {
        status,
        cwd: process.cwd(),
        targetCwd,
        message: '操作成功，正在启动',
        pid: serverProcess.pid,
      }
    } else if (status.serverStatus === 1) {
      return {
        status,
        cwd: process.cwd(),
        targetCwd,
        message: '正在运行中，请勿重复操作',
      }
    }
  },
  stop() {
    if (status.serverStatus === 0) {
      return {
        status,
        cwd: process.cwd(),
        targetCwd,
        message: '服务已处于停止状态',
      }
    } else {
      // sudo kill -9 $(sudo lsof -t -i:1339)
      serverProcess.kill()
      status.serverStatus = 0
      return {
        status,
        cwd: process.cwd(),
        targetCwd,
        message: '操作成功，服务已停止',
      }
    }
  },
  restart() {
    // 暂未实现
    if (status.serverStatus === 0) {
      return {
        status,
        cwd: process.cwd(),
        targetCwd,
        message: '请先启动服务',
      }
    } else {
      console.log('restart')
      serverProcess.kill('SIGHUP')
      status.serverStatus = 1
      serverProcess = exec('npm run start', { cwd: targetCwd }, error => {
        // 进程终止时才会执行
        if (error) {
          console.error(`exec error: ${error}`)
        }
      })
      return {
        status,
        cwd: process.cwd(),
        targetCwd,
        message: '操作成功，正在重启',
      }
    }
  },
})

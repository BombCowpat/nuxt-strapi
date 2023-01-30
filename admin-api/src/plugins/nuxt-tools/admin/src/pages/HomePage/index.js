/*
 *
 * HomePage
 *
 */

import React from 'react'
import { Button } from '@strapi/design-system/Button'
import axiosInstance from '../../utils/axiosInstance'
import pluginId from '../../pluginId'
const HomePage = () => {
  function getStatus() {
    axiosInstance.get(`${pluginId}/dashboard/getStatus`)
  }
  function generatePages() {
    axiosInstance.get(`${pluginId}/dashboard/generate`)
  }
  function build() {
    axiosInstance.get(`${pluginId}/dashboard/build`)
  }
  function start() {
    axiosInstance.get(`${pluginId}/dashboard/start`)
  }
  function stop() {
    axiosInstance.get(`${pluginId}/dashboard/stop`)
  }
  function restart() {
    // axiosInstance.get(`${pluginId}/dashboard/restart`)
  }
  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={getStatus} style={{ marginBottom: '10px' }}>
        更新状态
      </Button>
      <Button onClick={generatePages} style={{ marginBottom: '10px' }}>
        生成页面
      </Button>
      <Button onClick={build} style={{ marginBottom: '10px' }}>
        构建项目
      </Button>
      <Button onClick={start} style={{ marginBottom: '10px' }}>
        启动服务
      </Button>
      <Button onClick={stop} style={{ marginBottom: '10px' }}>
        停止服务
      </Button>
      <Button onClick={restart} style={{ marginBottom: '10px' }}>
        重启服务
      </Button>
    </div>
  )
}

export default HomePage

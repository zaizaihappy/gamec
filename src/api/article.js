import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

// 添加代理商
export function addAgent(data) {
  return request({
    url: '/oss/sys/agent/add',
    method: 'post',
    data
  })
}

// 修改代理商
export function updAgent(data) {
  return request({
    url: '/oss/sys/agent/modify',
    method: 'post',
    data
  })
}

// 获取代理商列表
export function getAgentList(data) {
  return request({
    url: '/oss/sys/agent/agentInfoPage',
    method: 'post',
    data
  })
}

// 根据ID查询单个代理商信息
export function queryOneAgent(agentId) {
  return request({
    url: '/oss/sys/agent/getAgentInfo',
    method: 'post',
    params: { agentId }
  })
}

// 获取代理商列表
export function getPlayerList(data) {
  return request({
    url: '/oss/sys/player/getPlayerPage',
    method: 'post',
    data
  })
}

// 根据ID查询单个玩家信息
export function queryOnePlayer(memberId) {
  return request({
    url: '/oss/sys/player/getPlayerInfo',
    method: 'post',
    params: { memberId }
  })
}

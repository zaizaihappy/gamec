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

// 代理商管理-添加代理商
export function addAgent(data) {
  return request({
    url: '/oss/sys/agent/add',
    method: 'post',
    data
  })
}

// 代理商管理-修改代理商
export function updAgent(data) {
  return request({
    url: '/oss/sys/agent/modify',
    method: 'post',
    data
  })
}

// 代理商管理-修改代理商状态
export function updAgentStatus(data) {
  return request({
    url: '/oss/sys/agent/resetAgentStatus',
    method: 'post',
    data
  })
}

// 代理商管理-获取代理商列表
export function getAgentList(data) {
  return request({
    url: '/oss/sys/agent/agentInfoPage',
    method: 'post',
    data
  })
}

// 代理商管理-根据ID查询单个代理商信息
export function queryOneAgent(agentId) {
  return request({
    url: '/oss/sys/agent/getAgentInfo',
    method: 'post',
    params: { agentId }
  })
}

// 上下分管理-代理商上分
export function upGoldenBean(data) {
  return request({
    url: '/oss/sys/agentBean/upGoldenBean',
    method: 'post',
    data
  })
}

// 上下分管理-代理商下分
export function downGoldenBean(data) {
  return request({
    url: '/oss/sys/agentBean/downGoldenBean',
    method: 'post',
    data
  })
}

// 玩家管理-获取玩家列表
export function getPlayerList(data) {
  return request({
    url: '/oss/sys/player/getPlayerPage',
    method: 'post',
    data
  })
}

// 玩家管理-根据ID查询单个玩家信息
export function queryOnePlayer(memberId) {
  return request({
    url: '/oss/sys/player/getPlayerInfo',
    method: 'post',
    params: { memberId }
  })
}

// 玩家管理-获取玩家列表
export function updPlayerStatus(data) {
  return request({
    url: '/oss/sys/player/resetPlayerStatus',
    method: 'post',
    data
  })
}

// 玩家管理-添加玩家信息
export function addPlayer(data) {
  return request({
    url: '/oss/sys/player/createPlayer',
    method: 'post',
    data
  })
}

// 玩家管理-编辑玩家信息
export function updPlayer(data) {
  return request({
    url: '/oss/sys/player/editPlayer',
    method: 'post',
    data
  })
}

// 公告管理-获取公告列表接口
export function getNewsList(data) {
  return request({
    url: '/oss/sys/news/getNewsPage',
    method: 'post',
    data
  })
}

// 公告管理-添加公告接口
export function addNews(data) {
  return request({
    url: '/oss/sys/news/publish',
    method: 'post',
    data
  })
}

// 公告管理-获取公告详情接口
export function getNewsDetail(newsId) {
  return request({
    url: '/oss/sys/news/getNewsInfo',
    method: 'post',
    params: { newsId }
  })
}

// 公告管理-修改公告接口
export function updNews(data) {
  return request({
    url: '/oss/sys/news/modify',
    method: 'post',
    data
  })
}

// 公告管理-获取公告详情接口
export function updNewsStatus(data) {
  return request({
    url: '/oss/sys/news/setNewsStatus',
    method: 'post',
    data
  })
}

// 金豆明细管理-获取代理商列表
export function getAgentBeanList(data) {
  return request({
    url: '/oss/sys/goldenBean/agentPage',
    method: 'post',
    data
  })
}

// 金豆明细管理-获取代理商金豆明显列表
export function getAgentBeanDetail(data) {
  return request({
    url: '/oss/sys/goldenBean/agentGBByCondition',
    method: 'post',
    data
  })
}

// 金豆明细管理-获取玩家列表
export function getPlayerBeanList(data) {
  return request({
    url: '/oss/sys/goldenBean/playerPage',
    method: 'post',
    data
  })
}

// 金豆明细管理-获取玩家金豆明显列表
export function getPlayerBeanDetail(data) {
  return request({
    url: '/oss/sys/goldenBean/playerGBByCondition',
    method: 'post',
    data
  })
}

// 商品管理-获取商品列表
export function getGoodsList(data) {
  return request({
    url: '/oss/sys/goods/getGoodsPage',
    method: 'post',
    data
  })
}

// 商品管理-添加商品
export function addGoods(data) {
  return request({
    url: '/oss/sys/goods/add',
    method: 'post',
    data
  })
}

// 商品管理-获取商品详情
export function getGoodsDetail(goodsId) {
  return request({
    url: '/oss/sys/goods/getGoodsInfo',
    method: 'post',
    params: { goodsId }
  })
}

// 商品管理-修改商品信息
export function updGoods(data) {
  return request({
    url: '/oss/sys/goods/modify',
    method: 'post',
    data
  })
}

// 商品管理-修改商品状态
export function updGoodsStatus(data) {
  return request({
    url: '/oss/sys/goods/setGoodsStatus',
    method: 'post',
    data
  })
}

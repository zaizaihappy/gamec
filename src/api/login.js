import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password,
    memberName: '123',
    memberNickname: '123',
    memberMobile: '15442256369',
    registerDate: '2017-08-08 05:05:05',
    parentId: '1'
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}


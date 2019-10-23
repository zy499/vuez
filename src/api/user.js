/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-09-05 17:00:27
 * @LastEditors: zy
 * @LastEditTime: 2019-10-22 15:40:23
 */
import http from '@/utils/httpRequest'

export function login (data) {
  return http({
    url: http.adornUrl('basic/usercenter/account/login'),
    // url: http.adornUrl('/sys/login'),
    method: 'post',
    data: http.adornData(data)
  })
}
export function loginOut () {
  return http({
    // url: http.adornUrl('/basic/usercenter/account/logout'),
    url: http.adornUrl('/sys/logout'),
    method: 'post'
  })
}

export function getUserInfo () {
  return http({
    url: http.adornUrl('/basic/usercenter/user/getBytoken'),
    // url: http.adornUrl('/sys/user/info'),
    method: 'get'
  })
}

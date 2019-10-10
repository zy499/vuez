/*
 * @Description: 客流预警
 * @Author: zy
 * @Date: 2019-09-17 14:55:38
 * @LastEditors: zy
 * @LastEditTime: 2019-09-29 23:46:07
 */
import http from '@/utils/httpRequest'

/**
 * @name: 获取线路下拉数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getLineInfo () {
  return http({
    url: http.adornUrl('/business/passengerflow/lineinfo'),
    method: 'get'
  })
}

/**
 * @name: 获取预警告警数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getWarnAndAlarmData (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/warnandalarmdata'),
    method: 'get',
    params
  })
}

/**
 * @name:  获取线网指标数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getNetWorkData (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/networkdata'),
    method: 'get',
    params
  })
}

/**
 * @name:  获取线路客流排名数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getLineOrderData (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/lineorderdata'),
    method: 'get',
    params
  })
}

/**
 * @name:  获取车站客流排名数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getStationOrderData (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/stationorderdata'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * @name:  获取线网断面最大拥挤度数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getDirsecloadData (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/dirsecloaddata'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * @name:  获取线网断面客流量排名数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getDirsecorderData (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/dirsecorderdata'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * @name:  /todayforecastdata 查询今日预测的客流指标数据
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getTodayforecastdata (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/todayforecastdata'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * @name:  /dirsecdistdata 线网拥挤度
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getDirsecdistdata (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/dirsecdistdata'),
    method: 'get',
    params: http.adornParams(params)
  })
}

/**
 * @name:  获取天气
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getWeather () {
  return http({
    url: http.adornUrl('/business/passengerflow/weather'),
    method: 'get'
  })
}

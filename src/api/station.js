/*

 * @Description: 车站详情
 * @Author: zy
 * @Date: 2019-09-23 13:40:22
 * @LastEditors: zy
 * @LastEditTime: 2019-09-29 19:24:56
 */
import http from '@/utils/httpRequest'

/**
 * @name: /basic 查询线路信息
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getBasicInfo () {
  return http({
    url: http.adornUrl('/business/passengerflow/basic'),
    method: 'get'
  })
}

/**
 * @name: /stationflowdata 查询线网图车站客流指标信息
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getStationflowdata (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/stationflowdata'),
    method: 'get',
    params
  })
}

/**
 * @name: /stationbreakdata 查询车站客流历史客流突破信息（默认为3条）
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getStationbreakdata (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/stationbreakdata'),
    method: 'get',
    params
  })
}

/**
 * @name: /stationcurvedata 查询线网图车站全天客流信息（时间从早上05:00开始到0点，时间间隔为1小时）
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getStationcurvedata (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/stationcurvedata'),
    method: 'get',
    params
  })
}

/**
 * @name: /trandetdirdata 查询换乘站站内换乘信息（针对换乘站，折线图从5:00到18:00）
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getTrandetdirdata (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/trandetdirdata'),
    method: 'get',
    params
  })
}

/**
 * @name: /lasttrainlimit 查查询末班车可达性信息表,具体数据模型jiao
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getLasttrainlimit (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/lasttrainlimit'),
    method: 'get',
    params
  })
}

/**
 * @name: /stationfacility/{stationNo} 站内设施
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getStationfacility (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/stationfacility'),
    method: 'get',
    params
  })
}

/**
 * @name: /stationfacility/{stationNo} od
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getODdata (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/ODdata'),
    method: 'get',
    params
  })
}

/**
 * @name: /dirseccapacityhistory/ dirseccapacityhistory
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getDirseccapacityhistory (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/dirseccapacityhistory'),
    method: 'get',
    params
  })
}

/**
 * @name: /stationtodayforecast
 * @test: test font
 * @msg:
 * @param {type}
 * @return:
 */
export function getStationtodayforecast (params) {
  return http({
    url: http.adornUrl('/business/passengerflow/stationtodayforecast'),
    method: 'get',
    params
  })
}

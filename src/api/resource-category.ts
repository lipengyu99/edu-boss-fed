/**
 * 资源分类相关请求模块
 */

import request from '@/utils/request'

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const saveOrderUpdate = (data:any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

export const deleteResource = (id: any) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}

import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '@/router'
const request = axios.create({
  // baseURL: 'http://eduboss.lagou.com'
  baseURL:'/api'

})

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
function redirectLogin () {
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
request.interceptors.request.use(
  function (config: any) {
    const { user } = store.state
    if (user && user.access_token) {
      config.headers.Authorization = user.access_token
    }
    return config
  },
  function (error: any) {
    return Promise.reject(error)
  }
)
let isRfreshing = false
let requests: any[] = []
request.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        Message.error('请求参数错误')
      } else if (status === 401) {
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }
        if (!isRfreshing) {
          isRfreshing = true
          return refreshToken()
            .then(res => {
              if (!res.data.success) {
                throw new Error('刷新token 失败')
              }
              store.commit('setUser', res.data.content)
              requests.forEach(cb => cb())
              requests = []
              return request(error.config)
            })
            .catch(error => {
              store.commit('setUser', null)
              redirectLogin()
              return Promise.reject(error)
            })
            .finally(() => {
              isRfreshing = false
            })
        }

        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
      } else if (status === 403) {
        Message.error('没有权限，请联系管理员')
      } else if (status === 404) {
        Message.error('请求资源不存在')
      } else if (status >= 500) {
        Message.error('服务器错误，请联系管理员')
      }
    } else if (error.request) {
      Message.error('请求超时，请刷新重试')
    } else {
      Message.error(`请求失败:${error.message}`)
    }

    return Promise.reject(error)
  }
)
export default request

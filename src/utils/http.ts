/*
  添加拦截器：
    拦截request请求
    拦截uploadFile文件上传

  TODO：
    1:非http开头需拼接地址
    2:请求超时
    3:添加小程序端请求头标识
    4:添加token请求头标识
*/

import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发此函数
  invoke(options: UniApp.RequestOptions) {
    // 1. 非http开头需要拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时
    options.timeout = 5000
    // 3. 添加小程序请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 4. 添加token请求头设置
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

// 请求拦截器
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回promise对象
  return new Promise<Data<T>>((resovle, reject) => {
    uni.request({
      ...options,
      // 2. 请求成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据  res.data
          resovle(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401报错，清理用户信息，跳转到登陆页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 3. 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(err)
      },
    })
  })
}

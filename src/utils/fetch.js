import axios from 'axios'
import { Message } from 'iview'
import config from '@/config'
import router from '@/router'

let _env = process.env.NODE_ENV
let _envConfig = config[_env]

// 全局默认配置
axios.defaults.baseURL = _envConfig.host;
axios.defaults.timeout = 10000;

// 开发环境打印信息
function log(msg) {
    if (_env === 'development') {
        console.log(msg)
    }
}
// export {axios}
export default (options) => {
    let _opts = Object.assign({ method: 'get' }, options)
    return new Promise((resolve, reject) => {
        axios(_opts)
            .then(res => {
                switch (res.status) {
                    case 400:
                        Message.error('前端发生异常错误')
                        reject(res)
                        break
                    case 401:
                        Message.error('Session失效，请重新登录')
                        router.push({ path: '/login' })
                        reject(res)
                        break
                    default:
                        resolve(res)
                }
            })
            .catch(err => {
                Message.error(err.msg || '发生异常错误')
                log(err)
                reject(err)
            })
    })
}

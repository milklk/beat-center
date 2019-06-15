let api = ''

if (process.env.NODE_ENV === 'development') {
  api = '/bs'
} else {
  api = 'http://120.79.94.74:8082/glapi'
}
export default api;
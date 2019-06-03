let api = ''

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  api = '/bs'
} else {
  api = ''
}
export default api;
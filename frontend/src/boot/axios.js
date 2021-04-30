import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 30000,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      'Content-Type': 'application/json'
    }
  })
}

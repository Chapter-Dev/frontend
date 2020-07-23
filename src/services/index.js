import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:8010`,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/html',
      'Content-Type': 'application/json'
    }
  })
}

import service from '@/services'

export default {
  async login (params) {
    return service().get('/user/login', {
      params: params
    })
  },
  register (data) {
    return service().post('/user/register', data)
  },
  allow (params) {
    return service().get('/user/login/' + params)
  },
  details (uuid) {
    return service().post('/user/profile', {
      'uuid': uuid,
      'token': localStorage.getItem('token')
    })
  },
  init () {
    return service().get('/init')
  },
  update (uuid, data) {
    return service().post('/user/' + uuid + '/update', data)
  }

}

import axios from 'axios'

const api = axios.create({
  baseURL: '/todos',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const todosApi = {
  async list() {
    const { data } = await api.get('/')
    return data
  },

  async get(id) {
    const { data } = await api.get(`/${id}`)
    return data
  },

  async create(todo) {
    const { data } = await api.post('/', todo)
    return data
  },

  async update(id, todo) {
    const { data } = await api.put(`/${id}`, todo)
    return data
  },

  async remove(id) {
    await api.delete(`/${id}`)
  }
}
import axios from 'axios'

const api = axios.create({
  baseURL: '/todos',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const todosApi = {
  async list() {
    // ÄNDERUNG: Leerer String statt '/'
    // Vorher: await api.get('/')  -> Resultat: /todos/ (404)
    // Jetzt:  await api.get('')   -> Resultat: /todos  (200 OK)
    const { data } = await api.get('') 
    return data
  },

  async get(id) {
    const { data } = await api.get(`/${id}`)
    return data
  },

  async create(todo) {
    // ÄNDERUNG: Leerer String statt '/'
    const { data } = await api.post('', todo)
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
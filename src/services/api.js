export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  const token = localStorage.getItem('access_token')
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  const res = await fetch(API_BASE_URL + path, { ...options, headers })

  if (!res.ok) {
    throw new Error('Ошибка запроса')
  }
  return res.json()
}

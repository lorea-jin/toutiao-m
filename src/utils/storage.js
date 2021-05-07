// 本地存储
export function setToken(name, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(name, value)
}

export function getToken(name) {
  return JSON.parse(window.localStorage.getItem(name))
}

export function removeToken(name) {
  return window.localStorage.removeItem(name)
}

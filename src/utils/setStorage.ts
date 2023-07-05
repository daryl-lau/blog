const setStorage = (
  type: 'local' | 'session',
  key: string,
  val: Record<string, unknown> | string,
): void => {
  let value = '';
  if (typeof val === 'string') {
    value = val;
  } else {
    value = JSON.stringify(val);
  }
  if (type === 'local') {
    localStorage.setItem(key, value);
  } else if (type === 'session') {
    sessionStorage.setItem(key, value);
  }
};

function getStorage<T>(type: 'local' | 'session', key: string): T | null {
  let result = null;
  if (type === 'local') {
    result = localStorage.getItem(key);
  } else if (type === 'session') {
    result = sessionStorage.getItem(key);
  }
  if (result) {
    return JSON.parse(result);
  }
  return null;
}

export { setStorage, getStorage };

export function unpacData<T>(data: string, withoutLocalStorage = false) {
  try {
    if(withoutLocalStorage){
      return JSON.parse(data || "") as T;
    }
    return JSON.parse(localStorage.getItem(data) || "") as T;
  } catch {
    return null;
  }
}

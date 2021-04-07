export default class Http {
  static request(method: string, url: string, body?: object) {
    return fetch(`http://localhost:1488${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || undefined,
        'Dialog-Get-At': localStorage.getItem('DialogGetAt') || undefined,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

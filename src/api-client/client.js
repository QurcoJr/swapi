const apiURL = process.env.NEXT_PUBLIC_API_URL

async function client(endpoint, lang) {
  return fetch(`${apiURL}/${endpoint ?? ''}`).then(async response => {
    let data
    if (lang === 'wo') {
      const text = await response.text()
      let validJSON = text.replace(/\\/g, ' ')
      validJSON = validJSON.replace(/whhuanan/g, '"whhuanan"')
      data = JSON.parse(validJSON)
    } else {
      data = await response.json()
    }

    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client }

const getHook = async (url, headers) => {
  let response

  if (!headers) {
    response = await fetch(url)
  } else {
    console.log('Headers')
    response = await fetch(url, headers)
  }

  const responseData = await response.json()

  let data = await responseData

  return data
}

export default getHook

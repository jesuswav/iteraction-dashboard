const getHook = async (url, headers) => {
  let response

  if (!headers) {
    response = await fetch(url)
  } else {
    response = await fetch(url, headers)
  }

  const responseData = await response.json()

  let data = await responseData

  return data
}

export default getHook

export async function fetchUtil(
  url: string,
  method: string,
  body: object = {},
): Promise<unknown> {
  try {
    const reqObject =
      method != 'GET'
        ? {
            method,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
          }
        : {}
    const response = await fetch(url, reqObject)

    const data: unknown = await response.json()

    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

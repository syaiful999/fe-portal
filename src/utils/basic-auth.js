export const createBasicAuthentication = ({ username, password }) => {
  const stringBase64 = new Buffer(`${username}:${password}`).toString('base64')
  return `Basic ${stringBase64}`
}
  
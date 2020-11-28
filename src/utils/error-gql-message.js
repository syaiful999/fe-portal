export const getMessageErrorGQL = (e) => {
  const [, message] = e.split('GraphQL error: Error:')
  if (message) return message
  return ''
}

export function captureException(error: any) {
  console.warn('Expected error - ', error)
}

export function capitalize(str: string) {
  const arr = str.split(' ')

  return arr.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

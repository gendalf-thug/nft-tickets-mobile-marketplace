export const formatPrice = (price: number) => {
  if (price >= 1000000) return `${+(price / 1000000).toFixed(3)}M`
  else if (price >= 1000) return `${+(price / 1000).toFixed(3)}K`
  else return price
}

export const formatPriceSmall = (price: number) => {
  if (price >= 1000000) return `${+(price / 1000000).toFixed(2)}M`
  else if (price >= 1000) return `${+(price / 1000).toFixed(2)}K`
  else return price
}

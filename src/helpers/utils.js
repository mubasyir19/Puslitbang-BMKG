export const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formatterDate = new Intl.DateTimeFormat('id-ID', options)
  return formatterDate.format(date)
}

export const limitContent = (content, limit) => {
  const words = content.split(' ')
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...'
  }
  return content
}

export const convertToSlug = (s) => {
  let slug = s.replace(/\s+/g, '-')
  slug = slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
  return slug
}

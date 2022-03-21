import { client } from './client'

export function searchUnit({ categoryName, name, lang }) {
  let params = new URLSearchParams()
  params.append('search', name)
  if (lang === 'wo') {
    params.append('format', 'wookiee')
  }
  return client(`${categoryName}/?${params}`, lang)
}

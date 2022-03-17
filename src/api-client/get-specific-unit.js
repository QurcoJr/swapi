import { client } from './client'

export function getSpecificUnit({ categoryName, id, lang }) {
  let params = ''
  if (lang === 'wo') {
    params = new URLSearchParams(`format=wookiee`)
  }
  return client(`${categoryName}/${id}/?${params}`, lang)
}

import { client } from './client'

export function getDetails({ categoryName, name, lang }) {
  return client(`/category/${categoryName}/${name}`, {
    headers: { language: lang }
  })
}

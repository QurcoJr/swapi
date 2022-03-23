import { client } from './client'

export function getCategory({ categoryName }) {
  return client(`/category/${categoryName}`)
}

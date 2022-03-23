import { client } from './client'

export function getCategories() {
  return client('categories')
}

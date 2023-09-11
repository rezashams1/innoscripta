import { Author, Source } from "./news"

export interface User {
    id: number
    name: string
    email: string
    sources: Source[]
    authors: Author[]
  }
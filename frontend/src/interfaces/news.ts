export interface Author {
    id: number
    title: string
}

export interface Source {
    id: number
    title: string
}

export interface News {
    id: number
    title: string
    description: string
    content: string
    date: string
    author: {
        title: string
    }
    source: {
        title: string
    }
}
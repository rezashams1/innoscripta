import { type HttpErrorType, type HttpResponseType } from './../api'
import { Api } from '../api'
import { Author, News, Source } from '../../interfaces/news'

export const NewsService = {
  sources: async (q: string, makeAlert: any): Promise<HttpResponseType<{ sources: Source[] }>> =>
    await new Promise((resolve, reject) => {
      const api = new Api()

      api.instance
        .get(api.route('get news sources'), { q })
        .then((response: any) => {
          resolve(response)
        })
        .catch((error: HttpErrorType) => {
          reject(error)
          api.handleErrorsAsAlert(error, makeAlert)
        })
    }),

  authors: async (q: string, makeAlert: any): Promise<HttpResponseType<{ authors: Author[] }>> =>
    await new Promise((resolve, reject) => {
      const api = new Api()

      api.instance
        .get(api.route('get news authors'), { q })
        .then((response: any) => {
          resolve(response)
        })
        .catch((error: HttpErrorType) => {
          reject(error)
          api.handleErrorsAsAlert(error, makeAlert)
        })
    }),

  news: async (params: { type?: 'all' | 'personalized', q?: string, sources?: string, authors?: string, categories?: string, order?: string, skip: number }, makeAlert: any): Promise<HttpResponseType<{ news: News[] }>> =>
    await new Promise((resolve, reject) => {
      const api = new Api()

      api.instance
        .get(api.route('get news'), { params })
        .then((response: any) => {
          resolve(response)
        })
        .catch((error: HttpErrorType) => {
          reject(error)
          api.handleErrorsAsAlert(error, makeAlert)
        })
    }),
}

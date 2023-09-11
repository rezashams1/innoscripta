import { type AxiosError } from 'axios'
import { HttpClient } from './httpClient'

export interface HttpResponseType<T> {
  data: T
  errors: Array<{ constraints: string[], property: string }>
  message: string
  statusCode: number
}
export interface HttpErrorType extends AxiosError {
  response: AxiosError['response'] & {
    data: {
      errors: Array<{ constraints: string[], property: string }>
      message: string
      statusCode: number
    }
  }
}

export class Api extends HttpClient {
  private readonly routes = [
    // auth
    { name: 'auth', path: '/auth' },
    { name: 'logout', path: '/auth/logout' },
    { name: 'login', path: '/auth/login' },
    { name: 'register', path: '/auth/register' },

    { name: 'set preferences', path: '/user/preferences' },

    { name: 'get news authors', path: '/news/authors' },
    { name: 'get news sources', path: '/news/sources' },
    { name: 'get news', path: '/news' },
  ]

  constructor () {
    super(process.env.REACT_APP_API_BASE_URL)
  }

  route (routeName: string, routeParams?: Array<{ key: string, value: any }>): string {
    const route = this.routes.find((route) => route.name === routeName)
    let returnRoute = ''

    if (route !== undefined) {
      returnRoute = route.path

      if (routeParams !== undefined) {
        for (const item of routeParams) {
          returnRoute = returnRoute.replace(':' + item.key, item.value)
        }
      }
    }

    return returnRoute
  }

  handleErrors (err: HttpErrorType, setError: any = null, makeAlert: any): void {
    if (err.response !== undefined && err.response !== null) {
      const { errors, message, statusCode } = err.response.data

      if (statusCode === 400) {
        if (setError != null) {
          for (const error of errors) {
            setError(error.property, { message: error.constraints[0] })
          }
        }
      }

      makeAlert('error', message)
    } else {
      makeAlert('error', 'Server error occurred')
    }
  }

  handleErrorsAsAlert (err: HttpErrorType, makeAlert: any): void {
    if (err.response !== undefined && err.response !== null) {
      const { errors, message, statusCode } = err.response.data

      if (statusCode === 400) {
        for (const error of errors) {
          makeAlert('error', error.constraints[0])
        }
      } else {
        makeAlert('error', message)
      }
    } else {
      makeAlert('error', 'Server error occurred')
    }
  }

  handleErrorsAsErrorOrAlert (err: HttpErrorType, setError: any = null, makeAlert: any, alertFields: string[]): void {
    if (err.response !== undefined && err.response !== null) {
      const { errors, message, statusCode } = err.response.data

      if (statusCode === 400) {
        for (const error of errors) {
          if (alertFields.includes(error.property)) {
            makeAlert('error', error.constraints[0])
          } else {
            setError(error.property, { message: error.constraints[0] })
          }
        }
      } else {
        makeAlert('error', message)
      }
    } else {
      makeAlert('error', 'Server error occurred')
    }
  }
}

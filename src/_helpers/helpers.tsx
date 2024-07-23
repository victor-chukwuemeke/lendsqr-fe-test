import localForage from 'localforage'
import CryptoJS from 'crypto-js'
import { number } from 'prop-types'

localForage.setDriver([
    localForage.INDEXEDDB,
    localForage.LOCALSTORAGE,
    localForage.WEBSQL,
])
const passphrase = process.env.NEXT_PUBLIC_GLOBAL_PASSPHRASE as string

export const getObjectFromStorage = async (key: string): Promise<any> => {
    try {
        const data = await localForage.getItem<string | null>(key)
        if (passphrase && data) {
            const decryptedData = CryptoJS.AES.decrypt(
                data,
                passphrase
            ).toString(CryptoJS.enc.Utf8)
            return JSON.parse(decryptedData)
        }
        return data
    } catch (error) {
        throw error
    }
}

export const clearObjectFromStorage = async (key: string): Promise<boolean> => {
    try {
        await localForage.removeItem(key)
        return true
    } catch (error) {
        throw error
    }
}

export const setObjectInStorage = async (
    key: string,
    data: any
): Promise<boolean> => {
    try {
        let encryptedData = data
        if (passphrase) {
            encryptedData = CryptoJS.AES.encrypt(
                JSON.stringify(data),
                passphrase
            ).toString()
        }
        await localForage.setItem(key, encryptedData)
        return true
    } catch (error) {
        throw error
    }
}

interface ResponseError extends Error {
    status?: string
    response?: Response
}

export const checkStatus = (response: Response): Response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error: ResponseError = new Error(
            `HTTP Error ${response.statusText}`
        )
        error.status = response.statusText
        error.response = response
        throw error
    }
}

export const parseResponse = async (response: Response): Promise<any> => {
    try {
        const contentType = response.headers.get('content-type')
        if (contentType?.indexOf('application/json') !== -1) {
            return await response.json()
        } else {
            const text = await response.text()
            return { message: text }
        }
    } catch (err) {
        return { message: (err as Error).message }
    }
}

interface RequestConfig extends RequestInit {
    method: string
    headers?: Headers
}

export const createRequest = (
    url: string = '',
    config: RequestConfig,
    token: string = ''
): Request => {
    const validMethods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH']
    const defaultConfig: RequestInit = {
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
    }
    const defaultHeaders = new Headers()
    defaultHeaders.set('Content-Type', 'application/json')
    defaultHeaders.set('Authorization', `Bearer ${token}`)
    defaultHeaders.set('Accept', `application/json`)

    if (typeof config.method !== 'string') {
        throw new TypeError('config method property must be a string.')
    }
    if (validMethods.indexOf(config.method.toUpperCase()) === -1) {
        throw new Error(
            "config method property value must be one of ['GET','POST','HEAD','PUT','DELETE']"
        )
    }

    config.headers = config.headers || defaultHeaders

    if (config.headers && !(config.headers instanceof Headers)) {
        throw new TypeError('config headers property must be of type Headers.')
    }

    const requestConfig = {
        ...defaultConfig,
        ...config,
    }
    return new Request(url, requestConfig)
}

export const createRequestWithToken =
    (url: string = '', config: RequestConfig) =>
    (token: string): Request => {
        const validMethods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH']
        const defaultConfig: RequestInit = {
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
        }
        const defaultHeaders = new Headers()

        defaultHeaders.set('Content-Type', 'application/json')
        defaultHeaders.set('Authorization', `Bearer ${token}`)
        defaultHeaders.set('Accept', 'application/json')

        if (typeof config.method !== 'string') {
            throw new TypeError('config method property must be a string.')
        }
        if (validMethods.indexOf(config.method.toUpperCase()) === -1) {
            throw new Error(
                "config method property value must be one of ['GET','POST','HEAD','PUT','DELETE']"
            )
        }

        config.headers = config.headers || defaultHeaders

        if (config.headers && !(config.headers instanceof Headers)) {
            throw new TypeError(
                'config headers property must be of type Headers.'
            )
        }

        const requestConfig = {
            ...defaultConfig,
            ...config,
        }
        return new Request(url, requestConfig)
    }

export function numberWithCommas(num: any) {
    if (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return '0'
}

export const numToString = (num: number, bool: boolean): string => {
    switch (num) {
        case 1:
            return bool ? 'first' : 'one'
        case 2:
            return bool ? 'second' : 'two'
        case 3:
            return bool ? 'third' : 'three'
        case 4:
            return bool ? 'fourth' : 'four'
        case 5:
            return bool ? 'fifth' : 'five'
        case 6:
            return bool ? 'sixth' : 'six'
        case 7:
            return bool ? 'seventh' : 'seven'
        case 8:
            return bool ? 'eighth' : 'eight'
        case 9:
            return bool ? 'ninth' : 'nine'
        case 10:
            return bool ? 'tenth' : 'ten'
        default:
            return ''
    }
}

export const capitalizeFirstLetter = (
    input: string | number
): string | number => {
    if (typeof input === 'string' && input.length > 0) {
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    } else if (typeof input === 'number') {
        return input
    } else {
        throw new Error('Input must be a non-empty string or a number')
    }
}

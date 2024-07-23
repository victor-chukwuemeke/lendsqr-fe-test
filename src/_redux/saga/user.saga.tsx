import { userConstants } from '../../_constants'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import {
    checkStatus,
    createRequest,
    getObjectFromStorage,
    parseResponse,
} from '../../_helpers'

interface RetrieveUserFromStorageAction {
    type: typeof userConstants.RETRIEVE_USERS_FROM_STORAGE
}

interface RetrieveUserFromStorageSuccessAction {
    type: typeof userConstants.RETRIEVE_USERS_FROM_STORAGE_SUCCESS
    users: any
}

interface RetrieveUserFromStorageErrorAction {
    type: typeof userConstants.RETRIEVE_USERS_FROM_STORAGE_ERROR
    error?: string
}

interface RequestingAllUsersAction {
    type: typeof userConstants.REQUESTING_ALL_USERS
}

interface GetAllUsersAction {
    type: typeof userConstants.GET_ALL_USERS
    data: { page?: number }
}

interface GetAllUsersSuccessAction {
    type: typeof userConstants.GET_ALL_USERS_SUCCESS
    users: any
}

interface GetAllUsersSuccessWithoutDataAction {
    type: typeof userConstants.GET_ALL_USERS_SUCCESS_WITHOUT_DATA
}

interface GetAllUsersErrorAction {
    type: typeof userConstants.GET_ALL_USERS_ERROR
    error?: string
}

interface TokenHasExpiredAction {
    type: typeof userConstants.TOKEN_HAS_EXPIRED
}

type UserActions =
    | RetrieveUserFromStorageAction
    | RetrieveUserFromStorageSuccessAction
    | RetrieveUserFromStorageErrorAction
    | RequestingAllUsersAction
    | GetAllUsersAction
    | GetAllUsersSuccessAction
    | GetAllUsersSuccessWithoutDataAction
    | GetAllUsersErrorAction
    | TokenHasExpiredAction

type SagaIterator = Generator<unknown, void, unknown>

function* retrieveUserSaga(): SagaIterator {
    yield put<RequestingAllUsersAction>({
        type: userConstants.RETRIEVING_USER_FROM_STORAGE,
    })

    try {
        const retrievedUser: any = yield call(
            getObjectFromStorage,
            userConstants.USER_STORE_KEY
        )
        console.log('retrievedUser', retrievedUser)

        if (retrievedUser) {
            yield put<RetrieveUserFromStorageSuccessAction>({
                type: userConstants.RETRIEVE_USERS_FROM_STORAGE_SUCCESS,
                users: retrievedUser,
            })
            return
        }

        yield put<RetrieveUserFromStorageErrorAction>({
            type: userConstants.RETRIEVE_USERS_FROM_STORAGE_ERROR,
        })
    } catch (error: any) {
        if (error?.response) {
            const res = yield call(parseResponse, error.response)
            console.log('RETRIEVE_USERS_FROM_STORAGE_ERROR message', res)

            yield put<RetrieveUserFromStorageErrorAction>({
                type: userConstants.RETRIEVE_USERS_FROM_STORAGE_ERROR,
                // error: res?.message,
            })

            return
        }
        console.log('RETRIEVE_USERS_FROM_STORAGE_ERROR message', error?.message)
        yield put<RetrieveUserFromStorageErrorAction>({
            type: userConstants.RETRIEVE_USERS_FROM_STORAGE_ERROR,
            error: error?.message,
        })
    }
}

function* getAllUsers(action: GetAllUsersAction): SagaIterator {
    yield put<RequestingAllUsersAction>({
        type: userConstants.REQUESTING_ALL_USERS,
    })

    try {
        let usersUri = `${userConstants.USER_URI}`
        if (action.data?.page) {
            usersUri = `${usersUri}&page=${action.data.page + 1}`
        }

        const usersReq = createRequest(usersUri, {
            method: 'GET',
        })

        const response: any = yield call(() =>
            fetch(usersReq).then((res) => res as Response)
        )

        yield call(checkStatus, response)

        if (response.status === 401) {
            yield put<TokenHasExpiredAction>({
                type: userConstants.TOKEN_HAS_EXPIRED,
            })
            return
        }

        if (response.status === 204) {
            yield put<GetAllUsersSuccessWithoutDataAction>({
                type: userConstants.GET_ALL_USERS_SUCCESS_WITHOUT_DATA,
            })
            return
        }

        const jsonResponse: any = yield call(parseResponse, response)
        console.log('GET_ALL_USERS_SUCCESS message', jsonResponse)

        yield put<GetAllUsersSuccessAction>({
            type: userConstants.GET_ALL_USERS_SUCCESS,
            users: jsonResponse,
        })
    } catch (error: any) {
        if (error?.response) {
            const res = yield call(parseResponse, error.response)
            console.log('GET_ALL_USERS_ERROR message', res)

            yield put<GetAllUsersErrorAction>({
                type: userConstants.GET_ALL_USERS_ERROR,
                // error: res?.message,
            })

            return
        }
        console.log('GET_ALL_USERS_ERROR message', error?.message)
        yield put<GetAllUsersErrorAction>({
            type: userConstants.GET_ALL_USERS_ERROR,
            error: error?.message,
        })
    }
}

function* getUserSagaWatcher(): SagaIterator {
    yield takeLatest(
        userConstants.RETRIEVE_USERS_FROM_STORAGE,
        retrieveUserSaga
    )
}

function* getAllUserSagaWatcher(): SagaIterator {
    yield takeLatest(userConstants.GET_ALL_USERS, getAllUsers)
}

export default function* rootSaga(): SagaIterator {
    yield all([getUserSagaWatcher(), getAllUserSagaWatcher()])
}

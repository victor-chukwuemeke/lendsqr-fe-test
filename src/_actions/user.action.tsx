import { userConstants } from '../_constants'

const getAllUsers = () => ({
    type: userConstants.GET_ALL_USERS,
})

const retrieveAllUsers = () => ({
    type: userConstants.RETRIEVE_USERS_FROM_STORAGE,
})

export const userActions = {
    getAllUsers,
    retrieveAllUsers,
}

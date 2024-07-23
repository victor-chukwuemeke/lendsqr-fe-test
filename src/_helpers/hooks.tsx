import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'

export const useMatch = (path: string): boolean => {
    const { pathname } = useLocation()
    return pathname === path
}

export const useLocationCode = (): number => {
    const { pathname } = useLocation()

    const routes = [
        { path: '/', code: 2 },
        { path: '/dashboard', code: 1 },
        { path: '/users', code: 2 },
        { path: '/users/:_id', code: 2 },
        { path: '/guarantors', code: 3 },
        { path: '/loans', code: 4 },
        { path: '/decision_models', code: 5 },
        { path: '/savings', code: 6 },
        { path: '/loan_requests', code: 7 },
        { path: '/whitelist', code: 8 },
        { path: '/karma', code: 9 },
        { path: '/organizations', code: 10 },
        { path: '/loan_products', code: 11 },
        { path: '/savings_products', code: 12 },
        { path: '/fees_and_charges', code: 13 },
        { path: '/transactions', code: 14 },
        { path: '/services', code: 15 },
        { path: '/service_account', code: 16 },
        { path: '/settlements', code: 17 },
        { path: '/reports', code: 18 },
        { path: '/preferences', code: 19 },
        { path: '/fees_and_pricing', code: 20 },
        { path: '/audit_logs', code: 21 },
        { path: '/systems_messages', code: 22 },
    ]

    for (const route of routes) {
        const match = matchPath({ path: route.path, end: true }, pathname)
        if (match) {
            return route.code
        }
    }

    return 23
}

export const useIsAuthRoute = (): boolean => {
    const { pathname } = useLocation()

    const authRoutes = ['/login', '/forgotpassword']

    return authRoutes.some((route) =>
        matchPath({ path: route, end: true }, pathname)
    )
}

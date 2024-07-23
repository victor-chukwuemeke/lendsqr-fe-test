import { nanoid } from 'nanoid'
import { ReactComponent as BriefCase } from '../_assets/icons/briefcase.svg'
import { ReactComponent as Home } from '../_assets/icons/home.svg'
import { ReactComponent as Users } from '../_assets/icons/users.svg'
import { ReactComponent as User } from '../_assets/icons/user.svg'
import { ReactComponent as SacMoney } from '../_assets/icons/sack-money.svg'
import { ReactComponent as HandShake } from '../_assets/icons/hand-shake.svg'
import { ReactComponent as PiggyBank } from '../_assets/icons/piggy-bank.svg'
import { ReactComponent as HandMoney } from '../_assets/icons/hand-money.svg'
import { ReactComponent as UserCheck } from '../_assets/icons/user-check.svg'
import { ReactComponent as UserTimes } from '../_assets/icons/user-times.svg'
import { ReactComponent as SafeHouse } from '../_assets/icons/safe-house.svg'
import { ReactComponent as Coins } from '../_assets/icons/coins.svg'
import { ReactComponent as InOut } from '../_assets/icons/in-out.svg'
import { ReactComponent as Galaxy } from '../_assets/icons/galaxy.svg'
import { ReactComponent as UserSettings } from '../_assets/icons/user-settings.svg'
import { ReactComponent as Scroll } from '../_assets/icons/scroll.svg'
import { ReactComponent as BarChart } from '../_assets/icons/bar-chart.svg'
import { ReactComponent as Sliders } from '../_assets/icons/sliders.svg'
import { ReactComponent as BadgePercent } from '../_assets/icons/badge-percent.svg'
import { ReactComponent as ClipList } from '../_assets/icons/clipboard-list.svg'
import { ReactComponent as TotalUsers } from '../_assets/icons/dashboard-users.svg'
import { ReactComponent as ActiveUsers } from '../_assets/icons/active-users.svg'
import { ReactComponent as LoanUsers } from '../_assets/icons/loan-users.svg'
import { ReactComponent as SavingUsers } from '../_assets/icons/users-with-savings.svg'
import { ReactComponent as Tyre } from '../_assets/icons/tire.svg'

export const pageRoutes = [
    {
        id: nanoid(),
        label: 'dashboard',
        activeCode: 1,
        icon: <Home />,
        link: '/dashboard',
    },
    {
        id: nanoid(),
        label: 'customers',
        link: '/',
        group: [
            {
                id: nanoid(),
                label: 'users',
                activeCode: 2,
                icon: <Users />,
                link: '/users',
            },
            {
                id: nanoid(),
                label: 'guarantors',
                activeCode: 3,
                icon: <User />,
                link: '/guarantors',
            },
            {
                id: nanoid(),
                label: 'loans',
                activeCode: 4,
                icon: <SacMoney />,
                link: '/loans',
            },
            {
                id: nanoid(),
                label: 'decision models',
                activeCode: 5,
                icon: <HandShake />,
                link: '/decision_models',
            },
            {
                id: nanoid(),
                label: 'savings',
                activeCode: 6,
                icon: <PiggyBank />,
                link: '/savings',
            },
            {
                id: nanoid(),
                label: 'loan requests',
                activeCode: 7,
                icon: <HandMoney />,
                link: '/loan_requests',
            },
            {
                id: nanoid(),
                label: 'whitelist',
                activeCode: 8,
                icon: <UserCheck />,
                link: '/whitelist',
            },
            {
                id: nanoid(),
                label: 'karma',
                activeCode: 9,
                icon: <UserTimes />,
                link: '/karma',
            },
        ],
    },
    {
        id: nanoid(),
        label: 'businesses',
        link: '/',
        group: [
            {
                id: nanoid(),
                label: 'organizations',
                activeCode: 10,
                icon: <BriefCase />,
                link: '/organizations',
            },
            {
                id: nanoid(),
                label: 'loan products',
                activeCode: 11,
                icon: <HandMoney />,
                link: '/loan_products',
            },
            {
                id: nanoid(),
                label: 'savings products',
                activeCode: 12,
                icon: <SafeHouse />,
                link: '/savings_products',
            },
            {
                id: nanoid(),
                label: 'fees and charges',
                activeCode: 13,
                icon: <Coins />,
                link: '/fees_and_charges',
            },
            {
                id: nanoid(),
                label: 'transactions',
                activeCode: 14,
                icon: <InOut />,
                link: '/transactions',
            },
            {
                id: nanoid(),
                label: 'services',
                activeCode: 15,
                icon: <Galaxy />,
                link: '/services',
            },
            {
                id: nanoid(),
                label: 'service account',
                activeCode: 16,
                icon: <UserSettings />,
                link: '/service_account',
            },
            {
                id: nanoid(),
                label: 'settlements',
                activeCode: 17,
                icon: <Scroll />,
                link: '/settlements',
            },
            {
                id: nanoid(),
                label: 'reports',
                activeCode: 18,
                icon: <BarChart />,
                link: '/reports',
            },
        ],
    },
    {
        id: nanoid(),
        label: 'settings',
        link: '/',
        group: [
            {
                id: nanoid(),
                label: 'preferences',
                activeCode: 19,
                icon: <Sliders />,
                link: '/preferences',
            },
            {
                id: nanoid(),
                label: 'fees and pricing',
                activeCode: 20,
                icon: <BadgePercent />,
                link: '/fees_and_pricing',
            },
            {
                id: nanoid(),
                label: 'audit logs',
                activeCode: 21,
                icon: <ClipList />,
                link: '/audit_logs',
            },
            {
                id: nanoid(),
                label: 'systems messages',
                activeCode: 22,
                icon: <Tyre />,
                link: '/systems_messages',
            },
        ],
    },
]

export const summaryCards = [
    { id: nanoid(), icon: <TotalUsers />, label: 'users', value: 2453 },
    { id: nanoid(), icon: <ActiveUsers />, label: 'active users', value: 2453 },
    {
        id: nanoid(),
        icon: <LoanUsers />,
        label: 'users with loan',
        value: 12453,
    },
    {
        id: nanoid(),
        icon: <SavingUsers />,
        label: 'users with savings',
        value: 102453,
    },
]

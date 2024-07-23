import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Screens/Login'
import Users from './Screens/Users'
import NotFound from './404'
import './App.scss'
import Dashboard from './Screens/Dashboard'
import Guarantors from './Screens/Guarantors'
import Loans from './Screens/Loans'
import DecisionModels from './Screens/DecisionModels'
import Savings from './Screens/Savings'
import LoanRequests from './Screens/LoanRequests'
import LoanProducts from './Screens/LoanProducts'
import Whitelist from './Screens/Whitelist'
import Karma from './Screens/Karma'
import Organizations from './Screens/Organizations'
import Preferences from './Screens/Preferences'
import SavingsProducts from './Screens/SavingsProducts'
import FeesAndCharges from './Screens/FeesAndCharges'
import Transactions from './Screens/Transactions'
import Services from './Screens/Services'
import Settlements from './Screens/Settlements'
import Reports from './Screens/Reports'
import FeesAndPricing from './Screens/FeesAndPricing'
import AuditLogs from './Screens/AuditLogs'
import SystemsMessages from './Screens/SystemsMessages'
import ServiceAccount from './Screens/ServiceAccount'
import UserDetail from './Screens/UserDetails'
import ForgotPasswordPage from './Screens/ForgotPassword'

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/guarantors" element={<Guarantors />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/decision_models" element={<DecisionModels />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/loan_requests" element={<LoanRequests />} />
            <Route path="/loan_products" element={<LoanProducts />} />
            <Route path="/whitelist" element={<Whitelist />} />
            <Route path="/karma" element={<Karma />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/savings_products" element={<SavingsProducts />} />
            <Route path="/fees_and_charges" element={<FeesAndCharges />} />
            <Route path="/fees_and_pricing" element={<FeesAndPricing />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service_account" element={<ServiceAccount />} />
            <Route path="/settlements" element={<Settlements />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit_logs" element={<AuditLogs />} />
            <Route path="/systems_messages" element={<SystemsMessages />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LoginPage />} />
        </Routes>
    </Router>
)

export default App

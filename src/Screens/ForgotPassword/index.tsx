import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { ReactComponent as Logo } from '../../_assets/icons/lend_logo.svg'
import { ReactComponent as ErrorIcon } from '../../_assets/icons/Error.svg'
import Banner from '../../_assets/images/pablo2.png'

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }

        setIsFormValid(email.trim() !== '')
    }

    const handleLogin = () => {
        setIsLoading(true)
        // Mock Credentials
        const mockEmail = 'test@example.com'
        setTimeout(() => {
            if (email === mockEmail) {
                navigate('/users')
            } else {
                setError('Incorrect email!')
                setTimeout(() => {
                    setError(null)
                }, 5000)
                setEmail('')
                setPassword('')
            }
            setIsLoading(false)
        }, 2000)
    }

    return (
        <div className="login-container position-relative">
            <div className="logo">
                <Logo />
            </div>
            <div className="row custom-row mx-0">
                <div className="login_left_column d-flex flex-column justify-content-center align-items-start">
                    <div className="banner_img">
                        <img
                            src={Banner}
                            alt="banner_img"
                            className="h-100 w-100 img-fluid"
                        />
                    </div>
                </div>
                <div className="login_right_column d-flex justify-content-center align-items-center">
                    <div className="form w-100">
                        <h6 className="title text-start mb-2">
                            Forgot password?
                        </h6>
                        <p className="mb-md-4 pb-3">
                            Enter email address to reset password.
                        </p>
                        <form>
                            {error && (
                                <div className="d-flex align-items-center error w-100 p-3">
                                    <p className="ms-2">{error}</p>
                                </div>
                            )}
                            <div className="form-group">
                                <label className="custom-field w-100">
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        required
                                        value={email}
                                        autoFocus
                                        onChange={handleInputChange}
                                    />
                                    <span className="placeholders">Email</span>
                                </label>
                            </div>
                            <div className="forgot">
                                <a href="/login">LOG IN</a>
                            </div>
                            <button
                                type="button"
                                className="btn login-button w-100"
                                onClick={handleLogin}
                                disabled={!isFormValid || isLoading}
                            >
                                {isLoading ? (
                                    <span className="loader"></span>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage

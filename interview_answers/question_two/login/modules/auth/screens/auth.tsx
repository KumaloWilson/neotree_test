"use client";


import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../state/auth-state"
import type { AppDispatch, RootState } from "@/modules/shared/redux/store"
import { Input } from "@/modules/shared/ui/input"
import { Button } from "@/modules/shared/ui/primary-button"
import { useToast } from "@/modules/shared/hooks/use-toast"

const AuthScreen = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error: authError } = useSelector((state: RootState) => state.auth)
  const { success, error: showError } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await dispatch(loginUser({ email, password }))
      success("Login successful!", "Redirecting to dashboard...")
      router.push("/dashboard")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password. Please try again."
      showError("Login failed", errorMessage)
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding/Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[var(--primary)] to-[#0a3b7a] justify-center items-center p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-md"
        >
          <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
          <p className="text-xl opacity-90 mb-8">Log in to access your dashboard.</p>
          <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl">
           
          </div>
        </motion.div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex justify-center items-center p-6 md:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="flex justify-center items-center mb-6">

            </div>
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
          </div>

          {(error || authError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-[var(--secondary)] text-[var(--secondary)] rounded"
            >
              {error || authError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={<FiMail className="h-5 w-5 text-gray-400" />}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-[var(--primary)] hover:text-[#0a3b7a]">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<FiLock className="h-5 w-5 text-gray-400" />}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                }
              />
            </div>

            <Button type="submit" isLoading={loading} fullWidth={true} size="lg">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthScreen

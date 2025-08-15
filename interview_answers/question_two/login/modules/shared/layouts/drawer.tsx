"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  FaHome,
  FaBuilding,
  FaCreditCard,
  FaEnvelope,
  FaFileAlt,
  FaBook,
  FaFileContract,
  FaShieldAlt,
  FaGift,
  FaStar,
  FaQuestionCircle,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaUserFriends,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaAngleDown,
  FaUserShield,
  FaUsers,
  FaClipboardCheck,
  FaProjectDiagram,
  FaHandshake,
  FaTasks,
  FaBookmark,
  FaFileWord,
} from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../redux/store"
import { getAccessibleNavigation } from "../utils/permission-utils"
import { logoutUser } from "@/modules/auth/state/auth-state"
import { FaBookJournalWhills, FaDochub, FaRegBookmark } from "react-icons/fa6"

type DrawerProps = {
  children: ReactNode
}

type NavItem = {
  name: string
  href: string
  icon: ReactNode
  key: string
}

export default function Drawer({ children }: DrawerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  // Use null for initial state to prevent hydration mismatch
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Get user from Redux store
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  // Mark component as mounted and set initial drawer state
  useEffect(() => {
    setIsMounted(true)
    setIsOpen(window.innerWidth >= 1024)

    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close drawer when route changes on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false)
    }
    // Always close user menu when route changes
    setUserMenuOpen(false)
  }, [pathname])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.getElementById("user-menu")
      if (userMenu && !userMenu.contains(event.target as Node) && userMenuOpen) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [userMenuOpen])

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/")
  }

  // All navigation items
  const allNavigation: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: <FaHome className="w-5 h-5" />, key: "dashboard" },
    { name: "ASH Users", href: "/users", icon: <FaUserFriends className="w-5 h-5" />, key: "users" },
    { name: "Admins", href: "/admins", icon: <FaUserShield className="w-5 h-5" />, key: "admins" },
    { name: "Audit Readiness Checker", href: "/audit-readiness-checker", icon: <FaClipboardCheck className="w-5 h-5" />, key: "audit-readiness-checker" },
    { name: "NDIS Doc Generator", href: "/ndis-doc-generator", icon: <FaFileWord className="w-5 h-5" />, key: "ndis-doc-generator" },
    { name: "Customer Leads", href: "/customer-leads", icon: <FaHandshake className="w-5 h-5" />, key: "customer-leads" },
    { name: "Projects", href: "/projects", icon: <FaProjectDiagram className="w-5 h-5" />, key: "projects" },
    { name: "Tasks", href: "/tasks", icon: <FaTasks className="w-5 h-5" />, key: "tasks" },
    { name: "Lessons Learnt", href: "/lessons-learnt", icon: <FaRegBookmark className="w-5 h-5" />, key: "lessons-learnt" },
    { name: "Property", href: "/property", icon: <FaBuilding className="w-5 h-5" />, key: "property" },
    { name: "Providers", href: "/providers", icon: <FaUser className="w-5 h-5" />, key: "providers" },
    { name: "Participants", href: "/participants", icon: <FaUsers className="w-5 h-5" />, key: "participants" },

    { name: "Tickets", href: "/tickets", icon: <FaQuestionCircle className="w-5 h-5" />, key: "tickets" },
    { name: "Payments", href: "/payments", icon: <FaCreditCard className="w-5 h-5" />, key: "payments" },
    { name: "Newsletter", href: "/newsletter", icon: <FaEnvelope className="w-5 h-5" />, key: "newsletter" },
    { name: "Articles", href: "/articles", icon: <FaFileAlt className="w-5 h-5" />, key: "articles" },
    { name: "Guides", href: "/guides", icon: <FaBook className="w-5 h-5" />, key: "guides" },
    { name: "Terms and Conditions", href: "/terms", icon: <FaFileContract className="w-5 h-5" />, key: "terms" },
    { name: "Privacy Policy", href: "/privacy", icon: <FaShieldAlt className="w-5 h-5" />, key: "privacy" },
    { name: "Offerings", href: "/offerings", icon: <FaGift className="w-5 h-5" />, key: "offerings" },
    { name: "Reviews", href: "/reviews", icon: <FaStar className="w-5 h-5" />, key: "reviews" },
    { name: "FAQs", href: "/faqs", icon: <FaQuestionCircle className="w-5 h-5" />, key: "faqs" },
  ]

  // Filter navigation based on user permissions
  const getFilteredNavigation = (): NavItem[] => {
    if (!user || !isAuthenticated) {
      return [allNavigation[0]] // Only dashboard
    }

    const accessibleItems = getAccessibleNavigation(user.permissions)

    return allNavigation.filter((item) => accessibleItems.includes(item.key))
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return "AD"

    const email = user.email
    const nameParts = email.split("@")[0].split(".")

    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return email.substring(0, 2).toUpperCase()
  }

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "Admin User"

    // If user has a name, use it
    if (user.email) {
      const emailName = user.email.split("@")[0]
      return emailName
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    }

    return "Admin User"
  }

  // Get user role display
  const getUserRole = () => {
    if (!user || !user.permissions) return "Admin"

    if (user.permissions.includes("super_admin")) {
      return "Super Admin"
    }

    return "Admin"
  }

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return <div className="flex h-screen bg-gray-50"></div>
  }

  const filteredNavigation = getFilteredNavigation()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button - only render on client */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-primary text-white hover:bg-primary/90 focus:outline-none shadow-lg hover:shadow-primary/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Drawer */}
      <div
        className={`rounded-md fixed lg:relative z-40 h-full transition-all duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 w-64 bg-primary shadow-xl `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b bg-white flex justify-center items-center h-fit w-full p-4">
            <Image
              src="/images/shared/logo/logo.png"
              alt="Company Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 bg-primary">
            <ul className="space-y-1 px-3">
              {filteredNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium group transition-all duration-200
                        ${isActive
                          ? "bg-white text-primary shadow-md"
                          : "text-white hover:bg-white/90 hover:text-primary hover:shadow-sm"
                        }`}
                    >
                      <span
                        className={`mr-3 ${isActive ? "text-primary" : "text-white"} transition-transform group-hover:scale-110 duration-200 group-hover:text-primary`}
                      >
                        {item.icon}
                      </span>
                      {item.name}
                      {isActive && <FaChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-primary-700 bg-primary-800" id="user-menu">
            <div
              className="flex items-center cursor-pointer p-2 hover:bg-primary-700 rounded-lg transition-colors duration-200"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-primary font-medium shadow-inner">
                {getUserInitials()}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                <p className="text-xs text-white/80">{getUserRole()}</p>
              </div>
              <FaAngleDown
                className={`text-white transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
              />
            </div>

            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="mt-2 py-2 bg-white rounded-md shadow-lg border border-gray-200 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className="text-xs text-primary font-medium">{getUserRole()}</p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <FaUser className="mr-3 h-4 w-4 text-primary" />
                  Edit Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <FaCog className="mr-3 h-4 w-4 text-primary" />
                  Settings
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="mr-3 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

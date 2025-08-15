import { AdminPermission } from "@/modules/auth/types/user"

export interface PermissionCheck {
  hasPermission: boolean
  isSuperAdmin: boolean
}

/**
 * Check if user has specific permission or is super admin
 */
export const checkPermission = (
  userPermissions: string[] = [],
  requiredPermission: AdminPermission,
): PermissionCheck => {
  const isSuperAdmin = userPermissions.includes(AdminPermission.SUPER_ADMIN)
  const hasPermission = isSuperAdmin || userPermissions.includes(requiredPermission)

  return {
    hasPermission,
    isSuperAdmin,
  }
}


/**
 * Check if user has any of the specified permissions or is super admin
 */
export const checkAnyPermission = (
  userPermissions: string[] = [],
  requiredPermissions: AdminPermission[],
): PermissionCheck => {
  const isSuperAdmin = userPermissions.includes(AdminPermission.SUPER_ADMIN)
  const hasPermission = isSuperAdmin || requiredPermissions.some((permission) => userPermissions.includes(permission))

  return {
    hasPermission,
    isSuperAdmin,
  }
}

/**
 * Get accessible navigation items based on user permissions
 */
export const getAccessibleNavigation = (userPermissions: string[] = []) => {
  const { isSuperAdmin } = checkPermission(userPermissions, AdminPermission.SUPER_ADMIN)

  // If super admin, return all navigation items
  if (isSuperAdmin) {
    return [
      "dashboard",
      "users",
      "audit-readiness-checker",
      "lessons-learnt",
      "admins",
      "property",
      "projects",
      "tasks",
      "providers",
      "participants",
      "customer-leads",
      "tickets",
      "payments",
      "newsletter",
      "articles",
      "guides",
      "terms",
      "privacy",
      "offerings",
      "reviews",
      "faqs",
      "ndis-doc-generator"
    ]
  }

  const accessibleItems = ["dashboard"] // Dashboard is always accessible

  // Check each permission and add corresponding navigation items
  if (userPermissions.includes(AdminPermission.USERS)) {
    accessibleItems.push("users", "admins", "providers", "participants")
  }

  if (userPermissions.includes(AdminPermission.PROPERTIES)) {
    accessibleItems.push("property")
  }

  if (userPermissions.includes(AdminPermission.PROJECT_MANAGEMENT)) {
    accessibleItems.push("projects", "tasks", "customer-leads")
  }

  if (userPermissions.includes(AdminPermission.MANAGE_SUPPORT)) {
    accessibleItems.push("tickets")
  }

  if (userPermissions.includes(AdminPermission.MANAGE_BILLING)) {
    accessibleItems.push("payments")
  }

  if (userPermissions.includes(AdminPermission.SEND_NEWSLETTER)) {
    accessibleItems.push("newsletter")
  }

  if (userPermissions.includes(AdminPermission.ARTICLES)) {
    accessibleItems.push("articles")
  }

  if (userPermissions.includes(AdminPermission.ASH)) {
    accessibleItems.push("guides", "terms", "privacy", "offerings", "reviews", "faqs")
  }

  return accessibleItems
}

/**
 * Map routes to required permissions
 */
export const ROUTE_PERMISSIONS: Record<string, AdminPermission[]> = {
  "/dashboard": [], // Dashboard accessible to all
  "audit-readiness-checker": [AdminPermission.USERS],
  "/users": [AdminPermission.USERS],
  "/admins": [AdminPermission.USERS],
  "/providers": [AdminPermission.USERS],
  "/participants": [AdminPermission.USERS],
  "/property": [AdminPermission.PROPERTIES],
  "/projects": [AdminPermission.PROJECT_MANAGEMENT],
  "/tasks": [AdminPermission.PROJECT_MANAGEMENT],
  "/customer-leads": [AdminPermission.PROJECT_MANAGEMENT],
  "/tickets": [AdminPermission.MANAGE_SUPPORT],
  "/payments": [AdminPermission.MANAGE_BILLING],
  "/newsletter": [AdminPermission.SEND_NEWSLETTER],
  "/articles": [AdminPermission.ARTICLES],
  "/guides": [AdminPermission.ASH],
  "/terms": [AdminPermission.ASH],
  "/privacy": [AdminPermission.ASH],
  "/offerings": [AdminPermission.ASH],
  "/reviews": [AdminPermission.ASH],
  "/faqs": [AdminPermission.ASH],
  "/lessons-learnt": [],
}

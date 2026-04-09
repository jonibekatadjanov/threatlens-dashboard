export type UserRole = 'admin' | 'viewer'

export const ROLES = {
  ADMIN: 'admin' as UserRole,
  VIEWER: 'viewer' as UserRole,
} as const

/**
 * Default role when Clerk publicMetadata.role is undefined.
 * Defaults to 'viewer' to keep the app functional while Clerk
 * is being configured (graceful fallback per RBAC plan).
 */
export const DEFAULT_ROLE: UserRole = 'viewer'

/**
 * Extracts the user role from Clerk's publicMetadata.
 * Returns DEFAULT_ROLE ('viewer') when role is missing or unrecognised.
 */
export function getUserRole(
  publicMetadata: Record<string, unknown> | null | undefined
): UserRole {
  const role = publicMetadata?.role
  if (role === ROLES.ADMIN || role === ROLES.VIEWER) return role as UserRole
  return DEFAULT_ROLE
}

/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, redirect } from '@tanstack/react-router'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import { Loader2 } from 'lucide-react'
import { AccessDenied } from '@/features/errors/access-denied'
import { Settings } from '@/features/settings'
import { getUserRole, ROLES } from '@/lib/clerk-rbac'
import { useAuthStore } from '@/stores/auth-store'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export const Route = createFileRoute('/_authenticated/settings')({
  /**
   * Route guard (beforeLoad): runs before the component mounts.
   *
   * When Clerk is NOT configured this falls back to the regular auth store
   * and throws a redirect to "/" if the signed-in user lacks the "admin"
   * role. When Clerk IS configured, the component-level SettingsClerkGuard
   * below handles RBAC using Clerk's useUser hook.
   */
  beforeLoad: () => {
    if (!PUBLISHABLE_KEY) {
      const { auth } = useAuthStore.getState()
      const hasAdminRole = auth.user?.role?.includes('admin') ?? false
      if (auth.user && !hasAdminRole) {
        throw redirect({ to: '/' })
      }
    }
  },
  component: SettingsGuard,
})

/**
 * Top-level guard: if Clerk is configured this wraps the page in a
 * ClerkProvider so that the inner guard can call useUser(). Otherwise the
 * Settings page is rendered directly (graceful fallback when Clerk is not yet
 * configured).
 */
function SettingsGuard() {
  if (!PUBLISHABLE_KEY) {
    return <Settings />
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/sign-in'>
      <SettingsClerkGuard />
    </ClerkProvider>
  )
}

/**
 * Inner guard: uses Clerk's useUser hook (requires ClerkProvider above) to
 * read publicMetadata.role. Renders AccessDenied for any role other than
 * "admin". Defaults missing/unknown roles to "viewer" (graceful fallback).
 */
function SettingsClerkGuard() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return (
      <div className='flex h-svh items-center justify-center'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    )
  }

  const role = getUserRole(user?.publicMetadata as Record<string, unknown>)

  if (role !== ROLES.ADMIN) {
    return <AccessDenied />
  }

  return <Settings />
}

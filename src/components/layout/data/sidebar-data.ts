import {
  Globe,
  LayoutDashboard,
  Users,
  Plug,
  CreditCard,
  KeyRound,
  Settings,
  Bell,
  Monitor,
  Palette,
  UserCog,
  Wrench,
  Bug,
  Construction,
  FileX,
  Lock,
  ServerOff,
  UserX,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Admin User',
    email: 'admin@threatlens.io',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'ThreatLens Security',
      logo: Command,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp',
      logo: GalleryVerticalEnd,
      plan: 'Business',
    },
    {
      name: 'StartupSec',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Security',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Assets (Domains)',
          url: '/assets',
          icon: Globe,
        },
        {
          title: 'Team Management',
          url: '/team',
          icon: Users,
        },
        {
          title: 'Integrations',
          url: '/integrations',
          icon: Plug,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Billing',
          url: '/billing',
          icon: CreditCard,
        },
        {
          title: 'API Keys',
          url: '/api-keys',
          icon: KeyRound,
        },
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              url: '/errors/unauthorized',
              icon: Lock,
            },
            {
              title: 'Forbidden',
              url: '/errors/forbidden',
              icon: UserX,
            },
            {
              title: 'Not Found',
              url: '/errors/not-found',
              icon: FileX,
            },
            {
              title: 'Internal Server Error',
              url: '/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
      ],
    },
  ],
}

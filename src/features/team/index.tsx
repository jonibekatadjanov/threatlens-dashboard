import { useState } from 'react'
import { MoreHorizontal, Plus, UserCheck, UserX } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

type MemberRole = 'Admin' | 'Security Eng' | 'Developer'
type MemberStatus = 'Joined' | 'Pending'

interface Member {
  id: string
  name: string
  email: string
  role: MemberRole
  domains: string[]
  status: MemberStatus
  avatar: string
}

const members: Member[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@acme.com',
    role: 'Admin',
    domains: ['api.acme.com', 'admin.acme.com'],
    status: 'Joined',
    avatar: 'AJ',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@acme.com',
    role: 'Security Eng',
    domains: ['app.acme.com', 'staging.acme.com', 'shop.acme.com'],
    status: 'Joined',
    avatar: 'BS',
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@acme.com',
    role: 'Developer',
    domains: ['docs.acme.com'],
    status: 'Joined',
    avatar: 'CW',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@acme.com',
    role: 'Developer',
    domains: [],
    status: 'Pending',
    avatar: 'DB',
  },
  {
    id: '5',
    name: 'Eva Martinez',
    email: 'eva@acme.com',
    role: 'Security Eng',
    domains: [],
    status: 'Pending',
    avatar: 'EM',
  },
]

function getRoleBadge(role: MemberRole) {
  switch (role) {
    case 'Admin':
      return (
        <Badge className='bg-purple-500/10 text-purple-600 hover:bg-purple-500/20'>
          Admin
        </Badge>
      )
    case 'Security Eng':
      return (
        <Badge className='bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'>
          Security Eng
        </Badge>
      )
    case 'Developer':
      return (
        <Badge className='bg-slate-500/10 text-slate-600 hover:bg-slate-500/20'>
          Developer
        </Badge>
      )
  }
}

function InviteDialog() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<string>('')

  function handleInvite() {
    setOpen(false)
    setEmail('')
    setRole('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your security team. They'll receive an
            email with instructions.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label htmlFor='invite-email'>Email Address</Label>
            <Input
              id='invite-email'
              type='email'
              placeholder='colleague@company.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='invite-role'>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id='invite-role'>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Admin'>
                  <div>
                    <p className='font-medium'>Admin</p>
                    <p className='text-muted-foreground text-xs'>
                      Full access to all features and settings
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value='Security Eng'>
                  <div>
                    <p className='font-medium'>Security Eng</p>
                    <p className='text-muted-foreground text-xs'>
                      Can run scans, view reports, manage assets
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value='Developer'>
                  <div>
                    <p className='font-medium'>Developer</p>
                    <p className='text-muted-foreground text-xs'>
                      Read-only access to assigned domains
                    </p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleInvite} disabled={!email || !role}>
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function Team() {
  const [loading] = useState(false)

  const joinedCount = members.filter((m) => m.status === 'Joined').length
  const pendingCount = members.filter((m) => m.status === 'Pending').length

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Team Management
            </h2>
            <p className='text-muted-foreground'>
              {joinedCount} active members · {pendingCount} pending invitations
            </p>
          </div>
          <InviteDialog />
        </div>

        {loading ? (
          <div className='space-y-2'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-14 w-full rounded-lg' />
            ))}
          </div>
        ) : (
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Assigned Domains</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='w-10' />
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium'>
                          {member.avatar}
                        </div>
                        <div>
                          <p className='text-sm font-medium'>{member.name}</p>
                          <p className='text-muted-foreground text-xs'>
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(member.role)}</TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {member.domains.length > 0 ? (
                          member.domains.map((domain) => (
                            <Badge
                              key={domain}
                              variant='outline'
                              className='text-xs'
                            >
                              {domain}
                            </Badge>
                          ))
                        ) : (
                          <span className='text-muted-foreground text-xs'>
                            No domains assigned
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.status === 'Joined' ? (
                        <Badge className='bg-green-500/10 text-green-600 hover:bg-green-500/20'>
                          <UserCheck className='mr-1 h-3 w-3' />
                          Joined
                        </Badge>
                      ) : (
                        <Badge className='bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20'>
                          <UserX className='mr-1 h-3 w-3' />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon' className='h-8 w-8'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem>Assign Domains</DropdownMenuItem>
                          {member.status === 'Pending' && (
                            <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className='text-red-600'>
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Main>
    </>
  )
}

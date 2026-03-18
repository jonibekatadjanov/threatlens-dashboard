import { useState } from 'react'
import { Copy, Eye, EyeOff, Key, Plus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsed: string
  scopes: string[]
  active: boolean
}

const initialKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production CI/CD',
    key: 'tl_live_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    createdAt: 'Mar 10, 2025',
    lastUsed: '2 hours ago',
    scopes: ['scan:read', 'scan:write', 'report:read'],
    active: true,
  },
  {
    id: '2',
    name: 'Monitoring Bot',
    key: 'tl_live_sk_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
    createdAt: 'Feb 20, 2025',
    lastUsed: '1 day ago',
    scopes: ['scan:read', 'report:read'],
    active: true,
  },
  {
    id: '3',
    name: 'Legacy Integration',
    key: 'tl_live_sk_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
    createdAt: 'Jan 5, 2025',
    lastUsed: '30 days ago',
    scopes: ['scan:read'],
    active: false,
  },
]

function maskKey(key: string): string {
  return key.slice(0, 14) + '•'.repeat(20) + key.slice(-4)
}

function ApiKeyRow({ apiKey }: { apiKey: ApiKey }) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(apiKey.key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='border-border flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='flex items-start gap-3'>
        <Key className='text-muted-foreground mt-0.5 h-4 w-4 shrink-0' />
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <p className='text-sm font-medium'>{apiKey.name}</p>
            {apiKey.active ? (
              <Badge className='bg-green-500/10 text-green-600 text-xs'>
                Active
              </Badge>
            ) : (
              <Badge variant='secondary' className='text-xs'>
                Inactive
              </Badge>
            )}
          </div>
          <div className='flex items-center gap-1'>
            <code className='text-muted-foreground bg-muted rounded px-1 py-0.5 font-mono text-xs'>
              {visible ? apiKey.key : maskKey(apiKey.key)}
            </code>
            <Button
              variant='ghost'
              size='icon'
              className='h-5 w-5'
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? (
                <EyeOff className='h-3 w-3' />
              ) : (
                <Eye className='h-3 w-3' />
              )}
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-5 w-5'
              onClick={handleCopy}
            >
              <Copy className='h-3 w-3' />
            </Button>
            {copied && (
              <span className='text-xs text-green-600'>Copied!</span>
            )}
          </div>
          <div className='flex flex-wrap gap-1'>
            {apiKey.scopes.map((scope) => (
              <Badge key={scope} variant='outline' className='text-xs'>
                {scope}
              </Badge>
            ))}
          </div>
          <p className='text-muted-foreground text-xs'>
            Created {apiKey.createdAt} · Last used {apiKey.lastUsed}
          </p>
        </div>
      </div>
      <Button variant='ghost' size='icon' className='h-8 w-8 self-start text-red-500 hover:text-red-600'>
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
  )
}

function CreateKeyDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Create API Key
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Generate a new API key for programmatic access to ThreatLens.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label htmlFor='key-name'>Key Name</Label>
            <Input
              id='key-name'
              placeholder='e.g. Production CI/CD'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label>Scopes</Label>
            <div className='grid grid-cols-2 gap-2'>
              {['scan:read', 'scan:write', 'report:read', 'team:read'].map(
                (scope) => (
                  <label
                    key={scope}
                    className='border-border flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm'
                  >
                    <input type='checkbox' defaultChecked className='rounded' />
                    <code className='text-xs'>{scope}</code>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} disabled={!name}>
            Generate Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ApiKeys() {
  const [loading] = useState(false)

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
            <h2 className='text-2xl font-bold tracking-tight'>API Keys</h2>
            <p className='text-muted-foreground'>
              Manage API keys for programmatic access
            </p>
          </div>
          <CreateKeyDialog />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>
              Keep your API keys secret. Never expose them in client-side code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='space-y-3'>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className='h-24 w-full rounded-lg' />
                ))}
              </div>
            ) : (
              <div className='space-y-3'>
                {initialKeys.map((key) => (
                  <ApiKeyRow key={key.id} apiKey={key} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Main>
    </>
  )
}

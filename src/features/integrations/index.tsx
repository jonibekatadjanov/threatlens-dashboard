import { useState } from 'react'
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  MessageCircle,
  Send,
  Slack,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  connected: boolean
  webhookUrl: string
  criticalOnly: boolean
  alertTypes: {
    sqli: boolean
    xss: boolean
    rce: boolean
    ssrf: boolean
  }
}

const initialIntegrations: Integration[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Receive security alerts directly in your Telegram bot.',
    icon: Send,
    color: 'text-blue-400',
    connected: true,
    webhookUrl: 'https://api.telegram.org/bot<TOKEN>/sendMessage',
    criticalOnly: true,
    alertTypes: { sqli: true, xss: true, rce: true, ssrf: false },
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Send vulnerability notifications to a Discord channel.',
    icon: MessageCircle,
    color: 'text-indigo-400',
    connected: false,
    webhookUrl: '',
    criticalOnly: false,
    alertTypes: { sqli: true, xss: true, rce: true, ssrf: true },
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Post security findings to your Slack workspace.',
    icon: Slack,
    color: 'text-green-400',
    connected: false,
    webhookUrl: '',
    criticalOnly: false,
    alertTypes: { sqli: false, xss: false, rce: true, ssrf: false },
  },
]

function IntegrationCard({
  integration: initial,
}: {
  integration: Integration
}) {
  const [data, setData] = useState(initial)
  const Icon = data.icon

  function toggleConnection() {
    setData((prev) => ({ ...prev, connected: !prev.connected }))
  }

  return (
    <Card className={data.connected ? 'border-green-500/30' : ''}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-lg'>
              <Icon className={`h-5 w-5 ${data.color}`} />
            </div>
            <div>
              <CardTitle className='text-base'>{data.name}</CardTitle>
              <CardDescription className='text-xs'>
                {data.description}
              </CardDescription>
            </div>
          </div>
          {data.connected ? (
            <Badge className='bg-green-500/10 text-green-600'>
              <CheckCircle2 className='mr-1 h-3 w-3' />
              Connected
            </Badge>
          ) : (
            <Badge variant='secondary'>Disconnected</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor={`webhook-${data.id}`} className='text-xs'>
            Webhook URL
          </Label>
          <Input
            id={`webhook-${data.id}`}
            placeholder='https://hooks.example.com/...'
            value={data.webhookUrl}
            onChange={(e) =>
              setData((prev) => ({ ...prev, webhookUrl: e.target.value }))
            }
            className='font-mono text-xs'
          />
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <AlertTriangle className='h-4 w-4 text-yellow-500' />
              <Label className='text-xs font-medium'>Critical Alerts Only</Label>
            </div>
            <Switch
              checked={data.criticalOnly}
              onCheckedChange={(checked) =>
                setData((prev) => ({ ...prev, criticalOnly: checked }))
              }
            />
          </div>
          <p className='text-muted-foreground text-xs'>
            Only send alerts for high-severity vulnerabilities (SQLi, XSS, RCE)
          </p>
        </div>

        <div className='space-y-2'>
          <Label className='text-xs font-medium'>Alert Types</Label>
          <div className='grid grid-cols-2 gap-2'>
            {(
              Object.entries(data.alertTypes) as [
                keyof Integration['alertTypes'],
                boolean,
              ][]
            ).map(([type, enabled]) => (
              <div
                key={type}
                className='flex items-center justify-between rounded-md border px-3 py-1.5'
              >
                <span className='text-xs font-medium uppercase'>{type}</span>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) =>
                    setData((prev) => ({
                      ...prev,
                      alertTypes: { ...prev.alertTypes, [type]: checked },
                    }))
                  }
                  className='scale-75'
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className='gap-2'>
        <Button
          variant={data.connected ? 'destructive' : 'default'}
          size='sm'
          className='flex-1'
          onClick={toggleConnection}
        >
          {data.connected ? 'Disconnect' : 'Connect'}
        </Button>
        {data.connected && (
          <Button variant='outline' size='sm'>
            <Bell className='mr-1 h-3 w-3' />
            Test
          </Button>
        )}
        {data.connected && (
          <Button variant='outline' size='sm'>
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export function Integrations() {
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
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Integrations</h2>
          <p className='text-muted-foreground'>
            Connect your security alerts to messaging platforms
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {initialIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      </Main>
    </>
  )
}

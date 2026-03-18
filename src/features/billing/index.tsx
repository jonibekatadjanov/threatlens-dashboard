import {
  CheckCircle2,
  CreditCard,
  Download,
  FileJson,
  FileText,
  Zap,
} from 'lucide-react'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const invoices = [
  { id: 'INV-001', date: 'Mar 1, 2025', amount: '$299.00', status: 'Paid' },
  { id: 'INV-002', date: 'Feb 1, 2025', amount: '$299.00', status: 'Paid' },
  { id: 'INV-003', date: 'Jan 1, 2025', amount: '$299.00', status: 'Paid' },
]

export function Billing() {
  const scansUsed = 55
  const scansTotal = 100
  const scansLeft = scansTotal - scansUsed
  const usagePercent = (scansUsed / scansTotal) * 100

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

      <Main className='flex flex-1 flex-col gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Billing</h2>
            <p className='text-muted-foreground'>
              Manage your subscription and usage
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                <Download className='mr-2 h-4 w-4' />
                Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <FileText className='mr-2 h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Executive PDF</p>
                  <p className='text-muted-foreground text-xs'>
                    High-level summary for stakeholders
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileJson className='mr-2 h-4 w-4' />
                <div>
                  <p className='text-sm font-medium'>Technical JSON</p>
                  <p className='text-muted-foreground text-xs'>
                    Detailed findings for engineers
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Current Plan */}
          <div className='space-y-6 lg:col-span-2'>
            <Card>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Your subscription details
                    </CardDescription>
                  </div>
                  <Badge className='bg-purple-500/10 text-purple-600'>
                    Enterprise
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                  <div className='rounded-lg border p-3'>
                    <p className='text-muted-foreground text-xs'>Plan</p>
                    <p className='text-sm font-semibold'>Enterprise</p>
                  </div>
                  <div className='rounded-lg border p-3'>
                    <p className='text-muted-foreground text-xs'>Billing</p>
                    <p className='text-sm font-semibold'>Monthly</p>
                  </div>
                  <div className='rounded-lg border p-3'>
                    <p className='text-muted-foreground text-xs'>Next Renewal</p>
                    <p className='text-sm font-semibold'>Apr 1, 2025</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Zap className='h-4 w-4 text-yellow-500' />
                      <span className='text-sm font-medium'>Scan Usage</span>
                    </div>
                    <span className='text-sm font-semibold'>
                      {scansLeft} / {scansTotal} scans left
                    </span>
                  </div>
                  <Progress value={usagePercent} className='h-3' />
                  <p className='text-muted-foreground mt-1 text-xs'>
                    {scansUsed} scans used · Resets in 12 days
                  </p>
                </div>

                <Separator />

                <div className='space-y-2'>
                  <p className='text-sm font-medium'>Plan Features</p>
                  {[
                    '100 scans per month',
                    'Unlimited assets',
                    'Team management (up to 20 members)',
                    'API access',
                    'Priority support',
                    'Custom integrations',
                  ].map((feature) => (
                    <div key={feature} className='flex items-center gap-2'>
                      <CheckCircle2 className='h-4 w-4 shrink-0 text-green-500' />
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className='flex gap-2 pt-2'>
                  <Button variant='outline' size='sm'>
                    Change Plan
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-red-600 hover:text-red-600'
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoice History */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Your past billing invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className='flex items-center justify-between rounded-lg border p-3'
                    >
                      <div>
                        <p className='text-sm font-medium'>{invoice.id}</p>
                        <p className='text-muted-foreground text-xs'>
                          {invoice.date}
                        </p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='text-sm font-semibold'>
                          {invoice.amount}
                        </span>
                        <Badge className='bg-green-500/10 text-green-600'>
                          {invoice.status}
                        </Badge>
                        <Button variant='ghost' size='sm' className='h-7 px-2'>
                          <Download className='h-3 w-3' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment details</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-3 rounded-lg border p-3'>
                  <CreditCard className='text-muted-foreground h-8 w-8' />
                  <div>
                    <p className='text-sm font-medium'>•••• •••• •••• 4242</p>
                    <p className='text-muted-foreground text-xs'>
                      Expires 12/27
                    </p>
                  </div>
                  <Badge variant='secondary' className='ml-auto text-xs'>
                    Default
                  </Badge>
                </div>
                <Button variant='outline' size='sm' className='w-full'>
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>
                  Download security reports for your records
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <Button variant='outline' className='w-full justify-start'>
                  <FileText className='mr-2 h-4 w-4 text-red-500' />
                  <div className='text-left'>
                    <p className='text-sm font-medium'>Executive PDF</p>
                    <p className='text-muted-foreground text-xs'>
                      High-level summary
                    </p>
                  </div>
                </Button>
                <Button variant='outline' className='w-full justify-start'>
                  <FileJson className='mr-2 h-4 w-4 text-blue-500' />
                  <div className='text-left'>
                    <p className='text-sm font-medium'>Technical JSON</p>
                    <p className='text-muted-foreground text-xs'>
                      Detailed findings
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}

import { useState } from 'react'
import {
  Globe,
  LayoutGrid,
  List,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShieldOff,
  Zap,
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
import { Progress } from '@/components/ui/progress'
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

type AssetStatus = 'Protected' | 'Scanning' | 'Vulnerable'

interface Asset {
  id: string
  domain: string
  status: AssetStatus
  score: number
  lastScan: string
  scanning: boolean
  phase?: string
  progress?: number
  criticalIssues: number
  highIssues: number
}

const assets: Asset[] = [
  {
    id: '1',
    domain: 'api.acme.com',
    status: 'Protected',
    score: 92,
    lastScan: '2 minutes ago',
    scanning: false,
    criticalIssues: 0,
    highIssues: 1,
  },
  {
    id: '2',
    domain: 'app.acme.com',
    status: 'Scanning',
    score: 71,
    lastScan: 'In progress',
    scanning: true,
    phase: 'Crawling...',
    progress: 45,
    criticalIssues: 0,
    highIssues: 3,
  },
  {
    id: '3',
    domain: 'staging.acme.com',
    status: 'Vulnerable',
    score: 42,
    lastScan: '1 hour ago',
    scanning: false,
    criticalIssues: 3,
    highIssues: 7,
  },
  {
    id: '4',
    domain: 'admin.acme.com',
    status: 'Protected',
    score: 83,
    lastScan: '3 hours ago',
    scanning: false,
    criticalIssues: 0,
    highIssues: 2,
  },
  {
    id: '5',
    domain: 'docs.acme.com',
    status: 'Protected',
    score: 97,
    lastScan: '5 hours ago',
    scanning: false,
    criticalIssues: 0,
    highIssues: 0,
  },
  {
    id: '6',
    domain: 'shop.acme.com',
    status: 'Vulnerable',
    score: 35,
    lastScan: '2 days ago',
    scanning: false,
    criticalIssues: 5,
    highIssues: 12,
  },
]

function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-500'
  if (score >= 70) return 'text-yellow-500'
  return 'text-red-500'
}

function getScoreGrade(score: number) {
  if (score >= 90) return 'A+'
  if (score >= 70) return 'B'
  return 'F'
}

function getProgressBarClass(score: number) {
  if (score >= 90) return '[&>[data-slot=progress-indicator]]:bg-green-500'
  if (score >= 70) return '[&>[data-slot=progress-indicator]]:bg-yellow-500'
  return '[&>[data-slot=progress-indicator]]:bg-red-500'
}

function getStatusBadge(status: AssetStatus) {
  switch (status) {
    case 'Protected':
      return (
        <Badge className='bg-green-500/10 text-green-600 hover:bg-green-500/20'>
          <ShieldCheck className='mr-1 h-3 w-3' />
          Protected
        </Badge>
      )
    case 'Scanning':
      return (
        <Badge className='bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20'>
          <span className='mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500' />
          Scanning
        </Badge>
      )
    case 'Vulnerable':
      return (
        <Badge className='bg-red-500/10 text-red-600 hover:bg-red-500/20'>
          <ShieldOff className='mr-1 h-3 w-3' />
          Vulnerable
        </Badge>
      )
  }
}

function RadialScore({ score }: { score: number }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 90 ? '#22c55e' : score >= 70 ? '#eab308' : '#ef4444'

  return (
    <div className='relative flex h-20 w-20 items-center justify-center'>
      <svg className='h-20 w-20 -rotate-90' viewBox='0 0 80 80'>
        <circle
          cx='40'
          cy='40'
          r={radius}
          fill='none'
          stroke='currentColor'
          strokeWidth='6'
          className='text-muted/30'
        />
        <circle
          cx='40'
          cy='40'
          r={radius}
          fill='none'
          stroke={color}
          strokeWidth='6'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
        />
      </svg>
      <div className='absolute flex flex-col items-center'>
        <span className={`text-sm font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className={`text-xs font-medium ${getScoreColor(score)}`}>
          {getScoreGrade(score)}
        </span>
      </div>
    </div>
  )
}

function AssetGridCard({ asset }: { asset: Asset }) {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <Globe className='text-muted-foreground h-4 w-4' />
            <CardTitle className='text-sm font-medium'>{asset.domain}</CardTitle>
          </div>
          {getStatusBadge(asset.status)}
        </div>
        <CardDescription className='text-xs'>
          Last scan: {asset.lastScan}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col items-center justify-center py-4'>
        {asset.scanning ? (
          <div className='w-full space-y-2'>
            <div className='flex items-center justify-between text-xs'>
              <span className='text-muted-foreground'>
                Phase: {asset.phase}
              </span>
              <span className='font-medium'>{asset.progress}%</span>
            </div>
            <Progress value={asset.progress} className='h-2' />
            <p className='text-muted-foreground text-center text-xs'>
              Scanning in progress...
            </p>
          </div>
        ) : (
          <RadialScore score={asset.score} />
        )}
      </CardContent>
      <CardFooter className='border-t pt-3'>
        <div className='flex w-full items-center justify-between text-xs'>
          <span className='text-red-500'>
            {asset.criticalIssues} critical
          </span>
          <span className='text-yellow-500'>{asset.highIssues} high</span>
          <Button variant='ghost' size='sm' className='h-6 px-2 text-xs'>
            <RefreshCw className='mr-1 h-3 w-3' />
            Rescan
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function Assets() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
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
            <h2 className='text-2xl font-bold tracking-tight'>
              Assets (Domains)
            </h2>
            <p className='text-muted-foreground'>
              Monitor and manage all your web assets
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='border-border flex items-center rounded-md border'>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size='sm'
                className='rounded-r-none'
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className='h-4 w-4' />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size='sm'
                className='rounded-l-none'
                onClick={() => setViewMode('table')}
              >
                <List className='h-4 w-4' />
              </Button>
            </div>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Domain
            </Button>
          </div>
        </div>

        {loading ? (
          viewMode === 'grid' ? (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className='h-48 rounded-xl' />
              ))}
            </div>
          ) : (
            <Skeleton className='h-64 rounded-xl' />
          )
        ) : viewMode === 'grid' ? (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {assets.map((asset) => (
              <AssetGridCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Security Score</TableHead>
                  <TableHead>Critical</TableHead>
                  <TableHead>High</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center gap-2'>
                        <Globe className='text-muted-foreground h-4 w-4' />
                        {asset.domain}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(asset.status)}</TableCell>
                    <TableCell>
                      {asset.scanning ? (
                        <div className='flex items-center gap-2'>
                          <Progress
                            value={asset.progress}
                            className='h-1.5 w-20'
                          />
                          <span className='text-xs'>{asset.progress}%</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <span
                            className={`font-bold ${getScoreColor(asset.score)}`}
                          >
                            {asset.score}
                          </span>
                          <div
                            className={`w-16 ${getProgressBarClass(asset.score)}`}
                          >
                            <Progress
                              value={asset.score}
                              className='h-1.5'
                            />
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          asset.criticalIssues > 0
                            ? 'font-medium text-red-500'
                            : 'text-muted-foreground'
                        }
                      >
                        {asset.criticalIssues}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          asset.highIssues > 0
                            ? 'font-medium text-yellow-500'
                            : 'text-muted-foreground'
                        }
                      >
                        {asset.highIssues}
                      </span>
                    </TableCell>
                    <TableCell className='text-muted-foreground text-sm'>
                      {asset.lastScan}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm'>
                        <Zap className='mr-1 h-3 w-3' />
                        Scan
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </Main>
    </>
  )
}

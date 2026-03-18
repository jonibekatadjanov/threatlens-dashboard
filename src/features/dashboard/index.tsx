import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  AlertTriangle,
  Globe,
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const summaryStats = [
  {
    title: 'Total Assets',
    value: '12',
    description: '3 added this month',
    icon: Globe,
    color: 'text-blue-500',
  },
  {
    title: 'Protected',
    value: '9',
    description: '75% coverage',
    icon: ShieldCheck,
    color: 'text-green-500',
  },
  {
    title: 'Critical Issues',
    value: '4',
    description: '↑ 2 since last scan',
    icon: AlertTriangle,
    color: 'text-red-500',
  },
  {
    title: 'Avg Security Score',
    value: '76',
    description: '+3pts this week',
    icon: Zap,
    color: 'text-yellow-500',
  },
]

const recentAssets = [
  {
    domain: 'api.acme.com',
    status: 'Protected',
    score: 92,
    lastScan: '2 min ago',
    scanning: false,
  },
  {
    domain: 'app.acme.com',
    status: 'Scanning',
    score: 71,
    lastScan: 'In progress',
    scanning: true,
    phase: 'Crawling...',
    progress: 45,
  },
  {
    domain: 'staging.acme.com',
    status: 'Protected',
    score: 58,
    lastScan: '1 hour ago',
    scanning: false,
  },
  {
    domain: 'admin.acme.com',
    status: 'Protected',
    score: 83,
    lastScan: '3 hours ago',
    scanning: false,
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

function getScoreBarColor(score: number) {
  if (score >= 90) return '[&>[data-slot=progress-indicator]]:bg-green-500'
  if (score >= 70) return '[&>[data-slot=progress-indicator]]:bg-yellow-500'
  return '[&>[data-slot=progress-indicator]]:bg-red-500'
}

export function Dashboard() {
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

      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Security Dashboard
            </h1>
            <p className='text-muted-foreground text-sm'>
              Monitor and manage your asset security posture
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button asChild variant='outline'>
              <Link to='/assets'>View All Assets</Link>
            </Button>
            <Button>
              <Zap className='mr-2 h-4 w-4' />
              Scan All
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className='mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {summaryStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p className='text-muted-foreground text-xs'>
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Usage Tracker */}
        <Card className='mb-6'>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-sm font-medium'>
                  Scan Usage
                </CardTitle>
                <CardDescription>Plan: Enterprise</CardDescription>
              </div>
              <Badge variant='secondary'>45 / 100 scans left</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={55} className='h-2' />
            <p className='text-muted-foreground mt-2 text-xs'>
              55 scans used this month · Resets in 12 days
            </p>
          </CardContent>
        </Card>

        {/* Recent Assets */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assets</CardTitle>
            <CardDescription>
              Latest security status for your monitored domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='space-y-3'>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className='h-16 w-full rounded-lg' />
                ))}
              </div>
            ) : (
              <div className='space-y-3'>
                {recentAssets.map((asset) => (
                  <div
                    key={asset.domain}
                    className='border-border flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between'
                  >
                    <div className='flex items-center gap-3'>
                      <Globe className='text-muted-foreground h-4 w-4 shrink-0' />
                      <div>
                        <p className='text-sm font-medium'>{asset.domain}</p>
                        <p className='text-muted-foreground text-xs'>
                          Last scan: {asset.lastScan}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      {asset.scanning ? (
                        <div className='min-w-[140px]'>
                          <div className='mb-1 flex items-center justify-between'>
                            <span className='text-muted-foreground text-xs'>
                              Phase: {asset.phase}
                            </span>
                            <span className='text-xs font-medium'>
                              {asset.progress}%
                            </span>
                          </div>
                          <Progress value={asset.progress} className='h-1.5' />
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <span
                            className={`text-sm font-bold ${getScoreColor(asset.score)}`}
                          >
                            {asset.score}
                          </span>
                          <span
                            className={`text-xs font-medium ${getScoreColor(asset.score)}`}
                          >
                            ({getScoreGrade(asset.score)})
                          </span>
                          <div
                            className={`w-16 ${getScoreBarColor(asset.score)}`}
                          >
                            <Progress value={asset.score} className='h-1.5' />
                          </div>
                        </div>
                      )}
                      <Badge
                        variant={
                          asset.status === 'Protected' ? 'default' : 'secondary'
                        }
                        className={
                          asset.status === 'Protected'
                            ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20'
                        }
                      >
                        {asset.status === 'Scanning' && (
                          <span className='mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500' />
                        )}
                        {asset.status}
                      </Badge>
                      {asset.status === 'Protected' && asset.score < 70 && (
                        <ShieldOff className='h-4 w-4 text-red-500' />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Main>
    </>
  )
}

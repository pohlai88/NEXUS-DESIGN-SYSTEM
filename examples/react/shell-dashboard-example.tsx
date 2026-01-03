/**
 * Complete Dashboard Example - Shell System Code Reference
 * 
 * This is a production-ready dashboard example using SidebarShell.
 * Use this as a code reference for building your own dashboards.
 * 
 * Features:
 * - SidebarShell with collapsible navigation
 * - Gold #eab308 active states
 * - Theme switching
 * - Header with search and profile
 * - Dashboard content with cards
 * - Footer
 */

'use client';

import React from 'react';
import {
  SidebarShell,
  useThemeSwitch,
} from '../components/react/shells';
import {
  lightTheme,
  twilightTheme,
  attractiveTheme,
  carbonMistTheme,
} from '../themes';

export function DashboardExample() {
  return (
    <SidebarShell
      customThemes={[lightTheme, twilightTheme, attractiveTheme, carbonMistTheme]}
      sidebar={<DashboardSidebar />}
      header={<DashboardHeader />}
      footer={<DashboardFooter />}
      sidebarWidth="280px"
      collapsible={true}
    >
      <DashboardMain />
    </SidebarShell>
  );
}

function DashboardSidebar() {
  const [activeItem, setActiveItem] = React.useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="p-4 space-y-2">
      {/* Logo */}
      <div className="px-4 py-3 mb-4">
        <h1 className="na-h4">AIBOS</h1>
      </div>

      {/* Navigation Items */}
      {navItems.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveItem(item.id);
          }}
          className={`block px-4 py-2 rounded-lg transition-colors ${
            activeItem === item.id
              ? 'border-l-2 border-primary text-lux bg-paper-2'
              : 'border-l-2 border-transparent text-lux-dim hover:bg-paper-2'
          }`}
        >
          <span className="mr-3">{item.icon}</span>
          {item.label}
        </a>
      ))}

      {/* Theme Switcher */}
      <div className="mt-8 pt-4 border-t border-stroke">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

function ThemeSwitcher() {
  const { switchToCustom, switchToDefault } = useThemeSwitch();

  return (
    <div className="px-4">
      <div className="na-metadata mb-2">Theme</div>
      <div className="space-y-1">
        <button
          onClick={() => switchToDefault()}
          className="w-full text-left px-3 py-1.5 rounded text-sm text-lux-dim hover:bg-paper-2"
        >
          Default
        </button>
        <button
          onClick={() => switchToCustom('light')}
          className="w-full text-left px-3 py-1.5 rounded text-sm text-lux-dim hover:bg-paper-2"
        >
          Light
        </button>
        <button
          onClick={() => switchToCustom('twilight')}
          className="w-full text-left px-3 py-1.5 rounded text-sm text-lux-dim hover:bg-paper-2"
        >
          Twilight
        </button>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <input
          type="search"
          placeholder="Search..."
          className="na-input w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="na-btn p-2" aria-label="Notifications">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="na-btn na-btn-primary">Profile</button>
      </div>
    </div>
  );
}

function DashboardMain() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="na-h1">Dashboard</h1>
        <div className="na-metadata mt-2">Welcome back! Here's what's happening today.</div>
      </div>

      {/* KPI Cards */}
      <div className="na-grid gap-6 mb-6">
        <KPICard
          title="Revenue"
          value="$4,200"
          change="+12.5%"
          trend="up"
        />
        <KPICard
          title="Users"
          value="1,234"
          change="+8.2%"
          trend="up"
        />
        <KPICard
          title="Orders"
          value="89"
          change="-2.1%"
          trend="down"
        />
        <KPICard
          title="Growth"
          value="24.5%"
          change="+5.3%"
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="na-grid gap-6 mb-6">
        <div className="na-card p-6">
          <h2 className="na-h3 mb-4">Revenue Chart</h2>
          <div className="h-64 flex items-center justify-center bg-paper rounded-lg">
            <div className="text-lux-dim">Chart placeholder</div>
          </div>
        </div>
        <div className="na-card p-6">
          <h2 className="na-h3 mb-4">User Activity</h2>
          <div className="h-64 flex items-center justify-center bg-paper rounded-lg">
            <div className="text-lux-dim">Chart placeholder</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="na-card p-6">
        <h2 className="na-h3 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem
            user="John Doe"
            action="created a new project"
            time="2 hours ago"
          />
          <ActivityItem
            user="Jane Smith"
            action="updated settings"
            time="4 hours ago"
          />
          <ActivityItem
            user="Bob Wilson"
            action="completed task"
            time="6 hours ago"
          />
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}) {
  return (
    <div className="na-card p-6">
      <div className="na-metadata mb-2">{title}</div>
      <div className="na-data-large mb-2">{value}</div>
      <div className={`flex items-center gap-1 text-sm ${
        trend === 'up' ? 'text-success' : 'text-error'
      }`}>
        <span>{trend === 'up' ? '↗' : '↘'}</span>
        <span>{change}</span>
      </div>
    </div>
  );
}

function ActivityItem({
  user,
  action,
  time,
}: {
  user: string;
  action: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-stroke last:border-0">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
        {user[0]}
      </div>
      <div className="flex-1">
        <div className="na-data">
          <strong>{user}</strong> {action}
        </div>
        <div className="na-metadata mt-1">{time}</div>
      </div>
    </div>
  );
}

function DashboardFooter() {
  return (
    <div className="px-6 py-4 flex items-center justify-between text-lux-dim text-sm">
      <div>© 2025 AIBOS Design System</div>
      <div className="flex gap-6">
        <a href="/privacy" className="hover:text-lux">Privacy</a>
        <a href="/terms" className="hover:text-lux">Terms</a>
        <a href="/support" className="hover:text-lux">Support</a>
      </div>
    </div>
  );
}


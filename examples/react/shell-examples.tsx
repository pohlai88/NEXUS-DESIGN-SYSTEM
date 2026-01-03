/**
 * Shell System - Code Reference Examples
 * 
 * These examples demonstrate all 6 shell patterns for code reference.
 * Use these as templates when building your applications.
 */

import React from 'react';
import {
  RootShell,
  SidebarShell,
  StackedShell,
  FocusShell,
  MasterDetailShell,
  MobileShell,
} from '../components/react/shells';
import { lightTheme, twilightTheme } from '../themes';

// ============================================================
// Example 1: SidebarShell - The Workhorse (SaaS/Admin)
// ============================================================

export function SidebarShellExample() {
  return (
    <SidebarShell
      customThemes={[lightTheme, twilightTheme]}
      sidebar={<SidebarNavigation />}
      header={<AppHeader />}
      footer={<AppFooter />}
      sidebarWidth="280px"
      collapsible={true}
    >
      <DashboardContent />
    </SidebarShell>
  );
}

function SidebarNavigation() {
  return (
    <nav className="p-4 space-y-2">
      {/* Active item with gold border */}
      <a
        href="/dashboard"
        className="block px-4 py-2 rounded-lg border-l-2 border-primary text-lux hover:bg-paper-2 transition-colors"
      >
        Dashboard
      </a>
      <a
        href="/settings"
        className="block px-4 py-2 rounded-lg border-l-2 border-transparent text-lux-dim hover:bg-paper-2 transition-colors"
      >
        Settings
      </a>
    </nav>
  );
}

function AppHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <input
          type="search"
          placeholder="Search..."
          className="na-input w-64"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="na-btn">Notifications</button>
        <button className="na-btn">Profile</button>
      </div>
    </div>
  );
}

function AppFooter() {
  return (
    <div className="px-6 py-4 text-lux-dim text-sm">
      © 2025 AIBOS Design System
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="p-6">
      <h1 className="na-h1">Dashboard</h1>
      <div className="na-grid gap-6 mt-6">
        <div className="na-card p-6">
          <h3 className="na-h4">Revenue</h3>
          <div className="na-data-large">$4,200</div>
        </div>
        <div className="na-card p-6">
          <h3 className="na-h4">Users</h3>
          <div className="na-data-large">1,234</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Example 2: StackedShell - Consumer View (Settings/Profile)
// ============================================================

export function StackedShellExample() {
  return (
    <StackedShell
      navigation={<TopNavigation />}
      footer={<Footer />}
      maxWidth="max-w-7xl"
    >
      <SettingsContent />
    </StackedShell>
  );
}

function TopNavigation() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-8">
        <a href="/" className="na-h4">Logo</a>
        <nav className="flex gap-6">
          <a href="/profile" className="text-lux hover:text-primary">Profile</a>
          <a href="/settings" className="text-lux hover:text-primary">Settings</a>
        </nav>
      </div>
      <button className="na-btn">Profile</button>
    </div>
  );
}

function Footer() {
  return (
    <div className="py-6 text-lux-dim text-sm">
      <div className="flex justify-between">
        <div>© 2025 AIBOS</div>
        <div className="flex gap-6">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div>
      <h1 className="na-h1">Settings</h1>
      <div className="na-card p-6 mt-6">
        <h2 className="na-h3">Account</h2>
        <form className="mt-4 space-y-4">
          <div>
            <label className="na-metadata">Email</label>
            <input type="email" className="na-input w-full mt-2" />
          </div>
          <button type="submit" className="na-btn na-btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// Example 3: FocusShell - Minimalist (Login/Checkout)
// ============================================================

export function FocusShellExample() {
  return (
    <FocusShell
      variant="centered"
      exitButton={<CloseButton />}
      maxWidth="max-w-md"
    >
      <LoginForm />
    </FocusShell>
  );
}

export function FocusShellSplitExample() {
  return (
    <FocusShell
      variant="split"
      leftContent={<Illustration />}
      exitButton={<HelpButton />}
    >
      <SignupForm />
    </FocusShell>
  );
}

function CloseButton() {
  return (
    <button className="na-btn p-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

function HelpButton() {
  return (
    <button className="na-btn">Help</button>
  );
}

function Illustration() {
  return (
    <div className="flex items-center justify-center h-full bg-paper rounded-lg">
      <div className="text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h2 className="na-h2">Welcome</h2>
        <p className="text-lux-dim mt-2">Create your account to get started</p>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="na-card p-8">
      <h1 className="na-h1 mb-6">Sign In</h1>
      <form className="space-y-4">
        <div>
          <label className="na-metadata">Email</label>
          <input type="email" className="na-input w-full mt-2" />
        </div>
        <div>
          <label className="na-metadata">Password</label>
          <input type="password" className="na-input w-full mt-2" />
        </div>
        <button type="submit" className="na-btn na-btn-primary w-full">
          Sign In
        </button>
      </form>
    </div>
  );
}

function SignupForm() {
  return (
    <div className="na-card p-8">
      <h1 className="na-h1 mb-6">Create Account</h1>
      <form className="space-y-4">
        <div>
          <label className="na-metadata">Name</label>
          <input type="text" className="na-input w-full mt-2" />
        </div>
        <div>
          <label className="na-metadata">Email</label>
          <input type="email" className="na-input w-full mt-2" />
        </div>
        <div>
          <label className="na-metadata">Password</label>
          <input type="password" className="na-input w-full mt-2" />
        </div>
        <button type="submit" className="na-btn na-btn-primary w-full">
          Create Account
        </button>
      </form>
    </div>
  );
}

// ============================================================
// Example 4: MasterDetailShell - Split View (Email/Chat)
// ============================================================

export function MasterDetailShellExample() {
  return (
    <MasterDetailShell
      master={<EmailList />}
      detail={<EmailView />}
      masterWidth="320px"
    />
  );
}

// Nested in SidebarShell
export function MasterDetailNestedExample() {
  return (
    <SidebarShell sidebar={<MainNavigation />}>
      <MasterDetailShell
        master={<EmailList />}
        detail={<EmailView />}
      />
    </SidebarShell>
  );
}

function EmailList() {
  const emails = [
    { id: 1, from: 'John Doe', subject: 'Meeting tomorrow', preview: 'Let\'s discuss...' },
    { id: 2, from: 'Jane Smith', subject: 'Project update', preview: 'Here\'s the latest...' },
  ];

  return (
    <div className="p-4 space-y-2">
      {emails.map(email => (
        <div
          key={email.id}
          className="p-4 rounded-lg hover:bg-paper-2 cursor-pointer border-l-2 border-transparent hover:border-primary transition-colors"
        >
          <div className="na-h5">{email.from}</div>
          <div className="na-data mt-1">{email.subject}</div>
          <div className="na-metadata mt-1">{email.preview}</div>
        </div>
      ))}
    </div>
  );
}

function EmailView() {
  return (
    <div className="p-6">
      <h1 className="na-h2">Meeting tomorrow</h1>
      <div className="na-metadata mt-2">From: John Doe</div>
      <div className="na-data mt-6">
        Let's discuss the project updates and plan for next week.
      </div>
    </div>
  );
}

function MainNavigation() {
  return (
    <nav className="p-4 space-y-2">
      <a href="/inbox" className="block px-4 py-2 rounded-lg border-l-2 border-primary text-lux">
        Inbox
      </a>
      <a href="/sent" className="block px-4 py-2 rounded-lg border-l-2 border-transparent text-lux-dim hover:bg-paper-2">
        Sent
      </a>
    </nav>
  );
}

// ============================================================
// Example 5: MobileShell - PWA View
// ============================================================

export function MobileShellExample() {
  return (
    <MobileShell
      header={<MobileHeader />}
      tabBar={<TabBar />}
    >
      <MobileContent />
    </MobileShell>
  );
}

function MobileHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <h1 className="na-h4">App Name</h1>
      <button className="na-btn p-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

function TabBar() {
  return (
    <div className="flex justify-around py-3">
      <button className="flex flex-col items-center gap-1 text-primary">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-lux-dim">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className="text-xs">Tasks</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-lux-dim">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
}

function MobileContent() {
  return (
    <div className="p-4 space-y-4">
      <div className="na-card p-4">
        <h2 className="na-h4">Welcome</h2>
        <div className="na-data mt-2">Your mobile app content</div>
      </div>
    </div>
  );
}

// ============================================================
// Example 6: RootShell - Base (Never use directly)
// ============================================================

// ❌ Don't use directly
export function RootShellExampleBad() {
  return (
    <RootShell>
      <YourApp />
    </RootShell>
  );
}

// ✅ Use other shells instead
export function RootShellExampleGood() {
  return (
    <SidebarShell>
      <YourApp />
    </SidebarShell>
  );
}

function YourApp() {
  return <div>Your app content</div>;
}


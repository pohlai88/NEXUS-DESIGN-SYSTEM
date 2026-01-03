/**
 * Shell System - Complete Real-World Examples
 * 
 * This file demonstrates all 15 shells with real-world use cases
 * and best practices.
 * 
 * Usage: Copy and adapt these examples for your application
 */

import React from 'react';
import {
  RootShell,
  SidebarShell,
  StackedShell,
  FocusShell,
  MasterDetailShell,
  MobileShell,
  WorkflowShell,
  CommandCenterShell,
  WorkspaceShell,
  SplitBusinessShell,
  ContextualShell,
  ConfirmShell,
  FormModalShell,
  FullscreenModalShell,
  ExceptionShell,
  useAuth,
  useKeyboardManager,
  type Command,
} from '@aibos/design-system/react/shells';

// ============================================================================
// 1. ROOTSHELL - Foundation Example
// ============================================================================

/**
 * Example: Complete App Setup with RootShell
 * 
 * Use Case: Main application entry point
 * Best Practice: Always wrap your app in RootShell
 */
export function AppWithRootShell() {
  const commands: Command[] = [
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      description: 'Navigate to main dashboard',
      action: () => window.location.href = '/dashboard',
      category: 'Navigation',
      keywords: ['dashboard', 'home'],
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Open application settings',
      action: () => window.location.href = '/settings',
      category: 'Navigation',
    },
    {
      id: 'create-item',
      label: 'Create New Item',
      description: 'Create a new item',
      action: () => console.log('Create item'),
      category: 'Actions',
      shortcut: '⌘N',
    },
  ];

  return (
    <RootShell
      initialTheme="default"
      authProps={{
        onLogin: async (credentials) => {
          // Your login logic
          const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          });
          const data = await response.json();
          return { user: data.user, token: data.token };
        },
        onLogout: async () => {
          await fetch('/api/logout', { method: 'POST' });
        },
      }}
      keyboardProps={{
        enableHelp: true,
        helpTrigger: '?',
      }}
      commands={commands}
      commandPaletteEnabled={true}
      enableErrorBoundary={true}
    >
      <YourMainApp />
    </RootShell>
  );
}

// ============================================================================
// 2. SIDEBARSHELL - SaaS/Admin Panel Example
// ============================================================================

/**
 * Example: SaaS Dashboard with Sidebar
 * 
 * Use Case: Admin panels, SaaS applications, complex apps
 * Best Practice: Use for apps with multiple sections
 */
export function SaaSDashboard() {
  const [activeSection, setActiveSection] = React.useState('dashboard');

  const sidebar = (
    <nav className="p-4 space-y-2">
      <button
        onClick={() => setActiveSection('dashboard')}
        className={`w-full text-left p-3 rounded-lg ${
          activeSection === 'dashboard'
            ? 'bg-primary/20 border-l-2 border-primary'
            : 'hover:bg-paper-2'
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setActiveSection('users')}
        className={`w-full text-left p-3 rounded-lg ${
          activeSection === 'users'
            ? 'bg-primary/20 border-l-2 border-primary'
            : 'hover:bg-paper-2'
        }`}
      >
        Users
      </button>
      <button
        onClick={() => setActiveSection('settings')}
        className={`w-full text-left p-3 rounded-lg ${
          activeSection === 'settings'
            ? 'bg-primary/20 border-l-2 border-primary'
            : 'hover:bg-paper-2'
        }`}
      >
        Settings
      </button>
    </nav>
  );

  const header = (
    <div className="flex items-center justify-between p-4 border-b border-stroke">
      <h1 className="na-h3">My SaaS App</h1>
      <div className="flex items-center gap-4">
        <button className="na-btn">Notifications</button>
        <button className="na-btn">Profile</button>
      </div>
    </div>
  );

  return (
    <SidebarShell
      sidebar={sidebar}
      header={header}
      sidebarWidth="240px"
      collapsible={true}
    >
      <div className="p-6">
        {activeSection === 'dashboard' && <DashboardContent />}
        {activeSection === 'users' && <UsersContent />}
        {activeSection === 'settings' && <SettingsContent />}
      </div>
    </SidebarShell>
  );
}

// ============================================================================
// 3. STACKEDSHELL - Consumer App Example
// ============================================================================

/**
 * Example: Consumer App with Horizontal Navigation
 * 
 * Use Case: Consumer apps, marketing sites, settings pages
 * Best Practice: Use when you need maximum content width
 */
export function ConsumerApp() {
  const navigation = (
    <nav className="flex items-center gap-6 p-4">
      <a href="/" className="na-h5">Logo</a>
      <a href="/products" className="na-text-sm">Products</a>
      <a href="/about" className="na-text-sm">About</a>
      <a href="/contact" className="na-text-sm">Contact</a>
    </nav>
  );

  return (
    <StackedShell
      navigation={navigation}
      maxWidth="max-w-7xl"
    >
      <div className="p-6">
        <h1 className="na-h1 mb-6">Welcome to Our App</h1>
        <div className="na-grid gap-6">
          <div className="na-card p-6">
            <h2 className="na-h3 mb-4">Feature 1</h2>
            <p className="na-text-md">Description of feature 1</p>
          </div>
          <div className="na-card p-6">
            <h2 className="na-h3 mb-4">Feature 2</h2>
            <p className="na-text-md">Description of feature 2</p>
          </div>
        </div>
      </div>
    </StackedShell>
  );
}

// ============================================================================
// 4. FOCUSSHELL - Login/Checkout Example
// ============================================================================

/**
 * Example: Login Page with FocusShell
 * 
 * Use Case: Login, signup, checkout, onboarding
 * Best Practice: Use for focused, single-purpose pages
 */
export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <FocusShell
      centered={true}
      maxWidth="max-w-md"
    >
      <div className="na-card p-8 w-full">
        <h1 className="na-h2 mb-2 text-center">Welcome Back</h1>
        <p className="na-metadata text-center mb-6">Sign in to your account</p>
        
        <form className="space-y-4">
          <div>
            <label className="na-metadata block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="na-input w-full"
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="na-metadata block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="na-input w-full"
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="na-btn na-btn-primary w-full">
            Sign In
          </button>
        </form>
      </div>
    </FocusShell>
  );
}

// ============================================================================
// 5. MASTERDETAILSHELL - Email/Chat Example
// ============================================================================

/**
 * Example: Email Client with Master-Detail
 * 
 * Use Case: Email, chat, list-detail interfaces
 * Best Practice: Use for split-view interfaces
 */
export function EmailClient() {
  const [selectedEmail, setSelectedEmail] = React.useState<string | null>(null);
  const emails = [
    { id: '1', subject: 'Welcome', from: 'team@example.com', preview: 'Thank you for joining...' },
    { id: '2', subject: 'Update', from: 'support@example.com', preview: 'We have an update...' },
  ];

  const master = (
    <div className="h-full overflow-y-auto">
      {emails.map((email) => (
        <button
          key={email.id}
          onClick={() => setSelectedEmail(email.id)}
          className={`w-full text-left p-4 border-b border-stroke hover:bg-paper-2 ${
            selectedEmail === email.id ? 'bg-paper-2 border-l-2 border-primary' : ''
          }`}
        >
          <div className="na-h6">{email.subject}</div>
          <div className="na-metadata-small">{email.from}</div>
          <div className="na-text-sm text-clay mt-1">{email.preview}</div>
        </button>
      ))}
    </div>
  );

  const detail = selectedEmail ? (
    <div className="p-6">
      <h1 className="na-h2 mb-4">{emails.find(e => e.id === selectedEmail)?.subject}</h1>
          <p className="na-text-md">Email content here...</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-clay">
          Select an email to view
        </div>
      );

  return (
    <MasterDetailShell
      master={master}
      detail={detail}
      masterWidth="320px"
      showDetail={true}
    />
  );
}

// ============================================================================
// 6. MOBILESHELL - PWA Example
// ============================================================================

/**
 * Example: Mobile PWA with MobileShell
 * 
 * Use Case: PWAs, mobile apps, mobile-first interfaces
 * Best Practice: Use for mobile-optimized layouts
 */
export function MobilePWA() {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <MobileShell
      header={<h1 className="na-h4">My App</h1>}
      tabs={tabs.map(tab => ({
        ...tab,
        active: activeTab === tab.id,
        onClick: () => setActiveTab(tab.id),
      }))}
    >
      <div className="p-4">
        {activeTab === 'home' && <HomeContent />}
        {activeTab === 'search' && <SearchContent />}
        {activeTab === 'profile' && <ProfileContent />}
      </div>
    </MobileShell>
  );
}

// ============================================================================
// 7. WORKFLOWSHELL - Multi-Step Wizard Example
// ============================================================================

/**
 * Example: Onboarding Wizard with WorkflowShell
 * 
 * Use Case: Multi-step processes, wizards, onboarding
 * Best Practice: Use for guided workflows
 */
export function OnboardingWizard() {
  const stages = [
    {
      id: 'welcome',
      label: 'Welcome',
      component: <WelcomeStep />,
    },
    {
      id: 'profile',
      label: 'Profile',
      component: <ProfileStep />,
      validation: () => {
        // Validate profile data
        return true;
      },
    },
    {
      id: 'preferences',
      label: 'Preferences',
      component: <PreferencesStep />,
      optional: true,
    },
    {
      id: 'complete',
      label: 'Complete',
      component: <CompleteStep />,
    },
  ];

  return (
    <WorkflowShell
      stages={stages}
      onComplete={() => {
        console.log('Onboarding complete!');
        window.location.href = '/dashboard';
      }}
      showProgress={true}
    />
  );
}

// ============================================================================
// 8. COMMANDCENTERSHELL - Executive Dashboard Example
// ============================================================================

/**
 * Example: Executive Dashboard with CommandCenterShell
 * 
 * Use Case: Executive dashboards, operations centers, monitoring
 * Best Practice: Use for real-time data visualization
 */
export function ExecutiveDashboard() {
  const tickerItems = [
    { id: '1', label: 'Revenue', value: '$1.2M', trend: 'up' },
    { id: '2', label: 'Users', value: '12.5K', trend: 'up' },
    { id: '3', label: 'Orders', value: '342', trend: 'stable' },
  ];

  const kpis = [
    { id: '1', title: 'Total Revenue', value: '$1.2M', change: '+12%' },
    { id: '2', title: 'Active Users', value: '12.5K', change: '+5%' },
    { id: '3', title: 'Conversion Rate', value: '3.2%', change: '+0.5%' },
  ];

  const panels = [
    {
      id: 'revenue',
      title: 'Revenue Chart',
      component: <RevenueChart />,
      span: 2,
    },
    {
      id: 'users',
      title: 'User Growth',
      component: <UserGrowthChart />,
      span: 1,
    },
  ];

  return (
    <CommandCenterShell
      ticker={tickerItems}
      kpis={kpis}
      panels={panels}
      showCommandPalette={true}
    />
  );
}

// ============================================================================
// 9. WORKSPACESHELL - IDE/Editor Example
// ============================================================================

/**
 * Example: Code Editor with WorkspaceShell
 * 
 * Use Case: IDEs, code editors, multi-tab interfaces
 * Best Practice: Use for complex, multi-file interfaces
 */
export function CodeEditor() {
  const [tabs, setTabs] = React.useState([
    { id: '1', label: 'index.tsx', component: <CodeEditorContent />, closable: true },
    { id: '2', label: 'App.tsx', component: <CodeEditorContent />, closable: true },
  ]);
  const [activeTab, setActiveTab] = React.useState('1');

  const leftPanel = {
    id: 'files',
    title: 'Files',
    component: <FileTree />,
    width: '250px',
  };

  const rightPanel = {
    id: 'inspector',
    title: 'Inspector',
    component: <InspectorPanel />,
    width: '300px',
  };

  return (
    <WorkspaceShell
      tabs={tabs}
      activeTab={activeTab}
      onTabClick={setActiveTab}
      onTabClose={(id) => {
        setTabs(tabs.filter(t => t.id !== id));
      }}
      leftPanel={leftPanel}
      rightPanel={rightPanel}
    />
  );
}

// ============================================================================
// 10. SPLITBUSINESSSHELL - Business App Example
// ============================================================================

/**
 * Example: Business Application with SplitBusinessShell
 * 
 * Use Case: Business apps, CRUD interfaces, data management
 * Best Practice: Use for complex business applications
 */
export function BusinessApp() {
  const breadcrumbs = [
    { label: 'Home', onClick: () => {} },
    { label: 'Products', onClick: () => {} },
    { label: 'Edit Product', onClick: () => {} },
  ];

  const toolbarActions = [
    { id: 'save', label: 'Save', onClick: () => {}, variant: 'primary' },
    { id: 'cancel', label: 'Cancel', onClick: () => {}, variant: 'secondary' },
  ];

  return (
    <SplitBusinessShell
      breadcrumbs={breadcrumbs}
      toolbar={toolbarActions}
      sidebar={<ProductList />}
      main={<ProductEditor />}
      inspector={<ProductInspector />}
    />
  );
}

// ============================================================================
// 11. CONTEXTUALSHELL - Adaptive Layout Example
// ============================================================================

/**
 * Example: Adaptive App with ContextualShell
 * 
 * Use Case: Context-aware apps, adaptive interfaces
 * Best Practice: Use when layout needs to change based on context
 */
export function AdaptiveApp() {
  const contexts = [
    {
      id: 'browsing',
      label: 'Browsing',
      component: <BrowsingView />,
      layout: 'stacked',
    },
    {
      id: 'editing',
      label: 'Editing',
      component: <EditingView />,
      layout: 'sidebar',
    },
    {
      id: 'reviewing',
      label: 'Reviewing',
      component: <ReviewingView />,
      layout: 'split',
    },
  ];

  return (
    <ContextualShell
      contexts={contexts}
      initialContext="browsing"
      showBreadcrumbs={true}
    />
  );
}

// ============================================================================
// 12. CONFIRMSHELL - Destructive Action Example
// ============================================================================

/**
 * Example: Delete Confirmation with ConfirmShell
 * 
 * Use Case: Destructive actions, confirmations
 * Best Practice: Use for irreversible actions
 */
export function DeleteConfirmation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="na-btn">
        Delete Item
      </button>
      
      <ConfirmShell
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Item deleted');
          setIsOpen(false);
        }}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

// ============================================================================
// 13. FORMMODALSHELL - Quick Form Example
// ============================================================================

/**
 * Example: Quick Form with FormModalShell
 * 
 * Use Case: Short forms, quick inputs
 * Best Practice: Use for focused form interactions
 */
export function QuickForm() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = () => {
    if (!name.trim()) {
      setErrors({ name: 'Name is required' });
      return;
    }
    console.log('Form submitted:', name);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="na-btn na-btn-primary">
        Create Item
      </button>
      
      <FormModalShell
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        title="Create New Item"
        description="Enter the details for your new item"
        errors={errors}
      >
        <div className="space-y-4">
          <div>
            <label className="na-metadata block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="na-input w-full"
              placeholder="Item name"
            />
          </div>
        </div>
      </FormModalShell>
    </>
  );
}

// ============================================================================
// 14. FULLSCREENMODALSHELL - Wizard Example
// ============================================================================

/**
 * Example: Setup Wizard with FullscreenModalShell
 * 
 * Use Case: Wizards, complex editors, onboarding
 * Best Practice: Use for multi-step processes that need full screen
 */
export function SetupWizard() {
  const [isOpen, setIsOpen] = React.useState(false);

  const stages = [
    {
      id: 'welcome',
      label: 'Welcome',
      component: <WelcomeStep />,
    },
    {
      id: 'configuration',
      label: 'Configuration',
      component: <ConfigurationStep />,
      validation: async () => {
        // Validate configuration
        return true;
      },
    },
    {
      id: 'review',
      label: 'Review',
      component: <ReviewStep />,
    },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="na-btn na-btn-primary">
        Start Setup
      </button>
      
      <FullscreenModalShell
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onComplete={() => {
          console.log('Setup complete!');
          setIsOpen(false);
        }}
        title="Application Setup"
        description="Complete the setup to get started"
        stages={stages}
        showProgress={true}
        showCloseConfirmation={true}
      />
    </>
  );
}

// ============================================================================
// 15. EXCEPTIONSHELL - Error Page Example
// ============================================================================

/**
 * Example: Error Page with ExceptionShell
 * 
 * Use Case: Error pages, 404, 500, permission errors
 * Best Practice: Use for all error scenarios
 */
export function ErrorPage() {
  return (
    <ExceptionShell
      code={404}
      title="Page Not Found"
      message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      actions={[
        {
          id: 'go-back',
          label: 'Go Back',
          onClick: () => window.history.back(),
          variant: 'secondary',
        },
        {
          id: 'go-home',
          label: 'Go Home',
          onClick: () => window.location.href = '/',
          variant: 'primary',
        },
      ]}
      showDebug={process.env.NODE_ENV === 'development'}
      debugInfo={{
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      }}
    />
  );
}

// ============================================================================
// Helper Components (Placeholders)
// ============================================================================

function YourMainApp() {
  return <div>Your App Content</div>;
}

function DashboardContent() {
  return <div>Dashboard Content</div>;
}

function UsersContent() {
  return <div>Users Content</div>;
}

function SettingsContent() {
  return <div>Settings Content</div>;
}

function HomeContent() {
  return <div>Home Content</div>;
}

function SearchContent() {
  return <div>Search Content</div>;
}

function ProfileContent() {
  return <div>Profile Content</div>;
}

function WelcomeStep() {
  return <div>Welcome Step</div>;
}

function ProfileStep() {
  return <div>Profile Step</div>;
}

function PreferencesStep() {
  return <div>Preferences Step</div>;
}

function CompleteStep() {
  return <div>Complete Step</div>;
}

function RevenueChart() {
  return <div>Revenue Chart</div>;
}

function UserGrowthChart() {
  return <div>User Growth Chart</div>;
}

function CodeEditorContent() {
  return <div>Code Editor</div>;
}

function FileTree() {
  return <div>File Tree</div>;
}

function InspectorPanel() {
  return <div>Inspector</div>;
}

function ProductList() {
  return <div>Product List</div>;
}

function ProductEditor() {
  return <div>Product Editor</div>;
}

function ProductInspector() {
  return <div>Product Inspector</div>;
}

function BrowsingView() {
  return <div>Browsing View</div>;
}

function EditingView() {
  return <div>Editing View</div>;
}

function ReviewingView() {
  return <div>Reviewing View</div>;
}

function ConfigurationStep() {
  return <div>Configuration Step</div>;
}

function ReviewStep() {
  return <div>Review Step</div>;
}


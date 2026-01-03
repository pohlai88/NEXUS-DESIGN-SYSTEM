/**
 * Theme Engine Demo
 * 
 * Demonstrates the light theme with AIBOS Design System
 */

'use client';

import { ThemeProvider, useThemeSwitch, useCurrentTheme, lightTheme } from '@aibos/design-system/themes';
import '@aibos/design-system/css';

function ThemeDemoContent() {
  const { switchToCustom, switchToDefault } = useThemeSwitch();
  const { isDefault, theme, availableThemes } = useCurrentTheme();

  return (
    <div className="na-content">
      <div className="na-card na-p-8">
        <h1 className="na-h1">AIBOS Theme Engine Demo</h1>
        <p className="na-metadata na-mt-2">Testing Light Theme Integration</p>

        <div className="na-panel na-mt-6 na-p-6">
          <h2 className="na-h3">Current Theme</h2>
          <div className="na-data-large na-mt-4">
            {isDefault ? 'Default (Dark)' : theme?.name || 'Unknown'}
          </div>
          <div className="na-metadata na-mt-2">
            Available themes: {availableThemes.join(', ')}
          </div>
        </div>

        <div className="na-panel na-mt-6 na-p-6">
          <h2 className="na-h3">Theme Controls</h2>
          <div className="na-flex na-gap-4 na-mt-4">
            <button
              className="na-btn na-btn-primary"
              onClick={() => switchToDefault()}
              disabled={isDefault}
            >
              Switch to Default
            </button>
            <button
              className="na-btn na-btn-primary"
              onClick={() => switchToCustom('light')}
              disabled={!isDefault}
            >
              Switch to Light
            </button>
          </div>
        </div>

        <div className="na-panel na-mt-6 na-p-6">
          <h2 className="na-h3">Themed Components</h2>
          
          <div className="na-mt-4">
            <h3 className="na-h4">Tailwind v4 Utilities</h3>
            <div className="bg-paper text-lux p-6 rounded-card border border-stroke na-mt-4">
              <p>This card uses <code className="na-data">bg-paper</code> and <code className="na-data">text-lux</code> utilities</p>
              <p className="text-lux-dim na-mt-2">These respond to theme changes automatically</p>
            </div>
          </div>

          <div className="na-mt-6">
            <h3 className="na-h4">Buttons</h3>
            <div className="na-flex na-gap-4 na-mt-4">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                Themed Primary
              </button>
              <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold">
                Themed Secondary
              </button>
            </div>
          </div>

          <div className="na-mt-6">
            <h3 className="na-h4">Status Colors</h3>
            <div className="na-grid na-grid-4 na-mt-4">
              <div className="bg-success text-white p-4 rounded-lg text-center">
                Success
              </div>
              <div className="bg-warning text-white p-4 rounded-lg text-center">
                Warning
              </div>
              <div className="bg-error text-white p-4 rounded-lg text-center">
                Error
              </div>
              <div className="bg-info text-white p-4 rounded-lg text-center">
                Info
              </div>
            </div>
          </div>

          <div className="na-mt-6">
            <h3 className="na-h4">Data Display</h3>
            <div className="na-mt-4">
              <div className="na-data-large">$12,450.00</div>
              <div className="na-metadata na-mt-2">Revenue • Q4 2025</div>
            </div>
          </div>
        </div>

        <div className="na-panel na-mt-6 na-p-6">
          <h2 className="na-h3">CSS Variable Inspection</h2>
          <div className="na-mt-4">
            <p className="na-metadata">Check DevTools to see applied CSS variables:</p>
            <ul className="na-mt-2 na-list-disc na-list-inside na-data">
              <li><code>--color-void</code>: Background</li>
              <li><code>--color-paper</code>: Cards</li>
              <li><code>--color-lux</code>: Text</li>
              <li><code>--color-primary</code>: Primary actions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemeDemo() {
  return (
    <ThemeProvider
      initialTheme="default"
      customThemes={[lightTheme]}
      persistToCookie={true}
    >
      <ThemeDemoContent />
    </ThemeProvider>
  );
}


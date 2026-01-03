/**
 * Next.js SSR Utilities
 * 
 * Utilities for server-side theme support in Next.js App Router
 */

/**
 * Type for Next.js cookies store
 * Compatible with Next.js 13+ App Router cookies() function
 */
type NextCookies = {
  get: (name: string) => { value: string } | undefined;
} | null;

/**
 * Get theme from cookies (server-side)
 * 
 * Usage in Server Components:
 * ```tsx
 * import { cookies } from 'next/headers';
 * const theme = await getServerTheme(cookies());
 * ```
 */
export async function getServerTheme(
  cookieStore: NextCookies
): Promise<string> {
  try {
    if (!cookieStore) {
      return 'default';
    }
    const themeCookie = cookieStore.get('theme');
    return themeCookie?.value || 'default';
  } catch (error) {
    // Fallback if cookies() fails (e.g., in middleware)
    return 'default';
  }
}

/**
 * Get theme from cookies (client-side)
 * 
 * Usage in Client Components:
 * ```tsx
 * const theme = getClientTheme();
 * ```
 */
export function getClientTheme(): string {
  if (typeof document === 'undefined') {
    return 'default';
  }

  // Read from cookie
  const cookies = document.cookie.split(';');
  const themeCookie = cookies.find(c => c.trim().startsWith('theme='));

  if (themeCookie) {
    return themeCookie.split('=')[1]?.trim() || 'default';
  }

  return 'default';
}

/**
 * Set theme cookie (client-side)
 * 
 * Usage:
 * ```tsx
 * setClientTheme('dark');
 * ```
 */
export function setClientTheme(themeName: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  // Set cookie with 1 year expiration
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `theme=${themeName}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

/**
 * Get theme from headers (for middleware)
 * 
 * Usage in middleware:
 * ```tsx
 * export function middleware(request: NextRequest) {
 *   const theme = getThemeFromHeaders(request.headers);
 *   // ... 
 * }
 * ```
 */
export function getThemeFromHeaders(
  headers: Headers | { get: (key: string) => string | null } | Record<string, string>
): string {
  let cookieHeader: string | null = null;

  if (headers instanceof Headers) {
    cookieHeader = headers.get('cookie');
  } else if (typeof headers.get === 'function') {
    cookieHeader = headers.get('cookie');
  } else if ('cookie' in headers) {
    cookieHeader = String(headers.cookie);
  }

  if (!cookieHeader) {
    return 'default';
  }

  const cookies = cookieHeader.split(';');
  const themeCookie = cookies.find((c: string) => c.trim().startsWith('theme='));

  if (themeCookie) {
    return themeCookie.split('=')[1]?.trim() || 'default';
  }

  return 'default';
}

/**
 * Apply theme to HTML element (server-side)
 * 
 * Used in root layout to set initial theme attribute
 * 
 * Usage:
 * ```tsx
 * export default function RootLayout({ children }) {
 *   const theme = await getServerTheme(cookies());
 *   return (
 *     <html data-theme={theme === 'default' ? undefined : theme}>
 *       {children}
 *     </html>
 *   );
 * }
 * ```
 */
export function getThemeAttribute(theme: string): string | undefined {
  return theme === 'default' ? undefined : theme;
}


'use client'

import { SidebarProvider } from '@/components/Layouts/sidebar/sidebar-context'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  // keep a stable instance of QueryClient across renders
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>{children}</SidebarProvider>
        {/* Devtools are optional */}
        
      </QueryClientProvider>
    </ThemeProvider>
  )
}

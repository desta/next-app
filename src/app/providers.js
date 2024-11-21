// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
export function Providers({children}) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="indigo" themes={["grey", "red", "blue", "pink", "purple", "deep_purple", "indigo", "green", "orange"]}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
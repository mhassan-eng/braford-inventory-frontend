import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

import ReduxProvider from "@/store/ReduxProvider";
import { Metadata } from "next";

const manrope = Manrope({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata : Metadata = {
  title: "Braford Inventory Management System"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", manrope.variable)}
    >
      <body>
        <ReduxProvider >
        <ThemeProvider>{children}</ThemeProvider>

        </ReduxProvider>
      </body>
    </html>
  )
}

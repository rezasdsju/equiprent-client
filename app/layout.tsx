import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/toast"

import "./globals.css"

import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/navbar/Navbar";
import ThemeProvider from "@/components/provider/ThemeProvider";
import Footer from "@/components/shared/Footer"


const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider
          attribute={`class`}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

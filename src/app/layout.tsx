import { Sidebar, WeekResetModalContainer } from "@/components/server"
import type { Metadata } from "next"
import { PropsWithChildren } from "react"

import "@/styles/globals.css"
import { NewFieldModal } from "@/components/client"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-grow pl-10">{children}</main>
        <WeekResetModalContainer />
      </body>
    </html>
  )
}

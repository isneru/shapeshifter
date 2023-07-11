import { useState } from "react"
import { Layout, WeeklyResetModal } from "~/components"

export default function Home() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Layout title="Home" description="hello">
      <main className="flex min-h-screen flex-col items-center justify-center">
        <WeeklyResetModal isOpen={isOpen} setIsOpenChange={setIsOpen} />
      </main>
    </Layout>
  )
}

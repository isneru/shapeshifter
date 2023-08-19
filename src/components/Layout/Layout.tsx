import { DoorOpenIcon, Fingerprint } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Head from "next/head"
import { ModalProvider } from "~/utils/providers"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Shape Shifter</title>
        <meta
          name="description"
          content="Your intuitive tool to manage a weekly routine."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalProvider>
        <button
          className="fixed bottom-4 right-4 rounded-lg border-[0.5px] border-white/10 bg-neutral-800 p-2 transition-colors hover:bg-neutral-700"
          onClick={() => (session ? signOut() : signIn("google"))}>
          {session ? <DoorOpenIcon /> : <Fingerprint />}
        </button>
        {/* {isLoading && (
          <div className="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-neutral-900 text-violet-600">
            <svg
              width={80}
              height={80}
              stroke="currentColor"
              viewBox="0 0 24 24">
              <g className="spinner origin-center">
                <circle cx={12} cy={12} r="9.5" fill="none" strokeWidth={2} />
              </g>
            </svg>
          </div>
        )} */}
        {children}
      </ModalProvider>
    </>
  )
}

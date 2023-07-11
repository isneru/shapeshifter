import Head from "next/head"
import { ModalProvider } from "~/utils/providers"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
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
      <ModalProvider>{children}</ModalProvider>
    </>
  )
}

import Head from "next/head"

interface LayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

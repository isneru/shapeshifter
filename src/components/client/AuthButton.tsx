import { signIn, signOut } from "next-auth/react"

type ButtonProps = {
  isAuthed?: boolean
  children: React.ReactNode
}

export const AuthButton = ({ isAuthed = false, children }: ButtonProps) => {
  return (
    <button onClick={() => (isAuthed ? signOut() : signIn("google"))}>
      {children}
    </button>
  )
}

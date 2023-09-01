import { signIn, signOut } from "next-auth/react"

type ButtonProps = {
  isAuthed?: boolean
} & Omit<React.ComponentProps<"button">, "onClick">

export const AuthButton = ({ isAuthed = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={() => (isAuthed ? signOut() : signIn("google"))}
    />
  )
}

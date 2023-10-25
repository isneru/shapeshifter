import { TooltipPopover } from "@/components/client"
import { signIn, signOut } from "next-auth/react"

type ButtonProps = {
  isAuthed?: boolean
  hasPopover?: boolean
} & Omit<React.ComponentProps<"button">, "onClick">

export const AuthButton = ({
  hasPopover = false,
  isAuthed = false,
  ...props
}: ButtonProps) => {
  function handleOnClick() {
    isAuthed ? signOut() : signIn("google")
  }

  return hasPopover ? (
    <TooltipPopover label={isAuthed ? "Sign Out" : "Sign In"}>
      <button {...props} onClick={handleOnClick} />
    </TooltipPopover>
  ) : (
    <button {...props} onClick={handleOnClick} />
  )
}

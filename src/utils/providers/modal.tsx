import { useSession } from "next-auth/react"
import { ReactNode, createContext, useContext, useState } from "react"
import { WeeklyResetModal } from "~/components"
import { api } from "~/utils/api"

interface ModalContextData {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalContext = createContext({} as ModalContextData)

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const { data: session } = useSession()

  const { data: isWeekResetEligible } =
    api.weeks.getWeekResetEligibility.useQuery(undefined, {
      enabled: !!session?.user.id
    })

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {session && isWeekResetEligible && (
        <WeeklyResetModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)

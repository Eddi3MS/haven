import SettingsForm from "@/components/settings-form"
import { currentUser } from "@/lib/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Configurações - Haven SA",
  description:
    "Mantenha seus dados atualizados, para não perder nenhum contato.",
}

const SettingsPage = async () => {
  const user = await currentUser()

  return (
    <SettingsForm
      name={user?.name}
      email={user?.email}
      isOAuth={user?.isOAuth}
      isTwoFactorEnabled={user?.isTwoFactorEnabled}
      phone={user?.phone}
    />
  )
}

export default SettingsPage

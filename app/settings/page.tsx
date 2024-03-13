import SettingsForm from "@/components/settings-form"
import { currentUser } from "@/lib/auth"

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

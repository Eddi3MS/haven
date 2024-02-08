import { currentUser } from '@/lib/auth'
import SettingsForm from '../_components/settings-form'

const SettingsPage = async () => {
  const user = await currentUser()

  return (
    <SettingsForm
      name={user?.name}
      email={user?.email}
      isOAuth={user?.isOAuth}
      isTwoFactorEnabled={user?.isTwoFactorEnabled}
      role={user?.role}
    />
  )
}

export default SettingsPage


import { Text } from '@react-email/components'
import EmailBase from './email-base'

type TokenProps = {
  token: string
}

const Token = ({ token }: TokenProps) => {
  return (
    <EmailBase heading="2FA Token!">
      <Text className="text-center">Seu token de acesso é:</Text>
      <Text className="text-center bg-slate-200 text-lg px-4 py-2 font-bold tracking-wide">
        {token}
      </Text>
    </EmailBase>
  )
}

export default Token

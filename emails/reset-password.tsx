import { Button, Text } from '@react-email/components'
import EmailBase from './email-base'

type ResetPasswordProps = {
  resetLink: string
}

const ResetPassword = ({ resetLink }: ResetPasswordProps) => {
  return (
    <EmailBase heading="Mude sua senha!">
      <Text className="text-center">
        Clique <Button href={resetLink}>aqui</Button> para cadastrar uma nova
        senha.
      </Text>
    </EmailBase>
  )
}

export default ResetPassword

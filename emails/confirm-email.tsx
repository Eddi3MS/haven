import { Button, Text } from '@react-email/components'
import EmailBase from './email-base'

type ConfirmEmailProps = {
  confirmLink: string
}

const ConfirmEmail = ({ confirmLink }: ConfirmEmailProps) => {
  return (
    <EmailBase heading="Confirme seu e-mail!">
      <Text className="text-center">
        Clique <Button href={confirmLink}>aqui</Button> para finalizar seu
        cadastro.
      </Text>
    </EmailBase>
  )
}

export default ConfirmEmail

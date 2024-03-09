import { Button, Text } from "@react-email/components"
import EmailBase from "./email-base"

type HavenApprovedProps = {
  viewLink: string
}

const havenApproved = ({ viewLink }: HavenApprovedProps) => {
  return (
    <EmailBase heading="Aprovado!">
      <Text>Seu imóvel foi aprovado e será incluso em nossas listagens.</Text>
      <Text className="text-center">
        Clique <Button href={viewLink}>aqui</Button> para visualizar seu imóvel.
      </Text>
    </EmailBase>
  )
}

export default havenApproved

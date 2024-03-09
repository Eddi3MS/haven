import { Text } from "@react-email/components"
import EmailBase from "./email-base"

type HavenRejectedProps = {
  rejectReason: string
}

const havenRejected = ({ rejectReason }: HavenRejectedProps) => {
  return (
    <EmailBase heading="Reprovado!">
      <Text>
        Lamentamos, mas seu imóvel não foi aprovado na filtragem e não será
        incluído em nossas listagens.
      </Text>
      <Text className="text-center">Razão: {rejectReason}</Text>
    </EmailBase>
  )
}

export default havenRejected

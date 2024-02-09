import {
  Body,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { ReactNode } from 'react'

type EmailBaseProps = {
  children: ReactNode
  heading: string
}

const EmailBase = ({ children, heading }: EmailBaseProps) => {
  return (
    <Html lang="pt-BR">
      <Tailwind>
        <Body>
          <Container>
            <Section className="text-black">
              <Link href={process.env.NEXT_PUBLIC_APP_URL} target="_blank">
                <Img
                  src={process.env.NEXT_PUBLIC_LOGO}
                  width="180"
                  alt="Haven Imóveis"
                  className="mx-auto mb-10"
                />
              </Link>
              <Heading className="text-center">{heading}</Heading>
              {children}
            </Section>
          </Container>
          <Hr />
          <Text>
            Se você não solicitou este e-mail, pode simplesmente ignora-lo.
          </Text>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailBase

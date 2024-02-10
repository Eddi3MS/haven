import { AuthCard } from '@/components/auth/AuthCard'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const ErrorCard = () => {
  return (
    <AuthCard
      headerLabel="Oops! Algo deu errado!"
      backButtonHref="/auth/login"
      backButtonLabel="Voltar para login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </AuthCard>
  )
}

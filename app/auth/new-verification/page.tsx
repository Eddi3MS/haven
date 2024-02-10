import { newVerification } from '@/actions/new-verification'
import { AuthCard } from '@/components/auth/AuthCard'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { redirect } from 'next/navigation'

const textVariations = {
  success: {
    title: 'Confirmação bem sucedida!',
    label: 'Voltar para Login',
    href: '/auth/login',
  },
  error: {
    title: 'Confirmação falhou!',
    label: 'Voltar para registro',
    href: '/auth/register',
  },
}

const NewVerificationPage = async ({
  searchParams,
}: {
  searchParams: { token?: string }
}) => {
  const { token } = searchParams

  if (!token) {
    redirect('/auth/register')
  }

  const verification = await newVerification(token)

  const textVariation =
    'success' in verification ? textVariations.success : textVariations.error

  return (
    <AuthCard
      headerLabel={textVariation.title}
      backButtonLabel={textVariation.label}
      backButtonHref={textVariation.href}
    >
      <div className="flex items-center w-full justify-center">
        {'success' in verification && (
          <FormSuccess message={verification.success} />
        )}

        {'error' in verification && <FormError message={verification.error} />}
      </div>
    </AuthCard>
  )
}

export default NewVerificationPage

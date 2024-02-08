import { emailChange } from '@/actions/new-email'
import { update } from '@/auth'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { redirect } from 'next/navigation'
import UpdateSession from '../_components/update-session'

const textVariations = {
  success: {
    title: 'Confirmation Succeeded!',
    label: 'Back to Settings',
    href: '/settings',
  },
  error: {
    title: 'Confirmation Failed!',
    label: 'Back to Settings',
    href: '/settings',
  },
}

const ChangeEmailVerification = async ({
  searchParams,
}: {
  searchParams: { token?: string }
}) => {
  const { token } = searchParams

  if (!token) {
    redirect('/auth/register')
  }

  const verification = await emailChange(token)

  const textVariation =
    'success' in verification ? textVariations.success : textVariations.error

  return (
    <CardWrapper
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
      <UpdateSession shouldUpdate={'success' in verification} />
    </CardWrapper>
  )
}

export default ChangeEmailVerification


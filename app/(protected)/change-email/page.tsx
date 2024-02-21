import { emailChange } from "@/actions/auth/new-email"
import { AuthCard } from "@/components/auth/AuthCard"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { UpdateSession } from "@/components/update-session"
import { redirect } from "next/navigation"

const textVariations = {
  success: {
    title: "Confirmação bem sucedida!",
    label: "Voltar para configurações",
    href: "/settings",
  },
  error: {
    title: "Confirmação falhou!",
    label: "Voltar para configurações",
    href: "/settings",
  },
}

const ChangeEmailVerification = async ({
  searchParams,
}: {
  searchParams: { token?: string }
}) => {
  const { token } = searchParams

  if (!token) {
    redirect("/auth/register")
  }

  const verification = await emailChange(token)

  const textVariation =
    "success" in verification ? textVariations.success : textVariations.error

  return (
    <AuthCard
      headerLabel={textVariation.title}
      backButtonLabel={textVariation.label}
      backButtonHref={textVariation.href}
    >
      <div className="flex items-center w-full justify-center">
        {"success" in verification && (
          <FormSuccess message={verification.success} />
        )}

        {"error" in verification && <FormError message={verification.error} />}
      </div>
      <UpdateSession shouldUpdate={"success" in verification} />
    </AuthCard>
  )
}

export default ChangeEmailVerification

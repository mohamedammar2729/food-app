import { authOptions } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Locale } from "@/i18n-config";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import getTranslation from "@/lib/translation";
import EditUserForm from "@/components/edit-user-form";

async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {

  // we can implement this protecting logic in the middleware
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  const translations = await getTranslation(locale);

    if (!session) {
      redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }

  if (session && session.user.role === UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.ADMIN}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            {translations.profile.title}
          </h1>
          <EditUserForm user={session?.user} translations={translations} />
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;

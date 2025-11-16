import Image from "next/image";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { PageHeader } from "@/components/PageHeader";
import { Markdown } from "@/components/Markdown";
import { getPageBySlug, getSupplementaryPageContent } from "@/lib/content";

interface ProfileEntry {
  align?: string;
  image?: string;
  html?: string;
  image_circular?: boolean;
  more_info?: string;
}

export default async function ProfilesPage() {
  const page = await getPageBySlug("profiles");
  if (!page) {
    notFound();
  }

  const profilesField = (page.data as Record<string, unknown>).profiles;
  const profilesConfig = Array.isArray(profilesField) ? profilesField : [];

  const profiles: ProfileEntry[] = await Promise.all(
    profilesConfig.map(async (profile) => {
      if (typeof profile !== "object" || !profile) {
        return {};
      }
      const record = profile as Record<string, unknown>;
      const html =
        typeof record.content === "string"
          ? await getSupplementaryPageContent(record.content)
          : null;
      return {
        align: typeof record.align === "string" ? record.align : undefined,
        image: typeof record.image === "string" ? record.image : undefined,
        html: html ?? undefined,
        image_circular: Boolean(record.image_circular),
        more_info: typeof record.more_info === "string" ? record.more_info : undefined,
      };
    }),
  );

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader title={page.data.title ?? "Profiles"} description={page.data.description} />

      <div className="space-y-10">
        {profiles.map((profile, index) => (
          <section
            key={`profile-${index}`}
            className={clsx(
              "flex flex-col gap-6 md:items-start",
              profile.align === "right" ? "md:flex-row-reverse" : "md:flex-row",
            )}
          >
            {profile.image ? (
              <div className="md:w-1/3">
                <Image
                  src={normalizeAsset(profile.image)}
                  alt="Profile"
                  width={320}
                  height={320}
                  className={clsx(
                    "h-auto w-full object-cover",
                    profile.image_circular ? "rounded-full" : "rounded-2xl",
                  )}
                />
                {profile.more_info ? (
                  <div
                    className="mt-3 text-sm text-slate-600 dark:text-slate-400"
                    dangerouslySetInnerHTML={{ __html: profile.more_info }}
                  />
                ) : null}
              </div>
            ) : null}
            <div className="flex-1">
              {profile.html ? <Markdown html={profile.html} /> : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function normalizeAsset(value: string): string {
  if (value.startsWith("http")) return value;
  return value.startsWith("/") ? value : `/${value}`;
}

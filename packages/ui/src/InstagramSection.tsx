import { InstagramEmbed } from "./InstagramEmbed";

export interface InstagramSectionProps {
  /** Usuario de Instagram, sin @ (ej. "purcuatienda"). */
  user: string;
  /** Links de posts a mostrar (permalinks). Si está vacío, muestra un CTA. */
  postUrls?: string[];
  title?: string;
}

export function InstagramSection({
  user,
  postUrls = [],
  title = "Seguinos en Instagram",
}: InstagramSectionProps) {
  const profile = `https://www.instagram.com/${user}/`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <a
            href={profile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand hover:underline"
          >
            @{user}
          </a>
        </div>
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Seguir
        </a>
      </div>

      {postUrls.length > 0 ? (
        <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {postUrls.map((url) => (
            <InstagramEmbed key={url} url={url} />
          ))}
        </div>
      ) : (
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-black/10 py-16 text-center transition hover:border-brand"
        >
          <span className="text-5xl">📸</span>
          <span className="text-black/60">
            Mirá nuestras novedades en @{user}
          </span>
        </a>
      )}
    </section>
  );
}

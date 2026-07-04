"use client";
// Embebe un POST de Instagram (por su link/permalink) usando el mismo bloque
// que devuelve oEmbed + el script oficial embed.js, que lo convierte en el
// post con estilo. No requiere token.

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_ID = "instagram-embed-js";

export interface InstagramEmbedProps {
  /** Permalink del post, ej. https://www.instagram.com/p/XXXXXXXXX/ */
  url: string;
}

export function InstagramEmbed({ url }: InstagramEmbedProps) {
  // Permalink limpio (sin "?img_index=1" ni otros parámetros).
  const permalink = url.split("?")[0];

  useEffect(() => {
    // Cargar embed.js una sola vez; si ya está, reprocesar los bloques.
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      window.instgrm?.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, [permalink]);

  return (
    <blockquote
      className="instagram-media w-full"
      data-instgrm-permalink={permalink}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        borderRadius: 12,
        margin: 0,
        maxWidth: 360,
        width: "100%",
      }}
    >
      <a href={permalink} target="_blank" rel="noopener noreferrer">
        Ver esta publicación en Instagram
      </a>
    </blockquote>
  );
}

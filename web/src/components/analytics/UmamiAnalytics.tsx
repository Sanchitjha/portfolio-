import Script from 'next/script';

export default function UmamiAnalytics() {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID;

  // Analytics is optional — without the env vars we simply render no script.
  // This is an expected state, not an error, so it stays silent.
  if (!umamiSrc || !umamiId) {
    return null;
  }

  return (
    <Script
      id="umami-analytics"
      src={umamiSrc}
      data-website-id={umamiId}
      strategy="afterInteractive"
      async
    />
  );
}

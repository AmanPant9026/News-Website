import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags for SEO */}
        <meta name="description" content="A professional and responsive dashboard for users and admins." />
        <meta name="keywords" content="dashboard, admin, user, analytics, payout" />
        <meta name="author" content="Your Company Name" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        {/* Theme Color */}
        <meta name="theme-color" content="#ffffff" />

        {/* Open Graph Metadata for Social Media */}
        <meta property="og:title" content="Dashboard | My Company" />
        <meta property="og:description" content="A feature-rich dashboard for admins and users." />
        <meta property="og:image" content="/social-preview.png" />
        <meta property="og:url" content="https://your-website.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard | My Company" />
        <meta name="twitter:description" content="Manage analytics, payouts, and more in one place." />
        <meta name="twitter:image" content="/social-preview.png" />
      </Head>
      <body className="bg-gray-100 text-gray-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

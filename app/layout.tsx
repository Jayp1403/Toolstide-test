import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ToolsTide",
  description: "Daily updates on AI tools, apps & productivity workflows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
            <head>
        <Script
          id="adsense-init"
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7145500953992883"
        />
      </head>
      <body>
        {/* Premium header component */}
        <Header />

        {/* Main content */}
        <main className="wrapper mt-10">{children}</main>

        {/* Footer component */}
        <Footer />
      </body>
    </html>
  );
}

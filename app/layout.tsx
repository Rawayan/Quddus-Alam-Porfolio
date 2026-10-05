import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md. Quddus Alam — Photography Portfolio",
  description:
    "Photography portfolio of Md. Quddus Alam, freelance photojournalist from Gaibandha, Bangladesh."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <div className="site-background">
          <div className="background-blob" />
          {children}
        </div>
      </body>
    </html>
  );
}
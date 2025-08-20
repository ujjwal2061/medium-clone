import type { Metadata } from "next";
import { Geist, Geist_Mono ,Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

 

const inter =Inter({
  subsets:['latin']
})
export const metadata: Metadata = {
  title: "truly",
  description: "Share your blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono ,Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

 

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
        <ThemeProvider attribute="class"
        defaultTheme="system"
        enableColorScheme
        disableTransitionOnChange>
        {children}
        <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "~/styles/globals.css";

import { type Metadata } from "next";
import { k2d } from "~/components/fonts";
import { ThemeProvider } from "~/components/theme-provider";
import { ModeToggle } from "~/components/ui/mode-toggle";
import NoSsr from "~/components/no-ssr";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Nextjs Todo App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${k2d.className}`}>
      <body>
        <NoSsr>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header Section */}
            <div className="flex h-12 items-center justify-between border-b border-[#dbdbdb40] p-4 py-8">
              <h1 className="flex items-center text-3xl font-bold text-foreground">
                TODO
              </h1>
              <ModeToggle />
            </div>

            {children}
          </ThemeProvider>
        </NoSsr>
      </body>
    </html>
  );
}

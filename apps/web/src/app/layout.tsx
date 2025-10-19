import "@novakit/ui/style.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "NovaKit Dashboard",
    description: "Dashboard powered by @novakit/ui",
};

export default function RootLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>{children}</body>
        </html>
    );
}

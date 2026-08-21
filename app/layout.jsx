import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import AuthProvider from "@/components/AuthProvider";
import CartSync from "@/components/CartSync";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "LeafyLand — Plants, Properties & Landscaping Services",
    description: "LeafyLand is your marketplace for plants, garden products, farmhouses, land, and professional landscaping services.",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <AuthProvider>
                    <StoreProvider>
                        <Toaster />
                        <CartSync />
                        {children}
                    </StoreProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

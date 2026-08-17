'use client'
import Navbar from "@/components/Navbar";
import CategoriesStrip from "@/components/CategoriesStrip";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
    return (
        <>
            <Navbar />
            <CategoriesStrip />
            {children}
            <Footer />
        </>
    );
}

'use client'
import { Suspense } from 'react'
import Navbar from "@/components/Navbar";
import CategoriesStrip from "@/components/CategoriesStrip";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
    return (
        <>
            <Navbar />
            <Suspense fallback={null}>
                <CategoriesStrip />
            </Suspense>
            {children}
            <Footer />
        </>
    );
}

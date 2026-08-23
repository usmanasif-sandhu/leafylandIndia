import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "LeafyLand — Vendor Dashboard",
    description: "LeafyLand vendor dashboard for products, orders and payouts.",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}

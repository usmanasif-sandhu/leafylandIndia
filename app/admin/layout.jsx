import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "LeafyLand — Admin",
    description: "LeafyLand admin dashboard for stores, orders, payouts and users.",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}

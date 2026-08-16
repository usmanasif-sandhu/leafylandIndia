import logo from "./logo.png"
import upload_area from "./upload_area.svg"
import { ClockFadingIcon, HeadsetIcon, SendIcon } from "lucide-react";

export const assets = {
    logo,
    upload_area,
}

// Leafyland marketplace categories (replace/extend as vendor categories are finalized)
export const categories = [
    "Plants",
    "Seeds",
    "Fertilizers",
    "Gardening Tools",
    "Pots & Planters",
    "Irrigation",
    "Garden Furniture",
    "Landscaping Materials",
];

export const ourSpecsData = [
    { title: "Free Shipping", description: "Enjoy fast, free delivery on every order no conditions, just reliable doorstep.", icon: SendIcon, accent: '#05DF72' },
    { title: "7 Days easy Return", description: "Change your mind? No worries. Return any item within 7 days.", icon: ClockFadingIcon, accent: '#FF8904' },
    { title: "24/7 Customer Support", description: "We're here for you. Get expert help with our customer support.", icon: HeadsetIcon, accent: '#A684FF' }
]

// --- Placeholder exports ---
// These keep existing component imports from crashing until each page
// is wired to real API/database calls. Remove each one as its
// corresponding feature goes live.
export const productDummyData = [];
export const dummyRatingsData = [];
export const dummyStoreData = null;
export const storesDummyData = [];
export const orderDummyData = [];
export const dummyUserData = null;
export const couponDummyData = [];
export const addressDummyData = null;
export const dummyAdminDashboardData = {
    orders: 0,
    stores: 0,
    products: 0,
    revenue: "0.00",
    allOrders: [],
};
export const dummyStoreDashboardData = {
    ratings: [],
    totalOrders: 0,
    totalEarnings: 0,
    totalProducts: 0,
};
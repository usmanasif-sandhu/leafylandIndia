import logo from "./logo.png"
import upload_area from "./upload_area.svg"
import { ClockFadingIcon, HeadsetIcon, SendIcon, Leaf, TreePine, Shovel, Flower2, Fence, Droplets, Hammer, Mountain } from "lucide-react";

export const assets = {
    logo,
    upload_area,
}

export const categories = [
    "Indoor Plants",
    "Outdoor Plants",
    "Office Plants",
    "Table Plants",
    "Seeds",
    "Fertilizers",
    "Pots & Planters",
    "Garden Tools",
    "Irrigation",
    "Garden Furniture",
    "Turf & Grass",
    "Landscaping Materials",
];

export const pillarCategories = [
    { name: "Indoor Plants", icon: Leaf, color: "bg-emerald-100 text-emerald-700" },
    { name: "Outdoor Plants", icon: TreePine, color: "bg-green-100 text-green-700" },
    { name: "Seeds & Bulbs", icon: Flower2, color: "bg-lime-100 text-lime-700" },
    { name: "Pots & Planters", icon: Fence, color: "bg-amber-100 text-amber-700" },
    { name: "Garden Tools", icon: Shovel, color: "bg-orange-100 text-orange-700" },
    { name: "Irrigation", icon: Droplets, color: "bg-cyan-100 text-cyan-700" },
    { name: "Fertilizers", icon: Hammer, color: "bg-yellow-100 text-yellow-700" },
    { name: "Landscaping", icon: Mountain, color: "bg-stone-100 text-stone-700" },
];

export const ourSpecsData = [
    { title: "Free Delivery", description: "Fast, free delivery on every order — straight to your doorstep.", icon: SendIcon, accent: '#059669' },
    { title: "Expert Support", description: "Get expert gardening and landscaping advice from our team.", icon: HeadsetIcon, accent: '#047857' },
    { title: "Trusted Vendors", description: "Every vendor is vetted — quality plants and reliable service guaranteed.", icon: ClockFadingIcon, accent: '#065f46' },
]

// --- Placeholder exports ---
export const productDummyData = [];
export const dummyRatingsData = [];
export const dummyStoreData = null;
export const storesDummyData = [
  {
    id: 1,
    name: "Fresh Roots Nursery",
    username: "freshroots",
    logo: "/store-logos/fresh-roots.png",
    description: "Premium nursery offering a wide variety of organic indoor and outdoor plants, garden tools, and landscaping materials.",
    status: "active",
    isActive: true,
    address: "12 MG Road, Bangalore, Karnataka 560001",
    city: "Bangalore",
    contact: "+91 98765 43210",
    email: "info@freshroots.in",
    createdAt: "2025-06-15T10:30:00Z",
    user: { name: "Amit Sharma", email: "amit@freshroots.in", image: "/avatars/user1.png" },
  },
  {
    id: 2,
    name: "Blossom Haven",
    username: "blossomhaven",
    logo: "/store-logos/blossom.png",
    description: "Specialty flower shop with exotic orchids, roses, and seasonal blooms. Custom arrangements available.",
    status: "active",
    isActive: true,
    address: "45 Park Street, Kolkata, West Bengal 700016",
    city: "Kolkata",
    contact: "+91 87654 32109",
    email: "hello@blossomhaven.in",
    createdAt: "2025-05-20T09:15:00Z",
    user: { name: "Priya Patel", email: "priya@blossomhaven.in", image: "/avatars/user2.png" },
  },
  {
    id: 3,
    name: "Verde Garden Co.",
    username: "verdegarden",
    logo: "/store-logos/verde.png",
    description: "Sustainable gardening supplies including compost, organic fertilizers, and eco-friendly pots.",
    status: "active",
    isActive: false,
    address: "78 Green Avenue, Pune, Maharashtra 411001",
    city: "Pune",
    contact: "+91 76543 21098",
    email: "support@verdegarden.in",
    createdAt: "2025-07-01T14:00:00Z",
    user: { name: "Rohan Deshmukh", email: "rohan@verdegarden.in", image: "/avatars/user3.png" },
  },
  {
    id: 4,
    name: "The Plant Studio",
    username: "plantstudio",
    logo: "/store-logos/plant-studio.png",
    description: "Modern plant shop for urban dwellers. Small pots, succulents, and air-purifying plants for offices and homes.",
    status: "inactive",
    isActive: false,
    address: "23 Jubilee Hills, Hyderabad, Telangana 500033",
    city: "Hyderabad",
    contact: "+91 65432 10987",
    email: "contact@plantstudio.in",
    createdAt: "2025-04-10T11:45:00Z",
    user: { name: "Sneha Reddy", email: "sneha@plantstudio.in", image: "/avatars/user4.png" },
  },
  {
    id: 5,
    name: "GreenWave Supplies",
    username: "greenwave",
    logo: "/store-logos/greenwave.png",
    description: "Bulk supplier of turf, grass seeds, and irrigation systems for commercial landscaping projects.",
    status: "pending",
    isActive: false,
    address: "56 Anna Salai, Chennai, Tamil Nadu 600002",
    city: "Chennai",
    contact: "+91 54321 09876",
    email: "sales@greenwave.in",
    createdAt: "2025-07-16T08:20:00Z",
    user: { name: "Arjun Mehta", email: "arjun@greenwave.in", image: "/avatars/user5.png" },
  },
  {
    id: 6,
    name: "BloomBox",
    username: "bloombox",
    logo: "/store-logos/bloombox.png",
    description: "Subscription-based plant delivery service with curated seasonal plants and care kits.",
    status: "pending",
    isActive: false,
    address: "91 Sector 62, Noida, Uttar Pradesh 201301",
    city: "Noida",
    contact: "+91 43210 98765",
    email: "care@bloombox.in",
    createdAt: "2025-07-18T16:30:00Z",
    user: { name: "Neha Gupta", email: "neha@bloombox.in", image: "/avatars/user6.png" },
  },
  {
    id: 7,
    name: "Roots & Shoots",
    username: "rootsandshoots",
    logo: "/store-logos/roots.png",
    description: "Family-owned nursery with heritage fruit trees, medicinal plants, and native species since 1985.",
    status: "active",
    isActive: true,
    address: "12 Nehru Nagar, Jaipur, Rajasthan 302005",
    city: "Jaipur",
    contact: "+91 32109 87654",
    email: "info@rootsandshoots.in",
    createdAt: "2025-03-05T13:10:00Z",
    user: { name: "Vikram Singh", email: "vikram@rootsandshoots.in", image: "/avatars/user7.png" },
  },
  {
    id: 8,
    name: "Urban Jungle",
    username: "urbanjungle",
    logo: "/store-logos/urban-jungle.png",
    description: "Trendy indoor plant store specializing in rare philodendrons, monsteras, and other tropical plants.",
    status: "pending",
    isActive: false,
    address: "34 Koramangala, Bangalore, Karnataka 560034",
    city: "Bangalore",
    contact: "+91 21098 76543",
    email: "hello@urbanjungle.in",
    createdAt: "2025-07-20T10:00:00Z",
    user: { name: "Kavya Iyer", email: "kavya@urbanjungle.in", image: "/avatars/user8.png" },
  },
];
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
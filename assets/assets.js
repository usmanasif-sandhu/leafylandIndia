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

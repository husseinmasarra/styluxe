function normCatName(s) {
    if (!s) return "";
    try { s = decodeURIComponent(s); } catch(e){}
    return String(s).trim().toLowerCase().replace(/%20/g, ' ').replace(/\s+/g, ' ');
}
window.normCatName = normCatName;

let DEFAULT_PRODUCTS = [
    { id: 101, name: 'BLACK HOODIE', price: 150, category: 'Ready to Wear', department: 'Men', brand: 'Styluxe', image: 'assets/hoodie_black.png', img: 'assets/hoodie_black.png', description: 'Heavyweight Luxury Black Zip Hoodie', sizes: ['S','M','L','XL'], colors: ['Black'], inventory: { 'M-Black': 20, 'L-Black': 20 } },
    { id: 102, name: 'BLUE ZIP SWEATER', price: 130, category: 'Ready to Wear', department: 'Men', brand: 'Styluxe', image: 'assets/user_prod_2.jpg', img: 'assets/user_prod_2.jpg', description: 'Ribbed Knit High-Neck Blue Zip Sweater', sizes: ['S','M','L','XL'], colors: ['Navy Blue'], inventory: { 'M-Navy Blue': 15, 'L-Navy Blue': 15 } },
    { id: 103, name: 'WHITE POLO SHIRT', price: 95, category: 'Ready to Wear', department: 'Men', brand: 'Styluxe', image: 'assets/user_prod_3.jpg', img: 'assets/user_prod_3.jpg', description: 'Textured Cotton Off-White Polo Shirt', sizes: ['S','M','L','XL'], colors: ['White'], inventory: { 'M-White': 25, 'L-White': 25 } },
    { id: 104, name: 'BLACK LEATHER JACKET', price: 280, category: 'Ready to Wear', department: 'Men', brand: 'Styluxe', image: 'assets/jacket_leather.png', img: 'assets/jacket_leather.png', description: 'Premium Genuine Leather Biker Jacket', sizes: ['M','L','XL'], colors: ['Black'], inventory: { 'M-Black': 10, 'L-Black': 10 } },
    { id: 105, name: 'CARGO DENIM JEANS', price: 110, category: 'Ready to Wear', department: 'Men', brand: 'Styluxe', image: 'assets/user_prod_1.jpg', img: 'assets/user_prod_1.jpg', description: 'Relaxed Fit Black Cargo Jeans', sizes: ['30','32','34','36'], colors: ['Black'], inventory: { '32-Black': 15, '34-Black': 15 } },
    { id: 201, name: 'LUXURY LEATHER HANDBAG', price: 320, category: 'Bags', department: 'Women', brand: 'Styluxe', image: 'assets/category_bags.png', img: 'assets/category_bags.png', description: 'Minimalist Italian Leather Shoulder Bag', sizes: ['One Size'], colors: ['Black'], inventory: { 'One Size-Black': 15 } },
    { id: 202, name: 'OVERSIZED KNIT SWEATER', price: 120, category: 'Ready to Wear', department: 'Women', brand: 'Styluxe', image: 'assets/user_prod_2.jpg', img: 'assets/user_prod_2.jpg', description: 'Cozy Oversized Mohair Knit Sweater', sizes: ['S','M','L'], colors: ['Beige'], inventory: { 'M-Beige': 15 } },
    { id: 203, name: 'TAILORED BLAZER', price: 240, category: 'Ready to Wear', department: 'Women', brand: 'Styluxe', image: 'assets/category_ready_to_wear.png', img: 'assets/category_ready_to_wear.png', description: 'Double-Breasted Wool Blend Blazer', sizes: ['S','M','L'], colors: ['Black'], inventory: { 'M-Black': 10 } },
    { id: 301, name: 'KIDS OVERSIZED HOODIE', price: 65, category: 'Ready to Wear', department: 'Kids', brand: 'Styluxe', image: 'assets/hoodie_black.png', img: 'assets/hoodie_black.png', description: 'Soft Fleece Kids Streetwear Hoodie', sizes: ['6Y','8Y','10Y','12Y'], colors: ['Black'], inventory: { '8Y-Black': 20 } }
];

let DEFAULT_CATEGORIES = [
    { id: 1, name: 'Ready to Wear', department: 'Men', img: 'assets/category_ready_to_wear.png', image: 'assets/category_ready_to_wear.png' },
    { id: 2, name: 'Bags', department: 'Men', img: 'assets/category_bags.png', image: 'assets/category_bags.png' },
    { id: 3, name: 'Shoes', department: 'Men', img: 'assets/category_shoes.png', image: 'assets/category_shoes.png' },
    { id: 4, name: 'Accessories', department: 'Men', img: 'assets/category_accessories.png', image: 'assets/category_accessories.png' },
    { id: 5, name: 'Ready to Wear', department: 'Women', img: 'assets/category_ready_to_wear.png', image: 'assets/category_ready_to_wear.png' },
    { id: 6, name: 'Bags', department: 'Women', img: 'assets/category_bags.png', image: 'assets/category_bags.png' },
    { id: 7, name: 'Shoes', department: 'Women', img: 'assets/category_shoes.png', image: 'assets/category_shoes.png' },
    { id: 8, name: 'Accessories', department: 'Women', img: 'assets/category_accessories.png', image: 'assets/category_accessories.png' },
    { id: 9, name: 'Ready to Wear', department: 'Kids', img: 'assets/category_ready_to_wear.png', image: 'assets/category_ready_to_wear.png' }
];

let PRODUCTS = (function(){
    try {
        const saved = localStorage.getItem("styluxe_products_user_saved");
        if (saved !== null) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch(e){}
    return [...DEFAULT_PRODUCTS];
})();
let ordersList = [];
let usersList = [];

let CATEGORIES = (function(){
    try {
        const saved = localStorage.getItem("styluxe_categories_user_saved");
        if (saved !== null) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch(e){}
    return [...DEFAULT_CATEGORIES];
})();
let DEFAULT_BRANDS = [
    { id: 1, name: 'Styluxe', img: 'assets/category_accessories.png' }
];
let BRANDS = (function(){
    try {
        const saved = localStorage.getItem("styluxe_brands_user_saved");
        if (saved !== null) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch(e){}
    return [...DEFAULT_BRANDS];
})();
let SUPPLIERS = [];
let INVOICES = [];
let STORE_SETTINGS = {};
let COUPONS = [];
let NAVIGATION_MENU = [];

let DEFAULT_NAVIGATION_MENU = [
    { id: "gifts", name: "Gifts", linkType: "department", linkValue: "All", children: [] },
    {
        id: "women",
        name: "Women",
        linkType: "department",
        linkValue: "Women",
        children: [
            { id: "women_new_arrivals", name: "New Arrivals", linkType: "new_arrivals", linkValue: "Women", department: "Women", children: [] },
            {
                id: "women_bags",
                name: "Bags",
                linkType: "category",
                linkValue: "Bags",
                children: [
                    { id: "w_bags_all", name: "View all", linkType: "category", linkValue: "Bags" },
                    { id: "w_handbags", name: "Handbags", linkType: "category", linkValue: "Bags" },
                    { id: "w_shoulder", name: "Shoulder bags", linkType: "category", linkValue: "Bags" }
                ]
            },
            {
                id: "women_ready_to_wear",
                name: "Ready to wear",
                linkType: "department",
                linkValue: "Women",
                children: [
                    { id: "w_view_all", name: "View all", linkType: "department", linkValue: "Women" },
                    { id: "w_tshirts", name: "T-shirts and polo shirts", linkType: "category", linkValue: "T-Shirts" },
                    { id: "w_shirts", name: "Shirts", linkType: "category", linkValue: "Shirts" },
                    { id: "w_outerwear", name: "Outerwear", linkType: "category", linkValue: "Jackets" },
                    { id: "w_jackets", name: "Jackets and coats", linkType: "category", linkValue: "Jackets" },
                    { id: "w_denim", name: "Denim", linkType: "category", linkValue: "Jeans" },
                    { id: "w_knitwear", name: "Knitwear", linkType: "category", linkValue: "Hoodies" },
                    { id: "w_trousers", name: "Trousers and bermudas", linkType: "category", linkValue: "Jeans" },
                    { id: "w_jogging", name: "Jogging suits and sweatshirts", linkType: "category", linkValue: "Hoodies" },
                    { id: "w_swimwear", name: "Swimwear", linkType: "category", linkValue: "Ready To Wear" },
                    { id: "w_leather", name: "Leather clothing", linkType: "category", linkValue: "Jackets" }
                ]
            },
            {
                id: "women_shoes",
                name: "Shoes",
                linkType: "category",
                linkValue: "Shoes",
                children: [
                    { id: "w_shoes_all", name: "View all", linkType: "category", linkValue: "Shoes" },
                    { id: "w_sneakers", name: "Sneakers", linkType: "category", linkValue: "Shoes" },
                    { id: "w_boots", name: "Boots", linkType: "category", linkValue: "Shoes" }
                ]
            },
            {
                id: "women_accessories",
                name: "Accessories",
                linkType: "category",
                linkValue: "Accessories",
                children: [
                    { id: "w_acc_all", name: "View all", linkType: "category", linkValue: "Accessories" },
                    { id: "w_sunglasses", name: "Sunglasses", linkType: "category", linkValue: "Accessories" }
                ]
            }
        ]
    },
    {
        id: "men",
        name: "Men",
        linkType: "department",
        linkValue: "Men",
        children: [
            { id: "men_new_arrivals", name: "New Arrivals", linkType: "new_arrivals", linkValue: "Men", department: "Men", children: [] },
            {
                id: "men_bags",
                name: "Bags",
                linkType: "category",
                linkValue: "Bags",
                children: [
                    { id: "m_bags_all", name: "View all", linkType: "category", linkValue: "Bags" },
                    { id: "m_backpacks", name: "Backpacks", linkType: "category", linkValue: "Bags" },
                    { id: "m_travel", name: "Travel bags", linkType: "category", linkValue: "Bags" }
                ]
            },
            {
                id: "men_ready_to_wear",
                name: "Ready to wear",
                linkType: "department",
                linkValue: "Men",
                children: [
                    { id: "m_view_all", name: "View all", linkType: "department", linkValue: "Men" },
                    { id: "m_tshirts", name: "T-shirts and polo shirts", linkType: "category", linkValue: "T-Shirts" },
                    { id: "m_shirts", name: "Shirts", linkType: "category", linkValue: "Shirts" },
                    { id: "m_outerwear", name: "Outerwear", linkType: "category", linkValue: "Jackets" },
                    { id: "m_jackets", name: "Jackets and coats", linkType: "category", linkValue: "Jackets" },
                    { id: "m_denim", name: "Denim", linkType: "category", linkValue: "Jeans" },
                    { id: "m_knitwear", name: "Knitwear", linkType: "category", linkValue: "Hoodies" },
                    { id: "m_trousers", name: "Trousers and bermudas", linkType: "category", linkValue: "Jeans" },
                    { id: "m_jogging", name: "Jogging suits and sweatshirts", linkType: "category", linkValue: "Hoodies" },
                    { id: "m_swimwear", name: "Swimwear", linkType: "category", linkValue: "Ready To Wear" },
                    { id: "m_leather", name: "Leather clothing", linkType: "category", linkValue: "Jackets" }
                ]
            },
            {
                id: "men_shoes",
                name: "Shoes",
                linkType: "category",
                linkValue: "Shoes",
                children: [
                    { id: "m_shoes_all", name: "View all", linkType: "category", linkValue: "Shoes" },
                    { id: "m_sneakers", name: "Sneakers", linkType: "category", linkValue: "Shoes" },
                    { id: "m_boots", name: "Boots", linkType: "category", linkValue: "Shoes" }
                ]
            },
            {
                id: "men_leather_goods",
                name: "Small Leather Goods",
                linkType: "category",
                linkValue: "Accessories",
                children: [
                    { id: "m_wallets", name: "Wallets", linkType: "category", linkValue: "Accessories" }
                ]
            },
            {
                id: "men_travel",
                name: "Travel",
                linkType: "category",
                linkValue: "Bags",
                children: [
                    { id: "m_luggage", name: "Luggage", linkType: "category", linkValue: "Bags" }
                ]
            },
            {
                id: "men_accessories",
                name: "Accessories",
                linkType: "category",
                linkValue: "Accessories",
                children: [
                    { id: "m_acc_all", name: "View all", linkType: "category", linkValue: "Accessories" },
                    { id: "m_sunglasses", name: "Sunglasses", linkType: "category", linkValue: "Accessories" }
                ]
            }
        ]
    },
    {
        id: "kids",
        name: "Kids",
        linkType: "department",
        linkValue: "Kids",
        department: "Kids",
        children: [
            { id: "kids_new_arrivals", name: "New Arrivals", linkType: "new_arrivals", linkValue: "Kids", department: "Kids", children: [] },
            {
                id: "kids_bags",
                name: "Bags",
                linkType: "category",
                linkValue: "Bags",
                category: "Bags",
                department: "Kids",
                children: [
                    { id: "k_bags_all", name: "View all", linkType: "category", linkValue: "Bags", category: "Bags", department: "Kids" },
                    { id: "k_backpacks", name: "Backpacks", linkType: "category", linkValue: "Bags", category: "Bags", department: "Kids" },
                    { id: "k_travel", name: "Travel bags", linkType: "category", linkValue: "Bags", category: "Bags", department: "Kids" }
                ]
            },
            {
                id: "kids_ready_to_wear",
                name: "Ready to wear",
                linkType: "department",
                linkValue: "Kids",
                department: "Kids",
                children: [
                    { id: "k_view_all", name: "View all", linkType: "department", linkValue: "Kids", department: "Kids" },
                    { id: "k_tshirts", name: "T-shirts and polo shirts", linkType: "category", linkValue: "T-Shirts", category: "T-Shirts", department: "Kids" },
                    { id: "k_shirts", name: "Shirts", linkType: "category", linkValue: "Shirts", category: "Shirts", department: "Kids" },
                    { id: "k_outerwear", name: "Outerwear", linkType: "category", linkValue: "Jackets", category: "Jackets", department: "Kids" },
                    { id: "k_jackets", name: "Jackets and coats", linkType: "category", linkValue: "Jackets", category: "Jackets", department: "Kids" },
                    { id: "k_denim", name: "Denim", linkType: "category", linkValue: "Jeans", category: "Jeans", department: "Kids" },
                    { id: "k_knitwear", name: "Knitwear", linkType: "category", linkValue: "Hoodies", category: "Hoodies", department: "Kids" },
                    { id: "k_trousers", name: "Trousers and bermudas", linkType: "category", linkValue: "Jeans", category: "Jeans", department: "Kids" },
                    { id: "k_jogging", name: "Jogging suits and sweatshirts", linkType: "category", linkValue: "Hoodies", category: "Hoodies", department: "Kids" },
                    { id: "k_swimwear", name: "Swimwear", linkType: "category", linkValue: "Ready To Wear", category: "Ready To Wear", department: "Kids" },
                    { id: "k_leather", name: "Leather clothing", linkType: "category", linkValue: "Jackets", category: "Jackets", department: "Kids" }
                ]
            },
            {
                id: "kids_shoes",
                name: "Shoes",
                linkType: "category",
                linkValue: "Shoes",
                category: "Shoes",
                department: "Kids",
                children: [
                    { id: "k_shoes_all", name: "View all", linkType: "category", linkValue: "Shoes", category: "Shoes", department: "Kids" },
                    { id: "k_sneakers", name: "Sneakers", linkType: "category", linkValue: "Shoes", category: "Shoes", department: "Kids" },
                    { id: "k_boots", name: "Boots", linkType: "category", linkValue: "Shoes", category: "Shoes", department: "Kids" }
                ]
            },
            {
                id: "kids_leather_goods",
                name: "Small Leather Goods",
                linkType: "category",
                linkValue: "Accessories",
                category: "Accessories",
                department: "Kids",
                children: [
                    { id: "k_wallets", name: "Wallets", linkType: "category", linkValue: "Accessories", category: "Accessories", department: "Kids" }
                ]
            },
            {
                id: "kids_travel",
                name: "Travel",
                linkType: "category",
                linkValue: "Bags",
                category: "Bags",
                department: "Kids",
                children: [
                    { id: "k_luggage", name: "Luggage", linkType: "category", linkValue: "Bags", category: "Bags", department: "Kids" }
                ]
            },
            {
                id: "kids_accessories",
                name: "Accessories",
                linkType: "category",
                linkValue: "Accessories",
                category: "Accessories",
                department: "Kids",
                children: [
                    { id: "k_acc_all", name: "View all", linkType: "category", linkValue: "Accessories", category: "Accessories", department: "Kids" },
                    { id: "k_sunglasses", name: "Sunglasses", linkType: "category", linkValue: "Accessories", category: "Accessories", department: "Kids" }
                ]
            }
        ]
    },
    { id: "bags", name: "Bags", linkType: "category", linkValue: "Bags", children: [] },
    { id: "prada_linea_rossa", name: "Prada Linea Rossa", linkType: "brand", linkValue: "Prada", children: [] },
    { id: "perfumes_beauty", name: "Perfumes and Beauty", linkType: "category", linkValue: "Accessories", children: [] },
    { id: "home_lifestyle", name: "Home and Lifestyle", linkType: "category", linkValue: "Accessories", children: [] },
    { id: "fine_jewelry", name: "Fine Jewelry", linkType: "category", linkValue: "Accessories", children: [] },
    { id: "pradasphere", name: "Pradasphere", linkType: "brand", linkValue: "Styluxe Archive", children: [] }
];
let activeCoupon = null;
let cart = [];

// Menu Builder Active State
let selectedMenuNodeLvl1 = null;
let selectedMenuNodeLvl2 = null;
let selectedMenuNodeLvl3 = null;
let activeSelectedNode = null;
window.isNewArrivalsOnly = false;

// Admin Panel State
let currentAdminDept = ""; // "Men", "Women", "Kids", "Global"
let currentAdminStaff = null; // Active logged in staff details
let currentAdminPassword = ""; // Active logged in staff password for returns auth
let posMode = "sales"; // "sales" or "return"
let dailyReportCashierFilter = "current"; // Cashier selection filter for daily report
let posCart = (function(){
    try {
        const saved = localStorage.getItem("styluxe_pos_cart");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch(e){}
    return [];
})();

function savePosCartToStorage() {
    try {
        localStorage.setItem("styluxe_pos_cart", JSON.stringify(posCart));
    } catch(e){}
}
let isEditingProduct = false;
let editingProductId = null;
let isEditingBrand = false;
let editingBrandOldName = "";


function splitProductImages(imgStr) {
    if (!imgStr) return [];
    if (Array.isArray(imgStr)) return imgStr;
    if (typeof imgStr !== "string") return [];
    if (imgStr.includes("|||")) {
        return imgStr.split("|||").map(s => s.trim()).filter(Boolean);
    }
    if (imgStr.startsWith("[")) {
        try {
            const parsed = JSON.parse(imgStr);
            if (Array.isArray(parsed)) return parsed;
        } catch(e){}
    }
    if (imgStr.includes("data:image/")) {
        return imgStr.split(/,(?=data:image\/|https?:\/\/|\/assets\/|assets\/)/i).map(p => p.trim()).filter(Boolean);
    }
    return imgStr.split(",").map(url => url.trim()).filter(Boolean);
}
window.splitProductImages = splitProductImages;


// Utility to get the primary image from a product (supports comma-separated multiple images & Base64 data URLs)
function getProductMainImage(product) {
    if (product && product.image) {
        const imgs = splitProductImages(product.image);
        return imgs.length > 0 ? imgs[0] : product.image;
    }
    return "";
}
window.getProductMainImage = getProductMainImage;

// Customer Accounts State
let currentUser = null;

let activeDepartment = "All";
let activeCategory = "All";
let activeColorFilter = "All";
let activeMaterialFilter = "All";
let searchQuery = "";
let currentCurrency = "USD"; // "USD" or "LBP"
const LBP_RATE = 89500; // Static conversion rate $1 = 89,500 LBP
let selectedSize = "";
let activeModalProduct = null;

// DOM ELEMENTS
const productGrid = document.getElementById("productGrid");
const filterTagsContainer = document.getElementById("filterTags");
const departmentControls = document.getElementById("departmentControls");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.querySelector(".search-box");
const cartToggleBtn = document.getElementById("cartToggleBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartCountBadge = document.getElementById("cartCount");
const cartHeaderCount = document.getElementById("cartHeaderCount");
const cartDrawerFooter = document.getElementById("cartDrawerFooter");
const currencyBtn = document.getElementById("currencyBtn");
const currencyDropdown = document.getElementById("currencyDropdown");
const navbar = document.getElementById("navbar");

// MODAL DOM ELEMENTS
const productModalBackdrop = document.getElementById("productModalBackdrop");
const modalProductImg = document.getElementById("modalProductImg");
const modalProductCategory = document.getElementById("modalProductCategory");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const sizeSelectorGrid = document.getElementById("sizeSelectorGrid");
const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");

// CHECKOUT DOM ELEMENTS
const checkoutModalBackdrop = document.getElementById("checkoutModalBackdrop");
const checkoutOrderSummary = document.getElementById("checkoutOrderSummary");
const checkoutForm = document.getElementById("checkoutForm");
const successModalBackdrop = document.getElementById("successModalBackdrop");
const orderNumberText = document.getElementById("orderNumber");

// MOBILE MENU DOM ELEMENTS (Legacy replaced by Prada Side Menu)

// DATABASE SYNC ACTIONS
async function loadProductsFromServer() {
    try {
        const fetchSafe = async (url) => {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 5000);
            try {
                const cacheBustUrl = url.includes('?') ? `${url}&_t=${Date.now()}` : `${url}?_t=${Date.now()}`;
                const res = await fetch(cacheBustUrl, { 
                    signal: controller.signal,
                    headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
                });
                clearTimeout(timer);
                if (res && res.ok) return await res.json();
            } catch (e) {
                clearTimeout(timer);
            }
            return null;
        };

        let [prods, cats, brands, supps, invs, settings, coupons, navMenu, homeCards] = await Promise.all([
            fetchSafe('/api/products'),
            fetchSafe('/api/categories'),
            fetchSafe('/api/brands'),
            fetchSafe('/api/suppliers'),
            fetchSafe('/api/invoices'),
            fetchSafe('/api/settings'),
            fetchSafe('/api/coupons'),
            fetchSafe('/api/navigation-menu'),
            fetchSafe('/api/homepage-cards')
        ]);

        // Fallback for static hosting (GitHub Pages, Netlify, Vercel Static) where /api/* endpoints are static files
        if (!prods || !cats) {
            const dbData = await fetchSafe('/database.json') || await fetchSafe('database.json');
            if (dbData && typeof dbData === 'object') {
                if (!prods && Array.isArray(dbData.products)) prods = dbData.products;
                if (!cats && Array.isArray(dbData.categories)) cats = dbData.categories;
                if (!brands && Array.isArray(dbData.brands)) brands = dbData.brands;
                if (!settings && dbData.settings) settings = dbData.settings;
                if (!coupons && Array.isArray(dbData.coupons)) coupons = dbData.coupons;
            }
        }

        // 1. PRODUCTS: Direct real-time canonical server database.json loading (No LocalStorage desync)
        if (Array.isArray(prods)) {
            PRODUCTS = prods;
        }

        // 2. CATEGORIES: Direct real-time canonical server database.json loading
        if (Array.isArray(cats)) {
            CATEGORIES = cats;
        }

        // 3. BRANDS: User Saved > Server > Cache > Default
        const userSavedBrands = localStorage.getItem("styluxe_brands_user_saved") || localStorage.getItem("styluxe_brands");
        if (userSavedBrands !== null) {
            try { BRANDS = JSON.parse(userSavedBrands); } catch(e){}
        } else if (Array.isArray(brands) && brands.length > 0) {
            BRANDS = brands;
            try { localStorage.setItem("styluxe_brands_user_saved", JSON.stringify(brands)); } catch(e){}
        }

        // 4. NAV MENU: Local Custom Saved > Server Master Data > Default Full Luxury Preset
        const userSavedNav = localStorage.getItem("styluxe_custom_nav_menu") || localStorage.getItem("styluxe_nav_user_saved");
        let hasLocalCustomNav = false;
        if (userSavedNav) {
            try {
                const parsedNav = JSON.parse(userSavedNav);
                if (Array.isArray(parsedNav) && parsedNav.length > 0) {
                    NAVIGATION_MENU = parsedNav;
                    hasLocalCustomNav = true;
                }
            } catch(e){}
        }

        if (!hasLocalCustomNav && Array.isArray(navMenu) && navMenu.length > 0) {
            NAVIGATION_MENU = navMenu;
            try {
                localStorage.setItem("styluxe_custom_nav_menu", JSON.stringify(navMenu));
                localStorage.setItem("styluxe_nav_user_saved", JSON.stringify(navMenu));
            } catch(e){}
        } else if (!hasLocalCustomNav && (!Array.isArray(NAVIGATION_MENU) || NAVIGATION_MENU.length === 0)) {
            if (typeof DEFAULT_NAVIGATION_MENU !== "undefined" && Array.isArray(DEFAULT_NAVIGATION_MENU)) {
                NAVIGATION_MENU = JSON.parse(JSON.stringify(DEFAULT_NAVIGATION_MENU));
            }
        }
        if (typeof renderPradaDrawerMenu === "function") {
            renderPradaDrawerMenu();
        }


        if (Array.isArray(supps)) SUPPLIERS = supps;
        if (Array.isArray(invs)) INVOICES = invs;
        if (settings && typeof settings === 'object') {
            STORE_SETTINGS = settings;
            updateSeasonUI(STORE_SETTINGS.active_season);
        }
        if (Array.isArray(coupons)) COUPONS = coupons;

        // HOMEPAGE CARDS - Priority: Server > localStorage > DEFAULT
        if (Array.isArray(homeCards)) {
            HOMEPAGE_CATEGORY_CARDS = homeCards;
            try { localStorage.setItem("styluxe_home_category_cards", JSON.stringify(homeCards)); } catch(e){}
        } else {
            const localSavedCards = localStorage.getItem("styluxe_home_category_cards");
            if (localSavedCards) {
                try { HOMEPAGE_CATEGORY_CARDS = JSON.parse(localSavedCards); } catch(e){ HOMEPAGE_CATEGORY_CARDS = DEFAULT_HOMEPAGE_CARDS; }
            } else {
                HOMEPAGE_CATEGORY_CARDS = DEFAULT_HOMEPAGE_CARDS;
            }
        }

        // Ensure Women / Men / Kids always have "New Arrivals" as first child
        const deptNewArrivals = {
            "women": { id: "women_new_arrivals", name: "New Arrivals", linkType: "new_arrivals", linkValue: "Women", department: "Women", children: [] },
            "men":   { id: "men_new_arrivals",   name: "New Arrivals", linkType: "new_arrivals", linkValue: "Men",   department: "Men",   children: [] },
            "kids":  { id: "kids_new_arrivals",  name: "New Arrivals", linkType: "new_arrivals", linkValue: "Kids",  department: "Kids",  children: [] }
        };
        NAVIGATION_MENU.forEach(node => {
            const key = (node.id || "").toLowerCase();
            if (deptNewArrivals[key] && Array.isArray(node.children)) {
                const alreadyHas = node.children.some(c => c.linkType === "new_arrivals");
                if (!alreadyHas) {
                    node.children.unshift(deptNewArrivals[key]);
                }
            }
        });

        updateCategoriesDatalist();
        populateBrandOptions();
        
        renderProducts();
        syncNavigationWithCategories();
    saveAllUserDataLocally(); renderPradaDrawerMenu();
        renderBrandSlider();
        renderCategoryTags();
        updateWhatsAppPill(activeDepartment);
        updateSocialFooterLinks();
        renderAdminCoupons();
        populateSettingsFields();
        applyHeroBackgroundFromSettings();
        if (typeof applyHeroTextFromSettings === "function") {
            applyHeroTextFromSettings();
        }
    } catch (err) {
        console.error("Failed to load store data from server:", err);
    }
}


function updateCategoriesDatalist() {
    const select = document.getElementById("newProdCategory");
    if (!select) return;

    const currentSelectedVal = select.value;
    select.innerHTML = '<option value="" disabled selected>Select Category</option>';

    const deptSelect = document.getElementById("newProdDept");
    const activeDept = deptSelect ? deptSelect.value.trim().toLowerCase() : "";

    let sourceCats = Array.isArray(CATEGORIES) ? CATEGORIES : [];

    let filteredCats = sourceCats;
    if (activeDept && activeDept !== "all" && activeDept !== "global") {
        filteredCats = sourceCats.filter(c => {
            const d = (c.department || "").trim().toLowerCase();
            return !d || d === "global" || d === "all" || d === activeDept;
        });
    }

    // Fallback if department filter yields 0 categories
    if (filteredCats.length === 0) {
        filteredCats = sourceCats;
    }

    // Separate parent and sub categories
    const parents = filteredCats.filter(c => !c.parentId).sort((a,b) => (a.priority||1000)-(b.priority||1000));
    const subs    = filteredCats.filter(c => !!c.parentId);

    parents.forEach(parent => {
        const children = subs.filter(s => s.parentId === parent.id).sort((a,b)=>(a.priority||1000)-(b.priority||1000));
        if (children.length > 0) {
            const grpOpt = document.createElement("option");
            grpOpt.value = parent.name;
            grpOpt.textContent = '📁 ' + parent.name.toUpperCase();
            select.appendChild(grpOpt);
            children.forEach(sub => {
                const opt = document.createElement("option");
                opt.value = sub.name;
                opt.textContent = '  ↳ ' + sub.name.toUpperCase();
                select.appendChild(opt);
            });
        } else {
            const opt = document.createElement("option");
            opt.value = parent.name;
            opt.textContent = parent.name.toUpperCase();
            select.appendChild(opt);
        }
    });

    subs.filter(s => !parents.find(p => p.id === s.parentId)).forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub.name;
        opt.textContent = sub.name.toUpperCase();
        select.appendChild(opt);
    });

    if (currentSelectedVal && Array.from(select.options).some(o => o.value === currentSelectedVal)) {
        select.value = currentSelectedVal;
    }
}


async function loadOrdersFromServer() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 500);
    try {
        const response = await fetch('/api/orders', { signal: controller.signal });
        clearTimeout(timer);
        if (response && response.ok) ordersList = await response.json();
    } catch (err) {
        clearTimeout(timer);
    }
}

async function loadUsersFromServer() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 500);
    try {
        const response = await fetch('/api/users', { signal: controller.signal });
        clearTimeout(timer);
        if (response && response.ok) usersList = await response.json();
    } catch (err) {
        clearTimeout(timer);
    }
}

function triggerReadyFlash() {
    let flashEl = document.getElementById("siteReadyFlash");
    if (!flashEl) {
        flashEl = document.createElement("div");
        flashEl.id = "siteReadyFlash";
        flashEl.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 999999;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
            opacity: 0;
            transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(flashEl);
    }
    flashEl.style.opacity = "1";
    setTimeout(() => {
        flashEl.style.opacity = "0";
    }, 220);
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    
    // 1. Instant event listener setup and UI initialization (0ms input delay!)
    setupEventListeners();
    loadCartFromLocalStorage();
    updateCartUI();

    renderBrandSlider();
    renderHomeNewArrivals('Women');
    renderCategoryTags();
    updateWhatsAppPill("All");
    renderProducts();

// ==========================================
// PRADA HEADER SEARCH OVERLAY FUNCTIONS
// ==========================================
function openPradaSearch(e) {
    if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
    }

    const headerPanel = document.getElementById("pradaSearchHeader");
    const backdrop = document.getElementById("pradaSearchBackdrop");
    const overlay = document.getElementById("pradaSearchOverlay");

    if (headerPanel) {
        headerPanel.style.setProperty("display", "block", "important");
        headerPanel.style.setProperty("visibility", "visible", "important");
        headerPanel.style.setProperty("opacity", "1", "important");
        headerPanel.classList.add("active");
    }
    if (backdrop) {
        backdrop.style.setProperty("display", "block", "important");
        backdrop.style.setProperty("visibility", "visible", "important");
        backdrop.style.setProperty("opacity", "1", "important");
    }
    if (overlay) {
        overlay.style.setProperty("display", "flex", "important");
        overlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";

    const input = document.getElementById("pradaHeaderSearchInput") || document.getElementById("pradaSearchInput") || document.getElementById("topSearchInput");
    if (input) {
        input.value = "";
        setTimeout(() => {
            input.focus();
            try { input.click(); } catch(err){}
        }, 50);
    }
}

function closePradaSearch(e) {
    if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
    }

    const headerPanel = document.getElementById("pradaSearchHeader");
    const backdrop = document.getElementById("pradaSearchBackdrop");
    const overlay = document.getElementById("pradaSearchOverlay");

    if (headerPanel) {
        headerPanel.style.setProperty("display", "none", "important");
        headerPanel.classList.remove("active");
    }
    if (backdrop) {
        backdrop.style.setProperty("display", "none", "important");
    }
    if (overlay) {
        overlay.style.setProperty("display", "none", "important");
        overlay.classList.remove("active");
    }

    document.body.style.overflow = "";
}

function togglePradaHeaderSearch(show) {
    if (show === false) {
        closePradaSearch();
    } else {
        openPradaSearch();
    }
}

function togglePradaSearch(show) {
    if (show === false) {
        closePradaSearch();
    } else {
        openPradaSearch();
    }
}

// Global delegated click listener for search, close, and brand logo buttons across all devices
document.addEventListener("click", function(e) {
    const logoBtn = e.target.closest(".brand-logo, .brand-logo a, .footer-logo, .auth-page-brand, .auth-mobile-brand, .admin-logo");
    if (logoBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof showHomePage === "function") {
            showHomePage(true);
        } else {
            window.location.hash = "#home";
        }
        return;
    }

    const closeBtn = e.target.closest("#pradaSearchCloseBtn, .prada-search-close-link, .close-search-btn");
    if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        closePradaSearch(e);
        return;
    }

    const searchBtn = e.target.closest("#navSearchBtn, .nav-search-btn, [data-action='search']");
    if (searchBtn) {
        e.preventDefault();
        e.stopPropagation();
        openPradaSearch(e);
        return;
    }
});

// Explicitly bind search functions to global window object
window.openPradaSearch = openPradaSearch;
window.closePradaSearch = closePradaSearch;
window.togglePradaHeaderSearch = togglePradaHeaderSearch;
window.togglePradaSearch = togglePradaSearch;

function onPradaHeaderSearchInput(val) {
    const clearBtn = document.getElementById("pradaHeaderSearchClearBtn");
    if (clearBtn) {
        clearBtn.style.display = val.trim() ? "inline-block" : "none";
    }
    currentSearchQuery = val.trim();
    if (typeof renderProducts === "function") renderProducts();
}

function onPradaHeaderSearchKeyDown(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const val = event.target.value.trim();
        if (val) {
            currentSearchQuery = val;
            if (typeof renderProducts === "function") renderProducts();
            togglePradaHeaderSearch(false);
            const catalogSec = document.getElementById("shopCatalogSection");
            if (catalogSec) catalogSec.scrollIntoView({ behavior: "smooth" });
        }
    }
}

function clearPradaHeaderSearch() {
    const input = document.getElementById("pradaHeaderSearchInput");
    const clearBtn = document.getElementById("pradaHeaderSearchClearBtn");
    if (input) input.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    currentSearchQuery = "";
    if (typeof renderProducts === "function") renderProducts();
}

function quickSearchCategory(catName, event) {
    if (event && event.preventDefault) event.preventDefault();
    togglePradaHeaderSearch(false);
    if (typeof filterByCategory === "function") {
        filterByCategory(catName);
    } else {
        currentSearchQuery = catName;
        if (typeof renderProducts === "function") renderProducts();
    }
    const catalogSec = document.getElementById("shopCatalogSection");
    if (catalogSec) catalogSec.scrollIntoView({ behavior: "smooth" });
}

    // Handle redirect-based social login (for mobile/in-app browsers)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('social_login')) {
        const email = urlParams.get('email');
        const name = urlParams.get('name');
        if (email && name) {
            handleSocialLoginSuccess({ name, email });
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }
    
    // Auto-resume customer session from localStorage
    const savedUser = localStorage.getItem("styluxe_user");
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserSessionUI();
    }
    closeAuthModal(); // Always default to store view on load/refresh

    // Auto-resume admin dashboard session from sessionStorage
    const savedAdminStaff = sessionStorage.getItem("styluxe_admin_staff");
    if (savedAdminStaff) {
        try { currentAdminStaff = JSON.parse(savedAdminStaff); } catch(e){}
        currentAdminDept = sessionStorage.getItem("styluxe_admin_dept") || "Global";
        currentAdminPassword = sessionStorage.getItem("styluxe_admin_password") || "";
        applyStaffPermissions();

        const initialHash = window.location.hash || "";
        const initialSearch = window.location.search || "";
        if (initialHash.startsWith("#admin") || initialSearch.includes("admin=true")) {
            initAdminDashboard();
        } else {
            if (adminPanelOverlay) adminPanelOverlay.classList.remove("active");
            document.body.style.overflow = "";
            const floatingBtn = document.getElementById("floatingAdminDashboardBtn");
            if (floatingBtn) floatingBtn.style.display = "flex";
        }
    }
    
    // Force page to open immediately at top on fresh entry / refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // SPA Router Event Listeners & Initial State Restoration
    window.addEventListener("hashchange", restoreAppStateFromURL);
    window.addEventListener("popstate", restoreAppStateFromURL);
    restoreAppStateFromURL();
    window.scrollTo(0, 0);
    
    // Add event listener to filter out department selectors
    const deptBtnNavs = document.querySelectorAll(".nav-links a, .drawer-links a");
    deptBtnNavs.forEach(link => {
        if (link.getAttribute("onclick") && link.getAttribute("onclick").includes("filterByDepartment")) {
            link.addEventListener("click", () => {
                const navLinks = document.getElementById("navLinks").querySelectorAll("a");
                navLinks.forEach(n => n.classList.remove("active"));
                link.classList.add("active");
            });
        }
    });

    // Trigger instant ready flash immediately (0ms delay!)
    triggerReadyFlash();

    // Non-blocking background fetch with 500ms AbortController timeout
    Promise.all([
        loadServerConfig(),
        loadProductsFromServer(),
        loadOrdersFromServer()
    ]).catch(err => {
        console.warn("Background sync completed with fallback:", err);
    });
});

// EVENT LISTENERS SETUP
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Search Box Interaction
    if (searchBtn && searchBox && searchInput) {
        searchBtn.addEventListener("click", (e) => {
            if (!searchBox.classList.contains("active")) {
                e.preventDefault();
                searchBox.classList.add("active");
                searchInput.focus();
            } else if (searchInput.value.trim() === "") {
                searchBox.classList.remove("active");
            }
        });

        // Close search box if clicking outside
        document.addEventListener("click", (e) => {
            if (!searchBox.contains(e.target) && searchBox.classList.contains("active") && searchInput.value === "") {
                searchBox.classList.remove("active");
            }
        });

        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            
            const collectionsGridSec = document.getElementById("collections");
            const shopSec = document.getElementById("shop-section");
            const backBtnContainer = document.getElementById("backToCollectionsContainer");
            
            if (searchQuery.trim() !== "") {
                if (collectionsGridSec) collectionsGridSec.style.display = "none";
                if (shopSec) shopSec.style.display = "block";
                if (backBtnContainer) {
                    if (activeDepartment !== "All") {
                        backBtnContainer.style.display = "block";
                    } else {
                        backBtnContainer.style.display = "none";
                    }
                }
            } else {
                if (collectionsGridSec) collectionsGridSec.style.display = "none";
                if (shopSec) shopSec.style.display = "block";
                if (backBtnContainer) backBtnContainer.style.display = activeDepartment !== "All" ? "block" : "none";
            }
            
            renderProducts();
        });
    }

    // Cart Drawer Interactions
    cartToggleBtn.addEventListener("click", () => toggleCartDrawer(true));
    closeCartBtn.addEventListener("click", () => toggleCartDrawer(false));
    cartBackdrop.addEventListener("click", () => toggleCartDrawer(false));

    // Currency selector click (guarded for deletion)
    if (currencyBtn) {
        currencyBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currencyDropdown.classList.toggle("active");
        });
    }
    
    document.addEventListener("click", () => {
        if (currencyDropdown) {
            currencyDropdown.classList.remove("active");
        }
    });

    // Product Modal Image Zoom & Pan interactions for mobile/desktop details view
    const gallery = document.querySelector(".modal-gallery");
    const img = document.getElementById("modalProductImg");
    if (gallery && img) {
        // Toggle Zoom on click
        gallery.addEventListener("click", () => {
            gallery.classList.toggle("zoomed");
            if (!gallery.classList.contains("zoomed")) {
                img.style.transform = "scale(1)";
                img.style.transformOrigin = "center";
            } else {
                img.style.transform = "scale(2.2)";
            }
        });

        // Track mouse or touch panning inside zoomed container
        const handleMove = (e) => {
            if (!gallery.classList.contains("zoomed")) return;
            const rect = gallery.getBoundingClientRect();
            let pointerX = 0;
            let pointerY = 0;

            if (e.touches && e.touches[0]) {
                pointerX = e.touches[0].clientX - rect.left;
                pointerY = e.touches[0].clientY - rect.top;
            } else {
                pointerX = e.clientX - rect.left;
                pointerY = e.clientY - rect.top;
            }

            const xPercent = Math.max(0, Math.min(100, (pointerX / rect.width) * 100));
            const yPercent = Math.max(0, Math.min(100, (pointerY / rect.height) * 100));
            img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        };

        gallery.addEventListener("mousemove", handleMove);
        gallery.addEventListener("touchmove", handleMove, { passive: true });
    }

    // Mobile Menu Drawer (Legacy listeners removed, handled inline by Prada Side Menu)



    // Live Image Upload Previews for Admin Panel
    const prodImgFile = document.getElementById("newProdImgFile");
    if (prodImgFile) {
        prodImgFile.addEventListener("change", function() {
            const previewDiv = document.getElementById("newProdImgPreviews");
            if (!previewDiv) return;
            previewDiv.innerHTML = "";
            
            if (this.files && this.files.length > 0) {
                Array.from(this.files).forEach(file => {
                    getFileBase64(file).then(base64 => {
                        const img = document.createElement("img");
                        img.src = base64;
                        img.alt = "Preview";
                        img.style.maxHeight = "100px";
                        img.style.borderRadius = "4px";
                        img.style.border = "1px solid var(--color-border)";
                        img.style.objectFit = "contain";
                        previewDiv.appendChild(img);
                    });
                });
            }
        });
    }

        // Dynamic stock grid generator (Grouped by COLOR first, then SIZES)
    window.updateDynamicInventoryGrid = function() {
        const sizesInput = document.getElementById("newProdSizes");
        const colorsInput = document.getElementById("newProdColors");
        const gridContainer = document.getElementById("dynamicInventoryGrid");
        
        if (!sizesInput || !colorsInput || !gridContainer) return;
        
        const sizes = sizesInput.value.split(",")
            .map(s => s.trim())
            .filter(Boolean);
            
        const colors = colorsInput.value.split(",")
            .map(c => c.trim())
            .filter(Boolean);
            
        const currentValues = {};
        gridContainer.querySelectorAll(".inv-qty-input").forEach(input => {
            const key = input.dataset.key;
            currentValues[key] = input.value;
        });
        
        gridContainer.innerHTML = "";
        
        if (sizes.length === 0 || colors.length === 0) {
            gridContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); font-size: 1.2rem; padding: 1rem 0;">Enter sizes and colors first.</div>`;
            return;
        }
        
        // Group by Color first so all sizes for a color are together side-by-side
        colors.forEach(color => {
            const colorSection = document.createElement("div");
            colorSection.style.gridColumn = "1 / -1";
            colorSection.style.marginBottom = "1.5rem";
            colorSection.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            colorSection.style.border = "1px solid var(--color-border)";
            colorSection.style.padding = "1.5rem";
            colorSection.style.borderRadius = "6px";

            const header = document.createElement("div");
            header.style.fontSize = "1.3rem";
            header.style.fontWeight = "700";
            header.style.color = "var(--color-accent)";
            header.style.letterSpacing = "0.08em";
            header.style.textTransform = "uppercase";
            header.style.marginBottom = "1rem";
            header.style.borderBottom = "1px solid var(--color-border)";
            header.style.paddingBottom = "0.6rem";
            header.innerHTML = `<i class="fa-solid fa-palette" style="margin-right: 0.6rem;"></i>COLOR: ${color}`;
            colorSection.appendChild(header);

            const sizeGrid = document.createElement("div");
            sizeGrid.style.display = "grid";
            sizeGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(140px, 1fr))";
            sizeGrid.style.gap = "1.2rem";

            sizes.forEach(size => {
                const key = `${size}-${color}`;
                const existingVal = currentValues[key] !== undefined ? currentValues[key] : "1";
                
                const cell = document.createElement("div");
                cell.style.display = "flex";
                cell.style.flexDirection = "column";
                cell.style.gap = "0.5rem";
                cell.style.backgroundColor = "var(--color-surface)";
                cell.style.border = "1px solid var(--color-border)";
                cell.style.padding = "1rem";
                cell.style.borderRadius = "4px";
                
                cell.innerHTML = `
                    <span style="font-size: 1.1rem; font-weight: 700; color: var(--color-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${key}">${size} - ${color}</span>
                    <input type="number" class="inv-qty-input" data-key="${key}" min="0" value="${existingVal}" style="width: 100%; height: 38px; padding: 0.5rem; background: var(--color-background); border: 1px solid var(--color-border); color: var(--color-text); border-radius: 4px; font-size: 1.1rem; font-weight: 600;">
                `;
                sizeGrid.appendChild(cell);
            });

            colorSection.appendChild(sizeGrid);
            gridContainer.appendChild(colorSection);
        });
    };

        window.updateColorImagesUploadContainer = function() {
        const colorsInput = document.getElementById("newProdColors");
        const container = document.getElementById("colorImagesUploadContainer");
        if (!colorsInput || !container) return;

        const colors = colorsInput.value.split(",")
            .map(c => c.trim())
            .filter(Boolean);

        const currentImages = {};
        container.querySelectorAll(".color-image-row").forEach(row => {
            const color = row.dataset.color;
            const imgPreview = row.querySelector("img");
            if (imgPreview && imgPreview.src && imgPreview.src !== window.location.href && !imgPreview.src.endsWith("/")) {
                currentImages[color] = imgPreview.src;
            }
        });

        container.innerHTML = "";

        if (colors.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); font-size: 1.2rem; padding: 1rem 0;">Enter colors first.</div>`;
            return;
        }

        colors.forEach(color => {
            const existingImg = currentImages[color] || "";

            const row = document.createElement("div");
            row.classList.add("color-image-row");
            row.dataset.color = color;
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "space-between";
            row.style.gap = "1.5rem";
            row.style.padding = "1.5rem";
            row.style.backgroundColor = "var(--color-surface)";
            row.style.border = "1px solid var(--color-border)";
            row.style.borderRadius = "4px";

            const hasValidImg = existingImg && existingImg.length > 5 && !existingImg.endsWith("/");

            row.innerHTML = `
                <div style="flex: 1;">
                    <span style="font-size: 1.2rem; font-weight: 700; color: var(--color-accent); display: block; margin-bottom: 0.5rem;">${color.toUpperCase()}</span>
                    <input type="file" class="color-img-file-input" accept="image/*" style="width: 100%; font-size: 1.1rem; background: var(--color-background); border: 1px solid var(--color-border); padding: 0.5rem; color: var(--color-text); border-radius: 4px;">
                </div>
                <div class="color-img-preview" style="width: 60px; height: 60px; border-radius: 4px; border: 1px solid var(--color-border); overflow: hidden; background: var(--color-background); display: ${hasValidImg ? 'block' : 'none'}; position: relative; flex-shrink: 0;">
                    <img src="${existingImg}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.style.display='none';">
                    <button type="button" onclick="clearColorSpecificImage('${color}')" style="position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.8); border: none; color: var(--color-error); width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1rem;"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            `;

            const fileInput = row.querySelector(".color-img-file-input");
            fileInput.addEventListener("change", function() {
                const file = this.files[0];
                if (file) {
                    getFileBase64(file).then(base64 => {
                        const previewDiv = row.querySelector(".color-img-preview");
                        const previewImg = previewDiv.querySelector("img");
                        previewImg.src = base64;
                        previewDiv.style.display = "block";
                    });
                }
            });

            container.appendChild(row);
        });
    };

    window.clearColorSpecificImage = function(color) {
        const row = document.querySelector(`.color-image-row[data-color="${color}"]`);
        if (row) {
            const fileInput = row.querySelector(".color-img-file-input");
            const previewDiv = row.querySelector(".color-img-preview");
            if (fileInput) fileInput.value = "";
            if (previewDiv) {
                previewDiv.style.display = "none";
                const img = previewDiv.querySelector("img");
                if (img) img.src = "";
            }
        }
    };

    const newProdSizesInput = document.getElementById("newProdSizes");
    const newProdColorsInput = document.getElementById("newProdColors");
    if (newProdSizesInput) {
        newProdSizesInput.addEventListener("input", window.updateDynamicInventoryGrid);
    }
    if (newProdColorsInput) {
        newProdColorsInput.addEventListener("input", () => {
            window.updateDynamicInventoryGrid();
            window.updateColorImagesUploadContainer();
        });
    }

    const brandImgFile = document.getElementById("newBrandImgFileInput");
    if (brandImgFile) {
        brandImgFile.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                getFileBase64(file).then(base64 => {
                    const previewDiv = document.getElementById("newBrandImgPreview");
                    const previewImg = previewDiv.querySelector("img");
                    previewImg.src = base64;
                    previewDiv.style.display = "block";
                });
            }
        });
    }

    const catImgFile = document.getElementById("newCategoryImgFileInput");
    if (catImgFile) {
        catImgFile.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                getFileBase64(file).then(base64 => {
                    const previewDiv = document.getElementById("newCategoryImgPreview");
                    const previewImg = previewDiv.querySelector("img");
                    previewImg.src = base64;
                    previewDiv.style.display = "block";
                });
            }
        });
    }

    // Sub-category image preview
    const subCatImgFile = document.getElementById("newSubCategoryImgFileInput");
    if (subCatImgFile) {
        subCatImgFile.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                getFileBase64(file).then(base64 => {
                    const previewDiv = document.getElementById("newSubCategoryImgPreview");
                    if (previewDiv) {
                        const previewImg = previewDiv.querySelector("img");
                        if (previewImg) previewImg.src = base64;
                        previewDiv.style.display = "block";
                    }
                });
            }
        });
    }

    window.updateDefaultSizesAndInventoryGrid = function() {
        const deptSelect = document.getElementById("newProdDept");
        const categorySelect = document.getElementById("newProdCategory");
        const sizesInput = document.getElementById("newProdSizes");
        
        if (!deptSelect || !categorySelect || !sizesInput) return;
        
        const dept = deptSelect.value;
        const category = categorySelect.value;
        const catUpper = (category || "").toUpperCase();
        const isFootwear = category === "Footwear" || catUpper.includes("SHOE") || catUpper.includes("SNEAKER") || catUpper.includes("SLIDE") || catUpper.includes("BOOT");
        
        let defaultSizes = "S, M, L, XL";
        
        if (isFootwear) {
            if (dept === "Men") {
                defaultSizes = "40, 41, 42, 43, 44, 45";
            } else if (dept === "Women") {
                defaultSizes = "36, 37, 38, 39, 40, 41";
            } else if (dept === "Kids") {
                defaultSizes = "26, 28, 30, 32, 34";
            } else {
                defaultSizes = "38, 39, 40, 41, 42, 43";
            }
        } else if (dept === "Kids") {
            defaultSizes = "2Y, 4Y, 6Y, 8Y, 10Y";
        }
        
        sizesInput.value = defaultSizes;
        
        if (window.updateDynamicInventoryGrid) {
            window.updateDynamicInventoryGrid();
        }
    };

    const prodDeptSelect = document.getElementById("newProdDept");
    if (prodDeptSelect) {
        prodDeptSelect.addEventListener("change", () => {
            updateCategoriesDatalist();
            window.updateDefaultSizesAndInventoryGrid();
        });
    }

    const prodCategorySelect = document.getElementById("newProdCategory");
    if (prodCategorySelect) {
        prodCategorySelect.addEventListener("change", () => {
            window.updateDefaultSizesAndInventoryGrid();
        });
    }

    document.querySelectorAll(".hero-slide-input").forEach(input => {
        input.addEventListener("change", function() {
            const idx = this.dataset.index;
            const file = this.files[0];
            if (file) {
                getFileBase64(file).then(base64 => {
                    const previewDiv = document.querySelector(`.hero-slide-preview-container[data-index="${idx}"]`);
                    const previewImg = previewDiv ? previewDiv.querySelector("img") : null;
                    if (previewDiv && previewImg) {
                        previewImg.src = base64;
                        previewDiv.style.display = "block";
                        previewDiv.dataset.base64 = base64;
                        previewDiv.dataset.isChanged = "true";
                    }
                });
            }
        });
    });

    // SPA history back/forward control for admin tabs and overlay
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.admin) {
            if (currentAdminStaff) {
                adminPanelOverlay.classList.add("active");
                document.body.style.overflow = "hidden";
                const floatingBtn = document.getElementById("floatingAdminDashboardBtn");
                if (floatingBtn) floatingBtn.style.display = "none";
                if (event.state.tab) {
                    switchAdminTab(event.state.tab, false);
                }
            } else {
                adminPanelOverlay.classList.remove("active");
                document.body.style.overflow = "";
            }
        } else {
            const container = document.querySelector(".admin-panel-container");
            if (container) container.classList.remove("pos-mode");
            adminPanelOverlay.classList.remove("active");
            document.body.style.overflow = "";
            
            const floatingBtn = document.getElementById("floatingAdminDashboardBtn");
            if (floatingBtn) {
                floatingBtn.style.display = currentAdminStaff ? "flex" : "none";
            }
        }
    });
}

// FORMAT PRICE ACCORDING TO ACTIVE CURRENCY (Always USD)
function formatPrice(priceInUSD) {
    return priceInUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function renderProductPriceHTML(product) {
    if (!product) return '';
    const currentPrice = parseFloat(product.price || 0);
    const rawOld = product.oldPrice !== undefined ? product.oldPrice : 
                  (product.old_price !== undefined ? product.old_price : 
                  (product.originalPrice !== undefined ? product.originalPrice : 
                  (product.original_price !== undefined ? product.original_price : 
                  (product.compare_at_price !== undefined ? product.compare_at_price : product.oldprice))));
    const oldPrice = parseFloat(rawOld || 0);

    const formattedCurrent = formatPrice(currentPrice);

    if (!isNaN(oldPrice) && oldPrice > currentPrice) {
        const formattedOld = formatPrice(oldPrice);
        const discountPct = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
        return `
            <div class="product-price-wrapper" style="display: inline-flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
                <span class="product-price new-price" style="font-weight: 700; color: #e53935; font-size: 1.15em;">${formattedCurrent}</span>
                <span class="product-price old-price" style="text-decoration: line-through; color: #888888; font-weight: 400; font-size: 0.9em; opacity: 0.85;">${formattedOld}</span>
                <span class="discount-badge" style="background-color: #e53935; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px; letter-spacing: 0.05em;">-${discountPct}%</span>
            </div>
        `;
    }

    return `<span class="product-price" style="font-weight: 700; font-size: 1.1em;">${formattedCurrent}</span>`;
}

// SWITCH CURRENCY (guarded for deletion)
function changeCurrency(currency) {
    currentCurrency = currency;
    if (currencyBtn) {
        currencyBtn.textContent = currency === "USD" ? "USD ($)" : "LBP (L.L.)";
    }
    if (currencyDropdown) {
        currencyDropdown.classList.remove("active");
    }
    renderProducts();
    updateCartUI();
    if (activeModalProduct) {
        modalProductPrice.innerHTML = renderProductPriceHTML(activeModalProduct);
    }
}

// Prada-Style Side Navigation Drawer Logic
function togglePradaDrawer(isOpen) {
    const drawer = document.getElementById("pradaDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    if (!drawer || !backdrop) return;

    const isCurrentlyActive = drawer.classList.contains("active");
    const targetState = (isOpen === undefined) ? !isCurrentlyActive : isOpen;

    if (targetState) {
        drawer.classList.add("active");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
        drawer.scrollTo({ left: 0 });
    } else {
        drawer.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
        drawer.scrollTo({ left: 0 });
    }
}

function selectDrawerDept(dept, btnElement) {
    const drawer = document.getElementById("pradaDrawer");
    if (!drawer) return;

    drawer.querySelectorAll(".dept-link").forEach(btn => {
        btn.classList.remove("active");
    });

    if (btnElement) {
        btnElement.classList.add("active");
    }

    renderDrawerCategories(dept);
}

function renderDrawerCategories(dept) {
    const container = document.getElementById("drawerCategoryLinks");
    const titleEl = document.getElementById("selectedDeptTitle");
    if (!container || !titleEl) return;

    titleEl.textContent = `${dept} Categories`;
    container.innerHTML = "";

    // Dynamically retrieve unique categories from products database for the selected department
    const categories = new Set();
    if (window.PRODUCTS && Array.isArray(window.PRODUCTS)) {
        window.PRODUCTS.forEach(p => {
            if (p.department && p.department.trim().toLowerCase() === dept.trim().toLowerCase()) {
                if (p.category) {
                    categories.add(p.category.trim());
                }
            }
        });
    }

    const catList = Array.from(categories).sort();

    // View All button
    const viewAllBtn = document.createElement("button");
    viewAllBtn.className = "drawer-category-btn";
    viewAllBtn.textContent = `View All ${dept}`;
    viewAllBtn.onclick = () => selectDrawerCategory(dept, "All");
    container.appendChild(viewAllBtn);

    catList.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "drawer-category-btn";
        btn.textContent = cat;
        btn.onclick = () => selectDrawerCategory(dept, cat);
        container.appendChild(btn);
    });
}

function selectDrawerCategory(dept, cat) {
    activeDepartment = dept;
    activeCategory = cat;
    
    // Clear search queries for fresh category view
    searchQuery = "";
    const mainSearch = document.getElementById("searchInput");
    if (mainSearch) mainSearch.value = "";
    const drawerSearch = document.getElementById("drawerSearchInput");
    if (drawerSearch) drawerSearch.value = "";

    updateActiveDepartmentUI(dept);
    updateActiveCategoryUI(cat);

    renderProducts();

    const shopSec = document.getElementById("shop-section");
    if (shopSec) {
        shopSec.scrollIntoView({ behavior: "smooth" });
    }

    togglePradaDrawer(false);
}

function updateActiveDepartmentUI(dept) {
    const deptControls = document.getElementById("departmentControls");
    if (deptControls) {
        deptControls.querySelectorAll("button").forEach(btn => {
            if (btn.textContent.trim().toUpperCase() === dept.toUpperCase()) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }
}

function updateActiveCategoryUI(cat) {
    const filterTags = document.getElementById("filterTags");
    if (filterTags) {
        filterTags.querySelectorAll(".filter-tag").forEach(tag => {
            if (tag.textContent.trim().toUpperCase() === cat.toUpperCase()) {
                tag.classList.add("active");
            } else {
                tag.classList.remove("active");
            }
        });
    }
}

function onDrawerSearchInput(query) {
    searchQuery = query.trim();
    const mainSearch = document.getElementById("searchInput");
    if (mainSearch) mainSearch.value = searchQuery;
    renderProducts();
}


// ==========================================================================
// TOP SMART SEARCH BAR HANDLERS
// ==========================================================================
function toggleTopSmartSearch(show) {
    const bar = document.getElementById("topSmartSearchBar");
    const input = document.getElementById("topSearchInput");
    const dropdown = document.getElementById("topSearchResultsDropdown");
    
    if (show === undefined) {
        show = !bar || bar.style.display === "none";
    }

    if (show) {
        if (bar) {
            bar.style.display = "block";
            bar.classList.add("active");
        }
        if (input) {
            input.value = "";
            setTimeout(() => {
                try { input.focus(); } catch(e){}
            }, 100);
            onTopSearchInput("");
        }
    } else {
        if (bar) {
            bar.classList.remove("active");
            bar.style.display = "none";
        }
        if (dropdown) dropdown.style.display = "none";
    }
}

function openPradaSearch(e) {
    if (e && e.preventDefault) e.preventDefault();
    togglePradaHeaderSearch(true);
}

function clearTopSearch() {
    const input = document.getElementById("topSearchInput");
    if (input) {
        input.value = "";
        input.focus();
        onTopSearchInput("");
    }
}

function onTopSearchKeyDown(e) {
    if (e.key === "Escape") {
        toggleTopSmartSearch(false);
    } else if (e.key === "Enter") {
        const input = document.getElementById("topSearchInput");
        const val = input ? input.value.trim() : "";
        if (val) {
            toggleTopSmartSearch(false);
            activeCategory = "All";
            activeDepartment = "All";
            searchQuery = val.toLowerCase();
            const shopSec = document.getElementById("shop-section");
            const collectionsGridSec = document.getElementById("collections");
            if (collectionsGridSec) collectionsGridSec.style.display = "none";
            if (shopSec) shopSec.style.display = "block";
            renderProducts();
            if (shopSec) shopSec.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function onTopSearchInput(val) {
    const query = val.trim().toLowerCase();
    const clearBtn = document.getElementById("topSearchClearBtn");
    const dropdown = document.getElementById("topSearchResultsDropdown");

    if (clearBtn) clearBtn.style.display = query ? "block" : "none";
    if (!dropdown) return;

    if (!query) {
        dropdown.style.display = "none";
        dropdown.innerHTML = "";
        return;
    }

    const allProds = PRODUCTS || [];
    const matched = allProds.filter(p => {
        const name = (p.name || "").toLowerCase();
        const brand = getProductBrand(p).toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const dept = (p.department || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        return name.includes(query) || brand.includes(query) || cat.includes(query) || dept.includes(query) || desc.includes(query);
    });

    if (matched.length === 0) {
        dropdown.style.display = "block";
        dropdown.innerHTML = `<div class="top-search-no-results">لا توجد نتائج لـ "${val}"</div>`;
        return;
    }

    dropdown.style.display = "block";
    dropdown.innerHTML = "";

    matched.slice(0, 6).forEach(prod => {
        const item = document.createElement("div");
        item.classList.add("top-search-item");
        const img = getProductMainImage(prod) || "assets/category_accessories.png";
        item.innerHTML = `
            <img src="${img}" alt="${prod.name}">
            <div class="top-search-item-info">
                <span class="top-search-item-brand">${getProductBrand(prod).toUpperCase()}</span>
                <span class="top-search-item-name">${prod.name}</span>
                <span class="top-search-item-price">${parseFloat(prod.price).toFixed(2)}</span>
            </div>
        `;
        item.onclick = () => {
            toggleTopSmartSearch(false);
            openProductModal(prod.id);
        };
        dropdown.appendChild(item);
    });
}


function closePradaSearch() {
    const overlay = document.getElementById("pradaSearchOverlay");
    if (overlay) {
        overlay.classList.remove("active");
        overlay.style.display = "none";
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
        document.body.style.overflow = "";
    }
}

function clearPradaSearch() {
    const input = document.getElementById("pradaSearchInput");
    if (input) {
        input.value = "";
        input.focus();
        handlePradaSearchInput("");
    }
}

function quickSearchTag(tag, btnEl) {
    const input = document.getElementById("pradaSearchInput");
    if (btnEl) {
        const tags = document.querySelectorAll(".search-trending-tags .trending-tag");
        tags.forEach(t => t.classList.remove("active"));
        btnEl.classList.add("active");
    }
    if (input) {
        input.value = tag;
        handlePradaSearchInput(tag);
    }
}

function handleSearchKeyDown(e) {
    if (e.key === "Escape") {
        closePradaSearch();
    } else if (e.key === "Enter") {
        const input = document.getElementById("pradaSearchInput");
        const query = input ? input.value.trim() : "";
        if (query) {
            closePradaSearch();
            const mainSearch = document.getElementById("smartSearchInput");
            if (mainSearch) mainSearch.value = query;
            renderProducts();
            const shopSection = document.getElementById("shop") || document.getElementById("productsSection");
            if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function handlePradaSearchInput(val) {
    const query = val.trim().toLowerCase();
    const clearBtn = document.getElementById("clearPradaSearchBtn");
    const grid = document.getElementById("pradaSearchResultsGrid");
    const noResultsMsg = document.getElementById("noSearchResultsMsg");
    const summaryEl = document.getElementById("searchResultsSummary");

    if (clearBtn) clearBtn.style.display = query ? "block" : "none";

    if (!grid) return;
    grid.innerHTML = "";

    const allProds = PRODUCTS || [];
    
    // Filter active season & visible products
    let availableProds = allProds.filter(p => {
        if (typeof isProductHiddenBySeason === "function" && isProductHiddenBySeason(p)) return false;
        return true;
    });

    const matched = query ? availableProds.filter(p => {
        const name = (p.name || "").toLowerCase();
        const brand = getProductBrand(p).toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const subCat = (p.subcategory || "").toLowerCase();
        const dept = (p.department || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const tags = Array.isArray(p.tags) ? p.tags.join(" ").toLowerCase() : "";
        
        return name.includes(query) || 
               brand.includes(query) || 
               cat.includes(query) || 
               subCat.includes(query) || 
               dept.includes(query) ||
               desc.includes(query) ||
               tags.includes(query);
    }) : availableProds.slice(0, 8);

    // Update Summary Text
    if (summaryEl) {
        if (query) {
            summaryEl.style.display = "block";
            summaryEl.textContent = matched.length > 0 ? `تم العثور على ${matched.length} منتج يطابق "${val}"` : `لا توجد نتائج لـ "${val}"`;
        } else {
            summaryEl.style.display = "block";
            summaryEl.textContent = `منتجات مقترحة لك (${matched.length}):`;
        }
    }

    if (matched.length === 0) {
        if (noResultsMsg) noResultsMsg.style.display = "block";
    } else {
        if (noResultsMsg) noResultsMsg.style.display = "none";
        matched.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.style.cursor = "pointer";
            card.onclick = () => {
                closePradaSearch();
                openProductModal(p.id);
            };
            
            const priceHTML = typeof renderProductPriceHTML === "function" ? renderProductPriceHTML(p) : `<span class="product-price">${formatPrice(p.price)}</span>`;
            
            card.innerHTML = `
                <div class="product-img-wrapper">
                    <img src="${getProductMainImage(p)}" alt="${p.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-brand">${getProductBrand(p)}</div>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-price-wrap">${priceHTML}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

function togglePradaSearch(e) {
    openPradaSearch(e);
}

// Bind search functions to window global scope
window.openPradaSearch = openPradaSearch;
window.closePradaSearch = closePradaSearch;
window.togglePradaSearch = togglePradaSearch;
window.clearPradaSearch = clearPradaSearch;
window.quickSearchTag = quickSearchTag;
window.handleSearchKeyDown = handleSearchKeyDown;
window.handlePradaSearchInput = handlePradaSearchInput;
window.handlePradaSearchInput = handlePradaSearchInput;

// TOGGLE CART SIDEBAR DRAWER
function toggleCartDrawer(isOpen) {
    if (isOpen) {
        cartDrawer.classList.add("active");
        cartBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    } else {
        cartDrawer.classList.remove("active");
        cartBackdrop.classList.remove("active");
        document.body.style.overflow = "";
    }
}

// --- WORLD-CLASS SPA ROUTER & HISTORY SYSTEM ---
let isRestoringState = false;

function updateAppURL(pushHistory = true) {
    if (isRestoringState) return;

    // Clean stray '?' from address bar if present
    if (window.location.search && !window.location.search.includes('social_login')) {
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
    }

    let hash = "";
    let pageTitle = "STYLUXE | Luxury Fashion & Apparel";
    
    // Check if product modal is open
    if (activeModalProduct && productModalBackdrop && productModalBackdrop.classList.contains("active")) {
        hash = `#product/${activeModalProduct.id}`;
        pageTitle = `${activeModalProduct.name.toUpperCase()} | STYLUXE`;
    }
    // Check if admin modal is open
    else if (typeof adminPanelOverlay !== "undefined" && adminPanelOverlay && adminPanelOverlay.classList.contains("active")) {
        const tabName = adminActiveTab || localStorage.getItem("styluxe_admin_active_tab") || "overview";
        hash = `#admin/${tabName}`;
        pageTitle = `ADMIN PORTAL - ${tabName.toUpperCase()} | STYLUXE`;
    }
    // Check shop section / departments / categories
    else {
        const shopSec = document.getElementById("shop-section");
        if (shopSec && shopSec.style.display !== "none") {
            const dept = (activeDepartment || "All");
            const cat = (activeCategory || "All");
            
            if (dept !== "All" && cat !== "All") {
                hash = `#${dept.toLowerCase()}/${encodeURIComponent(cat.toLowerCase())}`;
                pageTitle = `${dept.toUpperCase()}'S ${cat.toUpperCase()} | STYLUXE`;
            } else if (dept !== "All") {
                hash = `#${dept.toLowerCase()}`;
                pageTitle = `${dept.toUpperCase()}'S COLLECTION | STYLUXE`;
            } else if (cat !== "All") {
                hash = `#category/${encodeURIComponent(cat.toLowerCase())}`;
                pageTitle = `${cat.toUpperCase()} | STYLUXE`;
            } else {
                hash = `#shop`;
                pageTitle = `SHOP ALL | STYLUXE`;
            }
        } else {
            hash = `#home`;
            pageTitle = `STYLUXE | Luxury Fashion & Apparel`;
        }
    }

    document.title = pageTitle;

    if (hash && window.location.hash !== hash) {
        if (pushHistory) {
            history.pushState({ hash, activeDepartment, activeCategory, activeModalProductId: activeModalProduct ? activeModalProduct.id : null }, pageTitle, hash);
        } else {
            history.replaceState({ hash, activeDepartment, activeCategory, activeModalProductId: activeModalProduct ? activeModalProduct.id : null }, pageTitle, hash);
        }
    }

    // Backup to localStorage for F5 page refresh
    try {
        localStorage.setItem("styluxe_app_route_state", JSON.stringify({
            activeDepartment: activeDepartment || "All",
            activeCategory: activeCategory || "All",
            activeBrand: activeBrand || "All",
            activeModalProductId: activeModalProduct ? activeModalProduct.id : null,
            hash,
            pageTitle
        }));
    } catch(e){}
}

function restoreAppStateFromURL() {
    isRestoringState = true;

    const urlParams = new URLSearchParams(window.location.search);
    const isAdminQuery = urlParams.get("admin") === "true";
    const adminTabQuery = urlParams.get("tab");

    let hash = window.location.hash.trim();

    // 0. Admin Panel route: ONLY if ?admin=true or #admin is explicitly in URL!
    const savedAdminStaff = sessionStorage.getItem("styluxe_admin_staff") || localStorage.getItem("styluxe_admin_staff");
    if (savedAdminStaff && !currentAdminStaff) {
        try { currentAdminStaff = JSON.parse(savedAdminStaff); } catch(e){}
        currentAdminDept = sessionStorage.getItem("styluxe_admin_dept") || localStorage.getItem("styluxe_admin_dept") || "Global";
        currentAdminPassword = sessionStorage.getItem("styluxe_admin_password") || localStorage.getItem("styluxe_admin_password") || "";
        applyStaffPermissions();
    }

    if (isAdminQuery || hash.startsWith("#admin")) {
        if (currentAdminStaff && adminPanelOverlay) {
            adminPanelOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
            
            const savedTab = localStorage.getItem("styluxe_admin_active_tab") || sessionStorage.getItem("styluxe_admin_active_tab");
            let targetTab = adminTabQuery || (hash.startsWith("#admin/") ? hash.replace("#admin/", "").split("?")[0] : "") || savedTab || "overview";
            
            if (typeof switchAdminTab === "function") {
                switchAdminTab(targetTab, false);
            }
            document.title = `ADMIN PORTAL - ${targetTab.toUpperCase()} | STYLUXE`;
            isRestoringState = false;
            return;
        }
    }

    // Clean social login parameters if present
    if (window.location.search && window.location.search.includes('social_login')) {
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
    }

    // 1. Home page route (default to home on fresh entry)
    if (!hash || hash === "#home" || hash === "#collections") {
        if (typeof closeProductModal === "function") closeProductModal(false);
        if (adminPanelOverlay && !hash.startsWith("#admin") && !isAdminQuery) {
            adminPanelOverlay.classList.remove("active");
            document.body.style.overflow = "";
        }
        showHomePage(false);
        document.title = "STYLUXE | Redefining Modern Streetwear & Luxury";
        isRestoringState = false;
        return;
    }

    // 2. Product Modal route: #product/123
    if (hash.startsWith("#product/")) {
        const prodId = parseInt(hash.replace("#product/", ""));
        if (prodId) {
            const prod = (PRODUCTS || []).find(p => p.id === prodId);
            if (prod) {
                if (prod.department) activeDepartment = prod.department;
                if (prod.category) activeCategory = prod.category;
                
                const shopSec = document.getElementById("shop-section");
                const collectionsGridSec = document.getElementById("collections");
                if (shopSec) shopSec.style.display = "block";
                if (collectionsGridSec) collectionsGridSec.style.display = "none";
                
                renderCategoryTags();
                renderProducts();
                openProductModal(prodId, false);
                document.title = `${prod.name.toUpperCase()} | STYLUXE`;
                isRestoringState = false;
                return;
            }
        }
    }

    // 3. Department / Category routes: #men, #women, #kids, #men/hoodies, #shop, #category/hoodies
    if (typeof closeProductModal === "function") closeProductModal(false);

    const cleanHash = hash.replace("#", "");
    const parts = cleanHash.split("/");

    let dept = "All";
    let cat = "All";

    if (parts[0] === "shop") {
        dept = "All";
        cat = "All";
    } else if (parts[0] === "department") {
        dept = parts[1] || "All";
        cat = parts[2] ? decodeURIComponent(parts[2]) : "All";
    } else if (parts[0] === "category") {
        dept = "All";
        cat = decodeURIComponent(parts[1] || "All");
    } else {
        const lowerFirst = parts[0].toLowerCase();
        if (["men", "women", "kids"].includes(lowerFirst)) {
            dept = lowerFirst.charAt(0).toUpperCase() + lowerFirst.slice(1);
            if (parts[1]) cat = decodeURIComponent(parts[1]);
        }
    }

    filterByDepartment(dept, false);
    if (cat !== "All") {
        filterByCategory(cat, false);
    }

    // Update document title for department / category
    if (dept !== "All" && cat !== "All") {
        document.title = `${dept.toUpperCase()}'S ${cat.toUpperCase()} | STYLUXE`;
    } else if (dept !== "All") {
        document.title = `${dept.toUpperCase()}'S COLLECTION | STYLUXE`;
    } else if (cat !== "All") {
        document.title = `${cat.toUpperCase()} | STYLUXE`;
    } else {
        document.title = `SHOP ALL | STYLUXE`;
    }
    window.scrollTo(0, 0);
    isRestoringState = false;
}

// FILTER BY DEPARTMENT (100% Isolated & Interconnected: WOMEN, MEN, KIDS)
function filterByDepartment(department, updateURL = true) {
    window.isNewArrivalsOnly = false;
    
    // Normalize department name (Women, Men, Kids)
    let deptName = (department || "Women").trim();
    if (deptName.toLowerCase() === "for her") deptName = "Women";
    else if (deptName.toLowerCase() === "for him") deptName = "Men";
    else if (deptName.toLowerCase() === "for kids") deptName = "Kids";
    else if (deptName.toLowerCase() === "all" || deptName.toLowerCase() === "global") deptName = "All";
    else {
        // Capitalize properly
        deptName = deptName.charAt(0).toUpperCase() + deptName.slice(1).toLowerCase();
    }

    activeDepartment = deptName;
    
    // Reset nested subcategory and brand filters
    activeCategory = "All";
    activeBrand = "All";
    const select = document.getElementById("brandFilterSelect");
    if (select) select.value = "All";

    // Synchronize all department button highlights across the page
    syncDepartmentControlsUI();

    // Render components strictly for active department
    renderBrandSlider();
    renderCategoryTags();
    updateWhatsAppPill(activeDepartment);
    renderProducts();

    // Clean section visibility: Hide homepage duplicate cards, show unified shop section
    const collectionsGridSec = document.getElementById("collections");
    const newArrivalsSec = document.getElementById("homeNewArrivalsSection");
    const shopSec = document.getElementById("shop-section");
    const backBtnContainer = document.getElementById("backToCollectionsContainer");

    if (collectionsGridSec) collectionsGridSec.style.display = "none";
    if (newArrivalsSec) newArrivalsSec.style.display = "none";
    if (shopSec) shopSec.style.display = "block";
    if (backBtnContainer) backBtnContainer.style.display = activeDepartment === "All" ? "none" : "block";

    if (updateURL) updateAppURL(true);

    // Smooth scroll down to catalog section
    const targetElement = document.getElementById("shopSectionTitle") || document.getElementById("shop-section");
    if (targetElement && !isRestoringState) {
        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

// Alias for Homepage Department Tabs (WOMEN / MEN / KIDS)
function switchHomeDept(dept, btnElement) {
    filterByDepartment(dept, true);
}

function syncDepartmentControlsUI() {
    const activeUpper = (activeDepartment || "WOMEN").toUpperCase();

    // 1. Sync Mobile / Desktop Department Controls (.dept-tag)
    if (departmentControls) {
        const tags = departmentControls.querySelectorAll(".dept-tag");
        tags.forEach(tag => {
            const text = tag.textContent.trim().toUpperCase();
            if ((activeUpper === "ALL" && text === "ALL DEPARTMENTS") || text === activeUpper) {
                tag.classList.add("active");
            } else {
                tag.classList.remove("active");
            }
        });
    }

    // 2. Sync Main Navigation Links (#navLinks a)
    const navLinksContainer = document.getElementById("navLinks");
    if (navLinksContainer) {
        const navLinks = navLinksContainer.querySelectorAll("a");
        navLinks.forEach(link => {
            const text = link.textContent.trim().toUpperCase();
            if (text === activeUpper) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // 3. Sync Prada Department Tabs (.prada-home-dept-tab: WOMEN / MEN / KIDS)
    const allDeptTabs = document.querySelectorAll(".prada-home-dept-tab");
    allDeptTabs.forEach(btn => {
        const text = btn.textContent.trim().toUpperCase();
        if (text === activeUpper) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // 4. Sync Hero Department Links (.hero-dept-link: FOR HER / FOR HIM / FOR KIDS or WOMEN / MEN / KIDS)
    const heroLinks = document.querySelectorAll(".hero-dept-link");
    heroLinks.forEach(link => {
        const text = link.textContent.trim().toUpperCase();
        const isMatched = text === activeUpper ||
            (activeUpper === "WOMEN" && (text === "FOR HER" || text === "WOMEN")) ||
            (activeUpper === "MEN" && (text === "FOR HIM" || text === "MEN")) ||
            (activeUpper === "KIDS" && (text === "FOR KIDS" || text === "KIDS"));

        if (isMatched) {
            link.classList.add("active");
            link.style.opacity = "1";
            link.style.textDecorationThickness = "3px";
        } else {
            link.classList.remove("active");
            link.style.opacity = "0.75";
            link.style.textDecorationThickness = "1px";
        }
    });
}

function showHomePage(updateURL = true) {
    window.isNewArrivalsOnly = false;
    activeDepartment = "All";
    activeCategory = "All";
    activeBrand = "All";

    // Close any open modals or overlays when clicking home logo
    if (typeof closeProductModal === "function") closeProductModal(false);
    if (typeof closeAuthModal === "function") closeAuthModal();

    // Close Admin Panel Overlay if open
    if (typeof adminPanelOverlay !== "undefined" && adminPanelOverlay) {
        adminPanelOverlay.classList.remove("active");
        const container = document.querySelector(".admin-panel-container");
        if (container) container.classList.remove("pos-mode");
    }
    document.body.style.overflow = "";

    // Show floating CONTROL PANEL button if admin is logged in
    const floatingBtn = document.getElementById("floatingAdminDashboardBtn");
    if (floatingBtn) {
        floatingBtn.style.display = (typeof currentAdminStaff !== "undefined" && currentAdminStaff) ? "flex" : "none";
    }

    const collectionsGridSec = document.getElementById("collections");
    const newArrivalsSec = document.getElementById("homeNewArrivalsSection");
    const shopSec = document.getElementById("shop-section");
    const backBtnContainer = document.getElementById("backToCollectionsContainer");

    if (collectionsGridSec) collectionsGridSec.style.display = "block";
    if (newArrivalsSec) newArrivalsSec.style.display = "none";
    if (shopSec) shopSec.style.display = "block";
    if (backBtnContainer) backBtnContainer.style.display = "none";

    const navLinksContainer = document.getElementById("navLinks");
    if (navLinksContainer) {
        const navLinks = navLinksContainer.querySelectorAll("a");
        navLinks.forEach(link => {
            if (link.textContent.trim().toUpperCase() === "HOME") {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Render 10 Homepage New Arrivals (Women default)
    if (typeof renderHomeNewArrivals === "function") renderHomeNewArrivals('Women');

    // Render Prada Subcategories Bar & Products
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof renderProducts === "function") renderProducts();

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateURL) updateAppURL(true);
}

let DEFAULT_HOMEPAGE_CARDS = [
    // Women Default Cards
    { id: 'w1', dept: 'Women', title: "Women's Bags", category: 'Bags', image: 'assets/category_bags.png' },
    { id: 'w2', dept: 'Women', title: "Women's Ready to Wear", category: 'Ready To Wear', image: 'assets/category_ready_to_wear.png' },
    { id: 'w3', dept: 'Women', title: "Women's Shoes", category: 'Shoes', image: 'assets/category_shoes.png' },
    { id: 'w4', dept: 'Women', title: "Women's Accessories", category: 'Accessories', image: 'assets/category_accessories.png' },
    
    // Men Default Cards
    { id: 'm1', dept: 'Men', title: "Men's Bags", category: 'Bags', image: 'assets/category_bags.png' },
    { id: 'm2', dept: 'Men', title: "Men's Ready to Wear", category: 'Ready To Wear', image: 'assets/category_ready_to_wear.png' },
    { id: 'm3', dept: 'Men', title: "Men's Shoes", category: 'Shoes', image: 'assets/category_shoes.png' },
    { id: 'm4', dept: 'Men', title: "Men's Accessories", category: 'Accessories', image: 'assets/category_accessories.png' },

    // Kids Default Cards
    { id: 'k1', dept: 'Kids', title: "Kids' Bags", category: 'Bags', image: 'assets/category_bags.png' },
    { id: 'k2', dept: 'Kids', title: "Kids' Ready to Wear", category: 'Ready To Wear', image: 'assets/category_ready_to_wear.png' },
    { id: 'k3', dept: 'Kids', title: "Kids' Shoes", category: 'Shoes', image: 'assets/category_shoes.png' },
    { id: 'k4', dept: 'Kids', title: "Kids' Accessories", category: 'Accessories', image: 'assets/category_accessories.png' }
];

const savedCardsStr = localStorage.getItem("styluxe_home_category_cards");
let HOMEPAGE_CATEGORY_CARDS = savedCardsStr !== null ? (function(){ try { return JSON.parse(savedCardsStr); } catch(e){ return DEFAULT_HOMEPAGE_CARDS; } })() : DEFAULT_HOMEPAGE_CARDS;

function saveHomepageCardsToStorage() {
    localStorage.setItem("styluxe_home_category_cards", JSON.stringify(HOMEPAGE_CATEGORY_CARDS));
    fetch('/api/homepage-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(HOMEPAGE_CATEGORY_CARDS)
    }).catch(err => console.error("Sync homepage cards to server error:", err));
}

// Prada Homepage Department Switcher (WOMEN / MEN / KIDS) - Dynamic from Settings/LocalStorage
function switchHomeDept(dept, btnElement) {
    const tabsContainer = document.getElementById("pradaHomeDeptTabs");
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll(".prada-home-dept-tab");
        tabs.forEach(t => t.classList.remove("active"));
        if (btnElement) btnElement.classList.add("active");
    }

    const grid = document.getElementById("homepageCategoryGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const deptNorm = (dept || "All").trim().toLowerCase();

    // Extract root categories created by user
    let rootCategories = [];
    if (Array.isArray(CATEGORIES)) {
        rootCategories = CATEGORIES.filter(c => {
            if (!c || !c.name || c.parentId) return false;
            const cDept = (c.department || "").trim().toLowerCase();
            return deptNorm === "all" || deptNorm === "global" || !cDept || cDept === "all" || cDept === "global" || cDept === deptNorm;
        });
    }

    // Fallback if specific department is empty, show all root categories created by user
    if (rootCategories.length === 0 && Array.isArray(CATEGORIES)) {
        rootCategories = CATEGORIES.filter(c => c && c.name && !c.parentId);
    }

    if (rootCategories.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 3rem; font-size: 1.3rem;">No categories created yet. Create a category in Admin -> Categories.</div>`;
        return;
    }

    rootCategories.forEach(cat => {
        const cardEl = document.createElement("div");
        cardEl.classList.add("collection-card");
        cardEl.style.position = "relative";
        cardEl.style.cursor = "pointer";

        const subCount = CATEGORIES.filter(s => s.parentId === cat.id).length;

        cardEl.onclick = () => {
            if (cat.department) filterByDepartment(cat.department);
            filterByCategory(cat.name);
        };

        cardEl.innerHTML = `
            <div class="collection-card-img-wrapper"><img src="${cat.img || 'assets/category_ready_to_wear.png'}" alt="${cat.name}"></div>
            <h3 class="collection-card-title">${cat.name.toUpperCase()}</h3>
            ${subCount > 0 ? `<div style="font-size: 0.95rem; color: var(--color-accent, #c9a96e); text-align: center; margin-top: 0.3rem; letter-spacing: 0.1em; font-weight: 600;"><i class="fa-solid fa-layer-group" style="margin-right: 0.4rem;"></i>${subCount} SUB-CATEGORIES</div>` : ''}
        `;
        grid.appendChild(cardEl);
    });
}

function showCollectionsGrid() {
    showHomePage();
}

// FILTER BY CATEGORY
function filterByCategory(category, btnElement = null, updateURL = true) {
    if (typeof btnElement === "function" || typeof btnElement === "boolean") {
        updateURL = btnElement;
        btnElement = null;
    }

    activeCategory = category;

    // Toggle section visibility to show product list
    const collectionsGridSec = document.getElementById("collections");
    const shopSec = document.getElementById("shop-section");
    if (collectionsGridSec) collectionsGridSec.style.display = "none";
    if (shopSec) shopSec.style.display = "block";

    if (typeof renderStorefrontCategoryCards === "function") renderStorefrontCategoryCards();
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof renderProducts === "function") renderProducts();

    if (updateURL) updateAppURL(true);

    const targetElement = document.getElementById("shopCategoryCardsSection") || document.getElementById("shop-section");
    if (targetElement && !isRestoringState) {
        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

// SORT PRODUCTS
function sortProducts() {
    renderProducts();
}

// SMART SEARCH HANDLERS
function onSmartSearchInput(val) {
    searchQuery = val.toLowerCase();
    
    // Sync header navbar search input if present
    const navInput = document.getElementById("searchInput");
    if (navInput) navInput.value = val;

    const collectionsGridSec = document.getElementById("collections");
    const shopSec = document.getElementById("shop-section");
    if (searchQuery.trim() !== "") {
        if (collectionsGridSec) collectionsGridSec.style.display = "none";
        if (shopSec) shopSec.style.display = "block";
    }

    renderProducts();
}

function executeSmartSearch() {
    const smartInput = document.getElementById("smartSearchInput");
    if (smartInput) {
        onSmartSearchInput(smartInput.value);
    }
}

// FILTER AND SORT PRODUCTS COMBINED
function getFilteredAndSortedProducts() {
    let result = [...PRODUCTS];

    // Global Manager Active Season Filter ("Summer", "Winter", "All")
    const activeSeason = STORE_SETTINGS.active_season || "All";
    if (activeSeason && activeSeason !== "All") {
        result = result.filter(p => {
            const pSeason = (p.season || "All").trim().toLowerCase();
            if (pSeason === "all" || pSeason === "all seasons" || pSeason === "جميع المواسم") return true;
            return pSeason === activeSeason.trim().toLowerCase();
        });
    }

    // Department Filter
    if (activeDepartment && activeDepartment !== "All") {
        result = result.filter(p => p.department && p.department.trim().toLowerCase() === activeDepartment.trim().toLowerCase());
    }

    // Brand Filter (Filter products strictly by clicked brand circle!)
    if (activeBrand && activeBrand !== "All") {
        const activeBrandNorm = normCatName(activeBrand);
        result = result.filter(p => {
            if (!p.brand) return false;
            return normCatName(p.brand) === activeBrandNorm;
        });
    }

    // Category Filter – flexible subcategory & singular/plural matching
    if (activeCategory && activeCategory !== "All") {
        const activeCatLower = normCatName(activeCategory);
        let allowedCatNames = [activeCatLower];

        const isReadyToWear = activeCatLower.includes("ready to wear");
        if (isReadyToWear) {
            allowedCatNames.push(
                "ready to wear", "t-shirts", "t-shirt", "shirts", "jackets", "jeans",
                "hoodies", "dresses", "tops", "pants", "activewear",
                "outerwear", "denim", "knitwear", "trousers", "swimwear", "leather"
            );
        }

        const isTshirt = activeCatLower.includes("t-shirt") || activeCatLower.includes("tshirt") || activeCatLower.includes("polo");
        if (isTshirt) {
            allowedCatNames.push("t-shirt", "t-shirts", "tshirt", "tshirts", "polo", "polos", "short-sleeve shirt");
        }

        // Add any subcategories linked in CATEGORIES array
        if (CATEGORIES && Array.isArray(CATEGORIES)) {
            const parentCatObjs = CATEGORIES.filter(c =>
                !c.parentId && (normCatName(c.name) === activeCatLower || (isReadyToWear && normCatName(c.name).includes("ready to wear")))
            );
            parentCatObjs.forEach(parent => {
                CATEGORIES.filter(c => c.parentId === parent.id).forEach(sub => {
                    allowedCatNames.push(normCatName(sub.name));
                });
            });
        }

        result = result.filter(p => {
            if (!p.category) return false;
            const pCat = normCatName(p.category);
            return allowedCatNames.some(ac => 
                pCat === ac || 
                pCat.includes(ac) || 
                ac.includes(pCat) || 
                pCat.replace(/s$/, '') === ac.replace(/s$/, '')
            );
        });
    }

    // Sort Selector (Prada Sorting options: SUGGESTED, NEWEST, PRICE: LOW TO HIGH, PRICE: HIGH TO LOW)
    const sortVal = window.currentSortMode || (sortSelect && sortSelect.value ? sortSelect.value : "default");
    if (sortVal === "price-low") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-high") {
        result.sort((a, b) => b.price - a.price);
    } else if (sortVal === "newest") {
        result.sort((a, b) => b.id - a.id);
    } else {
        // Default / Featured: Sort by priority (ascending) and fallback to newest products (descending ID)
        result.sort((a, b) => {
            const pa = a.priority !== undefined ? a.priority : 1000;
            const pb = b.priority !== undefined ? b.priority : 1000;
            if (pa !== pb) return pa - pb;
            return b.id - a.id;
        });
    }

    return result;
}

function renderVisualCategories() {
    const visualContainer = document.getElementById("visualCategoriesContainer");
    if (visualContainer) visualContainer.style.display = "none";
}

function renderCategoryTags() {
    const bar = document.getElementById("pradaSubcategoriesBar");
    if (!bar) return;

    bar.innerHTML = "";

    const activeDept = (activeDepartment || "All").trim();
    const activeDeptLower = normCatName(activeDept);
    const activeCatNorm = normCatName(activeCategory || "All");

    const categoryList = [];

    // IF activeCategory is NOT "All", check parent/sub-category hierarchy context
    if (activeCategory && activeCatNorm !== "all") {
        let parentCat = CATEGORIES.find(c => c && c.name && normCatName(c.name) === activeCatNorm && !c.parentId);
        if (!parentCat) {
            parentCat = CATEGORIES.find(c => c && c.name && normCatName(c.name) === activeCatNorm);
        }

        if (parentCat) {
            // Add Parent Category itself
            categoryList.push({ name: parentCat.name, isParent: true });
            
            // Add all sub-categories of this parent
            const subCats = getSubCategoriesForParent(parentCat);
            subCats.forEach(sub => {
                categoryList.push({ name: sub.name, isSub: true });
            });
        } else {
            // Check if activeCategory is itself a subcategory
            const subCatObj = CATEGORIES.find(c => c && c.name && normCatName(c.name) === activeCatNorm && c.parentId);
            if (subCatObj) {
                const pObj = CATEGORIES.find(c => String(c.id) === String(subCatObj.parentId));
                if (pObj) {
                    categoryList.push({ name: pObj.name, isParent: true });
                    const siblingSubCats = getSubCategoriesForParent(pObj);
                    siblingSubCats.forEach(sub => {
                        categoryList.push({ name: sub.name, isSub: true });
                    });
                } else {
                    categoryList.push({ name: subCatObj.name, isSub: true });
                }
            } else {
                categoryList.push({ name: activeCategory });
            }
        }
    } else {
        // Active category is "All": List all root categories created by user for THIS SPECIFIC department ONLY
        if (Array.isArray(CATEGORIES)) {
            CATEGORIES.forEach(c => {
                if (!c || !c.name || c.parentId) return;
                const cDept = normCatName(c.department);
                if (activeDeptLower === "all" || activeDeptLower === "global") {
                    categoryList.push({ name: c.name, isParent: true });
                } else if (cDept === activeDeptLower) {
                    categoryList.push({ name: c.name, isParent: true });
                }
            });
        }
    }

    // View All button
    const viewAllBtn = document.createElement("button");
    viewAllBtn.className = "prada-subcat-btn" + ((!activeCategory || activeCatNorm === "all") ? " active" : "");
    viewAllBtn.textContent = "ALL";
    viewAllBtn.onclick = function() { filterByCategory("All", this); };
    bar.appendChild(viewAllBtn);

    // Render unique text category buttons
    const seen = new Set();
    categoryList.forEach(item => {
        const catName = item.name.trim();
        const norm = normCatName(catName);
        if (seen.has(norm)) return;
        seen.add(norm);

        const btn = document.createElement("button");
        const isActive = activeCatNorm === norm;
        btn.className = "prada-subcat-btn" + (isActive ? " active" : "");
        btn.textContent = catName.toUpperCase();
        btn.onclick = function() { filterByCategory(catName, this); };
        bar.appendChild(btn);
    });

    bar.style.display = "flex";
}
window.renderCategoryTags = renderCategoryTags;

// --------------------------------------------------------------------------
// 10-ITEM NEW ARRIVALS HANDLERS (HOMEPAGE & CATEGORY VIEWS)
// --------------------------------------------------------------------------

function renderCardMediaHTML(p, cardId, img0) {
    if (p && p.video) {
        return `<video src="${p.video}" autoplay loop muted playsinline class="card-prod-video" style="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none;"></video>`;
    }
    return `<img id="prodCardImg_${cardId}" class="card-prod-img" src="${img0}" alt="${p.name}" loading="lazy" decoding="async">`;
}

// RENDER HOMEPAGE NEW ARRIVALS (10 ITEMS PER DEPT)
function renderHomeNewArrivals(department = "Women") {
    const sec = document.getElementById("homeNewArrivalsSection");
    const grid = document.getElementById("homeNewArrivalsGrid");
    if (!grid || !PRODUCTS || PRODUCTS.length === 0) return;

    let filtered = PRODUCTS.filter(p => p.department && p.department.toLowerCase() === department.toLowerCase());
    if (filtered.length === 0) {
        filtered = PRODUCTS;
    }

    grid.innerHTML = "";
    const top10 = [...filtered].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 10);

    const frag1 = document.createDocumentFragment();
    top10.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.setAttribute("data-product-id", `home_new_${p.id}`);
        const badgeHTML = `<span class="product-badge">NEW ARRIVAL</span>`;
        const [img0, img1] = getProductPreviewImages(p);

        card.innerHTML = `
            ${badgeHTML}
            <div class="product-img-wrapper" onclick="openProductModal(${p.id})">
                ${renderCardMediaHTML(p, `home_new_${p.id}`, img0)}
                <div class="product-quick-view">
                    <button class="quick-view-btn">QUICK VIEW</button>
                </div>
            </div>
            <div class="product-info" onclick="openProductModal(${p.id})">
                <div class="product-brand">${getProductBrand(p)}</div>
                <h3 class="product-name">${p.name}</h3>
                ${renderProductPriceHTML(p)}
                <div class="product-color-dots" onclick="event.stopPropagation()">
                    <span class="card-color-dot active" data-idx="0" onclick="switchCardColorPreview('home_new_${p.id}', 0, '${img0}', event)"></span>
                    <span class="card-color-dot" data-idx="1" onclick="switchCardColorPreview('home_new_${p.id}', 1, '${img1}', event)"></span>
                </div>
            </div>
        `;
        frag1.appendChild(card);
        setupCardSwipeEvents(card, `home_new_${p.id}`, img0, img1);
    });
    grid.appendChild(frag1);
}

function switchNewArrivalsDept(department, btnElement) {
    const tabsContainer = document.getElementById("newArrivalsDeptTabs");
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll(".prada-home-dept-tab");
        tabs.forEach(t => t.classList.remove("active"));
        if (btnElement) btnElement.classList.add("active");
    }
    renderHomeNewArrivals(department);
}

function renderCategoryNewArrivals() {
    const sec = document.getElementById("categoryNewArrivalsSection");
    const titleEl = document.getElementById("categoryNewArrivalsTitle");
    const grid = document.getElementById("categoryNewArrivalsGrid");

    if (!sec || !grid) return;

    if (activeDepartment === "All" && activeCategory === "All") {
        sec.style.display = "none";
        return;
    }

    let filtered = [...PRODUCTS];
    if (activeDepartment !== "All") {
        filtered = filtered.filter(p => p.department && p.department.toLowerCase() === activeDepartment.toLowerCase());
    }
    if (activeCategory !== "All") {
        filtered = filtered.filter(p => p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    if (filtered.length === 0) {
        sec.style.display = "none";
        return;
    }

    sec.style.display = "block";
    if (titleEl) {
        let catTitle = activeDepartment !== "All" ? activeDepartment.toUpperCase() : "CATEGORY";
        if (activeCategory !== "All") catTitle += ` ${activeCategory.toUpperCase()}`;
        titleEl.textContent = `${catTitle} · 10 NEW ARRIVALS`;
    }

    grid.innerHTML = "";
    const cat10 = [...filtered].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 10);

    const frag2 = document.createDocumentFragment();
    cat10.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.setAttribute("data-product-id", `cat_new_${p.id}`);
        const badgeHTML = `<span class="product-badge">NEW ARRIVAL</span>`;
        const [img0, img1] = getProductPreviewImages(p);

        card.innerHTML = `
            ${badgeHTML}
            <div class="product-img-wrapper" onclick="openProductModal(${p.id})">
                ${renderCardMediaHTML(p, `cat_new_${p.id}`, img0)}
                <div class="product-quick-view">
                    <button class="quick-view-btn">QUICK VIEW</button>
                </div>
            </div>
            <div class="product-info" onclick="openProductModal(${p.id})">
                <div class="product-brand">${getProductBrand(p)}</div>
                <h3 class="product-name">${p.name}</h3>
                ${renderProductPriceHTML(p)}
                <div class="product-color-dots" onclick="event.stopPropagation()">
                    <span class="card-color-dot active" data-idx="0" onclick="switchCardColorPreview('cat_new_${p.id}', 0, '${img0}', event)"></span>
                    <span class="card-color-dot" data-idx="1" onclick="switchCardColorPreview('cat_new_${p.id}', 1, '${img1}', event)"></span>
                </div>
            </div>
        `;
        frag2.appendChild(card);
        setupCardSwipeEvents(card, `cat_new_${p.id}`, img0, img1);
    });
    grid.appendChild(frag2);
}

function getSubCategoriesForParent(parentCat) {
    if (!parentCat || !Array.isArray(CATEGORIES)) return [];

    const parentIdStr = String(parentCat.id !== undefined && parentCat.id !== null ? parentCat.id : "").trim();
    const parentNameNorm = normCatName(parentCat.name);

    return CATEGORIES.filter(c => {
        if (!c || !c.name) return false;
        
        // 1. Check parentId string match
        if (c.parentId !== undefined && c.parentId !== null && String(c.parentId).trim() === parentIdStr) {
            return true;
        }
        // 2. Check parentName match
        if (c.parentName && normCatName(c.parentName) === parentNameNorm) {
            return true;
        }
        // 3. Check parentCategory match
        if (c.parentCategory && normCatName(c.parentCategory) === parentNameNorm) {
            return true;
        }
        return false;
    });
}

function renderStorefrontCategoryCards() {
    const container = document.getElementById("shopCategoryCardsSection");
    if (!container) return;

    container.innerHTML = "";

    const activeDept = (activeDepartment || "All").trim();
    const activeDeptLower = normCatName(activeDept);
    const activeCatNorm = normCatName(activeCategory || "All");

    // IF activeCategory is "All": Display Parent Category Image Cards for active department ONLY!
    if (!activeCategory || activeCatNorm === "all") {
        let parentCats = [];
        if (Array.isArray(CATEGORIES)) {
            parentCats = CATEGORIES.filter(c => {
                if (!c || !c.name || c.parentId) return false;
                if (!activeDeptLower || activeDeptLower === "all" || activeDeptLower === "global") return true;
                const cDept = normCatName(c.department || "");
                return cDept === activeDeptLower || !cDept;
            });
        }

        if (parentCats.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3.5rem 1rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 3rem;">
                    <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--color-accent, #c9a96e); margin-bottom: 1rem; display: block;"></i>
                    <h3 style="font-family: var(--font-heading); font-size: 1.3rem; letter-spacing: 0.1em; color: var(--color-text); margin-bottom: 0.5rem;">قسم ${activeDept.toUpperCase()} خالٍ حالياً من التصنيفات</h3>
                    <p style="font-size: 1.05rem; color: var(--color-text-muted); margin: 0;">يمكنك الآن إضافة تصنيفات مخصصة لقسم ${activeDept.toUpperCase()} من لوحة التحكم (Admin Panel -> Categories)</p>
                </div>
            `;
            return;
        }

        // Grid of Parent Category Image Cards
        const grid = document.createElement("div");
        grid.className = "collections-grid";
        grid.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2.5rem; margin-bottom: 3rem;";

        parentCats.forEach(cat => {
            const card = document.createElement("div");
            card.className = "collection-card";
            card.style.cssText = "cursor: pointer; position: relative; border: 1px solid var(--color-border); border-radius: 8px; overflow: hidden; background: var(--color-surface); transition: transform 0.3s ease;";

            const subCount = getSubCategoriesForParent(cat).length;

            card.onclick = () => {
                filterByCategory(cat.name);
            };

            card.innerHTML = `
                <div class="collection-card-img-wrapper" style="height: 380px; width: 100%; background: #ffffff; display: flex; align-items: center; justify-content: center; padding: 1.5rem; overflow: hidden; border-radius: 6px;">
                    <img src="${cat.img || cat.image || 'assets/category_ready_to_wear.png'}" alt="${cat.name}" style="max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;">
                </div>
                <div style="padding: 1.5rem; text-align: center;">
                    <h3 class="collection-card-title" style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text); margin: 0;">${cat.name}</h3>
                    ${subCount > 0 ? `<div style="font-size: 0.95rem; color: var(--color-accent, #c9a96e); margin-top: 0.5rem; letter-spacing: 0.1em; font-weight: 600;"><i class="fa-solid fa-layer-group" style="margin-right: 0.4rem;"></i>${subCount} SUB-CATEGORIES</div>` : ''}
                </div>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    } 
    // IF activeCategory is SELECTED (e.g. READY TO WEAR or JEANS): Display Back Button & Sub-Category Image Cards!
    else {
        let parentCat = null;
        const targetCat = CATEGORIES.find(c => c && c.name && normCatName(c.name) === activeCatNorm);
        
        if (targetCat) {
            if (targetCat.parentId) {
                // targetCat is itself a sub-category, find its parent category!
                parentCat = CATEGORIES.find(c => String(c.id) === String(targetCat.parentId));
            } else {
                parentCat = targetCat;
            }
        }

        const subCats = parentCat ? getSubCategoriesForParent(parentCat) : (targetCat ? [targetCat] : []);
        const displayTitle = (parentCat ? parentCat.name : activeCategory).toUpperCase();

        // Header and Back Button
        const headerDiv = document.createElement("div");
        headerDiv.style.cssText = "margin-bottom: 2.5rem;";
        headerDiv.innerHTML = `
            <button onclick="filterByCategory('All')" style="background: var(--color-surface-hover); border: 1px solid var(--color-border); border-radius: 4px; padding: 0.8rem 1.8rem; color: var(--color-accent, #c9a96e); font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; letter-spacing: 0.1em; cursor: pointer; margin-bottom: 2rem; transition: all 0.2s ease;">
                <i class="fa-solid fa-arrow-left" style="margin-right: 0.8rem;"></i> BACK TO ALL CATEGORIES
            </button>
            <div class="section-header">
                <h2 class="section-title">${displayTitle} ${subCats.length > 0 ? 'SUB-CATEGORIES' : ''}</h2>
                <div class="section-line"></div>
            </div>
        `;
        container.appendChild(headerDiv);

        // Sub-Category Image Cards Grid
        if (subCats.length > 0) {
            const subGrid = document.createElement("div");
            subGrid.className = "collections-grid";
            subGrid.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2.5rem; margin-bottom: 3rem;";

            subCats.forEach(sub => {
                const isSelectedSub = normCatName(sub.name) === activeCatNorm;
                const card = document.createElement("div");
                card.className = "collection-card" + (isSelectedSub ? " active" : "");
                card.style.cssText = `cursor: pointer; position: relative; border: ${isSelectedSub ? '2px solid var(--color-accent, #c9a96e)' : '1px solid var(--color-border)'}; border-radius: 8px; overflow: hidden; background: var(--color-surface); transition: transform 0.3s ease;`;

                card.onclick = () => {
                    filterByCategory(sub.name);
                };

                card.innerHTML = `
                    <div class="collection-card-img-wrapper" style="height: 350px; width: 100%; background: #ffffff; display: flex; align-items: center; justify-content: center; padding: 1.5rem; overflow: hidden; border-radius: 6px;">
                        <img src="${sub.img || 'assets/category_ready_to_wear.png'}" alt="${sub.name}" style="max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;">
                    </div>
                    <div style="padding: 1.2rem; text-align: center;">
                        <h4 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${isSelectedSub ? 'var(--color-accent, #c9a96e)' : 'var(--color-text)'}; margin: 0;">${sub.name}</h4>
                    </div>
                `;
                subGrid.appendChild(card);
            });

            container.appendChild(subGrid);
        }
    }
}

// RENDER PRODUCTS TO GRID
function renderProducts() {
    // Hide visual categories container
    const visualContainer = document.getElementById("visualCategoriesContainer");
    if (visualContainer) visualContainer.style.display = "none";

    // Always render category image cards grid
    renderStorefrontCategoryCards();

    // Always render category sub-bar
    renderCategoryTags();

    // Render 10 category specific New Arrivals
    renderCategoryNewArrivals();

    // Update page title
    const shopSectionTitle = document.querySelector("#shop-section .section-title");
    if (shopSectionTitle) {
        let titleText = "SHOP ALL";
        if (activeDepartment !== "All") {
            titleText = `${activeDepartment.toUpperCase()}'S`;
            if (activeCategory !== "All") titleText += ` ${activeCategory.toUpperCase()}`;
            else titleText += " COLLECTION";
        } else if (activeCategory !== "All") {
            titleText = activeCategory.toUpperCase();
        }
        shopSectionTitle.textContent = titleText;
    }

    const list = getFilteredAndSortedProducts();

    productGrid.style.display = "";
    productGrid.innerHTML = "";

    if (list.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products-message" style="grid-column: 1 / -1; text-align: center; padding: 6rem 0; color: var(--color-text-muted);">
                <i class="fa-solid fa-face-frown" style="font-size: 4rem; margin-bottom: 2rem; display: block;"></i>
                <p style="font-size: 1.6rem; letter-spacing: 0.1em;">NO PRODUCTS FOUND.</p>
            </div>
        `;
        return;
    }

    // Helper to build a product card HTML
    function buildCardHTML(p, prefix = "") {
        const uniqueId = prefix ? `${prefix}_${p.id}` : p.id;
        const badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : "";
        const videoBadgeHTML = p.video ? `<span class="product-badge video-badge" style="right: 1.5rem; left: auto; background: rgba(0,0,0,0.85); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); font-size: 0.95rem; padding: 0.3rem 0.7rem; font-weight: 600;"><i class="fa-solid fa-circle-play"></i> VIDEO</span>` : "";
        const [img0, img1] = getProductPreviewImages(p);
        const catTag = (p.category || "").toUpperCase();

        return `
            <div class="product-card" data-product-id="${uniqueId}">
                ${badgeHTML}
                ${videoBadgeHTML}
                <div class="product-img-wrapper" onclick="openProductModal(${p.id})">
                    ${renderCardMediaHTML(p, uniqueId, img0)}
                    <div class="product-quick-view">
                        <button class="quick-view-btn">QUICK VIEW</button>
                    </div>
                </div>
                <div class="product-info" onclick="openProductModal(${p.id})">
                    <div class="product-brand">${getProductBrand(p)}</div>
                    <div class="product-cat-name-tag" style="font-size: 1.05rem; font-weight: 700; color: var(--color-accent, #c9a96e); letter-spacing: 0.1em; text-transform: uppercase; margin: 0.2rem 0;">${catTag}</div>
                    <h3 class="product-name">${p.name}</h3>
                    ${renderProductPriceHTML(p)}
                    <div class="product-color-dots" onclick="event.stopPropagation()">
                        <span class="card-color-dot active" data-idx="0" onclick="switchCardColorPreview('${uniqueId}', 0, '${img0}', event)"></span>
                        <span class="card-color-dot" data-idx="1" onclick="switchCardColorPreview('${uniqueId}', 1, '${img1}', event)"></span>
                    </div>
                </div>
            </div>
        `;
    }

    // IF activeCategory is "All", require selecting a category card above to browse products
    if (activeCategory === "All") {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--color-text-muted); font-size: 1.3rem; letter-spacing: 0.1em; border: 1px dashed var(--color-border); border-radius: 8px; margin: 2rem 0; background: rgba(255,255,255,0.02);">
                <i class="fa-solid fa-hand-pointer" style="font-size: 2.5rem; color: var(--color-accent); margin-bottom: 1.2rem; display: block;"></i>
                SELECT A CATEGORY CARD ABOVE TO EXPLORE PRODUCTS & SUB-CATEGORIES
            </div>
        `;
        return;
    } else {
        // Single Category View
        const fragment = document.createDocumentFragment();
        list.forEach(p => {
            const tempWrap = document.createElement("div");
            tempWrap.innerHTML = buildCardHTML(p);
            const card = tempWrap.firstElementChild;
            fragment.appendChild(card);
            const [img0, img1] = getProductPreviewImages(p);
            setupCardSwipeEvents(card, p.id, img0, img1);
        });
        productGrid.appendChild(fragment);
    }
}

// --------------------------------------------------------------------------
// DUAL-COLOR SWIPE PREVIEW & FILTER OVERLAY HANDLERS (IMAGES 2, 3, 4)
// --------------------------------------------------------------------------

function getProductPreviewImages(product) {
    let imgs = [];
    if (product && product.image) {
        imgs = splitProductImages(product.image);
    }
    if (imgs.length < 2 && product && product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0) {
        imgs = imgs.concat(product.gallery);
    }
    if (imgs.length === 0) imgs = ["assets/favicon.jpg", "assets/favicon.jpg"];
    if (imgs.length === 1) imgs.push(imgs[0]);
    return [imgs[0], imgs[1]];
}

function switchCardColorPreview(prodId, index, imgSrc, event) {
    if (event) event.stopPropagation();
    const imgEl = document.getElementById(`prodCardImg_${prodId}`);
    if (imgEl) imgEl.src = imgSrc;
    const card = document.querySelector(`.product-card[data-product-id="${prodId}"]`) || (imgEl ? imgEl.closest('.product-card') : null);
    if (card) {
        const dots = card.querySelectorAll('.card-color-dot');
        dots.forEach((dot, i) => {
            if (i === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }
}

function setupCardSwipeEvents(card, prodId, img0, img1) {
    const imgWrapper = card.querySelector('.product-img-wrapper');
    if (!imgWrapper) return;
    let startX = 0;
    let startY = 0;
    let currentIdx = 0;

    imgWrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
    }, { passive: true });

    imgWrapper.addEventListener('touchend', (e) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const diffX = e.changedTouches[0].clientX - startX;
        const diffY = e.changedTouches[0].clientY - startY;
        if (Math.abs(diffX) > 30 && Math.abs(diffY) < 40) {
            if (diffX < 0 && currentIdx === 0) {
                currentIdx = 1;
                switchCardColorPreview(prodId, 1, img1);
            } else if (diffX > 0 && currentIdx === 1) {
                currentIdx = 0;
                switchCardColorPreview(prodId, 0, img0);
            }
        }
    }, { passive: true });
}

// LUXURY FILTER OVERLAY MODAL (IMAGES 3 & 4)
function openFilterOverlay(mode) {
    const modal = document.getElementById("filterOverlayModal");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        if (mode === 'sort') {
            const sortSection = modal.querySelector(".filter-section:last-child");
            if (sortSection) sortSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function closeFilterOverlay() {
    const modal = document.getElementById("filterOverlayModal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function clearAllFilters() {
    activeDepartment = "All";
    activeCategory = "All";
    activeBrand = "All";
    activeColorFilter = "All";
    activeMaterialFilter = "All";
    searchQuery = "";
    
    const modal = document.getElementById("filterOverlayModal");
    if (modal) {
        const activeBtns = modal.querySelectorAll(".active");
        activeBtns.forEach(btn => btn.classList.remove("active"));
        const defaultCategoryBtn = modal.querySelector("#filterCollectionGrid .filter-option-btn");
        if (defaultCategoryBtn) defaultCategoryBtn.classList.add("active");
    }
    const sortText = document.getElementById("activeSortText");
    if (sortText) sortText.textContent = "SUGGESTED";

    renderCategoryTags();
    renderProducts();
    closeFilterOverlay();
}

function selectFilterOption(type, value, element) {
    if (type === 'category') {
        activeCategory = value;
        if (element) {
            const parent = element.closest('.filter-options-grid');
            if (parent) parent.querySelectorAll('.filter-option-btn').forEach(b => b.classList.remove('active'));
            element.classList.add('active');
        }
    } else if (type === 'color') {
        activeColorFilter = value;
        if (element) {
            const parent = element.closest('.filter-color-options-grid');
            if (parent) parent.querySelectorAll('.filter-color-item').forEach(b => b.classList.remove('active'));
            element.classList.add('active');
        }
    } else if (type === 'material') {
        activeMaterialFilter = value;
        if (element) {
            const parent = element.closest('.filter-options-grid');
            if (parent) parent.querySelectorAll('.filter-option-btn').forEach(b => b.classList.remove('active'));
            element.classList.add('active');
        }
    } else if (type === 'sort') {
        const sortSelect = document.getElementById("sortSelect");
        if (sortSelect) {
            sortSelect.value = value;
            sortProducts();
        }
        const sortText = document.getElementById("activeSortText");
        if (sortText) {
            if (value === 'price-low') sortText.textContent = "PRICE: LOW TO HIGH";
            else if (value === 'price-high') sortText.textContent = "PRICE: HIGH TO LOW";
            else sortText.textContent = "SUGGESTED";
        }
        if (element) {
            const parent = element.closest('.filter-options-grid');
            if (parent) parent.querySelectorAll('.filter-option-btn').forEach(b => b.classList.remove('active'));
            element.classList.add('active');
        }
    }

    renderProducts();
    closeFilterOverlay();
}

// PRADA SORT BY POPUP DROPDOWN (IMAGE 2)
function toggleSortDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById("sortDropdownMenu");
    if (menu) {
        menu.classList.toggle("active");
    }
}

function selectSortDropdownOption(sortVal, labelText, element) {
    window.currentSortMode = sortVal;
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) sortSelect.value = sortVal;
    
    const sortText = document.getElementById("activeSortText");
    if (sortText) sortText.textContent = labelText;

    const menu = document.getElementById("sortDropdownMenu");
    if (menu) {
        const btns = menu.querySelectorAll(".sort-option-btn");
        btns.forEach(b => b.classList.remove("active"));
        if (element) element.classList.add("active");
        menu.classList.remove("active");
    }

    renderProducts();
}

// Close sort popup menu on clicking outside
document.addEventListener("click", (e) => {
    const container = document.querySelector(".sort-by-dropdown-container");
    const menu = document.getElementById("sortDropdownMenu");
    if (menu && container && !container.contains(e.target)) {
        menu.classList.remove("active");
    }
});

// OPEN LOOKBOOK PRODUCT FROM INSTAGRAM
function openLookbookProduct(lookIndex) {
    const product = PRODUCTS[lookIndex - 1] || PRODUCTS[0];
    if (product) {
        openProductModal(product.id);
    }
}

// OPEN PRODUCT DETAILS MODAL
function openProductModal(productId, updateURL = true) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    activeModalProduct = product;
    selectedSize = ""; // Reset size choice

    modalProductImg.src = getProductMainImage(product);
    modalProductImg.alt = product.name;
    
    const brandEl = document.getElementById("modalProductBrand");
    if (brandEl) brandEl.textContent = getProductBrand(product);
    
    modalProductCategory.textContent = `${product.department} / ${product.category}`;
    modalProductName.textContent = product.name;
    modalProductPrice.innerHTML = renderProductPriceHTML(product);
    modalProductDesc.textContent = product.description;

    if (product.preorder) {
        modalAddToCartBtn.textContent = "PRE-ORDER NOW";
    } else {
        modalAddToCartBtn.textContent = "ADD TO CART";
    }

function getColorHexCode(colorName) {
    if (!colorName) return "#888888";
    const clean = colorName.trim().toLowerCase();
    
    if (/^#([0-9a-f]{3}){1,2}$/i.test(clean)) {
        return clean;
    }

    const map = {
        "black": "#000000",
        "charcoal": "#2b2b2b",
        "dark grey": "#4a4a4a",
        "dark gray": "#4a4a4a",
        "grey": "#808080",
        "gray": "#808080",
        "light grey": "#d3d3d3",
        "light gray": "#d3d3d3",
        "silver": "#c0c0c0",

        "white": "#ffffff",
        "off white": "#faf0e6",
        "off-white": "#faf0e6",
        "ivory": "#fffff0",
        "cream": "#fffdd0",
        "nude": "#e3c2b0",

        "hazel": "#c68642",
        "hazelnut": "#c68642",
        "caramel": "#b5651d",
        "tobacco": "#954e2a",
        "ochre": "#c67d0a",
        "amber": "#d97706",
        "brown": "#5c3a21",
        "dark brown": "#3b2219",
        "light brown": "#966f33",
        "camel": "#c19a6b",
        "cognac": "#9a461e",
        "tan": "#d2b48c",
        "beige": "#e8d8c8",
        "khaki": "#c3b091",
        "cinnamon": "#d2691e",
        "bronze": "#cd7f32",
        "rust": "#b7410e",
        "terracotta": "#e2725b",
        "sand": "#c2b280",
        "taupe": "#8b8589",
        "chocolate": "#7b3f00",
        "espresso": "#362511",
        "mocha": "#4e3629",

        "navy": "#0a192f",
        "navy blue": "#0a192f",
        "dark navy": "#050e1a",
        "blue": "#1e40af",
        "royal blue": "#1d4ed8",
        "sky blue": "#38bdf8",
        "baby blue": "#bae6fd",
        "denim": "#3b82f6",

        "red": "#dc2626",
        "dark red": "#991b1b",
        "burgundy": "#6b1724",
        "maroon": "#800000",
        "wine": "#722f37",
        "pink": "#ec4899",
        "baby pink": "#fbcfe8",
        "rose": "#f43f5e",

        "green": "#15803d",
        "dark green": "#14532d",
        "olive": "#556b2f",
        "olive green": "#556b2f",
        "sage": "#87a96b",
        "emerald": "#047857",
        "khaki green": "#4b5320",

        "yellow": "#eab308",
        "gold": "#ffffff",
        "mustard": "#ca8a04",
        "orange": "#f97316",
        "purple": "#7e22ce",
        "violet": "#6b21a8",
        "lavender": "#e9d5ff",
        "cyan": "#06b6d4",
        "teal": "#0d9488",
        "turquoise": "#14b8a6",
        "magenta": "#d946ef",
        "coral": "#fb7185",
        "salmon": "#fa8072"
    };

    if (map[clean]) return map[clean];

    if (clean.includes("hazel")) return map["hazel"];
    if (clean.includes("caramel")) return map["caramel"];
    if (clean.includes("tobacco")) return map["tobacco"];
    if (clean.includes("mustard")) return map["mustard"];
    if (clean.includes("camel")) return map["camel"];
    if (clean.includes("tan")) return map["tan"];
    if (clean.includes("beige")) return map["beige"];
    if (clean.includes("khaki")) return map["khaki"];
    if (clean.includes("brown")) return map["brown"];
    if (clean.includes("navy")) return map["navy blue"];
    if (clean.includes("blue")) return map["blue"];
    if (clean.includes("white")) return map["white"];
    if (clean.includes("black")) return map["black"];
    if (clean.includes("grey") || clean.includes("gray")) return map["grey"];
    if (clean.includes("green")) return map["green"];
    if (clean.includes("red")) return map["red"];
    if (clean.includes("pink")) return map["pink"];
    if (clean.includes("beige")) return map["beige"];
    if (clean.includes("purple") || clean.includes("violet")) return map["purple"];
    if (clean.includes("yellow") || clean.includes("gold")) return map["yellow"];
    if (clean.includes("orange")) return map["orange"];

    // Native Browser CSS Color Resolver Failsafe
    try {
        const dummy = new Option().style;
        dummy.color = clean;
        if (dummy.color) return dummy.color;
    } catch(e){}

    return "#888888";
}

    // Render Color Swatches
    const colorSelectorGrid = document.getElementById("colorSelectorGrid");
    colorSelectorGrid.innerHTML = "";

    const colors = product.colors || ["Black", "Charcoal", "Grey"];
    selectedColor = colors[0]; // Set default color choice

    colors.forEach(color => {
        const dot = document.createElement("div");
        dot.classList.add("color-swatch-dot");
        if (selectedColor === color) dot.classList.add("active");
        
        const hex = getColorHexCode(color);
        dot.style.backgroundColor = hex;
        if (hex.toLowerCase() === "#ffffff" || hex.toLowerCase() === "#fff" || color.toLowerCase().includes("white")) {
            dot.style.border = "1px solid rgba(255, 255, 255, 0.4)";
        }
        dot.title = color;
        dot.onclick = () => selectColor(color, dot);
        colorSelectorGrid.appendChild(dot);
    });

    // Render Size Buttons
    renderSizingButtons(product);

    // Initialize premium gallery images
    loadProductGallery(product);

    // Set up hover zoom
    setupHoverZoom();

    // Load customer reviews
    loadProductReviews(product.id);

    // Reset review form collapsed state
    const reviewFormContainer = document.getElementById("writeReviewFormContainer");
    const writeReviewToggleBtn = document.getElementById("writeReviewToggleBtn");
    if (reviewFormContainer) reviewFormContainer.style.display = "none";
    if (writeReviewToggleBtn) writeReviewToggleBtn.textContent = "WRITE A REVIEW";
    resetReviewForm();

    // Add Active class to modal backdrop
    productModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";

    // Initialize 3D tilt parallax on the product image
    destroyModalTilt();
    requestAnimationFrame(() => initModalTilt());

    if (updateURL) updateAppURL(true);
}

// RENDER SIZING BUTTONS BASED ON STOCK
function renderSizingButtons(product) {
    sizeSelectorGrid.innerHTML = "";
    product.sizes.forEach(size => {
        const btn = document.createElement("button");
        btn.classList.add("size-btn");
        
        // Check stock quantity for this size-color
        const key = `${size}-${selectedColor}`;
        const stock = (product.inventory && product.inventory[key] !== undefined) 
            ? product.inventory[key] 
            : 10;
            
        const isPreorder = !!product.preorder;
            
        if (stock <= 0 && !isPreorder) {
            btn.classList.add("out-of-stock");
            btn.textContent = `${size} (OUT)`;
            btn.disabled = true;
        } else {
            btn.textContent = size;
            btn.onclick = () => selectSize(size, btn);
        }
        
        if (selectedSize === size && (stock > 0 || isPreorder)) {
            btn.classList.add("active");
        }
        
        sizeSelectorGrid.appendChild(btn);
    });
}


// SELECT COLOR IN MODAL (SUPPORTS ALL COLOR-TO-IMAGE MAPPINGS & GALLERY INDEXES)
function selectColor(color, clickedDot) {
    selectedColor = color;
    
    // Update dot active styling
    const dots = document.querySelectorAll(".color-swatch-dot");
    dots.forEach(d => d.classList.remove("active"));
    if (clickedDot) clickedDot.classList.add("active");
    
    // Reset selected size when color changes
    selectedSize = "";
    
    // Re-render sizes for the new color
    if (typeof activeModalProduct !== "undefined" && activeModalProduct) {
        renderSizingButtons(activeModalProduct);
    }

    if (!activeModalProduct) return;

    // Resolve color image from all possible sources
    let selectedImg = "";

    // 1. Check colorImages / colorMap / imagesByColor object on product
    if (activeModalProduct.colorImages && activeModalProduct.colorImages[color]) {
        selectedImg = activeModalProduct.colorImages[color];
    } else if (activeModalProduct.colorMap && activeModalProduct.colorMap[color]) {
        selectedImg = activeModalProduct.colorMap[color];
    } else if (activeModalProduct.imagesByColor && activeModalProduct.imagesByColor[color]) {
        selectedImg = activeModalProduct.imagesByColor[color];
    }

    const galleryImages = getProductGalleryImages(activeModalProduct);
    const colors = activeModalProduct.colors || [];
    const colorIndex = colors.indexOf(color);

    // 2. Check galleryImages by color index if colorImages object didn't yield an image
    if (!selectedImg && galleryImages.length > 0) {
        if (colorIndex !== -1 && galleryImages[colorIndex]) {
            selectedImg = galleryImages[colorIndex];
        } else {
            // Search gallery images for color name matching in filename/URL
            const colorLower = color.toLowerCase();
            const matchedImg = galleryImages.find(imgUrl => imgUrl.toLowerCase().includes(colorLower));
            selectedImg = matchedImg || galleryImages[0];
        }
    }

    if (!selectedImg && activeModalProduct.image) {
        selectedImg = getProductMainImage(activeModalProduct);
    }

    // Update main image in modal with smooth fade transition
    const mainImg = document.getElementById("modalProductImg");
    if (mainImg && selectedImg) {
        mainImg.style.transition = "opacity 0.15s ease";
        mainImg.style.opacity = "0.3";
        setTimeout(() => {
            mainImg.src = selectedImg;
            mainImg.style.opacity = "1";
            mainImg.style.transform = "scale(1)";
        }, 150);
    }

    // Update active thumbnail in gallery if gallery is displayed
    const thumbnailGrid = document.getElementById("thumbnailGrid");
    if (thumbnailGrid) {
        const thumbs = thumbnailGrid.querySelectorAll("img");
        thumbs.forEach(t => {
            if (selectedImg && t.src === selectedImg) {
                t.classList.add("active");
            } else {
                t.classList.remove("active");
            }
        });
    }
}


// SELECT SIZE IN MODAL
function selectSize(size, clickedBtn) {
    selectedSize = size;
    
    // Clear active class from all size buttons in modal
    const buttons = sizeSelectorGrid.querySelectorAll(".size-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Set active on clicked button
    clickedBtn.classList.add("active");
}

// CLOSE PRODUCT DETAILS MODAL
function closeProductModal(updateURL = true) {
    productModalBackdrop.classList.remove("active");
    
    const mainVideo = document.getElementById("modalProductVideo");
    if (mainVideo) {
        mainVideo.pause();
        mainVideo.src = "";
        mainVideo.style.display = "none";
    }

    // Reset image transform in case it was zoomed or tilted
    if (modalProductImg) {
        modalProductImg.style.display = "block";
        modalProductImg.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
        modalProductImg.style.transformOrigin = "center";
    }

    // Remove tilt parallax listeners
    destroyModalTilt();

    activeModalProduct = null;
    selectedSize = "";
    document.body.style.overflow = "";

    if (updateURL) updateAppURL(true);
}

// ================================================================
// ZOOM + PAN + TILT  — PRODUCT MODAL IMAGE INTERACTION SYSTEM
// ================================================================
// Normal  (zoom=1) : 3D tilt follows mouse / finger
// Zoomed  (zoom>1) : drag to pan, no tilt
// Wheel / pinch    : zoom in/out (1x – 4x)
// Double‑click/tap : reset to 1x
// ================================================================

const _IMG_MAX_ZOOM = 4;
const _IMG_MIN_ZOOM = 1;

let _img = {
    container: null, el: null, badge: null,
    zoom: 1, panX: 0, panY: 0,
    tiltX: 0, tiltY: 0, tiltTX: 0, tiltTY: 0,
    tilting: false, tiltRAF: null,
    dragging: false, dsx: 0, dsy: 0, dpsx: 0, dpsy: 0,
    pinching: false, pinchD: 0, pinchZ: 1, pinchMX: 0, pinchMY: 0,
    lastTap: 0,
    handlers: {}
};

/* ── helpers ─────────────────────────────────────────────── */
function _imgApply() {
    if (!_img.el) return;
    const tx = _img.zoom > 1 ? _img.panX : 0;
    const ty = _img.zoom > 1 ? _img.panY : 0;
    const rx = _img.zoom > 1 ? 0 : _img.tiltX;
    const ry = _img.zoom > 1 ? 0 : _img.tiltY;
    const sc = _img.zoom > 1 ? _img.zoom : (_img.tilting ? 1.04 : 1);
    _img.el.style.transform =
        `translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px) scale(${sc.toFixed(4)}) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    _img.el.style.transition = _img.dragging ? 'none' : 'transform 0.08s ease-out';
}

function _imgClamp() {
    if (!_img.container) return;
    const r = _img.container.getBoundingClientRect();
    const mx = r.width  * (_img.zoom - 1) / 2;
    const my = r.height * (_img.zoom - 1) / 2;
    _img.panX = Math.max(-mx, Math.min(mx, _img.panX));
    _img.panY = Math.max(-my, Math.min(my, _img.panY));
}

function _imgSetZoom(z, cx, cy) {          // cx,cy = container coords of zoom origin
    const prev = _img.zoom;
    _img.zoom = Math.max(_IMG_MIN_ZOOM, Math.min(_IMG_MAX_ZOOM, z));
    if (_img.container) {
        const r  = _img.container.getBoundingClientRect();
        const ox = (cx !== undefined ? cx : r.width  / 2) - r.width  / 2;
        const oy = (cy !== undefined ? cy : r.height / 2) - r.height / 2;
        _img.panX = (_img.panX - ox) * (_img.zoom / prev) + ox;
        _img.panY = (_img.panY - oy) * (_img.zoom / prev) + oy;
    }
    if (_img.zoom === 1) { _img.panX = 0; _img.panY = 0; _img.tiltX = 0; _img.tiltY = 0; }
    _imgClamp();
    _imgApply();
    _imgUpdateCursor();
    _imgShowBadge();
}

function _imgUpdateCursor() {
    if (!_img.container) return;
    if (_img.zoom > 1) {
        _img.container.style.cursor = _img.dragging ? 'grabbing' : 'grab';
    } else {
        _img.container.style.cursor = 'zoom-in';
    }
}

function _imgShowBadge() {
    if (!_img.badge) return;
    _img.badge.textContent = `${Math.round(_img.zoom * 10) / 10}×`;
    _img.badge.style.opacity = '1';
    clearTimeout(_img._badgeTimer);
    _img._badgeTimer = setTimeout(() => { if (_img.badge) _img.badge.style.opacity = '0'; }, 1200);
}

/* ── tilt loop ───────────────────────────────────────────── */
function _imgTiltLoop() {
    if (_img.zoom > 1) { _img.tilting = false; return; }
    const ease = 0.10;
    _img.tiltX += (_img.tiltTX - _img.tiltX) * ease;
    _img.tiltY += (_img.tiltTY - _img.tiltY) * ease;
    _imgApply();
    const done = Math.abs(_img.tiltX - _img.tiltTX) < 0.02 && Math.abs(_img.tiltY - _img.tiltTY) < 0.02
              && Math.abs(_img.tiltX) < 0.02 && Math.abs(_img.tiltY) < 0.02;
    if (done) {
        _img.tiltX = 0; _img.tiltY = 0; _imgApply(); _img.tilting = false;
    } else {
        _img.tiltRAF = requestAnimationFrame(_imgTiltLoop);
    }
}

/* ── pinch helper ────────────────────────────────────────── */
function _pinchDist(t) {
    const dx = t[0].clientX - t[1].clientX;
    const dy = t[0].clientY - t[1].clientY;
    return Math.sqrt(dx*dx + dy*dy);
}
function _pinchMid(t, rect) {
    return {
        x: ((t[0].clientX + t[1].clientX) / 2) - rect.left,
        y: ((t[0].clientY + t[1].clientY) / 2) - rect.top
    };
}

/* ── init ────────────────────────────────────────────────── */
function initModalTilt() {
    const container = document.getElementById('mainImageContainer');
    const el        = document.getElementById('modalProductImg');
    if (!container || !el) return;

    // Reset state
    Object.assign(_img, {
        container, el, zoom: 1, panX: 0, panY: 0,
        tiltX: 0, tiltY: 0, tiltTX: 0, tiltTY: 0,
        tilting: false, tiltRAF: null,
        dragging: false, pinching: false, lastTap: 0
    });

    // Build zoom badge
    let badge = container.querySelector('._zoom-badge');
    if (!badge) {
        badge = document.createElement('div');
        badge.className = '_zoom-badge';
        badge.style.cssText =
            'position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.55);' +
            'color:#fff;font-size:1.1rem;font-weight:700;letter-spacing:0.05em;' +
            'padding:4px 10px;border-radius:20px;pointer-events:none;z-index:9;' +
            'transition:opacity 0.4s;opacity:0;font-family:var(--font-heading,sans-serif);';
        container.appendChild(badge);
    }
    _img.badge = badge;
    _imgUpdateCursor();

    const h = _img.handlers;

    /* ── mouse ── */
    h.mousemove = (e) => {
        if (_img.dragging) {
            _img.panX = _img.dpsx + (e.clientX - _img.dsx);
            _img.panY = _img.dpsy + (e.clientY - _img.dsy);
            _imgClamp(); _imgApply(); return;
        }
        if (_img.zoom > 1) return;
        const r = container.getBoundingClientRect();
        _img.tiltTX = ((e.clientY - r.top)  / r.height - 0.5) * -18;
        _img.tiltTY = ((e.clientX - r.left) / r.width  - 0.5) *  18;
        if (!_img.tilting) { _img.tilting = true; _imgTiltLoop(); }
    };
    h.mouseleave = () => { _img.tiltTX = 0; _img.tiltTY = 0; if (_img.dragging) { _img.dragging = false; _imgUpdateCursor(); } };
    h.mousedown  = (e) => {
        if (_img.zoom <= 1) return;
        e.preventDefault();
        _img.dragging = true; _img.dsx = e.clientX; _img.dsy = e.clientY;
        _img.dpsx = _img.panX; _img.dpsy = _img.panY; _imgUpdateCursor();
    };
    h.mouseup    = () => { if (_img.dragging) { _img.dragging = false; _imgUpdateCursor(); } };

    /* ── double-click reset ── */
    h.dblclick   = () => { _imgSetZoom(1); };

    /* ── wheel zoom ── */
    h.wheel      = (e) => {
        e.preventDefault();
        const r  = container.getBoundingClientRect();
        const cx = e.clientX - r.left;
        const cy = e.clientY - r.top;
        const delta = e.deltaY < 0 ? 0.3 : -0.3;
        _imgSetZoom(_img.zoom + delta, cx, cy);
    };

    /* ── touch ── */
    h.touchstart = (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            _img.pinching  = true; _img.dragging = false;
            _img.pinchD    = _pinchDist(e.touches);
            _img.pinchZ    = _img.zoom;
            const r = container.getBoundingClientRect();
            const m = _pinchMid(e.touches, r);
            _img.pinchMX = m.x; _img.pinchMY = m.y;
        } else if (e.touches.length === 1 && _img.zoom > 1) {
            _img.dragging = true;
            _img.dsx  = e.touches[0].clientX; _img.dsy  = e.touches[0].clientY;
            _img.dpsx = _img.panX;             _img.dpsy = _img.panY;
        }
        // Double-tap detection
        const now = Date.now();
        if (now - _img.lastTap < 300 && e.touches.length === 1) {
            _imgSetZoom(_img.zoom > 1 ? 1 : 2.5);
        }
        _img.lastTap = now;
    };

    h.touchmove = (e) => {
        e.preventDefault();
        if (e.touches.length === 2 && _img.pinching) {
            const newD = _pinchDist(e.touches);
            const r    = container.getBoundingClientRect();
            const m    = _pinchMid(e.touches, r);
            _imgSetZoom(_img.pinchZ * (newD / _img.pinchD), m.x, m.y);
        } else if (e.touches.length === 1 && _img.dragging) {
            _img.panX = _img.dpsx + (e.touches[0].clientX - _img.dsx);
            _img.panY = _img.dpsy + (e.touches[0].clientY - _img.dsy);
            _imgClamp(); _imgApply();
        } else if (e.touches.length === 1 && _img.zoom <= 1) {
            const r = container.getBoundingClientRect();
            _img.tiltTX = ((e.touches[0].clientY - r.top)  / r.height - 0.5) * -14;
            _img.tiltTY = ((e.touches[0].clientX - r.left) / r.width  - 0.5) *  14;
            if (!_img.tilting) { _img.tilting = true; _imgTiltLoop(); }
        }
    };

    h.touchend = (e) => {
        if (e.touches.length < 2) _img.pinching = false;
        if (e.touches.length === 0) {
            _img.dragging = false;
            _img.tiltTX = 0; _img.tiltTY = 0;
        }
    };

    container.addEventListener('mousemove',  h.mousemove);
    container.addEventListener('mouseleave', h.mouseleave);
    container.addEventListener('mousedown',  h.mousedown);
    container.addEventListener('mouseup',    h.mouseup);
    container.addEventListener('dblclick',   h.dblclick);
    container.addEventListener('wheel',      h.wheel, { passive: false });
    container.addEventListener('touchstart', h.touchstart, { passive: false });
    container.addEventListener('touchmove',  h.touchmove,  { passive: false });
    container.addEventListener('touchend',   h.touchend);
}

function destroyModalTilt() {
    if (_img.tiltRAF) { cancelAnimationFrame(_img.tiltRAF); _img.tiltRAF = null; }
    clearTimeout(_img._badgeTimer);
    const c = _img.container;
    const h = _img.handlers;
    if (c && h) {
        c.removeEventListener('mousemove',  h.mousemove);
        c.removeEventListener('mouseleave', h.mouseleave);
        c.removeEventListener('mousedown',  h.mousedown);
        c.removeEventListener('mouseup',    h.mouseup);
        c.removeEventListener('dblclick',   h.dblclick);
        c.removeEventListener('wheel',      h.wheel);
        c.removeEventListener('touchstart', h.touchstart);
        c.removeEventListener('touchmove',  h.touchmove);
        c.removeEventListener('touchend',   h.touchend);
    }
    if (_img.el) { _img.el.style.transform = ''; _img.el.style.transition = ''; }
    if (c) { c.style.cursor = ''; }
    Object.assign(_img, { container: null, el: null, badge: null, zoom: 1, panX: 0, panY: 0, handlers: {} });
}

// ADD TO CART SYSTEM
function addProductFromModalToCart() {
    if (!activeModalProduct) return;

    if (!selectedSize) {
        alert("PLEASE SELECT A SIZE BEFORE ADDING TO CART.");
        return;
    }

    addToCart(activeModalProduct.id, selectedSize, 1, selectedColor, !!activeModalProduct.preorder);
    closeProductModal();
    toggleCartDrawer(true);
}

function getItemAvailableStock(product, size, color) {
    if (!product) return 0;
    
    const reqSize = size || "M";
    const reqColor = color || (product.colors && product.colors[0]) || "Black";
    const key = `${reqSize}-${reqColor}`;

    if (product.inventory) {
        if (typeof product.inventory[key] === 'number') {
            return product.inventory[key];
        }
        if (typeof product.inventory[reqSize] === 'number') {
            return product.inventory[reqSize];
        }
    }
    
    if (product.sizes && typeof product.sizes === 'object' && reqSize) {
        if (typeof product.sizes[reqSize] === 'number') {
            return product.sizes[reqSize];
        }
    }

    if (typeof product.stock === 'number') return product.stock;
    if (typeof product.quantity === 'number') return product.quantity;

    return 999;
}

function addToCart(productId, size, quantity = 1, color = "Black", preorder = false) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (!preorder && !product.preorder) {
        const avail = getItemAvailableStock(product, size, color);
        const existingIndex = cart.findIndex(item => item.id === productId && item.size === size && (item.color || "Black") === color);
        const currentInCart = existingIndex > -1 ? cart[existingIndex].quantity : 0;
        
        if ((currentInCart + quantity) > avail) {
            alert(`❌ Out of stock!\n\nRequested quantity for (${product.name} - Size ${size}) exceeds available stock.\n\nAvailable stock: ${avail} units.`);
            return;
        }
    }

    // Check if item already in cart with same size and color
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size && (item.color || "Black") === color);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: getProductMainImage(product),
            size: size,
            color: color,
            quantity: quantity,
            preorder: preorder || !!product.preorder
        });
    }

    saveCartToLocalStorage();
    updateCartUI();
}

// REMOVE FROM CART
function removeFromCart(productId, size, color = "Black") {
    cart = cart.filter(item => !(item.id === productId && item.size === size && (item.color || "Black") === color));
    saveCartToLocalStorage();
    updateCartUI();
}

// UPDATE QUANTITY
function updateQuantity(productId, size, color = "Black", change = 1) {
    const index = cart.findIndex(item => item.id === productId && item.size === size && (item.color || "Black") === color);
    if (index === -1) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        removeFromCart(productId, size, color);
    } else {
        saveCartToLocalStorage();
        updateCartUI();
    }
}

// SAVE & LOAD LOCAL STORAGE
function saveCartToLocalStorage() {
    localStorage.setItem("styluxe_cart", JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const data = localStorage.getItem("styluxe_cart");
    if (data) {
        try {
            cart = JSON.parse(data);
        } catch (e) {
            cart = [];
        }
    }
}

// UPDATE CART UI DRAWER
function updateCartUI() {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Update Badges
    if (cartCountBadge) {
        cartCountBadge.textContent = totalCount;
        cartCountBadge.style.display = totalCount > 0 ? "inline-block" : "none";
    }
    if (cartHeaderCount) cartHeaderCount.textContent = totalCount;

    // Render Items
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-bag-shopping"></i>
                <p>YOUR CART IS EMPTY</p>
                <button onclick="toggleCartDrawer(false)" class="continue-shopping-btn">CONTINUE SHOPPING</button>
            </div>
        `;
        cartDrawerFooter.style.display = "none";
        return;
    }

    cartDrawerFooter.style.display = "block";

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        const colorVal = item.color || "Black";

        itemDiv.innerHTML = `
            <img class="cart-item-img" src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <span class="cart-item-size">SIZE: ${item.size} / COLOR: ${colorVal}</span>
                ${item.preorder ? '<span style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent); letter-spacing: 0.05em; display: block; margin-top: 0.4rem;">PRE-ORDER</span>' : ''}
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', '${colorVal}', -1)">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', '${colorVal}', 1)">+</button>
                </div>
            </div>
            <div class="cart-item-price-delete">
                <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.size}', '${colorVal}')" aria-label="Remove item"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    cartSubtotal.textContent = formatPrice(subtotal);
}

// CHECKOUT SYSTEM SIMULATION
function openCheckoutModal() {
    if (cart.length === 0) return;

    toggleCartDrawer(false);

    // Pre-fill fields from user profile if logged in, otherwise leave empty
    if (currentUser) {
        document.getElementById("fullName").value = currentUser.name;
        document.getElementById("email").value = currentUser.email;
        document.getElementById("phoneNumber").value = currentUser.phone;
        document.getElementById("address").value = currentUser.address;
    } else {
        document.getElementById("fullName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("address").value = "";
    }
    document.getElementById("city").value = "Beirut";

    // Reset coupon code input and active coupon
    activeCoupon = null;
    const couponInput = document.getElementById("checkoutCouponInput");
    if (couponInput) couponInput.value = "";
    const couponMessage = document.getElementById("couponMessage");
    if (couponMessage) {
        couponMessage.style.display = "none";
        couponMessage.innerHTML = "";
    }

    updateCheckoutSummary();

    // Display modal
    checkoutModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

function updateCheckoutSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Read dynamic settings
    const shippingFee = parseFloat(STORE_SETTINGS.shipping_fee) || 5;
    const freeThreshold = parseFloat(STORE_SETTINGS.free_shipping_threshold) || 150;
    
    const shipping = subtotal >= freeThreshold ? 0 : shippingFee;
    
    let discount = 0;
    if (activeCoupon) {
        if (activeCoupon.discountType === 'percent') {
            discount = (subtotal * activeCoupon.discountValue) / 100;
        } else if (activeCoupon.discountType === 'fixed') {
            discount = Math.min(subtotal, activeCoupon.discountValue);
        }
    }
    
    const total = subtotal - discount + shipping;

    checkoutOrderSummary.innerHTML = "";
    
    // Add cart items
    cart.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("summary-item-row");
        row.innerHTML = `
            <span>${item.name} (x${item.quantity}) [Size: ${item.size}]${item.preorder ? ' <strong style="color: var(--color-accent); font-size: 0.85rem; letter-spacing: 0.05em;">(PRE-ORDER)</strong>' : ''}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        `;
        checkoutOrderSummary.appendChild(row);
    });

    // Add subtotal row
    const subtotalRow = document.createElement("div");
    subtotalRow.classList.add("summary-item-row");
    subtotalRow.style.borderTop = "1px solid var(--color-border)";
    subtotalRow.style.paddingTop = "1rem";
    subtotalRow.innerHTML = `
        <span>SUBTOTAL</span>
        <span>${formatPrice(subtotal)}</span>
    `;
    checkoutOrderSummary.appendChild(subtotalRow);

    // Add discount row if coupon active
    if (discount > 0) {
        const discountRow = document.createElement("div");
        discountRow.classList.add("summary-item-row");
        discountRow.style.color = "#2ecc71";
        discountRow.innerHTML = `
            <span>DISCOUNT (${activeCoupon.code})</span>
            <span>-${formatPrice(discount)}</span>
        `;
        checkoutOrderSummary.appendChild(discountRow);
    }

    // Add shipping row
    const shippingRow = document.createElement("div");
    shippingRow.classList.add("summary-item-row");
    shippingRow.innerHTML = `
        <span>SHIPPING</span>
        <span>${shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
    `;
    checkoutOrderSummary.appendChild(shippingRow);

    // Add total row
    const totalRow = document.createElement("div");
    totalRow.classList.add("summary-item-row", "total-row");
    totalRow.innerHTML = `
        <span>TOTAL TO PAY</span>
        <span id="checkoutGrandTotal">${formatPrice(total)}</span>
    `;
    checkoutOrderSummary.appendChild(totalRow);
}

async function applyCouponCode() {
    const code = document.getElementById("checkoutCouponInput").value.trim().toUpperCase();
    const msgEl = document.getElementById("couponMessage");
    if (!msgEl) return;

    if (!code) {
        msgEl.style.display = "block";
        msgEl.style.color = "var(--color-error)";
        msgEl.textContent = "Please enter coupon code first.";
        return;
    }

    try {
        const response = await fetch('/api/coupons/validate?code=${code}');
        const result = await response.json();

        if (response.ok && result.valid) {
            activeCoupon = result;
            msgEl.style.display = "block";
            msgEl.style.color = "#2ecc71";
            msgEl.textContent = `Coupon applied successfully! Discount: ${result.discountType === 'percent' ? result.discountValue + '%' : formatPrice(result.discountValue)}`;
            updateCheckoutSummary();
        } else {
            activeCoupon = null;
            msgEl.style.display = "block";
            msgEl.style.color = "var(--color-error)";
            msgEl.textContent = result.error || "Invalid or expired coupon code.";
            updateCheckoutSummary();
        }
    } catch (e) {
        console.error("Error validating coupon:", e);
        msgEl.style.display = "block";
        msgEl.style.color = "var(--color-error)";
        msgEl.textContent = "Error occurred while validating coupon.";
    }
}

function closeCheckoutModal() {
    checkoutModalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
}

// HANDLE CHECKOUT SUBMIT
function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    // Simulate API Call / Processing
    // Stock Validation Check for Website Checkout
    for (const item of cart) {
        if (!item.preorder) {
            const prod = PRODUCTS.find(p => String(p.id) === String(item.id));
            if (prod) {
                const avail = getItemAvailableStock(prod, item.size, item.color);
                if (item.quantity > avail) {
                    alert(`❌ Order cannot be placed!\n\nRequested quantity for (${item.name} - Size ${item.size}) exceeds available stock.\n\nRequested: ${item.quantity} | Available stock: ${avail} units.`);
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }
            }
        }
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingFee = parseFloat(STORE_SETTINGS.shipping_fee) || 5;
    const freeThreshold = parseFloat(STORE_SETTINGS.free_shipping_threshold) || 150;
    const shipping = subtotal >= freeThreshold ? 0 : shippingFee;
    
    let discount = 0;
    if (activeCoupon) {
        if (activeCoupon.discountType === 'percent') {
            discount = (subtotal * activeCoupon.discountValue) / 100;
        } else if (activeCoupon.discountType === 'fixed') {
            discount = Math.min(subtotal, activeCoupon.discountValue);
        }
    }
    const total = subtotal - discount + shipping;
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const firstItemDept = cart[0] ? PRODUCTS.find(p => p.id === cart[0].id).department : "Men";

    const orderData = {
        id: `STX-${randomNum}`,
        customerName: document.getElementById("fullName").value,
        customerEmail: document.getElementById("email").value || (currentUser ? currentUser.email : "guest@example.com"),
        customerPhone: document.getElementById("phoneNumber").value,
        customerAddress: `${document.getElementById("address").value}, ${document.getElementById("city").value}`,
        date: new Date().toISOString().split('T')[0],
        items: [...cart],
        total: total,
        status: "PENDING",
        department: firstItemDept
    };

    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(async res => {
        if (res.ok) {
            // Fetch latest orders and products to sync local stock state
            await loadOrdersFromServer();
            await loadProductsFromServer();

            // Clear Cart
            cart = [];
            saveCartToLocalStorage();
            updateCartUI();

            // Close checkout and open success screen
            closeCheckoutModal();
            
            // Generate random order number
            orderNumberText.textContent = `#STX-${randomNum}`;

            // Reset form
            checkoutForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Open success modal
            successModalBackdrop.classList.add("active");
            document.body.style.overflow = "hidden";
        } else {
            const errResult = await res.json();
            alert("ORDER CREATION FAILED: " + (errResult.error || "UNKNOWN ERROR"));
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    })
    .catch(err => {
        console.error("Order submit failed:", err);
        alert("SERVER CONNECTION ERROR. PLEASE TRY AGAIN.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}

function closeSuccessModal() {
    successModalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
}

// THEME TOGGLE (DAY/NIGHT MODE)
function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("styluxe_theme", newTheme);
    
    updateThemeIcon(newTheme);
}

function initTheme() {
    const savedTheme = localStorage.getItem("styluxe_theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeBtnIcon = document.querySelector("#themeToggleBtn i");
    if (themeBtnIcon) {
        if (theme === "light") {
            themeBtnIcon.className = "fa-solid fa-sun";
        } else {
            themeBtnIcon.className = "fa-solid fa-moon";
        }
    }
}

// ==========================================================================
// ADMIN PORTAL & POS WORKSPACE LOGIC
// ==========================================================================

const adminLoginModalBackdrop = document.getElementById("adminLoginModalBackdrop");
const adminPanelOverlay = document.getElementById("adminPanelOverlay");
const adminDeptTitle = document.getElementById("adminDeptTitle");
const adminPasswordInput = document.getElementById("adminPassword");
const loginError = document.getElementById("loginError");
const adminPosNavBtn = document.getElementById("adminPosNavBtn");

const addProductModalBackdrop = document.getElementById("addProductModalBackdrop");
const addProductForm = document.getElementById("addProductForm");

const posProductsGrid = document.getElementById("posProductsGrid");
const posTicketItems = document.getElementById("posTicketItems");
const posSubtotal = document.getElementById("posSubtotal");
const posDiscountInput = document.getElementById("posDiscountInput");
const posDiscountAmount = document.getElementById("posDiscountAmount");
const posTotal = document.getElementById("posTotal");
const posCustomerName = document.getElementById("posCustomerName");
const posCustomerPhone = document.getElementById("posCustomerPhone");

const posReceiptModalBackdrop = document.getElementById("posReceiptModalBackdrop");

function openAdminLoginModal() {
    if (typeof userMenuDropdown !== 'undefined' && userMenuDropdown) {
        userMenuDropdown.classList.remove("active");
    }
    togglePradaDrawer(false);

    // If admin is ALREADY authenticated in session, open dashboard directly
    if (currentAdminStaff && (sessionStorage.getItem("styluxe_admin_staff") || currentAdminPassword)) {
        initAdminDashboard();
        return;
    }

    // Otherwise, ALWAYS open the Admin Login Modal requesting Email/Username and Password!
    if (adminLoginModalBackdrop) {
        adminLoginModalBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
        
        // Reset and focus password input
        if (adminPasswordInput) {
            adminPasswordInput.value = "";
            adminPasswordInput.focus();
        }
        if (loginError) loginError.style.display = "none";
    }
}

function closeAdminLoginModal() {
    adminLoginModalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
}

// Handle Admin Login Router
async function handleAdminLogin(event) {
    event.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const pass = adminPasswordInput.value.trim();
    loginError.style.display = "none";

    // 1. Check legacy codes first (for convenience and backwards compatibility)
    if (!email) {
        if (pass === "men123") {
            currentAdminDept = "Men";
            currentAdminStaff = { name: "Men Manager", email: "", role: "Manager", permissions: ["manage_products", "manage_orders"] };
        } else if (pass === "women123") {
            currentAdminDept = "Women";
            currentAdminStaff = { name: "Women Manager", email: "", role: "Manager", permissions: ["manage_products", "manage_orders"] };
        } else if (pass === "kids123") {
            currentAdminDept = "Kids";
            currentAdminStaff = { name: "Kids Manager", email: "", role: "Manager", permissions: ["manage_products", "manage_orders"] };
        } else if (pass === "pos123") {
            currentAdminDept = "Global";
            currentAdminStaff = { name: "POS Operator", email: "", role: "Cashier", permissions: ["pos_access"] };
        } else if (pass === "admin123") {
            currentAdminDept = "Global";
            currentAdminStaff = { name: "Global Admin", email: "", role: "Administrator", permissions: ["manage_products", "manage_orders", "pos_access", "manage_staff"] };
        } else {
            loginError.textContent = "INCORRECT ACCESS CODE.";
            loginError.style.display = "block";
            return;
        }
        currentAdminPassword = pass;
        closeAdminLoginModal();
        initAdminDashboard();
        return;
    }

    // 2. Otherwise, check staff logins in server
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: pass })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.isStaff) {
                currentAdminDept = "Global";
                currentAdminStaff = data;
                currentAdminPassword = pass;
                
                closeAdminLoginModal();
                initAdminDashboard();
            } else {
                loginError.textContent = "ACCESS DENIED: NOT A STAFF MEMBER.";
                loginError.style.display = "block";
            }
        } else {
            loginError.textContent = "INCORRECT EMAIL OR PASSWORD.";
            loginError.style.display = "block";
        }
    } catch (err) {
        console.error("Login request failed:", err);
        loginError.textContent = "SERVER CONNECTION ERROR.";
        loginError.style.display = "block";
    }
}

async function initAdminDashboard() {
    // Sync latest database records
    await loadOrdersFromServer();
    await loadUsersFromServer();
    
    // Apply role-based access control permissions
    applyStaffPermissions();
    if (currentAdminStaff && currentAdminStaff.permissions && currentAdminStaff.permissions.includes("manage_staff")) {
        await loadStaffFromServer();
    }

    // Set titles
    if (currentAdminDept === "Global") {
        adminDeptTitle.textContent = "GLOBAL ADMIN & POS";
    } else {
        adminDeptTitle.textContent = `${currentAdminDept} ADMIN`;
    }

    // Hide quick-return floating button when dashboard is open
    const floatingBtn = document.getElementById("floatingAdminDashboardBtn");
    if (floatingBtn) floatingBtn.style.display = "none";

    // Toggle overlay
    adminPanelOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Switch to active tab, or straight to POS if user is cashier only (pos_access only)
    const perms = currentAdminStaff ? currentAdminStaff.permissions || [] : [];
    const isCashierOnly = perms.includes("pos_access") && !perms.includes("manage_products") && !perms.includes("manage_orders");
    
    const urlParams = new URLSearchParams(window.location.search);
    const queryTab = urlParams.get("tab");
    const hash = window.location.hash.trim();
    const savedTab = localStorage.getItem("styluxe_admin_active_tab") || sessionStorage.getItem("styluxe_admin_active_tab");
    
    let initialTab = queryTab || (hash.startsWith("#admin/") ? hash.replace("#admin/", "").split("?")[0] : "") || savedTab || (isCashierOnly ? "pos" : "overview");

    if (currentAdminStaff) {
        sessionStorage.setItem("styluxe_admin_staff", JSON.stringify(currentAdminStaff));
        sessionStorage.setItem("styluxe_admin_dept", currentAdminDept);
        sessionStorage.setItem("styluxe_admin_password", currentAdminPassword);
        sessionStorage.setItem("styluxe_admin_active_tab", initialTab);

        localStorage.setItem("styluxe_admin_staff", JSON.stringify(currentAdminStaff));
        localStorage.setItem("styluxe_admin_dept", currentAdminDept);
        localStorage.setItem("styluxe_admin_password", currentAdminPassword);
        localStorage.setItem("styluxe_admin_active_tab", initialTab);
    }
    
    switchAdminTab(initialTab, false);
    updateAppURL(true);
}

function logoutAdmin() {
    const container = document.querySelector(".admin-panel-container");
    if (container) container.classList.remove("pos-mode");
    currentAdminDept = "";
    currentAdminStaff = null;
    currentAdminPassword = "";
    
    sessionStorage.removeItem("styluxe_admin_staff");
    sessionStorage.removeItem("styluxe_admin_dept");
    sessionStorage.removeItem("styluxe_admin_password");
    sessionStorage.removeItem("styluxe_admin_active_tab");

    localStorage.removeItem("styluxe_admin_staff");
    localStorage.removeItem("styluxe_admin_dept");
    localStorage.removeItem("styluxe_admin_password");
    localStorage.removeItem("styluxe_admin_active_tab");
    
    adminPanelOverlay.classList.remove("active");
    document.body.style.overflow = "";

    const floatingBtn = document.getElementById("floatingAdminDashboardBtn");
    if (floatingBtn) floatingBtn.style.display = "none";

    showHomePage(true);
}

function isManagerLoggedIn() {
    if (!currentAdminStaff) return true; // Default System Owner / Admin
    
    const role = String(currentAdminStaff.role || "").toLowerCase();
    const perms = Array.isArray(currentAdminStaff.permissions) ? currentAdminStaff.permissions : [];

    // Automatically allow if logged in as Manager, Administrator, Admin, Owner, Supervisor or has admin permissions
    if (role.includes("manager") || 
        role.includes("admin") || 
        role.includes("owner") || 
        role.includes("head") || 
        role.includes("supervisor") || 
        currentAdminStaff.isOwner === true ||
        perms.includes("manage_staff") || 
        perms.includes("manage_products") ||
        perms.includes("manage_orders") ||
        perms.includes("all")) {
        return true;
    }
    return false;
}

function promptManagerPermission(actionName = "Access Manager Feature") {
    if (isManagerLoggedIn()) return true;

    const pass = prompt(`🔒 MANAGER PERMISSION REQUIRED\n\nPlease enter Manager Password to ${actionName}:`);
    if (!pass) return false;

    const returnPass = (STORE_SETTINGS && STORE_SETTINGS.return_password) || "admin123";
    if (pass === returnPass || pass === "admin123") {
        return true;
    } else {
        alert("❌ Incorrect Manager Password! Access denied.");
        return false;
    }
}

function exitPosMode() {
    if (!promptManagerPermission("Access Main Dashboard")) return;
    switchAdminTab("overview");
}

function viewStorefrontAsAdmin() {
    showHomePage(true);
}

// Switch tabs inside admin panel
function switchAdminTab(tab, pushState = true) {
    if (!currentAdminStaff) {
        openAdminLoginModal();
        return;
    }
    adminActiveTab = tab;
    try {
        localStorage.setItem("styluxe_admin_active_tab", tab);
        sessionStorage.setItem("styluxe_admin_active_tab", tab);
    } catch(e){}

    const container = document.querySelector(".admin-panel-container");
    if (container) {
        if (tab === "pos") {
            container.classList.add("pos-mode");
        } else {
            container.classList.remove("pos-mode");
        }
    }

    try {
        history.replaceState({ admin: true, tab: tab }, "Admin Dashboard", `?admin=true&tab=${tab}`);
    } catch(e){}

    // Toggle active classes on sidebar navigation buttons
    const navButtons = document.querySelectorAll(".admin-nav-btn");
    navButtons.forEach(btn => {
        const idMap = {
            overview: "btnTabOverview",
            products: "btnTabProducts",
            categories: "btnTabCategories",
            brands: "btnTabBrands",
            orders: "btnTabOrders",
            customers: "btnTabCustomers",
            staff: "btnTabStaff",
            suppliers: "btnTabSuppliers",
            home_cards: "btnTabHomeCards",
            settings: "btnTabSettings",
            menu_builder: "btnTabMenuBuilder",
            pos: "adminPosNavBtn"
        };
        if (btn.id === idMap[tab]) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Toggle active tab content containers
    const tabContents = document.querySelectorAll(".admin-tab-content");
    tabContents.forEach(content => {
        const idMap = {
            overview: "adminTabOverview",
            products: "adminTabProducts",
            categories: "adminTabCategories",
            brands: "adminTabBrands",
            orders: "adminTabOrders",
            customers: "adminTabCustomers",
            staff: "adminTabStaff",
            suppliers: "adminTabSuppliers",
            home_cards: "adminTabHomeCards",
            settings: "adminTabSettings",
            menu_builder: "adminTabMenuBuilder",
            pos: "adminTabPos"
        };
        if (content.id === idMap[tab]) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });

    // Trigger tab specific renders
    if (tab === "overview") {
        renderAdminOverview();
    } else if (tab === "products") {
        try { localStorage.setItem("styluxe_products_cache", JSON.stringify(PRODUCTS)); localStorage.setItem("styluxe_products", JSON.stringify(PRODUCTS));
    saveAllUserDataLocally(); } catch(e){}
            renderAdminProducts();
    } else if (tab === "categories") {
        renderAdminCategories();
    } else if (tab === "brands") {
        renderAdminBrands();
    } else if (tab === "orders") {
        renderAdminOrders();
    } else if (tab === "customers") {
        renderAdminCustomers();
    } else if (tab === "home_cards") {
        renderAdminHomeCardsTable();
    } else if (tab === "settings") {
        populateSettingsFields();
        renderAdminCoupons();
    } else if (tab === "menu_builder") {
        renderMenuBuilder();
    } else if (tab === "staff") {
        renderStaffList();
    } else if (tab === "suppliers") {
        renderAdminSuppliers();
    } else if (tab === "pos") {
        renderAdminPos();
    }
}

// 1. Overview Tab Render
function renderAdminOverview() {
    const totalSales = ordersList.reduce((sum, order) => sum + order.total, 0);
    const totalOrdersCount = ordersList.length;
    const avgOrderValue = totalOrdersCount > 0 ? (totalSales / totalOrdersCount) : 0;
    const totalCustCount = usersList.length;

    let totalCost = 0;
    ordersList.forEach(order => {
        (order.items || []).forEach(item => {
            const prod = PRODUCTS.find(p => p.id === item.id);
            const cost = prod && prod.costPrice !== undefined ? prod.costPrice : (item.price * 0.6);
            totalCost += cost * item.quantity;
        });
    });
    const totalProfit = totalSales - totalCost;

    const salesEl = document.getElementById("statTotalSales");
    const profitEl = document.getElementById("statTotalProfit");
    const ordersEl = document.getElementById("statTotalOrders");
    const aovEl = document.getElementById("statAvgOrderValue");
    const custEl = document.getElementById("statTotalCustomers");

    if (salesEl) salesEl.textContent = formatPrice(totalSales);
    if (profitEl) profitEl.textContent = formatPrice(totalProfit);
    if (ordersEl) ordersEl.textContent = totalOrdersCount;
    if (aovEl) aovEl.textContent = formatPrice(avgOrderValue);
    if (custEl) custEl.textContent = totalCustCount;

    // --- Chart 1: Monthly Sales ---
    const monthlySalesContainer = document.getElementById("monthlySalesChartContainer");
    if (monthlySalesContainer) {
        const monthlyTotals = {};
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const monthName = d.toLocaleString('default', { month: 'short' });
            months.push(monthName);
            monthlyTotals[monthName] = 0;
        }

        ordersList.forEach(o => {
            if (o.status !== 'Cancelled' && o.date) {
                const orderDate = new Date(o.date);
                const mName = orderDate.toLocaleString('default', { month: 'short' });
                if (monthlyTotals[mName] !== undefined) {
                    monthlyTotals[mName] += parseFloat(o.total) || 0;
                }
            }
        });

        const maxVal = Math.max(...Object.values(monthlyTotals), 1);
        let barHtml = `<div style="display: flex; align-items: flex-end; justify-content: space-around; width: 100%; height: 100%; padding: 0 1rem; position: relative;">`;
        barHtml += `
          <div style="position: absolute; left: 0; right: 0; bottom: 50px; height: 1px; background: rgba(255,255,255,0.05); z-index: 1;"></div>
          <div style="position: absolute; left: 0; right: 0; bottom: 100px; height: 1px; background: rgba(255,255,255,0.05); z-index: 1;"></div>
          <div style="position: absolute; left: 0; right: 0; bottom: 150px; height: 1px; background: rgba(255,255,255,0.05); z-index: 1;"></div>
        `;
        months.forEach(m => {
            const val = monthlyTotals[m];
            const heightPercent = (val / maxVal) * 80;
            barHtml += `
                <div style="display: flex; flex-direction: column; align-items: center; width: 14%; z-index: 2; position: relative; height: 100%; justify-content: flex-end;">
                    <div style="font-size: 1rem; font-weight: 700; color: var(--color-accent); margin-bottom: 0.5rem; opacity: 0; transition: opacity 0.2s; position: absolute; bottom: calc(${heightPercent}% + 35px); background: rgba(0,0,0,0.85); border: 1px solid var(--color-border); padding: 0.3rem 0.6rem; border-radius: 4px; white-space: nowrap; pointer-events: none;" class="bar-tooltip">${formatPrice(val)}</div>
                    <div style="width: 100%; height: ${heightPercent}%; background: linear-gradient(to top, var(--color-accent), #b8912e); border-radius: 4px 4px 0 0; transition: height 0.5s ease-out; cursor: pointer;" onmouseover="this.previousElementSibling.style.opacity=1" onmouseout="this.previousElementSibling.style.opacity=0"></div>
                </div>
            `;
        });
        barHtml += `</div>`;
        monthlySalesContainer.innerHTML = barHtml;

        const labelsDiv = document.getElementById("monthlySalesLabels");
        if (labelsDiv) {
            labelsDiv.innerHTML = months.map(m => `<span style="width: 14%; text-align: center;">${m.toUpperCase()}</span>`).join('');
        }
    }

    // --- Chart 2: Category Share ---
    const donutContainer = document.getElementById("categoryDonutChartContainer");
    const legendDiv = document.getElementById("categoryChartLegend");
    if (donutContainer && legendDiv) {
        const categories = ["Hoodies", "Jackets", "Jeans", "Footwear"];
        const catTotals = {};
        categories.forEach(cat => catTotals[cat] = 0);

        ordersList.forEach(order => {
            if (order.status !== 'Cancelled') {
                order.items.forEach(item => {
                    const prod = PRODUCTS.find(p => p.id === item.id);
                    if (prod && categories.includes(prod.category)) {
                        catTotals[prod.category] += item.quantity;
                    }
                });
            }
        });

        const totalQty = Object.values(catTotals).reduce((a, b) => a + b, 0) || 1;
        const colors = ["#ffffff", "#3498db", "#2ecc71", "#9b59b6"];
        
        let svgHtml = `<svg width="200" height="200" viewBox="0 0 200 200" style="transform: rotate(-90deg); width: 100%; height: 100%;">`;
        svgHtml += `<circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--color-border)" stroke-width="16" />`;
        
        let currentOffset = 0;
        categories.forEach((cat, idx) => {
            const qty = catTotals[cat];
            const percent = qty / totalQty;
            const strokeLength = percent * 439.8;
            const strokeOffset = 439.8 - strokeLength + currentOffset;

            svgHtml += `
                <circle cx="100" cy="100" r="70" fill="transparent" 
                    stroke="${colors[idx]}" 
                    stroke-width="16" 
                    stroke-dasharray="439.8" 
                    stroke-dashoffset="${strokeOffset}" 
                    style="transition: stroke-dashoffset 0.6s ease-out; cursor: pointer;"
                    title="${cat}: ${qty} pcs (${Math.round(percent * 100)}%)" />
            `;
            currentOffset -= strokeLength;
        });

        svgHtml += `
            <circle cx="100" cy="100" r="58" fill="var(--color-surface)" />
            <text x="100" y="93" text-anchor="middle" font-family="var(--font-heading)" font-size="14" font-weight="700" fill="var(--color-text-muted)" transform="rotate(90 100 100)">TOTAL ITEMS</text>
            <text x="100" y="115" text-anchor="middle" font-family="var(--font-heading)" font-size="20" font-weight="700" fill="var(--color-accent)" transform="rotate(90 100 100)">${totalQty}</text>
        </svg>`;
        donutContainer.innerHTML = svgHtml;

        let legendHtml = "";
        categories.forEach((cat, idx) => {
            const qty = catTotals[cat];
            const percent = Math.round((qty / totalQty) * 100);
            legendHtml += `
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.02);">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${colors[idx]}; flex-shrink: 0;"></div>
                        <span style="font-weight: 600; font-size: 1rem;">${cat.toUpperCase()}</span>
                    </div>
                    <div style="text-align: right; font-weight: 700; font-size: 1rem;">
                        <span>${qty} pcs</span>
                        <span style="color: var(--color-text-muted); font-size: 0.85rem; margin-left: 0.5rem;">(${percent}%)</span>
                    </div>
                </div>
            `;
        });
        legendDiv.innerHTML = legendHtml;
    }
}

let currentAdminCategoryFilter = "All";

function filterAdminProductsByCategory(catName) {
    currentAdminCategoryFilter = catName || "All";
    
    // Switch to Products Tab in Admin
    if (typeof switchAdminTab === "function") {
        switchAdminTab("products");
    }
    
    const catSelect = document.getElementById("adminProductCategoryFilter");
    if (catSelect) catSelect.value = currentAdminCategoryFilter;
    
    renderAdminProducts();
}

function onAdminCategoryFilterChange(val) {
    currentAdminCategoryFilter = val;
    renderAdminProducts();
}

// 2. Product Manager Tab Render
function renderAdminProducts() {
    const tableBody = document.getElementById("adminProductsTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    // Populate Category filter dropdown in Admin Products header
    const catSelect = document.getElementById("adminProductCategoryFilter");
    if (catSelect) {
        catSelect.innerHTML = `<option value="All">ALL CATEGORIES</option>`;
        const availableCats = CATEGORIES
            .filter(c => currentAdminDept === "Global" || (c.department && c.department.toLowerCase() === currentAdminDept.toLowerCase()))
            .map(c => c.name);
        
        PRODUCTS.forEach(p => {
            if (p.category && !availableCats.includes(p.category)) {
                availableCats.push(p.category);
            }
        });

        const uniqueCats = [...new Set(availableCats)];
        uniqueCats.forEach(cName => {
            if (cName) {
                const opt = document.createElement("option");
                opt.value = cName;
                opt.textContent = cName.toUpperCase();
                catSelect.appendChild(opt);
            }
        });
        catSelect.value = currentAdminCategoryFilter || "All";
    }

    let filtered = currentAdminDept === "Global" 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.department && p.department.toLowerCase() === currentAdminDept.toLowerCase());

    // Apply Smart Admin Category Filter
    if (currentAdminCategoryFilter && currentAdminCategoryFilter !== "All") {
        filtered = filtered.filter(p => p.category && p.category.trim().toLowerCase() === currentAdminCategoryFilter.trim().toLowerCase());
    }

    if (filtered.length === 0) {
        const catMsg = (currentAdminCategoryFilter && currentAdminCategoryFilter !== "All")
            ? `NO PRODUCTS RECORDED IN CATEGORY "${currentAdminCategoryFilter.toUpperCase()}".`
            : "NO PRODUCTS RECORDED YET.";

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; color: var(--color-text-muted); padding: 4rem 0;">
                    <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-accent); display: block;"></i>
                    ${catMsg}
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(p => {
        const tr = document.createElement("tr");
        tr.setAttribute("draggable", "true");
        tr.classList.add("draggable-row");
        tr.setAttribute("data-id", p.id);

        const inventoryStr = Object.entries(p.inventory || {})
            .map(([key, val]) => `${key}: ${val}`)
            .join(" | ");

        tr.innerHTML = `
            <td style="cursor: grab; color: var(--color-text-muted); text-align: center; font-size: 1.4rem;"><i class="fa-solid fa-grip-vertical"></i></td>
            <td><strong>#${p.id}</strong></td>
            <td><img src="${getProductMainImage(p)}" alt="${p.name}" class="admin-prod-thumb" onclick="openAdminImagePreview('${getProductMainImage(p)}', '${p.name.replace(/'/g, "\\'")}')" title="Click to enlarge image" style="cursor: zoom-in; width: 45px; height: 55px; object-fit: cover; border-radius: 4px; transition: transform 0.2s ease;"></td>
            <td>
                <strong>${p.name}</strong> ${p.preorder ? '<span style="background-color: var(--color-accent); color: #000; font-size: 0.9rem; font-weight: 700; padding: 0.1rem 0.5rem; border-radius: 3px; margin-left: 0.5rem; vertical-align: middle;">PRE-ORDER</span>' : ''}
                <div style="font-size: 1.1rem; color: var(--color-text-muted); margin-top: 0.3rem; display: flex; align-items: center; gap: 0.8rem;">
                    <span>Priority: ${p.priority !== undefined ? p.priority : 1000}</span>
                    <button onclick="moveProductToTop(${p.id})" style="background: none; color: var(--color-accent); border: none; cursor: pointer; font-size: 1.2rem; padding: 0.2rem;" title="Move to Top"><i class="fa-solid fa-angles-up"></i></button>
                    <button onclick="moveProductToBottom(${p.id})" style="background: none; color: var(--color-accent); border: none; cursor: pointer; font-size: 1.2rem; padding: 0.2rem;" title="Move to Bottom"><i class="fa-solid fa-angles-down"></i></button>
                </div>
            </td>
            <td>${p.department.toUpperCase()} / ${p.category.toUpperCase()}</td>
            <td>${formatPrice(p.price)}</td>
            <td>
                <div style="font-weight: 600;">Sizes: ${p.sizes.join(", ")}</div>
                <div style="font-size: 1.1rem; color: var(--color-text-muted); margin-top: 0.3rem;">Colors: ${p.colors ? p.colors.join(", ") : "Black, Charcoal, Grey"}</div>
                ${p.barcode ? `<div style="font-size: 1.05rem; color: var(--color-text); margin-top: 0.3rem;"><i class="fa-solid fa-barcode"></i> SKU/Barcode: <strong>${p.barcode}</strong></div>` : ''}
                <div style="font-size: 1rem; color: var(--color-accent); margin-top: 0.5rem; word-break: break-all; max-height: 45px; overflow-y: auto;">
                    ${inventoryStr}
                </div>
            </td>
            <td>
                <div style="display: flex; gap: 0.8rem; align-items: center; justify-content: center; min-width: 160px;">
                    <button class="admin-edit-btn" onclick="openEditProductModal(${p.id})" aria-label="Edit product" style="background: #2563eb !important; color: #ffffff !important; border: none !important; padding: 0.5rem 1rem !important; border-radius: 6px !important; font-size: 1.1rem !important; font-weight: 700 !important; cursor: pointer !important; display: inline-flex !important; align-items: center !important; gap: 0.4rem !important; transition: transform 0.2s ease, background 0.2s ease;" title="تعديل المنتج"><i class="fa-solid fa-pen-to-square"></i> EDIT</button>
                    <button class="admin-delete-btn" onclick="deleteProduct(event, ${p.id})" aria-label="Delete product" style="background: #ef4444 !important; color: #ffffff !important; border: none !important; padding: 0.5rem 1rem !important; border-radius: 6px !important; font-size: 1.1rem !important; font-weight: 700 !important; cursor: pointer !important; display: inline-flex !important; align-items: center !important; gap: 0.4rem !important; transition: transform 0.2s ease, background 0.2s ease;" title="حذف المنتج نهائياً"><i class="fa-solid fa-trash-can"></i> DELETE</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    setupAdminProductsDragAndDrop();
}

function setupAdminProductsDragAndDrop() {
    const tableBody = document.getElementById("adminProductsTableBody");
    if (!tableBody) return;

    let draggingRow = null;

    tableBody.addEventListener("dragstart", (e) => {
        const tr = e.target.closest("tr");
        if (!tr) return;
        draggingRow = tr;
        tr.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", tr.innerHTML);
    });

    tableBody.addEventListener("dragover", (e) => {
        e.preventDefault();

        // Auto-scroll window if dragging near top/bottom boundaries of viewport
        const scrollThreshold = 80;
        const scrollSpeed = 15;
        if (e.clientY < scrollThreshold) {
            window.scrollBy(0, -scrollSpeed);
        } else if (window.innerHeight - e.clientY < scrollThreshold) {
            window.scrollBy(0, scrollSpeed);
        }

        const tr = e.target.closest("tr");
        if (!tr || tr === draggingRow || !tr.classList.contains("draggable-row")) return;

        const bounding = tr.getBoundingClientRect();
        const offset = e.clientY - bounding.top;
        if (offset > bounding.height / 2) {
            tr.after(draggingRow);
        } else {
            tr.before(draggingRow);
        }
    });

    tableBody.addEventListener("dragend", async (e) => {
        if (draggingRow) {
            draggingRow.classList.remove("dragging");
            draggingRow = null;
        }

        const rows = tableBody.querySelectorAll("tr.draggable-row");
        const batchOrders = [];
        rows.forEach((row, index) => {
            const pId = row.dataset.id;
            const newPriority = (index + 1) * 10;
            batchOrders.push({ id: pId, priority: newPriority });
        });

        try {
            const res = await fetch('/api/products/reorder-batch', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: batchOrders })
            });
            if (res.ok) {
                await loadProductsFromServer();
                batchOrders.forEach(item => {
                    const p = PRODUCTS.find(prod => prod.id === parseInt(item.id));
                    if (p) p.priority = item.priority;
                });
                renderProducts();
                
                rows.forEach((row, index) => {
                    const prioritySpan = row.querySelector("td:nth-child(4) div span");
                    if (prioritySpan) {
                        prioritySpan.textContent = `Priority: ${(index + 1) * 10}`;
                    }
                });
            }
        } catch (err) {
            console.error("Failed to update priorities batch:", err);
        }
    });
}

async function moveProductToTop(productId) {
    const filtered = currentAdminDept === "Global" 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.department === currentAdminDept);
    
    if (filtered.length === 0) return;

    let minPriority = 1000;
    filtered.forEach(p => {
        const prio = p.priority !== undefined ? p.priority : 1000;
        if (prio < minPriority) {
            minPriority = prio;
        }
    });

    const newPriority = minPriority - 10;

    try {
        const res = await fetch('/api/products', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId, priority: newPriority })
        });
        if (res.ok) {
            await loadProductsFromServer();
            renderAdminProducts();
        }
    } catch (err) {
        console.error("Failed to move product to top:", err);
    }
}

async function moveProductToBottom(productId) {
    const filtered = currentAdminDept === "Global" 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.department === currentAdminDept);
    
    if (filtered.length === 0) return;

    let maxPriority = 0;
    filtered.forEach(p => {
        const prio = p.priority !== undefined ? p.priority : 1000;
        if (prio > maxPriority) {
            maxPriority = prio;
        }
    });

    const newPriority = maxPriority + 10;

    try {
        const res = await fetch('/api/products', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId, priority: newPriority })
        });
        if (res.ok) {
            await loadProductsFromServer();
            renderAdminProducts();
        }
    } catch (err) {
        console.error("Failed to move product to bottom:", err);
    }
}

// Add/Delete/Edit Products helpers
function openAddProductModal() {
    isEditingProduct = false;
    editingProductId = null;

    const titleEl = document.getElementById("productModalTitle");
    if (titleEl) titleEl.textContent = "ADD NEW PRODUCT";

    addProductForm.reset();
    updateCategoriesDatalist();
    populateBrandOptions();
    const deptEl = document.getElementById("newProdDept");
    if (deptEl) deptEl.onchange = () => updateCategoriesDatalist();
    
    // Fix manager department select reset bug
    const newProdDept = document.getElementById("newProdDept");
    if (newProdDept && currentAdminDept !== "Global" && currentAdminDept !== "") {
        newProdDept.value = currentAdminDept;
        newProdDept.disabled = true;
    }
    if (document.getElementById("newProdBarcode")) {
        document.getElementById("newProdBarcode").value = "";
    }

    const fileInput = document.getElementById("newProdImgFile");
    if (fileInput) {
        fileInput.value = "";
        fileInput.required = false;
    }

    const previewDiv = document.getElementById("newProdImgPreviews");
    if (previewDiv) {
        previewDiv.innerHTML = "";
        delete previewDiv.dataset.existingImages;
    }

    const brandSelect = document.getElementById("newProdBrand");
    if (brandSelect) brandSelect.selectedIndex = 0;

    const seasonSelect = document.getElementById("newProdSeason");
    if (seasonSelect) seasonSelect.value = "All";

    if (window.updateDefaultSizesAndInventoryGrid) {
        window.updateDefaultSizesAndInventoryGrid();
    }
    if (window.updateColorImagesUploadContainer) {
        window.updateColorImagesUploadContainer();
    }
    clearProductVideo();
    addProductModalBackdrop.classList.add("active");
}

function clearProductVideo() {
    const fileInput = document.getElementById("newProdVideoFile");
    const urlInput = document.getElementById("newProdVideoUrl");
    const previewContainer = document.getElementById("newProdVideoPreviewContainer");
    const previewVideo = document.getElementById("newProdVideoPreview");

    if (fileInput) fileInput.value = "";
    if (urlInput) urlInput.value = "";
    if (previewVideo) {
        previewVideo.pause();
        previewVideo.src = "";
    }
    if (previewContainer) previewContainer.style.display = "none";
}
window.clearProductVideo = clearProductVideo;

function closeAddProductModal() {
    clearProductVideo();
    addProductModalBackdrop.classList.remove("active");
}

function openEditProductModal(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    isEditingProduct = true;
    editingProductId = productId;

    const titleEl = document.getElementById("productModalTitle");
    if (titleEl) titleEl.textContent = "EDIT PRODUCT";

    document.getElementById("newProdName").value = prod.name;
    document.getElementById("newProdPriority").value = prod.priority || 1000;
    
    const deptSelect = document.getElementById("newProdDept");
    if (deptSelect) {
        deptSelect.value = prod.department;
        if (currentAdminDept === "Global") {
            deptSelect.disabled = false;
        }
    }
    
    updateCategoriesDatalist();
    populateBrandOptions();
    
    const catSelect = document.getElementById("newProdCategory");
    if (catSelect) catSelect.value = prod.category;

    const brandSelect = document.getElementById("newProdBrand");
    if (brandSelect) brandSelect.value = prod.brand || "Styluxe";

    const seasonSelect = document.getElementById("newProdSeason");
    if (seasonSelect) seasonSelect.value = prod.season || "All";

    document.getElementById("newProdPrice").value = prod.price;
    const oldPriceInput = document.getElementById("newProdOldPrice");
    if (oldPriceInput) oldPriceInput.value = prod.oldPrice || prod.originalPrice || prod.old_price || "";
    document.getElementById("newProdCostPrice").value = prod.costPrice || (prod.price * 0.6).toFixed(2);
    if (document.getElementById("newProdBarcode")) document.getElementById("newProdBarcode").value = prod.barcode || "";
    document.getElementById("newProdSizes").value = prod.sizes ? prod.sizes.join(", ") : "";
    document.getElementById("newProdColors").value = prod.colors ? prod.colors.join(", ") : "";
    document.getElementById("newProdPreorder").checked = !!prod.preorder;

    const videoUrlInput = document.getElementById("newProdVideoUrl");
    const videoFileInput = document.getElementById("newProdVideoFile");
    const videoPreviewContainer = document.getElementById("newProdVideoPreviewContainer");
    const videoPreview = document.getElementById("newProdVideoPreview");

    if (videoFileInput) videoFileInput.value = "";
    if (videoUrlInput) videoUrlInput.value = prod.video || "";
    if (prod.video && videoPreviewContainer && videoPreview) {
        videoPreview.src = prod.video;
        videoPreviewContainer.style.display = "block";
    } else if (videoPreviewContainer) {
        videoPreviewContainer.style.display = "none";
    }

    const fileInput = document.getElementById("newProdImgFile");
    if (fileInput) {
        fileInput.value = "";
        fileInput.required = false; 
    }

    const previewDiv = document.getElementById("newProdImgPreviews");
    if (previewDiv) {
        previewDiv.innerHTML = "";
        const imgs = getProductGalleryImages(prod);
        imgs.forEach(imgSrc => {
            const imgEl = document.createElement("img");
            imgEl.src = imgSrc;
            imgEl.style.width = "60px";
            imgEl.style.height = "60px";
            imgEl.style.objectFit = "cover";
            imgEl.style.borderRadius = "4px";
            imgEl.style.border = "1px solid var(--color-border)";
            previewDiv.appendChild(imgEl);
        });
        previewDiv.dataset.existingImages = prod.image || "";
    }

    if (window.updateDynamicInventoryGrid) {
        window.updateDynamicInventoryGrid();
        
        setTimeout(() => {
            const gridContainer = document.getElementById("dynamicInventoryGrid");
            const inputs = gridContainer ? gridContainer.querySelectorAll(".inv-qty-input") : [];
            inputs.forEach(input => {
                const key = input.dataset.key;
                if (prod.inventory && prod.inventory[key] !== undefined) {
                    input.value = prod.inventory[key];
                }
            });
        }, 50);
    }

    if (window.updateColorImagesUploadContainer) {
        window.updateColorImagesUploadContainer();
        const existingImages = prod.image ? splitProductImages(prod.image) : [];
        const colors = prod.colors || ["Black", "Charcoal", "Grey"];
        colors.forEach((color, idx) => {
            const imgUrl = existingImages[idx] || "";
            if (imgUrl) {
                const row = document.querySelector(`.color-image-row[data-color="${color}"]`);
                if (row) {
                    const previewDiv = row.querySelector(".color-img-preview");
                    const img = previewDiv ? previewDiv.querySelector("img") : null;
                    if (previewDiv && img) {
                        img.src = imgUrl;
                        previewDiv.style.display = "block";
                    }
                }
            }
        });
    }

    addProductModalBackdrop.classList.add("active");
}

function updateCategoriesDatalist() {
    const select = document.getElementById("newProdCategory");
    if (!select) return;

    const deptEl = document.getElementById("newProdDept");
    const rawDept = deptEl ? deptEl.value : "";
    const deptNorm = (rawDept || "").trim().toLowerCase();

    const catSet = new Set();

    const catMap = new Map();

    if (Array.isArray(CATEGORIES)) {
        CATEGORIES.forEach(c => {
            if (!c || !c.name) return;
            const cDept = (c.department || "").trim().toLowerCase();
            if (!deptNorm || deptNorm === "all" || deptNorm === "global" || !cDept || cDept === "all" || cDept === "global" || cDept === deptNorm) {
                const nameTrimmed = c.name.trim();
                const isSub = !!c.parentId;
                const parentObj = isSub ? CATEGORIES.find(p => p.id === c.parentId) : null;
                const label = isSub && parentObj ? `${parentObj.name.toUpperCase()}  ➡️  ${nameTrimmed.toUpperCase()}` : nameTrimmed.toUpperCase();
                
                if (!catMap.has(nameTrimmed.toLowerCase())) {
                    catMap.set(nameTrimmed.toLowerCase(), { value: nameTrimmed, label: label });
                }
            }
        });
    }

    const currentSelectedVal = select.value;
    select.innerHTML = '<option value="" disabled selected>-- SELECT CATEGORY --</option>';

    Array.from(catMap.values()).forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.value;
        opt.textContent = item.label;
        if (currentSelectedVal && currentSelectedVal.toLowerCase() === item.value.toLowerCase()) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });
}
window.updateCategoriesDatalist = updateCategoriesDatalist;




async function handleNewProductSubmit(event) {
    if (event) event.preventDefault();

    try {
        const gridContainer = document.getElementById("dynamicInventoryGrid");
        const qtyInputs = gridContainer ? gridContainer.querySelectorAll(".inv-qty-input") : [];
        const inventoryObj = {};
        qtyInputs.forEach(input => {
            const key = input.dataset.key;
            const val = parseInt(input.value) || 0;
            if (key) inventoryObj[key] = val;
        });

        const nameEl = document.getElementById("newProdName");
        const categoryEl = document.getElementById("newProdCategory");
        const priceEl = document.getElementById("newProdPrice");
        const costPriceEl = document.getElementById("newProdCostPrice");
        const deptSelect = document.getElementById("newProdDept");
        const brandSelect = document.getElementById("newProdBrand");

        const name = nameEl ? nameEl.value.trim() : "";
        if (!name) {
            alert("PLEASE ENTER A PRODUCT NAME.");
            if (nameEl) nameEl.focus();
            return;
        }

        let category = categoryEl ? categoryEl.value : "";
        if (!category) {
            category = (Array.isArray(CATEGORIES) && CATEGORIES.length > 0) ? CATEGORIES[0].name : "Ready To Wear";
        }

        let brand = brandSelect ? brandSelect.value : "";
        if (!brand) brand = "Styluxe";

        let department = deptSelect ? deptSelect.value : "";
        if (!department) department = (currentAdminDept && currentAdminDept !== "Global") ? currentAdminDept : "Men";

        const price = priceEl && !isNaN(parseFloat(priceEl.value)) ? parseFloat(priceEl.value) : 10;
        const oldPriceEl = document.getElementById("newProdOldPrice");
        const oldPrice = oldPriceEl && !isNaN(parseFloat(oldPriceEl.value)) ? parseFloat(oldPriceEl.value) : 0;
        const costPrice = costPriceEl && !isNaN(parseFloat(costPriceEl.value)) ? parseFloat(costPriceEl.value) : (price * 0.5);
        const priorityEl = document.getElementById("newProdPriority");
        const priority = priorityEl ? (parseInt(priorityEl.value) || 1000) : 1000;

        const rawSizes = document.getElementById("newProdSizes") ? document.getElementById("newProdSizes").value : "";
        const rawColors = document.getElementById("newProdColors") ? document.getElementById("newProdColors").value : "";
        const desc = document.getElementById("newProdDesc") ? document.getElementById("newProdDesc").value : "";
        const season = document.getElementById("newProdSeason") ? document.getElementById("newProdSeason").value : "All";

        const parsedSizes = typeof rawSizes === "string" && rawSizes.trim() ? rawSizes.split(",").map(s => s.trim()).filter(Boolean) : ["S", "M", "L", "XL"];
        const parsedColors = typeof rawColors === "string" && rawColors.trim() ? rawColors.split(",").map(c => c.trim()).filter(Boolean) : ["Black"];

        const colorRows = document.querySelectorAll(".color-image-row");
        const imgArray = [];
        const colorImagesMap = {};
        let hasAtLeastOneImg = false;

        for (let row of colorRows) {
            const colorName = row.dataset.color || row.getAttribute("data-color");
            const previewImg = row.querySelector(".color-img-preview img");
            const previewDiv = row.querySelector(".color-img-preview");
            if (previewDiv && previewDiv.style.display !== "none" && previewImg && previewImg.src) {
                imgArray.push(previewImg.src);
                if (colorName) {
                    colorImagesMap[colorName] = previewImg.src;
                }
                hasAtLeastOneImg = true;
            }
        }

        let img = "";
        if (hasAtLeastOneImg) {
            img = imgArray.filter(Boolean).join("|||");
        } else {
            const fileInput = document.getElementById("newProdImgFile");
            const previewDiv = document.getElementById("newProdImgPreviews");
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                try {
                    const base64Promises = Array.from(fileInput.files).map(file => getFileBase64(file));
                    const base64Array = await Promise.all(base64Promises);
                    img = base64Array.join("|||");
                } catch (e) {
                    alert("Error reading product image files.");
                    return;
                }
            } else if (isEditingProduct && previewDiv && previewDiv.dataset.existingImages) {
                img = previewDiv.dataset.existingImages;
            }
        }

        if (!img) {
            img = "assets/user_prod_1.jpg";
        }

        const preorder = document.getElementById("newProdPreorder") ? document.getElementById("newProdPreorder").checked : false;
        const barcodeInput = document.getElementById("newProdBarcode");
        const barcode = barcodeInput ? barcodeInput.value.trim() : "";

        const videoFileInput = document.getElementById("newProdVideoFile");
        const videoUrlInput = document.getElementById("newProdVideoUrl");
        let videoUrl = videoUrlInput ? videoUrlInput.value.trim() : "";

        if (videoFileInput && videoFileInput.files && videoFileInput.files.length > 0) {
            try {
                videoUrl = await getFileBase64(videoFileInput.files[0]);
            } catch (e) {
                console.error("Error reading product video file", e);
            }
        } else if (isEditingProduct && !videoUrl && typeof editingProductId !== "undefined") {
            const existingProd = PRODUCTS.find(p => String(p.id) === String(editingProductId));
            if (existingProd && existingProd.video) {
                videoUrl = existingProd.video;
            }
        }

        const targetId = isEditingProduct ? editingProductId : Date.now();

        const newProdObj = {
            id: targetId,
            name: name.toUpperCase(),
            category: category,
            department: department,
            price: price,
            oldPrice: oldPrice,
            costPrice: costPrice,
            priority: priority,
            barcode: barcode,
            image: img,
            video: videoUrl || "",
            description: desc,
            sizes: parsedSizes,
            colors: parsedColors,
            inventory: inventoryObj,
            badge: preorder ? "PRE-ORDER" : "NEW",
            colorImages: colorImagesMap,
            brand: brand,
            preorder: preorder,
            season: season
        };

        // Update local PRODUCTS array immediately
        if (!Array.isArray(PRODUCTS)) PRODUCTS = [];

        if (isEditingProduct) {
            const existingIdx = PRODUCTS.findIndex(p => String(p.id) === String(targetId));
            if (existingIdx !== -1) {
                PRODUCTS[existingIdx] = newProdObj;
            } else {
                PRODUCTS.unshift(newProdObj);
            }
        } else {
            PRODUCTS.unshift(newProdObj);
        }

        // Background server sync if API available
        try {
            fetch('/api/products', {
                method: isEditingProduct ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProdObj)
            }).catch(() => {});
        } catch (err) {}

        // Persist to LocalStorage
        if (typeof saveAllUserDataLocally === "function") saveAllUserDataLocally();

        // Close modal & refresh UI
        closeAddProductModal();
        activeCategory = "All";
        activeBrand = "All";

        if (typeof renderAdminProducts === "function") renderAdminProducts();
        if (typeof renderProducts === "function") renderProducts();
        if (typeof renderCategoryNewArrivals === "function") renderCategoryNewArrivals();
        if (typeof updateCategoriesDatalist === "function") updateCategoriesDatalist();

    } catch (err) {
        console.error("Error in handleNewProductSubmit:", err);
        alert("Product saved locally!");
        closeAddProductModal();
        if (typeof renderAdminProducts === "function") renderAdminProducts();
    }
}



async function reorderProduct(id, action) {
    try {
        const res = await fetch('/api/products/reorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action })
        });
        if (res.ok) {
            await loadProductsFromServer();
            renderAdminProducts();
            renderProducts();
        } else {
            alert("FAILED TO REORDER PRODUCT.");
        }
    } catch (err) {
        console.error("Error reordering product:", err);
    }
}



async function deleteProduct(eventOrId, productId) {
    let id = productId;
    let event = null;
    if (typeof eventOrId === "object" && eventOrId !== null) {
        event = eventOrId;
        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
    } else if (productId === undefined) {
        id = eventOrId;
    }

    if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT PERMANENTLY?")) return;

    // Immediately remove row from DOM for instant visual feedback on click 1
    const tr = document.querySelector(`tr[data-id="${id}"]`);
    if (tr) tr.remove();

    // Update local PRODUCTS array
    PRODUCTS = PRODUCTS.filter(p => String(p.id) !== String(id));

    // Send DELETE to server API in background to update server database.json in real-time
    try {
        await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    } catch (err) {}

    // Re-render UI
    if (typeof renderAdminProducts === "function") renderAdminProducts();
    if (typeof renderProducts === "function") renderProducts();
}

let currentPosDept = "All";
let currentPosCategory = "All";
let currentPosSearch = "";

async function renderAdminPos() {
    if (!Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
        await loadProductsFromServer();
    }
    if (!Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
        const cached = localStorage.getItem("styluxe_products");
        if (cached) {
            try { PRODUCTS = JSON.parse(cached); } catch(e){}
        }
    }
    renderPosProducts();
    renderPosTicketItems();
}

function resetPosFilters() {
    currentPosDept = "All";
    currentPosCategory = "All";
    currentPosSearch = "";
    const searchInput = document.getElementById("posSearchInput");
    const catSelect = document.getElementById("posCategorySelect");
    if (searchInput) searchInput.value = "";
    if (catSelect) catSelect.value = "All";
    const tabs = document.querySelectorAll(".pos-dept-tab");
    tabs.forEach((t, idx) => {
        if (idx === 0) t.classList.add("active");
        else t.classList.remove("active");
    });
    renderPosProducts();
}

function getColorHex(colorName) {
    if (!colorName) return "#666666";
    const name = colorName.trim().toLowerCase();
    const map = {
        "brown": "#8B4513",
        "blue": "#2980b9",
        "navy blue": "#000080",
        "navy  blue": "#000080",
        "navy": "#000080",
        "white": "#ffffff",
        "whte": "#ffffff",
        "whit": "#ffffff",
        "black": "#000000",
        "beige": "#d7c4b7",
        "grey": "#808080",
        "gray": "#808080",
        "charcoal": "#36454F",
        "red": "#e74c3c",
        "green": "#2ecc71",
        "yellow": "#f1c40f",
        "pink": "#e84393",
        "orange": "#e67e22",
        "gold": "#ffd700",
        "silver": "#c0c0c0",
        "cream": "#fffdd0",
        "olive": "#808000"
    };
    return map[name] || name;
}

function renderPosProducts() {
    const grid = document.getElementById("posProductsGrid");
    const catSelect = document.getElementById("posCategorySelect");
    if (!grid) return;

    if (catSelect) {
        const selectedVal = catSelect.value || "All";
        catSelect.innerHTML = '<option value="All">ALL CATEGORIES</option>';
        const uniqueCats = new Set();
        if (Array.isArray(PRODUCTS)) {
            PRODUCTS.forEach(p => { if (p.category) uniqueCats.add(p.category.trim()); });
        }
        if (Array.isArray(CATEGORIES)) {
            CATEGORIES.forEach(c => { if (c.name) uniqueCats.add(c.name.trim()); });
        }
        uniqueCats.forEach(catName => {
            const opt = document.createElement("option");
            opt.value = catName;
            opt.textContent = catName.toUpperCase();
            catSelect.appendChild(opt);
        });
        catSelect.value = selectedVal;
    }

    grid.innerHTML = "";

    let filtered = Array.isArray(PRODUCTS) ? [...PRODUCTS] : [];

    if (currentPosDept && currentPosDept !== "All" && currentPosDept !== "Global") {
        const deptFilter = currentPosDept.toLowerCase().trim();
        filtered = filtered.filter(p => {
            if (!p.department) return true;
            const pDept = p.department.toLowerCase().trim();
            if (pDept === deptFilter) return true;
            if (deptFilter === "men" && (pDept.includes("men") || pDept === "unisex")) return true;
            if (deptFilter === "women" && (pDept.includes("women") || pDept === "unisex")) return true;
            if (deptFilter === "kids" && (pDept.includes("kid") || pDept.includes("child"))) return true;
            return false;
        });
    }

    if (currentPosCategory && currentPosCategory !== "All") {
        const catFilter = currentPosCategory.toLowerCase().trim();
        filtered = filtered.filter(p => p.category && p.category.toLowerCase().includes(catFilter));
    }

    if (currentPosSearch) {
        const query = currentPosSearch.toLowerCase();
        filtered = filtered.filter(p => 
            (p.name && p.name.toLowerCase().includes(query)) ||
            (p.id && String(p.id).includes(query)) ||
            (p.barcode && String(p.barcode).toLowerCase().includes(query)) ||
            (p.sku && String(p.sku).toLowerCase().includes(query)) ||
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.brand && p.brand.toLowerCase().includes(query))
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 4rem; font-size: 1.3rem;">
                <p style="margin-bottom: 1rem;">NO PRODUCTS FOUND MATCHING FILTERS.</p>
                <button onclick="resetPosFilters()" style="background: #ffffff !important; color: #000000 !important; border: none; padding: 0.8rem 1.8rem; font-weight: 700; border-radius: 4px; cursor: pointer;">SHOW ALL PRODUCTS</button>
            </div>
        `;
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("pos-product-card");
        card.style.cssText = "background: var(--color-surface, #121212); border: 1px solid var(--color-border); padding: 1.2rem; border-radius: 6px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.15s, border-color 0.15s;";

        const colors = (Array.isArray(p.colors) && p.colors.length > 0) ? p.colors : [];
        const sizes = (Array.isArray(p.sizes) && p.sizes.length > 0) ? p.sizes : ["S", "M", "L", "XL"];
        const defaultColor = colors.length > 0 ? colors[0] : "";
        card.dataset.selectedColor = defaultColor;

        const img = (p.colorImages && defaultColor && p.colorImages[defaultColor]) || getProductMainImage(p);

        let colorsHTML = "";
        if (colors.length > 0) {
            colorsHTML = `
                <div style="margin-bottom: 0.6rem;">
                    <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.4rem; font-weight: 600;">SELECT COLOR:</div>
                    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center;">
                        ${colors.map((c, idx) => {
                            const hex = getColorHex(c);
                            const isWhite = hex.toLowerCase() === "#ffffff" || hex.toLowerCase() === "white" || hex.toLowerCase() === "#fffdd0";
                            const border = isWhite ? "1px solid #aaaaaa" : "1px solid rgba(255,255,255,0.2)";
                            const shadow = idx === 0 ? "0 0 0 2px #ffffff, 0 0 8px rgba(255,255,255,0.7)" : "none";
                            const transform = idx === 0 ? "scale(1.15)" : "scale(1)";
                            return `
                                <button class="pos-color-btn" title="${c}" onclick="event.stopPropagation(); selectPosCardColor('${p.id}', '${c}', this)" style="background-color: ${hex}; border: ${border}; width: 26px; height: 26px; border-radius: 50%; cursor: pointer; transition: all 0.2s ease; box-shadow: ${shadow}; transform: ${transform}; position: relative; padding: 0;" aria-label="${c}">
                                </button>
                            `;
                        }).join("")}
                    </div>
                </div>
            `;
        }

        let sizesHTML = sizes.map(s => `
            <button onclick="event.stopPropagation(); addProductToPosCartFromCard(${p.id}, '${s}', this)" style="background: #000000 !important; color: #ffffff !important; border: 1px solid var(--color-border); padding: 0.5rem 0.8rem; border-radius: 4px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.2s;">
                ${s}
            </button>
        `).join("");

        card.innerHTML = `
            <div>
                <div style="width: 100%; height: 160px; background: #000; border-radius: 4px; overflow: hidden; margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center;">
                    <img class="pos-prod-img" src="${img}" alt="${p.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                ${colorsHTML}
                <div style="margin-bottom: 0.8rem;">
                    <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.4rem; font-weight: 600;">SELECT SIZE TO ADD:</div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${sizesHTML}
                    </div>
                </div>
                <div style="font-size: 0.9rem; color: var(--color-accent); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">${p.brand || 'Styluxe'}</div>
                <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text); margin: 0.2rem 0; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</h4>
                <div style="font-size: 1.2rem; font-weight: 700; color: var(--color-text);">$${parseFloat(p.price).toFixed(2)}</div>
            </div>
        `;

        grid.appendChild(card);
    });
}

function selectPosCardColor(productId, colorName, btnEl) {
    const card = btnEl.closest('.pos-product-card');
    if (!card) return;
    card.dataset.selectedColor = colorName;
    const colorBtns = card.querySelectorAll('.pos-color-btn');
    colorBtns.forEach(b => {
        b.style.boxShadow = "none";
        b.style.transform = "scale(1)";
    });
    btnEl.style.boxShadow = "0 0 0 2px #ffffff, 0 0 8px rgba(255,255,255,0.7)";
    btnEl.style.transform = "scale(1.15)";

    const product = PRODUCTS.find(p => String(p.id) === String(productId));
    if (product) {
        const imgEl = card.querySelector('.pos-prod-img');
        if (imgEl) {
            if (product.colorImages && product.colorImages[colorName]) {
                imgEl.src = product.colorImages[colorName];
            } else {
                imgEl.src = getProductMainImage(product);
            }
        }
    }
}

function addProductToPosCartFromCard(productId, size, btnEl) {
    const card = btnEl.closest('.pos-product-card');
    const color = card ? (card.dataset.selectedColor || "") : "";
    addProductToPosCart(productId, size, color);
}

function filterPosByDept(dept, btnElement) {
    currentPosDept = dept;
    const tabs = document.querySelectorAll(".pos-dept-tab");
    tabs.forEach(t => t.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    renderPosProducts();
}

function filterPosCatalog() {
    const searchInput = document.getElementById("posSearchInput");
    const catSelect = document.getElementById("posCategorySelect");
    if (searchInput) currentPosSearch = searchInput.value.trim();
    if (catSelect) currentPosCategory = catSelect.value;
    renderPosProducts();
}

function handlePosSearchKeydown(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const query = event.target.value.trim().toLowerCase();
        if (!query) return;

        // 1. Try exact barcode / SKU / ID match
        let matchedProduct = PRODUCTS.find(p => 
            (p.barcode && String(p.barcode).toLowerCase() === query) ||
            (p.sku && String(p.sku).toLowerCase() === query) ||
            (p.id && String(p.id).toLowerCase() === query)
        );

        // 2. If no exact match, check single result from filter
        if (!matchedProduct) {
            const filtered = PRODUCTS.filter(p => 
                (p.name && p.name.toLowerCase().includes(query)) ||
                (p.barcode && String(p.barcode).toLowerCase().includes(query)) ||
                (p.sku && String(p.sku).toLowerCase().includes(query)) ||
                (p.id && String(p.id).includes(query))
            );
            if (filtered.length === 1) {
                matchedProduct = filtered[0];
            }
        }

        if (matchedProduct) {
            const defaultSize = (Array.isArray(matchedProduct.sizes) && matchedProduct.sizes.length > 0) ? matchedProduct.sizes[0] : "M";
            addProductToPosCart(matchedProduct.id, defaultSize);
            event.target.value = "";
            currentPosSearch = "";
            renderPosProducts();
        }
    }
}

function addProductToPosCart(productId, size, color) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (!Array.isArray(posCart)) posCart = [];

    const selectedColor = color || (Array.isArray(product.colors) && product.colors.length > 0 ? product.colors[0] : "");
    const img = (product.colorImages && selectedColor && product.colorImages[selectedColor]) || getProductMainImage(product);

    const existingIndex = posCart.findIndex(item => item.id === productId && item.size === size && (item.color || "") === selectedColor);
    if (existingIndex > -1) {
        posCart[existingIndex].quantity += 1;
    } else {
        posCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            color: selectedColor,
            quantity: 1,
            image: img
        });
    }

    renderPosTicketItems();
}

function renderPosTicketItems() {
    const container = document.getElementById("posTicketItems");
    const countEl = document.getElementById("posItemCount");
    if (!container) return;

    if (!Array.isArray(posCart)) posCart = [];

    container.innerHTML = "";

    const totalItemCount = posCart.reduce((sum, item) => sum + item.quantity, 0);
    if (countEl) countEl.textContent = `${totalItemCount} ITEMS`;

    if (posCart.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); padding: 4rem 1rem; font-size: 1.2rem;">NO ITEMS IN TICKET.</div>`;
        updatePosTotals();
        savePosCartToStorage();
        return;
    }

    posCart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("pos-ticket-item");
        div.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--color-border); gap: 1rem;";

        const colorLabel = item.color ? ` | COLOR: <strong>${item.color}</strong>` : '';

        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                <img src="${item.image || 'assets/category_ready_to_wear.png'}" alt="${item.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 4px; border: 1px solid var(--color-border);">
                <div>
                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-text); text-transform: uppercase;">${item.name}</div>
                    <div style="font-size: 0.95rem; color: var(--color-text-muted);">SIZE: <strong>${item.size}</strong>${colorLabel} | $${parseFloat(item.price).toFixed(2)}</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.8rem;">
                <div style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden;">
                    <button onclick="changePosQty(${index}, -1)" style="background: rgba(255,255,255,0.08); color: var(--color-text); width: 32px; height: 32px; font-size: 1.2rem; cursor: pointer; border: none;">-</button>
                    <span style="padding: 0 0.8rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text);">${item.quantity}</span>
                    <button onclick="changePosQty(${index}, 1)" style="background: rgba(255,255,255,0.08); color: var(--color-text); width: 32px; height: 32px; font-size: 1.2rem; cursor: pointer; border: none;">+</button>
                </div>
                <div style="font-size: 1.15rem; font-weight: 700; color: var(--color-text); width: 70px; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</div>
                <button onclick="removePosItemByIndex(${index})" style="background: none; border: none; color: #e74c3c; font-size: 1.2rem; cursor: pointer; padding: 0.3rem;" title="Remove Item"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;

        container.appendChild(div);
    });

    updatePosTotals();
    savePosCartToStorage();
}

function changePosQty(index, change) {
    if (!Array.isArray(posCart)) return;
    if (index >= 0 && index < posCart.length) {
        posCart[index].quantity += change;
        if (posCart[index].quantity <= 0) {
            posCart.splice(index, 1);
        }
    }
    savePosCartToStorage();
    renderPosTicketItems();
}

function removePosItem(productId, size, color) {
    if (!Array.isArray(posCart)) return;
    posCart = posCart.filter(item => !(String(item.id) === String(productId) && String(item.size).toLowerCase() === String(size).toLowerCase() && (!color || String(item.color).toLowerCase() === String(color).toLowerCase())));
    savePosCartToStorage();
    renderPosTicketItems();
}

function removePosItemByIndex(index) {
    if (!Array.isArray(posCart)) return;
    if (index >= 0 && index < posCart.length) {
        posCart.splice(index, 1);
    }
    savePosCartToStorage();
    renderPosTicketItems();
}

function updatePosTotals() {
    const subtotal = posCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountPercent = parseFloat(posDiscountInput.value) || 0;
    const discount = (subtotal * discountPercent) / 100;
    const total = subtotal - discount;

    posSubtotal.textContent = formatPrice(subtotal);
    posDiscountAmount.textContent = `-${formatPrice(discount)}`;
    posTotal.textContent = formatPrice(total);
}

function processPosSale() {
    if (posCart.length === 0) {
        alert("PLEASE ADD PRODUCTS TO CHECKOUT FIRST.");
        return;
    }

    const customer = posCustomerName.value.trim() || "WALK-IN CUSTOMER";
    const phone = posCustomerPhone.value.trim() || "N/A";
    const addressInput = document.getElementById("posCustomerAddress");
    const address = addressInput ? addressInput.value.trim() || "STORE PICKUP / WALK-IN" : "STORE PICKUP / WALK-IN";
    
    const discountPercent = parseFloat(posDiscountInput.value) || 0;
    
    const subtotal = posCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = (subtotal * discountPercent) / 100;
    const total = subtotal - discount;
    const randomId = Math.floor(10000 + Math.random() * 90000);

    // Stock Validation Check for POS Sales
    if (posMode !== "return") {
        for (const item of posCart) {
            const prod = PRODUCTS.find(p => String(p.id) === String(item.id));
            if (prod) {
                const avail = getItemAvailableStock(prod, item.size, item.color);
                if (item.quantity > avail) {
                    alert(`❌ Cannot complete sale!\n\nRequested quantity for (${item.name} - Size ${item.size}) exceeds available stock.\n\nRequested: ${item.quantity} | Available stock: ${avail} units.`);
                    return;
                }
            }
        }
    }

    if (posMode === "return") {
        const orderId = `REF-${randomId}`;
        
        let managerPassword = "";
        const role = currentAdminStaff ? currentAdminStaff.role : "";
        if (role !== "Manager" && role !== "Administrator") {
            managerPassword = prompt("UNAUTHORIZED: Manager authorization required. Please enter Manager Password to approve this refund:");
            if (managerPassword === null) return;
            if (!managerPassword.trim()) {
                alert("Manager password is required.");
                return;
            }
        }
        
        const payload = {
            id: orderId,
            customerName: customer,
            customerPhone: phone,
            customerAddress: address,
            items: [...posCart],
            total: total,
            staffEmail: currentAdminStaff ? currentAdminStaff.email : "",
            staffPassword: currentAdminPassword || "",
            managerPassword,
            cashierName: currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN"
        };
        
        fetch('/api/orders/pos-return', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(async res => {
            const data = await res.json();
            if (res.ok) {
                alert("POS Return completed successfully! Products restocked.");
                await loadOrdersFromServer();
                await loadProductsFromServer();
                showPosReturnReceipt(data.order, subtotal, discount, total);
            } else {
                alert(`POS Return failed: ${data.error}`);
            }
        })
        .catch(err => {
            console.error("POS return failed:", err);
            alert("Connection error. Return failed.");
        });
        
        return;
    }

    const orderId = `POS-${randomId}`;

    // Register sale inside Database
    const posOrderData = {
        id: orderId,
        customerName: customer,
        customerEmail: "pos@styluxe.com",
        customerPhone: phone,
        customerAddress: address,
        date: new Date().toISOString().split('T')[0],
        items: [...posCart],
        total: total,
        status: "PAID (POS)",
        department: "Global",
        cashierName: currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN"
    };

    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(posOrderData)
    })
    .then(async res => {
        if (res.ok) {
            await loadOrdersFromServer();
            await loadProductsFromServer();
        }
    })
    .catch(err => {
        console.error("POS order logging failed:", err);
    });

    // Populate Receipt Modal HTML safely
    const rDate = document.getElementById("receiptDate");
    if (rDate) rDate.textContent = new Date().toISOString().split('T')[0] + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const rCust = document.getElementById("receiptCustomer");
    if (rCust) rCust.textContent = customer;
    
    const cashierName = currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN";
    const cashierEl = document.getElementById("receiptCashier");
    if (cashierEl) cashierEl.textContent = cashierName;
    
    const receiptItemsContainer = document.getElementById("receiptItems");
    if (receiptItemsContainer) {
        receiptItemsContainer.innerHTML = "";
        posCart.forEach(item => {
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.innerHTML = `
                <span>${item.name} (x${item.quantity}) [${item.size}]</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
            `;
            receiptItemsContainer.appendChild(div);
        });
    }

    const rSub = document.getElementById("receiptSubtotal");
    if (rSub) rSub.textContent = formatPrice(subtotal);
    
    const rDisc = document.getElementById("receiptDiscount");
    if (rDisc) rDisc.textContent = `-${formatPrice(discount)}`;
    
    const rTot = document.getElementById("receiptTotal");
    if (rTot) rTot.textContent = formatPrice(total);

    // Populate Shipping Label Sticker Modal HTML safely
    const lName = document.getElementById("labelCustomerName");
    if (lName) lName.textContent = customer;
    
    const lPhone = document.getElementById("labelCustomerPhone");
    if (lPhone) lPhone.textContent = phone;
    
    const lAddr = document.getElementById("labelCustomerAddress");
    if (lAddr) lAddr.textContent = address;
    
    const lDate = document.getElementById("labelDate");
    if (lDate) lDate.textContent = new Date().toISOString().split('T')[0];
    
    const lId = document.getElementById("labelOrderId");
    if (lId) lId.textContent = orderId;

    const lTot = document.getElementById("labelTotalAmount");
    if (lTot) lTot.textContent = `$${total.toFixed(2)}`;

    // Store last POS sale data for independent printing
    lastPosSaleObj = {
        orderData: posOrderData,
        cartItems: [...posCart],
        subtotal: subtotal,
        discount: discount,
        total: total
    };

    // Open Modal backdrop preview
    const modal = document.getElementById("posReceiptModalBackdrop");
    if (modal) modal.classList.add("active");

    // Reset customer info fields
    posCustomerName.value = "";
    posCustomerPhone.value = "";
    if (addressInput) addressInput.value = "";
}

// ==========================================
// DAILY REGISTER CLOSING & ARCHIVE SYSTEM
// ==========================================

let currentShiftStats = {
    todayDate: "",
    ordersCount: 0,
    totalSales: 0,
    totalReturns: 0,
    netSales: 0
};

async function openCloseRegisterModal() {
    if (!promptManagerPermission("Close Daily Register")) return;

    const today = new Date().toISOString().split('T')[0];
    
    // Refresh orders list to get absolute latest figures
    if (typeof loadOrdersFromServer === 'function') {
        await loadOrdersFromServer();
    }

    const todaySalesOrders = (ordersList || []).filter(o => o.date === today && !String(o.id).startsWith("REF-"));
    const todayReturnOrders = (ordersList || []).filter(o => o.date === today && String(o.id).startsWith("REF-"));

    const salesTotal = todaySalesOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const returnsTotal = todayReturnOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const netTotal = Math.max(0, salesTotal - returnsTotal);

    currentShiftStats = {
        todayDate: today,
        ordersCount: todaySalesOrders.length,
        totalSales: salesTotal,
        totalReturns: returnsTotal,
        netSales: netTotal
    };

    const dateEl = document.getElementById("closeRegDate");
    if (dateEl) dateEl.textContent = today;

    const countEl = document.getElementById("closeRegOrdersCount");
    if (countEl) countEl.textContent = `${todaySalesOrders.length} ORDERS`;

    const salesEl = document.getElementById("closeRegTotalSales");
    if (salesEl) salesEl.textContent = formatPrice(salesTotal);

    const returnsEl = document.getElementById("closeRegTotalReturns");
    if (returnsEl) returnsEl.textContent = formatPrice(returnsTotal);

    const netEl = document.getElementById("closeRegNetSales");
    if (netEl) netEl.textContent = formatPrice(netTotal);

    const staffEl = document.getElementById("closeRegStaffName");
    if (staffEl) staffEl.textContent = currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN";

    const modal = document.getElementById("posCloseRegisterModalBackdrop");
    if (modal) modal.classList.add("active");
}

function closeCloseRegisterModal() {
    const modal = document.getElementById("posCloseRegisterModalBackdrop");
    if (modal) modal.classList.remove("active");
}

async function confirmCloseDailyRegister() {
    if (!confirm("Are you sure you want to close the daily register and open a new shift?")) return;

    const staffName = currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN";
    const notesEl = document.getElementById("closeRegNotes");
    const notes = notesEl ? notesEl.value.trim() : "";

    const payload = {
        closedBy: staffName,
        notes: notes,
        closingDate: currentShiftStats.todayDate,
        totalSales: currentShiftStats.totalSales,
        totalOrders: currentShiftStats.ordersCount,
        totalReturns: currentShiftStats.totalReturns,
        netSales: currentShiftStats.netSales
    };

    try {
        const response = await fetch('/api/daily-registers/close', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("✅ Daily Register closed successfully and stored in Archive! A new shift is now open.");
            closeCloseRegisterModal();
            if (typeof loadOrdersFromServer === 'function') {
                await loadOrdersFromServer();
            }
        } else {
            const err = await response.json();
            alert("Failed to close register: " + (err.error || "Connection error"));
        }
    } catch (err) {
        console.error("Failed to close daily register:", err);
        alert("Network error while closing daily register.");
    }
}

function printDailyCloseReport() {
    const staffName = currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN";
    const printWin = window.open('', '_blank', 'width=800,height=900');
    if (printWin) {
        printWin.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>DAILY REGISTER CLOSE REPORT - ${currentShiftStats.todayDate}</title>
                <style>
                    @page { margin: 10mm; size: A4 portrait; }
                    body { font-family: monospace, sans-serif; padding: 20px; color: #000; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
                    .header h1 { font-size: 32px; margin: 0; }
                    .row { display: flex; justify-content: space-between; font-size: 16px; margin-bottom: 10px; }
                    .net-box { border: 2px solid #000; padding: 15px; text-align: center; font-size: 22px; font-weight: 900; margin: 25px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>STYLUXE</h1>
                    <h2>OFFICIAL DAILY REGISTER CLOSE REPORT</h2>
                    <p>Date: ${currentShiftStats.todayDate} | Closed By: ${staffName}</p>
                </div>
                <div class="row"><span>Total Orders:</span><span>${currentShiftStats.ordersCount}</span></div>
                <div class="row"><span>Total Sales Gross:</span><span>$${currentShiftStats.totalSales.toFixed(2)}</span></div>
                <div class="row"><span>Total Returns / Refunds:</span><span>-$${currentShiftStats.totalReturns.toFixed(2)}</span></div>
                <div class="net-box">
                    NET CASH IN REGISTER: $${currentShiftStats.netSales.toFixed(2)}
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <p>*** END OF SHIFT REPORT ***</p>
                </div>
                <script>
                    window.onload = function() { window.focus(); window.print(); };
                </script>
            </body>
            </html>
        `);
        printWin.document.close();
    }
}

async function openPastRegistersModal() {
    if (!promptManagerPermission("Access Registers Archive")) return;

    try {
        const response = await fetch('/api/daily-registers');
        const registers = await response.json();

        const tbody = document.getElementById("pastRegistersTableBody");
        if (tbody) {
            tbody.innerHTML = "";
            if (!registers || registers.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">No closed daily registers in archive yet.</td></tr>`;
            } else {
                registers.forEach(reg => {
                    const tr = document.createElement("tr");
                    tr.style.borderBottom = "1px solid var(--color-border)";
                    tr.innerHTML = `
                        <td style="padding: 1rem; font-weight: 700; color: var(--color-text);">${reg.id}</td>
                        <td style="padding: 1rem; color: var(--color-text);">${reg.date}</td>
                        <td style="padding: 1rem; color: var(--color-accent); font-weight: 700;">${reg.totalOrders}</td>
                        <td style="padding: 1rem; color: #2ecc71; font-weight: 700;">$${(reg.totalSales || 0).toFixed(2)}</td>
                        <td style="padding: 1rem; color: #e74c3c; font-weight: 700;">-$${(reg.totalReturns || 0).toFixed(2)}</td>
                        <td style="padding: 1rem; color: var(--color-accent); font-weight: 900; font-size: 1.1rem;">$${(reg.netSales || 0).toFixed(2)}</td>
                        <td style="padding: 1rem; color: var(--color-text-muted);">${reg.closedBy || 'SYSTEM'}</td>
                        <td style="padding: 1rem; text-align: center;">
                            <button onclick="printArchivedRegister('${reg.id}')" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: var(--color-accent); padding: 0.4rem 0.8rem; font-size: 0.9rem; font-weight: 700; border-radius: 4px; cursor: pointer;"><i class="fa-solid fa-print"></i> PRINT REPORT</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            }
        }

        const modal = document.getElementById("posPastRegistersModalBackdrop");
        if (modal) modal.classList.add("active");
    } catch (err) {
        console.error("Failed to load past registers:", err);
        alert("Failed to load daily registers archive.");
    }
}

function closePastRegistersModal() {
    const modal = document.getElementById("posPastRegistersModalBackdrop");
    if (modal) modal.classList.remove("active");
}

async function printArchivedRegister(regId) {
    try {
        const response = await fetch('/api/daily-registers');
        const registers = await response.json();
        const reg = registers.find(r => r.id === regId);
        if (!reg) {
            alert("Archived daily register report not found.");
            return;
        }

        const printWin = window.open('', '_blank', 'width=800,height=900');
        if (printWin) {
            printWin.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>ARCHIVED REGISTER REPORT - ${reg.id}</title>
                    <style>
                        @page { margin: 10mm; size: A4 portrait; }
                        body { font-family: monospace, sans-serif; padding: 20px; color: #000; }
                        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
                        .header h1 { font-size: 32px; margin: 0; }
                        .row { display: flex; justify-content: space-between; font-size: 16px; margin-bottom: 10px; }
                        .net-box { border: 2px solid #000; padding: 15px; text-align: center; font-size: 22px; font-weight: 900; margin: 25px 0; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>STYLUXE</h1>
                        <h2>ARCHIVED DAILY REGISTER REPORT</h2>
                        <p>ID: ${reg.id} | Date: ${reg.date} | Closed By: ${reg.closedBy || 'SYSTEM'}</p>
                    </div>
                    <div class="row"><span>Closed Timestamp:</span><span>${new Date(reg.closedAt).toLocaleString()}</span></div>
                    <div class="row"><span>Total Orders:</span><span>${reg.totalOrders}</span></div>
                    <div class="row"><span>Total Sales Gross:</span><span>$${(reg.totalSales || 0).toFixed(2)}</span></div>
                    <div class="row"><span>Total Returns / Refunds:</span><span>-$${(reg.totalReturns || 0).toFixed(2)}</span></div>
                    <div class="net-box">
                        NET CASH IN REGISTER: $${(reg.netSales || 0).toFixed(2)}
                    </div>
                    ${reg.notes ? `<p style="margin-top: 20px;"><strong>Notes:</strong> ${reg.notes}</p>` : ''}
                    <div style="text-align: center; margin-top: 40px;">
                        <p>*** END OF ARCHIVED REPORT ***</p>
                    </div>
                    <script>
                        window.onload = function() { window.focus(); window.print(); };
                    </script>
                </body>
                </html>
            `);
            printWin.document.close();
        }
    } catch (e) {
        console.error("Failed to print archived register:", e);
    }
}

let lastPosSaleObj = null;

// Print ONLY Delivery Sticker WITH COD Total Amount (Natural Compact Sticker Size)
function triggerStickerPrint(name, phone, address, date, orderId, totalAmount) {
    const cleanName = (name || "CUSTOMER").toUpperCase();
    const cleanPhone = phone || "N/A";
    const cleanAddress = address || "N/A";
    const cleanDate = date || new Date().toISOString().split('T')[0];
    const cleanOrderId = String(orderId || "").startsWith('#') ? orderId : `#${orderId || "1001"}`;
    const cleanTotal = totalAmount ? (String(totalAmount).startsWith('$') ? totalAmount : `$${parseFloat(totalAmount).toFixed(2)}`) : "$0.00";

    // Populate label elements in main page modal
    const nameEl = document.getElementById("labelCustomerName");
    const phoneEl = document.getElementById("labelCustomerPhone");
    const addrEl = document.getElementById("labelCustomerAddress");
    const dateEl = document.getElementById("labelDate");
    const idEl = document.getElementById("labelOrderId");
    const totEl = document.getElementById("labelTotalAmount");

    if (nameEl) nameEl.textContent = cleanName;
    if (phoneEl) phoneEl.textContent = cleanPhone;
    if (addrEl) addrEl.textContent = cleanAddress;
    if (dateEl) dateEl.textContent = cleanDate;
    if (idEl) idEl.textContent = cleanOrderId;
    if (totEl) totEl.textContent = cleanTotal;

    const stickerWidth = (STORE_SETTINGS && parseFloat(STORE_SETTINGS.sticker_width)) || 100;
    const stickerHeight = (STORE_SETTINGS && parseFloat(STORE_SETTINGS.sticker_height)) || 70;

    const printWin = window.open('', '_blank', `width=${Math.max(500, stickerWidth * 4)},height=${Math.max(500, stickerHeight * 4)},scrollbars=yes,resizable=yes`);
    if (printWin) {
        printWin.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>STYLUXE Delivery Sticker ${cleanOrderId}</title>
                <style>
                    @page {
                        margin: 0;
                        size: ${stickerWidth}mm ${stickerHeight}mm;
                    }
                    html, body {
                        margin: 0;
                        padding: 0;
                        width: ${stickerWidth}mm;
                        height: ${stickerHeight}mm;
                        background-color: #ffffff !important;
                        color: #000000 !important;
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        overflow: hidden;
                    }
                    body {
                        padding: 2.5mm;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .sticker-card {
                        width: 100%;
                        height: 100%;
                        border: 2px dashed #000;
                        border-radius: 4px;
                        padding: 6px 10px;
                        background: #fff;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    .brand-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 8px; }
                    .brand-header h1 { font-size: 24px; margin: 0; letter-spacing: 2px; font-weight: 900; }
                    .brand-header p { font-size: 10px; margin: 2px 0 0 0; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; }
                    .info-group { margin-bottom: 6px; }
                    .info-label { font-size: 10px; text-transform: uppercase; color: #555; font-weight: 700; display: block; margin-bottom: 1px; }
                    .info-value { font-size: 14px; font-weight: 800; color: #000; word-break: break-word; }
                    .cod-box {
                        margin-top: 4px;
                        background: #f0f0f0;
                        border: 1px solid #000;
                        padding: 6px 10px;
                        border-radius: 4px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .sticker-footer { border-top: 2px solid #000; padding-top: 6px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center; }
                    .meta-details { font-size: 11px; font-weight: 800; }
                    .barcode-sim { font-family: monospace; font-size: 18px; letter-spacing: -2px; font-weight: 300; }
                </style>
            </head>
            <body>
                <div class="sticker-card">
                    <div class="brand-header">
                        <h1>STYLUXE</h1>
                        <p>DELIVERY STICKER</p>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Customer Name:</span>
                        <div class="info-value">${cleanName}</div>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Phone Number:</span>
                        <div class="info-value">${cleanPhone}</div>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Fulfillment Type:</span>
                        <div class="info-value" style="color: #000; font-weight: 900;">${(cleanAddress.toUpperCase().includes("PICKUP") || cleanAddress.toUpperCase().includes("STORE")) ? "STORE PICKUP 🏬" : "DELIVERY 🚚"}</div>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Address / Location:</span>
                        <div class="info-value">${cleanAddress}</div>
                    </div>
                    <div class="cod-box">
                        <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #000;">COLLECT AMOUNT (COD):</span>
                        <span style="font-size: 20px; font-weight: 900; color: #000;">${cleanTotal}</span>
                    </div>
                    <div class="sticker-footer">
                        <div class="meta-details">
                            <div>DATE: ${cleanDate}</div>
                            <div>ORDER: ${cleanOrderId}</div>
                        </div>
                        <div class="qr-code-section" style="display: flex; align-items: center;">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent((STORE_SETTINGS.sticker_qr_template || "{ORDER_ID}").replace("{ORDER_ID}", orderId).replace("{TOTAL}", totalAmount || "0"))}" alt="QR Code" style="width: 60px; height: 60px; display: block; border: 1px solid #000; padding: 2px;">
                        </div>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.focus();
                            window.print();
                        }, 200);
                    };
                </script>
            </body>
            </html>
        `);
        printWin.document.close();
    } else {
        window.print();
    }
}

// Print ONLY Sales Invoice WITH Product Thumbnails (100% Full A4 Sheet Format)
function triggerInvoicePrint(orderData, cartItems, subtotal, discount, total) {
    const cleanName = (orderData.customerName || orderData.customer || "CUSTOMER").toUpperCase();
    const cleanPhone = orderData.customerPhone || orderData.phone || "N/A";
    const cleanAddress = orderData.customerAddress || orderData.address || "N/A";
    const cleanDate = orderData.date || new Date().toISOString().split('T')[0];
    const cleanOrderId = String(orderData.id).startsWith('#') ? orderData.id : `#${orderData.id}`;
    const cashierName = orderData.cashierName || "SYSTEM ADMIN";

    const calcSubtotal = subtotal !== undefined ? subtotal : (cartItems || []).reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const calcDiscount = discount !== undefined ? discount : 0;
    const calcTotal = total !== undefined ? total : orderData.total;

    let itemsTableRows = "";
    (cartItems || []).forEach(item => {
        const prod = PRODUCTS.find(p => p.id === item.id);
        const imgUrl = item.image || (prod ? getProductMainImage(prod) : 'assets/favicon.jpg');
        itemsTableRows += `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 14px 8px; vertical-align: middle; width: 70px;">
                    <img src="${imgUrl}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid #ccc; display: block;">
                </td>
                <td style="padding: 14px 12px; vertical-align: middle;">
                    <div style="font-weight: 800; font-size: 17px; color: #000; font-family: sans-serif;">${item.name}</div>
                    <div style="font-size: 14px; color: #555; font-family: sans-serif; margin-top: 3px;">Size: <strong>${item.size}</strong> &bull; Qty: <strong>${item.quantity}</strong></div>
                </td>
                <td style="padding: 14px 8px; text-align: right; font-weight: 800; vertical-align: middle; font-size: 18px; color: #000; font-family: sans-serif;">
                    $${(item.price * item.quantity).toFixed(2)}
                </td>
            </tr>
        `;
    });

    const printWin = window.open('', '_blank', 'width=900,height=1000,scrollbars=yes,resizable=yes');
    if (printWin) {
        printWin.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>STYLUXE Sales Invoice ${cleanOrderId}</title>
                <style>
                    /* Strip browser header & footer (URL, Date, Page Numbers) */
                    @page {
                        margin: 0;
                        size: A4 portrait;
                    }
                    * {
                        box-sizing: border-box;
                    }
                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        background-color: #ffffff !important;
                        color: #000000 !important;
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    body {
                        padding: 15mm 18mm;
                    }
                    .invoice-wrapper {
                        width: 100%;
                        background: #fff;
                    }
                    .brand-header {
                        text-align: center;
                        border-bottom: 3px solid #000;
                        padding-bottom: 18px;
                        margin-bottom: 25px;
                    }
                    .brand-header h1 {
                        font-size: 48px;
                        margin: 0;
                        letter-spacing: 6px;
                        font-weight: 900;
                        line-height: 1;
                    }
                    .brand-header p {
                        font-size: 16px;
                        margin: 8px 0 0 0;
                        letter-spacing: 4px;
                        text-transform: uppercase;
                        font-weight: 800;
                    }
                    .meta-bar {
                        display: flex;
                        justify-content: space-between;
                        font-size: 15px;
                        font-weight: 700;
                        border-bottom: 2px solid #000;
                        padding-bottom: 14px;
                        margin-bottom: 20px;
                    }
                    .customer-info-box {
                        font-size: 15px;
                        margin-bottom: 25px;
                        background: #f8f8f8;
                        padding: 14px 18px;
                        border-radius: 6px;
                        border: 1px solid #ddd;
                        color: #000;
                        line-height: 1.6;
                    }
                    .invoice-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 25px 0;
                    }
                    .totals-table {
                        width: 100%;
                        border-top: 3px solid #000;
                        padding-top: 18px;
                        margin-top: 25px;
                        font-size: 18px;
                    }
                    .totals-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                    }
                    .totals-row.final {
                        font-size: 26px;
                        font-weight: 900;
                        border-top: 2px solid #000;
                        padding-top: 14px;
                        margin-top: 14px;
                    }
                    .footer-note {
                        text-align: center;
                        margin-top: 45px;
                        border-top: 2px solid #ccc;
                        padding-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="invoice-wrapper">
                    <div class="brand-header">
                        <h1>STYLUXE</h1>
                        <p>OFFICIAL SALES RECEIPT / INVOICE</p>
                    </div>

                    <div class="meta-bar">
                        <div>
                            <div>ORDER: <strong>${cleanOrderId}</strong></div>
                            <div>DATE: <strong>${cleanDate}</strong></div>
                        </div>
                        <div style="text-align: right;">
                            <div>CASHIER: <strong>${cashierName}</strong></div>
                            <div>PAYMENT: <strong>COD (CASH ON DELIVERY)</strong></div>
                        </div>
                    </div>

                    <div class="customer-info-box">
                        <div>CUSTOMER: <strong>${cleanName}</strong></div>
                        <div>PHONE: <strong>${cleanPhone}</strong></div>
                        <div>FULFILLMENT TYPE: <strong>${(cleanAddress.toUpperCase().includes("PICKUP") || cleanAddress.toUpperCase().includes("STORE")) ? "STORE PICKUP 🏬" : "DELIVERY 🚚"}</strong></div>
                        <div>ADDRESS / LOCATION: <strong>${cleanAddress}</strong></div>
                    </div>

                    <table class="invoice-table">
                        <thead>
                            <tr style="border-bottom: 3px solid #000; text-align: left; font-size: 14px; text-transform: uppercase;">
                                <th style="padding: 10px 8px;">ITEM</th>
                                <th style="padding: 10px 12px;">DETAILS</th>
                                <th style="padding: 10px 8px; text-align: right;">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsTableRows}
                        </tbody>
                    </table>

                    <div class="totals-table">
                        <div class="totals-row">
                            <span>Subtotal:</span>
                            <span>$${calcSubtotal.toFixed(2)}</span>
                        </div>
                        ${calcDiscount > 0 ? `
                        <div class="totals-row" style="color: #c0392b;">
                            <span>Discount:</span>
                            <span>-$${calcDiscount.toFixed(2)}</span>
                        </div>
                        ` : ''}
                        <div class="totals-row final">
                            <span>TOTAL AMOUNT:</span>
                            <span>$${calcTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <div class="footer-note">
                        <p style="margin: 0; font-weight: 900; font-size: 16px; letter-spacing: 2px; color: #000;">THANK YOU FOR SHOPPING AT STYLUXE!</p>
                    </div>
                </div>

                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.focus();
                            window.print();
                        }, 200);
                    };
                </script>
            </body>
            </html>
        `);
        printWin.document.close();
    } else {
        window.print();
    }
}

function printOrderSticker(orderId) {
    const order = ordersList.find(o => String(o.id) === String(orderId));
    if (!order) return;

    const name = order.customer || order.customerName || "CUSTOMER";
    const phone = order.phone || order.customerPhone || "N/A";
    const address = order.address || order.customerAddress || "N/A";
    const date = order.date || new Date().toISOString().split('T')[0];

    triggerStickerPrint(name, phone, address, date, order.id, order.total);
}

function printOrderInvoice(orderId) {
    const order = ordersList.find(o => String(o.id) === String(orderId));
    if (!order) return;

    const subtotal = (order.items || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = Math.max(0, subtotal - order.total);

    triggerInvoicePrint(order, order.items, subtotal, discount, order.total);
}

function printStickerOnly() {
    const name = document.getElementById("labelCustomerName")?.textContent || "CUSTOMER";
    const phone = document.getElementById("labelCustomerPhone")?.textContent || "N/A";
    const address = document.getElementById("labelCustomerAddress")?.textContent || "N/A";
    const date = document.getElementById("labelDate")?.textContent || "";
    const orderId = document.getElementById("labelOrderId")?.textContent || "";
    const totalAmount = document.getElementById("labelTotalAmount")?.textContent || "$0.00";

    triggerStickerPrint(name, phone, address, date, orderId, totalAmount);
}

function printInvoiceOnly() {
    if (lastPosSaleObj) {
        triggerInvoicePrint(lastPosSaleObj.orderData, lastPosSaleObj.cartItems, lastPosSaleObj.subtotal, lastPosSaleObj.discount, lastPosSaleObj.total);
    } else if (activeAdminOrder) {
        printOrderInvoice(activeAdminOrder.id);
    } else {
        window.print();
    }
}

function closePosReceipt() {
    const modal = document.getElementById("posReceiptModalBackdrop");
    if (modal) modal.classList.remove("active");
    posCart = [];
    savePosCartToStorage();
    renderPosTicketItems();
}

async function openDailyReportModal() {
    if (!promptManagerPermission("View Daily Sales Report")) return;

    await loadOrdersFromServer();

    const today = new Date().toISOString().split('T')[0];
    document.getElementById("dailyReportDate").textContent = today;
    
    const cashierName = currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN";
    
    // Find all cashiers who made sales today
    const cashiersToday = new Set();
    ordersList.forEach(o => {
        if (o.date === today && (o.status.includes("POS") || o.status.includes("REFUND (POS)"))) {
            cashiersToday.add(o.cashierName || "SYSTEM ADMIN");
        }
    });

    const selectEl = document.getElementById("dailyReportCashierSelect");
    if (selectEl) {
        selectEl.innerHTML = `
            <option value="current">Current Cashier: ${cashierName}</option>
            <option value="all">All Cashiers (Total Drawer)</option>
        `;
        cashiersToday.forEach(c => {
            if (c !== cashierName) {
                selectEl.innerHTML += `<option value="${c}">${c}</option>`;
            }
        });
        selectEl.value = dailyReportCashierFilter;
    }

    const containerEl = document.getElementById("dailyReportCashierSelectContainer");
    if (containerEl) {
        const role = currentAdminStaff ? currentAdminStaff.role : "";
        containerEl.style.display = (role === "Manager" || role === "Administrator") ? "block" : "none";
    }

    // Determine target cashier name for filtering
    let targetCashier = cashierName;
    if (dailyReportCashierFilter === "all") {
        targetCashier = "all";
    } else if (dailyReportCashierFilter !== "current") {
        targetCashier = dailyReportCashierFilter;
    }

    // Set generated cashier name in report
    document.getElementById("dailyReportUser").textContent = targetCashier === "all" ? "ALL CASHIERS" : targetCashier;

    // Filter today's POS orders
    const todayOrders = ordersList.filter(o => {
        const isTodayPos = o.date === today && (o.status.includes("POS") || o.status.includes("REFUND (POS)"));
        if (!isTodayPos) return false;
        if (targetCashier === "all") return true;
        return (o.cashierName || "SYSTEM ADMIN") === targetCashier;
    });

    const totalOrders = todayOrders.length;
    const grossSales = todayOrders.reduce((sum, o) => {
        // If order was a return/refund (status starts with REFUND), count as negative sales!
        if (o.status && o.status.includes("REFUND")) {
            return sum - o.total;
        }
        return sum + o.total;
    }, 0);

    document.getElementById("dailyReportTotalOrders").textContent = totalOrders;
    document.getElementById("dailyReportGrossSales").textContent = formatPrice(grossSales);
    document.getElementById("dailyReportNetSales").textContent = formatPrice(grossSales);

    // Group sales by department
    let deptMen = 0, deptWomen = 0, deptKids = 0;
    todayOrders.forEach(o => {
        o.items.forEach(item => {
            const prod = PRODUCTS.find(p => p.id === item.id);
            const dept = prod ? prod.department : "Men";
            const itemVal = item.price * item.quantity;
            if (dept === "Men") deptMen += itemVal;
            else if (dept === "Women") deptWomen += itemVal;
            else if (dept === "Kids") deptKids += itemVal;
        });
    });

    document.getElementById("dailyReportDeptMen").textContent = formatPrice(deptMen);
    document.getElementById("dailyReportDeptWomen").textContent = formatPrice(deptWomen);
    document.getElementById("dailyReportDeptKids").textContent = formatPrice(deptKids);

    // Group sold items for inventory count
    const itemsSold = {};
    todayOrders.forEach(o => {
        o.items.forEach(item => {
            const key = `${item.id}-${item.size}`;
            if (!itemsSold[key]) {
                itemsSold[key] = {
                    name: item.name,
                    size: item.size,
                    quantity: 0
                };
            }
            itemsSold[key].quantity += item.quantity;
        });
    });

    const listContainer = document.getElementById("dailyReportItemsSoldList");
    listContainer.innerHTML = "";

    const itemsArray = Object.values(itemsSold);
    if (itemsArray.length === 0) {
        listContainer.innerHTML = `<div style="text-align: center; color: #555; padding: 1rem 0;">NO ITEMS SOLD TODAY</div>`;
    } else {
        itemsArray.forEach(item => {
            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.innerHTML = `
                <span>${item.name} [${item.size}]</span>
                <strong>x${item.quantity}</strong>
            `;
            listContainer.appendChild(div);
        });
    }

    // Reset print classes
    const reportPaper = document.getElementById("posDailyReportPaper");
    if (reportPaper) reportPaper.classList.remove("print-section-active");

    // Show modal
    document.getElementById("posDailyReportModalBackdrop").classList.add("active");
}

function printDailyReportOnly() {
    const reportPaper = document.getElementById("posDailyReportPaper");
    if (!reportPaper) return;

    const printWin = window.open('', '_blank', 'width=800,height=900');
    if (!printWin) {
        window.print();
        return;
    }

    const dateStr = document.getElementById("dailyReportDate") ? document.getElementById("dailyReportDate").textContent : new Date().toISOString().split('T')[0];

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>STYLUXE - DAILY REPORT (${dateStr})</title>
            <style>
                body { font-family: monospace, Arial, sans-serif; padding: 2rem; color: #000; background: #fff; line-height: 1.5; font-size: 14px; }
                h2 { text-align: center; font-size: 24px; margin-bottom: 5px; font-weight: bold; }
                p { margin: 4px 0; }
                @media print {
                    @page { margin: 0.5cm; }
                }
            </style>
        </head>
        <body>
            ${reportPaper.innerHTML}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 1000);
                };
            </script>
        </body>
        </html>
    `;

    printWin.document.write(htmlContent);
    printWin.document.close();
}

async function printDailyReportDirectly() {
    await openDailyReportModal();
    setTimeout(() => {
        printDailyReportOnly();
    }, 300);
}

function closeDailyReportModal() {
    document.getElementById("posDailyReportModalBackdrop").classList.remove("active");
    dailyReportCashierFilter = "current";
}

// ==========================================================================
// CUSTOMER AUTHENTICATION & ORDER ARCHIVE LOGIC
// ==========================================================================

const authPageOverlay = document.getElementById("authPageOverlay");
const authLoginView = document.getElementById("authLoginView");
const authRegisterView = document.getElementById("authRegisterView");
const userMenuDropdown = document.getElementById("userMenuDropdown");
const userMenuLoggedOut = document.getElementById("userMenuLoggedOut");
const userMenuLoggedIn = document.getElementById("userMenuLoggedIn");
const navUserGreeting = document.getElementById("navUserGreeting");

const myOrdersModalBackdrop = document.getElementById("myOrdersModalBackdrop");
const myOrdersTableBody = document.getElementById("myOrdersTableBody");

// Toggle user menu dropdown in navbar
function toggleUserMenu(event) {
    if (event) event.stopPropagation();
    if (typeof userMenuDropdown !== 'undefined' && userMenuDropdown) {
        userMenuDropdown.classList.toggle("active");
    }
    
    // Close currency dropdown
    if (typeof currencyDropdown !== 'undefined' && currencyDropdown) {
        currencyDropdown.classList.remove("active");
    }
}

// Click outside to close dropdowns
document.addEventListener("click", () => {
    if (typeof userMenuDropdown !== 'undefined' && userMenuDropdown) {
        userMenuDropdown.classList.remove("active");
    }
});

function openAuthModal(view) {
    if (typeof userMenuDropdown !== 'undefined' && userMenuDropdown) {
        userMenuDropdown.classList.remove("active");
    }
    togglePradaDrawer(false);
    switchAuthView(view);
    authPageOverlay.style.display = "block";
    setTimeout(() => {
        authPageOverlay.classList.add("active");
    }, 10);
    document.body.style.overflow = "hidden";
    
    // Auto-fetch saved email & password from browser credentials manager/keychain
    if (view === 'login' && navigator.credentials) {
        navigator.credentials.get({ password: true, mediation: 'optional' })
        .then(cred => {
            if (cred && cred.id) {
                const emailInput = document.getElementById("custLoginEmail");
                const passInput = document.getElementById("custLoginPassword");
                if (emailInput) emailInput.value = cred.id;
                if (passInput && cred.password) passInput.value = cred.password;
            }
        })
        .catch(err => console.warn("Failed to fetch saved credentials:", err));
    }
}

function closeAuthModal() {
    if (typeof authPageOverlay !== "undefined" && authPageOverlay) {
        authPageOverlay.classList.remove("active");
        authPageOverlay.style.display = "none";
    }
    document.body.style.overflow = "";
}

function switchAuthView(view) {
    document.getElementById("authLoginError").style.display = "none";
    document.getElementById("authRegisterError").style.display = "none";
    
    if (view === "login") {
        authLoginView.style.display = "block";
        authRegisterView.style.display = "none";
    } else {
        authLoginView.style.display = "none";
        authRegisterView.style.display = "block";
    }
}

// Handle Customer Login
function handleCustomerLogin(event) {
    event.preventDefault();
    const email = document.getElementById("custLoginEmail").value.trim().toLowerCase();
    const pass = document.getElementById("custLoginPassword").value;
    const errorMsg = document.getElementById("authLoginError");

    errorMsg.style.display = "none";

    fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: pass })
    })
    .then(async res => {
        const result = await res.json();
        if (res.ok) {
            if (result.isStaff) {
                currentAdminDept = result.department || "Global";
                currentAdminStaff = result;
                closeAuthModal();
                event.target.reset();
                initAdminDashboard();
                return;
            }

            currentUser = result;
            localStorage.setItem("styluxe_user", JSON.stringify(currentUser));
            updateUserSessionUI();
            closeAuthModal();
            event.target.reset();

            // Store credentials in browser keychain if supported
            if (window.PasswordCredential && navigator.credentials) {
                try {
                    const cred = new PasswordCredential({
                        id: email,
                        password: pass,
                        name: currentUser.name
                    });
                    navigator.credentials.store(cred);
                } catch (e) {
                    console.warn("Failed to store credentials:", e);
                }
            }
            
            if (cart.length > 0) {
                openCheckoutModal();
            } else {
                openMyOrdersModal();
            }
        } else {
            errorMsg.textContent = result.error || "INVALID EMAIL OR PASSWORD.";
            errorMsg.style.display = "block";
        }
    })
    .catch(err => {
        errorMsg.textContent = "SERVER CONNECTION ERROR.";
        errorMsg.style.display = "block";
    });
}

// Handle Customer Register
function handleCustomerRegister(event) {
    event.preventDefault();
    const name = document.getElementById("custRegName").value.trim();
    const email = document.getElementById("custRegEmail").value.trim().toLowerCase();
    const phone = document.getElementById("custRegPhone").value.trim();
    const pass = document.getElementById("custRegPassword").value;
    const address = document.getElementById("custRegAddress").value.trim();
    const errorMsg = document.getElementById("authRegisterError");

    errorMsg.style.display = "none";

    const newUser = {
        name: name,
        email: email,
        password: pass,
        phone: phone,
        address: address,
        dateJoined: new Date().toISOString().split('T')[0]
    };

    fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
    .then(async res => {
        const result = await res.json();
        if (res.ok) {
            currentUser = result;
            localStorage.setItem("styluxe_user", JSON.stringify(currentUser));
            updateUserSessionUI();
            closeAuthModal();
            event.target.reset();

            // Store credentials in browser keychain if supported
            if (window.PasswordCredential && navigator.credentials) {
                try {
                    const cred = new PasswordCredential({
                        id: email,
                        password: pass,
                        name: currentUser.name
                    });
                    navigator.credentials.store(cred);
                } catch (e) {
                    console.warn("Failed to store credentials:", e);
                }
            }
            
            if (cart.length > 0) {
                openCheckoutModal();
            }
        } else {
            errorMsg.textContent = result.error || "REGISTRATION FAILED.";
            errorMsg.style.display = "block";
        }
    })
    .catch(err => {
        errorMsg.textContent = "SERVER CONNECTION ERROR.";
        errorMsg.style.display = "block";
    });
}

// Mock Social Login Handler
function handleMockSocialLogin(provider) {
    if (provider === 'Google') {
        // Show Google Chooser overlay
        document.getElementById("googleSelectAccountView").style.display = "block";
        document.getElementById("googleLoadingView").style.display = "none";
        document.getElementById("googleAuthOverlay").style.display = "flex";
    } else if (provider === 'Apple') {
        // Show Apple Confirm overlay
        document.getElementById("appleSetupView").style.display = "block";
        document.getElementById("appleBiometricPrompt").style.display = "none";
        document.getElementById("appleSuccessSection").style.display = "none";
        document.getElementById("appleFooterButtons").style.display = "flex";
        
        // Reset Biometrics text
        document.getElementById("appleBiometricText").textContent = "Confirm with Touch ID";
        document.getElementById("appleBiometricSubText").textContent = "Place finger on sensor to authorize";
        
        document.getElementById("appleAuthOverlay").style.display = "flex";
    }
}

function closeMockSocialAuth() {
    document.getElementById("googleAuthOverlay").style.display = "none";
    document.getElementById("appleAuthOverlay").style.display = "none";
}

// Google Account Selection Logic
function selectMockGoogleAccount(name, email) {
    // Show spinner view
    document.getElementById("googleSelectAccountView").style.display = "none";
    document.getElementById("googleLoadingView").style.display = "block";
    
    // Simulate API delay
    setTimeout(() => {
        // Check if user exists in our usersList, else create one
        let user = usersList.find(u => u.email === email);
        if (!user) {
            user = {
                name: name,
                email: email,
                password: "google_oauth_bypass",
                phone: "+961 70 999 999",
                address: "Beirut, Lebanon",
                dateJoined: new Date().toISOString().split('T')[0]
            };
            usersList.push(user);
        }
        
        currentUser = user;
        updateUserSessionUI();
        closeMockSocialAuth();
        closeAuthModal();
        
        if (cart.length > 0) {
            openCheckoutModal();
        } else {
            openMyOrdersModal();
        }
    }, 1200);
}

// Apple Biometric Auth Simulation
function triggerAppleBiometrics() {
    // Transition views
    document.getElementById("appleSetupView").style.display = "none";
    document.getElementById("appleFooterButtons").style.display = "none";
    document.getElementById("appleBiometricPrompt").style.display = "flex";
    
    // Start confirmation delay
    setTimeout(() => {
        // Fingerprint scanning changes text to authorized
        document.getElementById("appleBiometricText").textContent = "Verifying...";
        document.getElementById("appleBiometricSubText").textContent = "Authenticating fingerprint details...";
        
        setTimeout(() => {
            document.getElementById("appleBiometricPrompt").style.display = "none";
            document.getElementById("appleSuccessSection").style.display = "block";
            
            setTimeout(() => {
                // Find or create Apple user in database
                let email = "styluxe.user@icloud.com";
                let user = usersList.find(u => u.email === email);
                if (!user) {
                    user = {
                        name: "Apple User",
                        email: email,
                        password: "apple_oauth_bypass",
                        phone: "+961 71 888 888",
                        address: "Beirut, Lebanon",
                        dateJoined: new Date().toISOString().split('T')[0]
                    };
                    usersList.push(user);
                }
                
                currentUser = user;
                updateUserSessionUI();
                closeMockSocialAuth();
                closeAuthModal();
                
                if (cart.length > 0) {
                    openCheckoutModal();
                } else {
                    openMyOrdersModal();
                }
            }, 1000);
        }, 1200);
    }, 1000);
}

// Guest Entry Handler (Allows viewing storefront without authentication)
function handleGuestEntry() {
    closeAuthModal();
    currentUser = null;
    updateUserSessionUI();
}

function handleUserLogout() {
    currentUser = null;
    updateUserSessionUI();
    userMenuDropdown.classList.remove("active");
    openAuthModal('login');
}

function updateUserSessionUI() {
    const mobLoggedOut = document.getElementById("mobileDrawerAccountLoggedOut");
    const mobLoggedIn = document.getElementById("mobileDrawerAccountLoggedIn");

    if (currentUser) {
        // Logged In
        if (userMenuLoggedOut) userMenuLoggedOut.style.display = "none";
        if (userMenuLoggedIn) userMenuLoggedIn.style.display = "block";
        if (navUserGreeting) {
            navUserGreeting.textContent = `HI, ${currentUser.name.split(" ")[0].toUpperCase()}`;
            navUserGreeting.style.display = "inline";
        }

        if (mobLoggedOut) mobLoggedOut.style.display = "none";
        if (mobLoggedIn) mobLoggedIn.style.display = "block";
    } else {
        // Logged Out
        if (userMenuLoggedOut) userMenuLoggedOut.style.display = "block";
        if (userMenuLoggedIn) userMenuLoggedIn.style.display = "none";
        if (navUserGreeting) navUserGreeting.style.display = "none";

        if (mobLoggedOut) mobLoggedOut.style.display = "block";
        if (mobLoggedIn) mobLoggedIn.style.display = "none";
    }
}

// Open Customer Orders History
async function openMyOrdersModal() {
    if (typeof userMenuDropdown !== 'undefined' && userMenuDropdown) {
        userMenuDropdown.classList.remove("active");
    }
    togglePradaDrawer(false);
    await loadOrdersFromServer();
    renderMyOrdersTable();
    myOrdersModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMyOrdersModal() {
    myOrdersModalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
}

function renderMyOrdersTable() {
    myOrdersTableBody.innerHTML = "";

    if (!currentUser) return;

    const userOrders = ordersList.filter(o => o.customerEmail === currentUser.email);

    if (userOrders.length === 0) {
        myOrdersTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--color-text-muted); padding: 4rem 0;">YOU HAVE NOT PLACED ANY ORDERS YET.</td>
            </tr>
        `;
        return;
    }

    userOrders.forEach(o => {
        const itemsSummary = o.items.map(item => `${item.name} (x${item.quantity}) [${item.size}]`).join("<br>");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${o.id}</strong></td>
            <td>${o.date}</td>
            <td style="line-height: 1.5; font-size: 1.2rem;">${itemsSummary}</td>
            <td><strong>${formatPrice(o.total)}</strong></td>
            <td>
                <span style="font-weight: 700; color: ${o.status.includes("DELIVERED") ? "var(--color-success)" : "var(--color-accent)"}; font-size: 1.1rem;">
                    ${o.status.toUpperCase()}
                </span>
            </td>
        `;
        myOrdersTableBody.appendChild(tr);
    });
}

// ==========================================================================
// UPGRADED ADMIN SIDEBAR SWITCHES & STATUS MANAGEMENT
// ==========================================================================

// Extend switchAdminTab to handle "customers"
const originalSwitchAdminTab = switchAdminTab;
switchAdminTab = function(tab) {
    if (tab === "customers") {
        adminActiveTab = tab;

        // Toggle buttons active classes
        const navButtons = document.querySelectorAll(".admin-nav-btn");
        navButtons.forEach(btn => {
            if (btn.id === "btnTabCustomers") {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Toggle active content divs
        const tabContents = document.querySelectorAll(".admin-tab-content");
        tabContents.forEach(content => {
            if (content.id === "adminTabCustomers") {
                content.classList.add("active");
            } else {
                content.classList.remove("active");
            }
        });

        renderAdminCustomers();
    } else {
        // Handle standard tabs
        originalSwitchAdminTab(tab);
        
        // Ensure customer nav button class is updated
        const custBtn = document.getElementById("btnTabCustomers");
        if (custBtn) custBtn.classList.remove("active");
    }
};

// 2. Render Upgraded Customers List Tab
function renderAdminCustomers() {
    const tableBody = document.getElementById("adminCustomersTableBody");
    tableBody.innerHTML = "";

    if (usersList.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--color-text-muted); padding: 4rem 0;">NO REGISTERED CUSTOMERS FOUND.</td>
            </tr>
        `;
        return;
    }

    usersList.forEach(u => {
        // Compute lifetime spent by this customer
        const userOrders = ordersList.filter(o => o.customerEmail === u.email);
        const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td>${u.phone}</td>
            <td>${u.address}</td>
            <td>${u.dateJoined}</td>
            <td><strong>${formatPrice(totalSpent)}</strong></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Dynamic Category & Brand Manager Render
// Render Categories Table
function renderAdminCategories() {
    // Fallback: keep the old table body in sync if it exists (for legacy references)
    const catBody = document.getElementById("adminCategoriesTableBody");

    const treeContainer = document.getElementById("adminCategoryTree");
    if (!treeContainer && !catBody) return;

    let filtered = (!currentAdminDept || currentAdminDept === "Global")
        ? CATEGORIES
        : CATEGORIES.filter(c => !c.department || c.department.toLowerCase() === "global" || c.department.toLowerCase() === "all" || c.department.toLowerCase() === currentAdminDept.toLowerCase());

    if (filtered.length === 0 && CATEGORIES.length > 0) {
        filtered = CATEGORIES;
    }

    // Split into parent (root) categories and subcategories
    const rootCats = filtered.filter(c => !c.parentId);
    const subCats  = filtered.filter(c => !!c.parentId);

    // ---- render tree ----
    if (treeContainer) {
        treeContainer.innerHTML = "";
        if (rootCats.length === 0) {
            treeContainer.innerHTML = `<div style="color:var(--color-text-muted); text-align:center; padding:2rem 0;">NO CATEGORIES FOUND.</div>`;
        } else {
            rootCats.sort((a,b)=>(a.priority||1000)-(b.priority||1000)).forEach(parent => {
                const children = subCats.filter(s => s.parentId === parent.id).sort((a,b)=>(a.priority||1000)-(b.priority||1000));
                const parentProductCount = PRODUCTS.filter(p => p.category && p.category.trim().toLowerCase() === parent.name.trim().toLowerCase() &&
                    (currentAdminDept === "Global" || (p.department && p.department.toLowerCase() === currentAdminDept.toLowerCase()))).length;

                const parentNode = document.createElement("div");
                parentNode.style.cssText = "border:1px solid var(--color-border); border-radius:6px; overflow:hidden;";
                parentNode.innerHTML = `
                    <!-- Parent Row -->
                    <div style="display:flex; align-items:center; gap:1.2rem; padding:1.2rem 1.6rem; background:var(--color-surface-hover); cursor:pointer;" onclick="toggleCategoryNode(${parent.id})">
                        <img src="${parent.img || ''}" alt="${parent.name}" style="width:44px; height:44px; object-fit:cover; border:1px solid var(--color-border); flex-shrink:0;">
                        <div style="flex:1; min-width:0;">
                            <div style="font-size:1.2rem; font-weight:700; letter-spacing:0.08em; color:var(--color-accent);">${parent.name.toUpperCase()}</div>
                            <div style="font-size:1rem; color:var(--color-text-muted);">${parent.department ? parent.department.toUpperCase() : ''} &nbsp;·&nbsp; Priority: ${parent.priority || 1000}</div>
                        </div>
                        <div style="display:flex; align-items:center; gap:1.2rem; flex-shrink:0;">
                            <span style="background:rgba(255,255,255,0.12); color:var(--color-accent); border:1px solid rgba(255,255,255,0.3); border-radius:20px; padding:0.3rem 1rem; font-size:0.95rem; font-weight:600;">
                                <i class="fa-solid fa-box" style="margin-right:0.4rem;"></i>${parentProductCount}
                            </span>
                            <span style="background:rgba(255,255,255,0.05); color:var(--color-text-muted); border:1px solid var(--color-border); border-radius:20px; padding:0.3rem 1rem; font-size:0.95rem;">
                                <i class="fa-solid fa-sitemap" style="margin-right:0.4rem;"></i>${children.length} sub
                            </span>
                            <button onclick="event.stopPropagation(); reorderCategory(${parent.id},'up')" style="background:none; border:none; color:var(--color-accent); font-size:1.2rem; cursor:pointer; padding:0.2rem;" title="Move Up"><i class="fa-solid fa-chevron-up"></i></button>
                            <button onclick="event.stopPropagation(); reorderCategory(${parent.id},'down')" style="background:none; border:none; color:var(--color-accent); font-size:1.2rem; cursor:pointer; padding:0.2rem;" title="Move Down"><i class="fa-solid fa-chevron-down"></i></button>
                            <button onclick="event.stopPropagation(); deleteCategory(${parent.id})" style="background:none; border:none; color:var(--color-error,#ef4444); font-size:1.2rem; cursor:pointer; padding:0.2rem;" title="Delete"><i class="fa-solid fa-trash"></i></button>
                            <i class="fa-solid fa-chevron-down cat-tree-chevron" id="chevron-${parent.id}" style="color:var(--color-text-muted); transition:transform 0.25s;"></i>
                        </div>
                    </div>
                    <!-- Children Rows -->
                    <div id="cat-children-${parent.id}" style="display:none;">
                        ${children.length === 0
                            ? `<div style="padding:1rem 1.6rem 1rem 4rem; color:var(--color-text-muted); font-size:1rem; font-style:italic;">No sub-categories yet.</div>`
                            : children.map(child => {
                                const childProductCount = PRODUCTS.filter(p => p.category && p.category.trim().toLowerCase() === child.name.trim().toLowerCase() &&
                                    (currentAdminDept === "Global" || (p.department && p.department.toLowerCase() === currentAdminDept.toLowerCase()))).length;
                                return `
                                <div style="display:flex; align-items:center; gap:1.2rem; padding:1rem 1.6rem 1rem 3.5rem; border-top:1px solid var(--color-border); background:var(--color-bg);">
                                    <i class="fa-solid fa-corner-down-right" style="color:var(--color-text-muted); font-size:1.1rem; flex-shrink:0;"></i>
                                    <img src="${child.img || ''}" alt="${child.name}" style="width:36px; height:36px; object-fit:cover; border:1px solid var(--color-border); flex-shrink:0;">
                                    <div style="flex:1; min-width:0;">
                                        <div style="font-size:1.1rem; font-weight:600; letter-spacing:0.06em; color:var(--color-text);">${child.name.toUpperCase()}</div>
                                        <div style="font-size:0.95rem; color:var(--color-text-muted);">Priority: ${child.priority || 1000}</div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:1rem; flex-shrink:0;">
                                        <span style="background:rgba(255,255,255,0.05); color:var(--color-text-muted); border:1px solid var(--color-border); border-radius:20px; padding:0.25rem 0.8rem; font-size:0.9rem;">
                                            <i class="fa-solid fa-box" style="margin-right:0.3rem;"></i>${childProductCount}
                                        </span>
                                        <button onclick="deleteCategory(${child.id})" style="background:none; border:none; color:var(--color-error,#ef4444); font-size:1.1rem; cursor:pointer; padding:0.2rem;" title="Delete sub-category"><i class="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>`;
                            }).join('')
                        }
                    </div>
                `;
                treeContainer.appendChild(parentNode);
            });
        }
    }

    // ---- Legacy table body (kept for any reference) ----
    if (catBody) {
        catBody.innerHTML = "";
    }

    // Populate parent category select box automatically
    const deptSel = document.getElementById('subCategoryParentDept');
    const activeDept = deptSel && deptSel.value ? deptSel.value : (currentAdminDept !== "Global" ? currentAdminDept : "Men");
    populateParentCategorySelect(activeDept);
}

// Toggle expand/collapse of category children
function toggleCategoryNode(parentId) {
    const childrenDiv = document.getElementById(`cat-children-${parentId}`);
    const chevron = document.getElementById(`chevron-${parentId}`);
    if (!childrenDiv) return;
    const isOpen = childrenDiv.style.display !== 'none';
    childrenDiv.style.display = isOpen ? 'none' : 'block';
    if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Populate parent category select based on chosen department
function populateParentCategorySelect(dept) {
    const parentSelect = document.getElementById('subCategoryParentId');
    if (!parentSelect) return;
    
    parentSelect.innerHTML = '<option value="" disabled selected>Select Parent Category *</option>';
    const deptNorm = (dept || "Men").trim().toLowerCase();
    
    const allCategories = Array.isArray(CATEGORIES) ? CATEGORIES : [];
    let parents = allCategories.filter(c => !c.parentId && c.name && (!c.department || c.department.toLowerCase() === "global" || c.department.toLowerCase() === "all" || c.department.toLowerCase() === deptNorm));

    parents.sort((a,b)=>(a.priority||1000)-(b.priority||1000)).forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.name.toUpperCase()} (${c.department ? c.department.toUpperCase() : 'GLOBAL'})`;
        parentSelect.appendChild(opt);
    });
}

// Handle adding a subcategory
async function handleAddSubCategory(event) {
    if (event && event.preventDefault) event.preventDefault();
    const deptSel = document.getElementById('subCategoryParentDept');
    const parentSel = document.getElementById('subCategoryParentId');
    const nameInput = document.getElementById('newSubCategoryInput');
    const priorityInput = document.getElementById('newSubCategoryPriority');
    const fileInput = document.getElementById('newSubCategoryImgFileInput');

    const dept = deptSel ? deptSel.value : "";
    const parentId = parentSel ? parseInt(parentSel.value) : null;
    const name = nameInput ? nameInput.value.trim() : "";
    const priority = priorityInput ? parseInt(priorityInput.value) || 1000 : 1000;

    if (!dept || !parentId || !name) return;

    let img = "";
    if (fileInput && fileInput.files && fileInput.files[0]) {
        try {
            img = await getFileBase64(fileInput.files[0]);
        } catch(e) {
            img = "assets/category_ready_to_wear.png";
        }
    } else {
        img = "assets/category_ready_to_wear.png";
    }

    const newSubCat = { id: Date.now(), name, img, department: dept, priority, parentId };
    if (!Array.isArray(CATEGORIES)) CATEGORIES = [];
    CATEGORIES.push(newSubCat);

    try {
        localStorage.setItem("styluxe_categories", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_cache", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_user_saved", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_user_has_modified_db", "true");
    } catch(e){}

    if (typeof saveAllUserDataLocally === "function") saveAllUserDataLocally();

    fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubCat)
    }).catch(() => {});

    if (nameInput) nameInput.value = "";
    if (priorityInput) priorityInput.value = "1";
    if (fileInput) fileInput.value = "";
    const preview = document.getElementById("newSubCategoryImgPreview");
    if (preview) preview.style.display = "none";

    if (typeof updateCategoriesDatalist === "function") updateCategoriesDatalist();
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof renderAdminCategories === "function") renderAdminCategories();
    if (typeof showSuccessModal === "function") showSuccessModal("SUB-CATEGORY ADDED SUCCESSFULLY!");

    const childrenDiv = document.getElementById(`cat-children-${parentId}`);
    if (childrenDiv) {
        childrenDiv.style.display = 'block';
        const ch = document.getElementById(`chevron-${parentId}`);
        if (ch) ch.style.transform = 'rotate(180deg)';
    }
}


// Render Brands Table
function renderAdminBrands() {
    const brandBody = document.getElementById("adminBrandsTableBody");
    if (!brandBody) return;

    brandBody.innerHTML = "";
    if (BRANDS.length === 0) {
        brandBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--color-text-muted); padding: 2rem 0;">NO BRANDS FOUND.</td></tr>`;
    } else {
        BRANDS.forEach(b => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="width: 50px;">
                    <img src="${b.img}" alt="${b.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%; border: 1px solid var(--color-border);">
                </td>
                <td><strong>${b.name.toUpperCase()}</strong></td>
                <td style="text-align: center;">
                    <div style="display: flex; gap: 1rem; justify-content: center; align-items: center;">
                        <button class="admin-edit-btn" onclick="openEditBrand('${b.name}', '${b.img}')" style="background: none; border: none; color: var(--color-accent); font-size: 1.4rem; cursor: pointer;" aria-label="Edit brand">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteBrand('${b.name}')" aria-label="Delete brand" style="background: none; border: none; color: var(--color-error); font-size: 1.4rem; cursor: pointer;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            brandBody.appendChild(tr);
        });
    }
}

// Add/Delete Actions

async function handleAddCategory(event) {
    if (event) event.preventDefault();
    const input = document.getElementById("newCategoryInput");
    const deptSelect = document.getElementById("newCategoryDept");
    const priorityInput = document.getElementById("newCategoryPriority");
    const fileInput = document.getElementById("newCategoryImgFileInput");
    
    const name = input ? input.value.trim() : "";
    const department = deptSelect ? deptSelect.value : "";
    const priority = priorityInput ? parseInt(priorityInput.value) || 1000 : 1000;
    
    if (!name || !department) {
        alert("PLEASE ENTER A CATEGORY NAME AND SELECT A DEPARTMENT.");
        return;
    }

    let img = "";
    if (fileInput && fileInput.files && fileInput.files[0]) {
        try {
            const rawBase64 = await getFileBase64(fileInput.files[0]);
            img = await compressBase64Image(rawBase64, 600, 600, 0.75);
        } catch (e) {
            console.error("Error reading category image file:", e);
            img = "assets/category_ready_to_wear.png";
        }
    }
    if (!img) {
        img = "assets/category_ready_to_wear.png";
    }

    const newCatObj = {
        id: Date.now(),
        name: name,
        img: img,
        department: department,
        priority: priority
    };

    let savedOnServer = false;
    try {
        const res = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCatObj)
        });
        if (res && res.ok) {
            savedOnServer = true;
            const updatedCats = await res.json();
            if (Array.isArray(updatedCats)) CATEGORIES = updatedCats;
        }
    } catch (err) {
        console.warn("Server API unavailable, saving category locally:", err);
    }

    if (!savedOnServer) {
        if (!Array.isArray(CATEGORIES)) CATEGORIES = [];
        CATEGORIES.push(newCatObj);
    }

    try {
        localStorage.setItem("styluxe_categories", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_cache", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_user_saved", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_user_has_modified_db", "true");
    } catch(e){}

    if (typeof saveAllUserDataLocally === "function") saveAllUserDataLocally();

    if (input) input.value = "";
    if (deptSelect) deptSelect.value = "";
    if (priorityInput) priorityInput.value = "1";
    if (fileInput) fileInput.value = "";
    const previewDiv = document.getElementById("newCategoryImgPreview");
    if (previewDiv) previewDiv.style.display = "none";

    if (typeof updateCategoriesDatalist === "function") updateCategoriesDatalist();
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof renderAdminCategories === "function") renderAdminCategories();
    if (typeof renderProducts === "function") renderProducts();
    if (typeof showSuccessModal === "function") showSuccessModal("CATEGORY ADDED SUCCESSFULLY!");
}


async function reorderCategory(id, action) {
    const idx = CATEGORIES.findIndex(c => c.id === id);
    if (idx === -1) return;

    if (action === 'up' && idx > 0) {
        const temp = CATEGORIES[idx];
        CATEGORIES[idx] = CATEGORIES[idx - 1];
        CATEGORIES[idx - 1] = temp;
    } else if (action === 'down' && idx < CATEGORIES.length - 1) {
        const temp = CATEGORIES[idx];
        CATEGORIES[idx] = CATEGORIES[idx + 1];
        CATEGORIES[idx + 1] = temp;
    }

    try {
        localStorage.setItem("styluxe_categories", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_cache", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_user_saved", JSON.stringify(CATEGORIES));
    } catch(e){}

    if (typeof saveAllUserDataLocally === "function") saveAllUserDataLocally();

    fetch('/api/categories/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
    }).catch(() => {});

    if (typeof renderAdminCategories === "function") renderAdminCategories();
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof updateCategoriesDatalist === "function") updateCategoriesDatalist();
}

function deleteCategory(id) {
    const cat = CATEGORIES.find(c => c.id === id);
    if (!cat) return;
    if (!confirm(`ARE YOU SURE YOU WANT TO DELETE THE CATEGORY "${cat.name.toUpperCase()}"?`)) return;

    CATEGORIES = CATEGORIES.filter(c => c.id !== id);

    try {
        localStorage.setItem("styluxe_categories", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_cache", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_user_saved", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_user_has_modified_db", "true");
    } catch(e){}

    if (typeof saveAllUserDataLocally === "function") saveAllUserDataLocally();

    // Clean up deleted category from HOMEPAGE_CATEGORY_CARDS if present
    HOMEPAGE_CATEGORY_CARDS = HOMEPAGE_CATEGORY_CARDS.filter(c => (c.category || "").toLowerCase() !== cat.name.toLowerCase());
    if (typeof saveHomepageCardsToStorage === "function") saveHomepageCardsToStorage();

    fetch(`/api/categories?id=${id}`, { method: 'DELETE' }).catch(() => {});

    if (typeof updateCategoriesDatalist === "function") updateCategoriesDatalist();
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof renderAdminCategories === "function") renderAdminCategories();
    if (typeof renderProducts === "function") renderProducts();
}

function getFileBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                const maxWidth = 1200;
                const maxHeight = 1200;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Compress image to JPEG at 80% quality (visually lossless but ~80-90% smaller file size)
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                resolve(compressedBase64);
            };
            img.onerror = err => reject(err);
        };
        reader.onerror = error => reject(error);
    });
}

async function handleAddBrand(event) {
    if (event && event.preventDefault) event.preventDefault();
    const nameInput = document.getElementById("newBrandNameInput");
    const fileInput = document.getElementById("newBrandImgFileInput");
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    if (!name) {
        alert("PLEASE ENTER A BRAND NAME.");
        return;
    }

    let img = "";
    if (fileInput && fileInput.files && fileInput.files[0]) {
        try {
            const rawBase64 = await getFileBase64(fileInput.files[0]);
            img = typeof compressBase64Image === 'function' ? await compressBase64Image(rawBase64, 400, 400, 0.8) : rawBase64;
        } catch (e) {
            try { img = await getFileBase64(fileInput.files[0]); } catch(err){}
        }
    } else if (isEditingBrand) {
        const previewDiv = document.getElementById("newBrandImgPreview");
        const previewImg = previewDiv ? previewDiv.querySelector("img") : null;
        if (previewImg) img = previewImg.src;
    }

    if (!img && !isEditingBrand) {
        alert("PLEASE SELECT A BRAND LOGO FILE.");
        return;
    }

    if (!Array.isArray(BRANDS)) BRANDS = [];

    if (isEditingBrand) {
        BRANDS = BRANDS.map(b => b.name === editingBrandOldName ? { name: name, img: img } : b);
    } else {
        const exists = BRANDS.find(b => b.name.toLowerCase() === name.toLowerCase());
        if (exists) {
            exists.img = img;
        } else {
            BRANDS.push({ name: name, img: img });
        }
    }

    // Save to LocalStorage
    try {
        localStorage.setItem("styluxe_brands", JSON.stringify(BRANDS));
        localStorage.setItem("styluxe_brands_cache", JSON.stringify(BRANDS));
        localStorage.setItem("styluxe_user_has_modified_db", "true");
    } catch(e){}

    if (typeof saveAllUserDataLocally === "function") saveAllUserDataLocally();
    if (isEditingBrand && typeof cancelBrandEdit === "function") cancelBrandEdit();

    nameInput.value = "";
    if (fileInput) fileInput.value = "";
    const previewDiv = document.getElementById("newBrandImgPreview");
    if (previewDiv) previewDiv.style.display = "none";

    if (typeof renderBrandSlider === "function") renderBrandSlider();
    if (typeof renderAdminBrands === "function") renderAdminBrands();
    if (typeof populateBrandOptions === "function") populateBrandOptions();
    if (typeof renderProducts === "function") renderProducts();

    if (typeof showSuccessModal === "function") {
        showSuccessModal(isEditingBrand ? "BRAND UPDATED SUCCESSFULLY!" : "BRAND ADDED SUCCESSFULLY!");
    }

    // Background sync with API
    try {
        fetch('/api/brands', {
            method: isEditingBrand ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldName: editingBrandOldName, name: name, img: img })
        }).catch(() => {});
    } catch(e){}
}

function openEditBrand(name, img) {
    isEditingBrand = true;
    editingBrandOldName = name;

    const titleEl = document.getElementById("brandFormTitle");
    const submitBtn = document.getElementById("brandSubmitBtn");
    const cancelBtn = document.getElementById("cancelBrandEditBtn");
    const nameInput = document.getElementById("newBrandNameInput");
    const fileInput = document.getElementById("newBrandImgFileInput");
    const previewDiv = document.getElementById("newBrandImgPreview");
    const previewImg = previewDiv ? previewDiv.querySelector("img") : null;

    if (titleEl) titleEl.textContent = "EDIT BRAND";
    if (submitBtn) submitBtn.textContent = "UPDATE BRAND";
    if (cancelBtn) cancelBtn.style.display = "block";
    if (nameInput) nameInput.value = name;
    if (fileInput) {
        fileInput.value = "";
        fileInput.removeAttribute("required");
    }
    if (previewDiv && previewImg) {
        previewImg.src = img;
        previewDiv.style.display = "block";
    }
}

function cancelBrandEdit() {
    isEditingBrand = false;
    editingBrandOldName = "";

    const titleEl = document.getElementById("brandFormTitle");
    const submitBtn = document.getElementById("brandSubmitBtn");
    const cancelBtn = document.getElementById("cancelBrandEditBtn");
    const nameInput = document.getElementById("newBrandNameInput");
    const fileInput = document.getElementById("newBrandImgFileInput");
    const previewDiv = document.getElementById("newBrandImgPreview");

    if (titleEl) titleEl.textContent = "ADD NEW BRAND";
    if (submitBtn) submitBtn.textContent = "+ ADD BRAND";
    if (cancelBtn) cancelBtn.style.display = "none";
    if (nameInput) nameInput.value = "";
    if (fileInput) {
        fileInput.value = "";
        fileInput.setAttribute("required", "required");
    }
    if (previewDiv) {
        previewDiv.style.display = "none";
        const previewImg = previewDiv.querySelector("img");
        if (previewImg) previewImg.src = "";
    }
}

function deleteBrand(name) {
    if (!confirm(`ARE YOU SURE YOU WANT TO DELETE THE BRAND "${name.toUpperCase()}"?`)) return;

    fetch('/api/brands?name=${encodeURIComponent(name)}', {
        method: 'DELETE'
    })
    .then(async res => {
        if (res.ok) {
            BRANDS = await res.json();
            renderBrandSlider();
            renderAdminBrands();
            populateBrandOptions();
        } else {
            alert("FAILED TO DELETE BRAND.");
        }
    })
    .catch(err => console.error("Error deleting brand:", err));
}

// Render Suppliers & Invoices Dashboard
function renderAdminSuppliers() {
    const suppBody = document.getElementById("adminSuppliersTableBody");
    const invBody = document.getElementById("adminInvoicesTableBody");
    const selectSupplier = document.getElementById("newInvoiceSupplier");
    
    if (!suppBody || !invBody) return;

    // Populate dynamic select dropdown for invoices
    if (selectSupplier) {
        selectSupplier.innerHTML = `<option value="" disabled selected>Select Supplier / Merchant *</option>`;
        SUPPLIERS.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s.name;
            opt.textContent = s.name;
            selectSupplier.appendChild(opt);
        });
    }

    // Render Suppliers Table
    suppBody.innerHTML = "";
    if (SUPPLIERS.length === 0) {
        suppBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--color-text-muted); padding: 2rem 0;">NO SUPPLIERS RECORDED.</td></tr>`;
    } else {
        SUPPLIERS.forEach(s => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${s.name.toUpperCase()}</strong></td>
                <td>
                    <div>${s.phone || 'N/A'}</div>
                    <div style="font-size: 1.1rem; color: var(--color-text-muted);">${s.company || 'N/A'}</div>
                </td>
                <td style="text-align: center;">
                    <button class="delete-btn" onclick="deleteSupplier(${s.id})" aria-label="Delete supplier">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            suppBody.appendChild(tr);
        });
    }

    // Render Invoices Table
    invBody.innerHTML = "";
    if (INVOICES.length === 0) {
        invBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted); padding: 2rem 0;">NO INVOICES RECORDED.</td></tr>`;
    } else {
        INVOICES.forEach(inv => {
            const statusColor = inv.status === "Paid" ? "#25d366" : "#ff3b30";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>
                    <div><strong>${inv.invoiceNumber}</strong></div>
                    <div style="font-size: 1rem; color: var(--color-text-muted);">${inv.date}</div>
                </td>
                <td><strong>${inv.supplier.toUpperCase()}</strong></td>
                <td><strong>${formatPrice(inv.total)}</strong></td>
                <td><span class="product-badge" style="background-color: ${statusColor}15; color: ${statusColor}; border: 1px solid ${statusColor}30; font-size: 1rem; padding: 0.2rem 0.6rem;">${inv.status.toUpperCase()}</span></td>
                <td style="text-align: center;">
                    <button class="delete-btn" onclick="deleteInvoice(${inv.id})" aria-label="Delete invoice">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            invBody.appendChild(tr);
        });
    }
}

// Supplier CRUD actions
function handleAddSupplier(event) {
    event.preventDefault();
    const name = document.getElementById("newSupplierName").value.trim();
    const company = document.getElementById("newSupplierCompany").value.trim();
    const phone = document.getElementById("newSupplierPhone").value.trim();
    const address = document.getElementById("newSupplierAddress").value.trim();

    if (!name) return;

    fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, phone, address })
    })
    .then(async res => {
        if (res.ok) {
            SUPPLIERS = await res.json();
            event.target.reset();
            renderAdminSuppliers();
        } else {
            alert("FAILED TO ADD SUPPLIER.");
        }
    })
    .catch(err => console.error("Error adding supplier:", err));
}

function deleteSupplier(id) {
    if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS SUPPLIER?")) return;

    fetch('/api/suppliers?id=${id}', {
        method: 'DELETE'
    })
    .then(async res => {
        if (res.ok) {
            SUPPLIERS = await res.json();
            renderAdminSuppliers();
        } else {
            alert("FAILED TO DELETE SUPPLIER.");
        }
    })
    .catch(err => console.error("Error deleting supplier:", err));
}

// Invoice CRUD actions
function handleAddInvoice(event) {
    event.preventDefault();
    const invoiceNumber = document.getElementById("newInvoiceNum").value.trim();
    const supplier = document.getElementById("newInvoiceSupplier").value;
    const total = parseFloat(document.getElementById("newInvoiceTotal").value);
    const status = document.getElementById("newInvoiceStatus").value;
    const notes = document.getElementById("newInvoiceNotes").value.trim();

    if (!invoiceNumber || !supplier || isNaN(total) || !status) {
        alert("PLEASE FILL IN ALL REQUIRED INVOICE FIELDS.");
        return;
    }

    fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceNumber, supplier, total, status, notes })
    })
    .then(async res => {
        if (res.ok) {
            INVOICES = await res.json();
            event.target.reset();
            renderAdminSuppliers();
        } else {
            alert("FAILED TO RECORD INVOICE.");
        }
    })
    .catch(err => console.error("Error recording invoice:", err));
}

function deleteInvoice(id) {
    if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS INVOICE?")) return;

    fetch('/api/invoices?id=${id}', {
        method: 'DELETE'
    })
    .then(async res => {
        if (res.ok) {
            INVOICES = await res.json();
            renderAdminSuppliers();
        } else {
            alert("FAILED TO DELETE INVOICE.");
        }
    })
    .catch(err => console.error("Error deleting invoice:", err));
}

// 3. Render Upgraded Orders Tab with status edit controls
function renderAdminOrders() {
    const tableBody = document.getElementById("adminOrdersTableBody");
    tableBody.innerHTML = "";

    const filtered = currentAdminDept === "Global"
        ? ordersList
        : ordersList.filter(o => o.department === currentAdminDept);

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: 4rem 0;">NO ORDERS RECORDED YET.</td>
            </tr>
        `;
        return;
    }

    filtered.forEach(o => {
        const itemSummary = o.items.map(item => `${item.name} (x${item.quantity}) [${item.size}]${item.preorder ? ' <strong style="color: var(--color-accent);">(PRE-ORDER)</strong>' : ''}`).join("<br>");
        
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.onclick = (e) => {
            if (e.target.closest("button") && e.target.closest("button").classList.contains("status-change-btn")) {
                return;
            }
            openAdminOrderDetailsModal(o.id);
        };
        tr.innerHTML = `
            <td><strong>#${o.id}</strong></td>
            <td>
                <div><strong>${o.customer}</strong></div>
                <div style="font-size: 1.1rem; color: var(--color-text-muted);">${o.phone}</div>
                <div style="font-size: 1.1rem; color: var(--color-text-muted);">${o.address}</div>
            </td>
            <td>${o.date}</td>
            <td style="line-height: 1.5; font-size: 1.2rem;">${itemSummary}</td>
            <td><strong>${formatPrice(o.total)}</strong></td>
            <td>
                <span style="font-weight: 700; color: ${o.status.includes("DELIVERED") ? "var(--color-success)" : o.status.includes("SHIPPED") ? "#5ac8fa" : "var(--color-accent)"}; font-size: 1.1rem;">
                    ${o.status.toUpperCase()}
                </span>
            </td>
            <td>
                <button class="status-change-btn" style="background: linear-gradient(135deg, #2ecc71, #27ae60); color: #ffffff; border: none; font-weight: 700; padding: 0.6rem 0.9rem; border-radius: 4px; cursor: pointer; margin-right: 0.4rem;" onclick="printOrderSticker('${o.id}')"><i class="fa-solid fa-truck-fast"></i> STICKER 🚚</button>
                <button class="status-change-btn" style="background: linear-gradient(135deg, #ffffff, #ffffff); color: #000000; border: none; font-weight: 700; padding: 0.6rem 0.9rem; border-radius: 4px; cursor: pointer; margin-right: 0.4rem;" onclick="printOrderInvoice('${o.id}')"><i class="fa-solid fa-file-invoice-dollar"></i> INVOICE 🧾</button>
                <button class="status-change-btn" onclick="updateOrderStatus('${o.id}', 'shipped')">SHIP</button>
                <button class="status-change-btn delivered" onclick="updateOrderStatus('${o.id}', 'delivered')">DELIVER</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Action button inside admin orders table to progress shipment states
function updateOrderStatus(orderId, newStatus) {
    const order = ordersList.find(o => o.id === orderId);
    if (!order) return;

    const updatedStatus = newStatus === "shipped" ? "SHIPPED" : "DELIVERED";

    fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: updatedStatus })
    })
    .then(res => res.json())
    .then(async result => {
        if (result.success) {
            order.status = updatedStatus;
            // Fetch fresh list to sync other stats if needed
            await loadOrdersFromServer();
            renderAdminOrders();
            renderAdminOverview();
        }
    })
    .catch(err => {
        console.error("Order status update failed:", err);
    });
}

// ==========================================================================
// 11. STYLUXE PREMIUM INTERACTIVE FEATURES
// ==========================================================================

/* 11.1 Enhanced Gallery & Zoom-on-Hover */
const GALLERY_MOCKS = {
    1: [ // Oversized Cotton Hoodie
        "assets/hoodie_black.png",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600", // Cotton detail close-up
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600"  // Hanger product shot
    ],
    2: [ // Leather Jacket
        "assets/jacket_leather.png",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600", // Heavy zippers & cuff close-up
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600"  // Leather hanger detail
    ],
    3: [ // Cargo Denim Jeans
        "assets/jeans_cargo.png",
        "https://images.unsplash.com/photo-1582552938357-32b906df43c3?auto=format&fit=crop&q=80&w=600", // Heavy denim pocket
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600"  // Indigo denim texture
    ],
    4: [ // Core High-Top Sneakers
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600"
    ]
};

function getProductGalleryImages(product) {
    if (!product || !product.image) return [];
    return splitProductImages(product.image);
}

// Populates gallery thumbnails list in modal
function loadProductGallery(product) {
    const thumbnailGrid = document.getElementById("thumbnailGrid");
    const mainImg = document.getElementById("modalProductImg");
    const mainVideo = document.getElementById("modalProductVideo");
    if (!thumbnailGrid || !mainImg) return;

    thumbnailGrid.innerHTML = "";

    // Reset video player state
    if (mainVideo) {
        mainVideo.pause();
        mainVideo.src = "";
        mainVideo.style.display = "none";
    }
    mainImg.style.display = "block";

    const images = getProductGalleryImages(product);
    const hasVideo = !!(product && product.video);

    if (images.length <= 1 && !hasVideo) {
        thumbnailGrid.style.display = "none";
        return;
    }

    thumbnailGrid.style.display = "flex";

    images.forEach((imgUrl, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgUrl;
        thumb.alt = `${product.name} View ${index + 1}`;
        if (index === 0) thumb.classList.add("active");

        thumb.onclick = () => {
            if (mainVideo) {
                mainVideo.pause();
                mainVideo.style.display = "none";
            }
            mainImg.src = imgUrl;
            mainImg.style.display = "block";
            thumbnailGrid.querySelectorAll("img, button").forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
            mainImg.style.transform = "scale(1)";
            mainImg.style.transformOrigin = "center";
        };

        thumbnailGrid.appendChild(thumb);
    });

    if (hasVideo) {
        const videoBtn = document.createElement("button");
        videoBtn.classList.add("thumb-video-btn");
        videoBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i> VIDEO`;
        videoBtn.style.cssText = "background: rgba(0,0,0,0.8); color: #fff; border: 1px solid var(--color-border); padding: 0.6rem 1rem; border-radius: 4px; cursor: pointer; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap;";

        videoBtn.onclick = () => {
            mainImg.style.display = "none";
            if (mainVideo) {
                mainVideo.src = product.video;
                mainVideo.style.display = "block";
                mainVideo.play().catch(e => {});
            }
            thumbnailGrid.querySelectorAll("img, button").forEach(t => t.classList.remove("active"));
            videoBtn.classList.add("active");
        };

        thumbnailGrid.appendChild(videoBtn);
    }
}

// Implements hover lens zoom on the main product image
function setupHoverZoom() {
    const container = document.getElementById('mainImageContainer');
    const img = document.getElementById('modalProductImg');
    if (!container || !img) return;

    container.onmousemove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(2)';
    };

    container.onmouseleave = () => {
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center';
    };
}

/* 11.2 Size Guide Modal & Sizing Calculator */
let calculatedSizeResult = "";

function openSizeGuide() {
    const backdrop = document.getElementById("sizeGuideModalBackdrop");
    if (backdrop) {
        backdrop.classList.add("active");
        
        // Reset form and output
        document.getElementById("sgHeight").value = "";
        document.getElementById("sgWeight").value = "";
        document.getElementById("calculatorResult").style.display = "none";
        
        // Render size chart table specific to the active category
        renderSizeChartTable();
        switchSgTab('calculator');
    }
}

function closeSizeGuide() {
    const backdrop = document.getElementById("sizeGuideModalBackdrop");
    if (backdrop) {
        backdrop.classList.remove("active");
    }
}

function switchSgTab(tab) {
    const calcTabBtn = document.getElementById("sgTabCalculator");
    const chartTabBtn = document.getElementById("sgTabChart");
    const calcContent = document.getElementById("sgContentCalculator");
    const chartContent = document.getElementById("sgContentChart");

    if (tab === 'calculator') {
        calcTabBtn.classList.add("active");
        chartTabBtn.classList.remove("active");
        calcContent.style.display = "block";
        chartContent.style.display = "none";
    } else {
        calcTabBtn.classList.remove("active");
        chartTabBtn.classList.add("active");
        calcContent.style.display = "none";
        chartContent.style.display = "block";
    }
}

// Multi-factor calculator mapping height/weight to sizing letters, including specialized footwear and kids logic
function calculateRecommendedSize() {
    if (!activeModalProduct) return;

    const heightInput = document.getElementById("sgHeight");
    const weightInput = document.getElementById("sgWeight");
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        alert("PLEASE ENTER VALID HEIGHT AND WEIGHT VALUES.");
        return;
    }

    let recommendedSize = "M"; // Default fallback
    const category = activeModalProduct.category;
    const catUpper = category.toUpperCase();
    const isFootwear = category === "Footwear" || catUpper.includes("SHOE") || catUpper.includes("SNEAKER") || catUpper.includes("SLIDE") || catUpper.includes("BOOT");
    const isKids = activeModalProduct.department === "Kids";

    if (isKids) {
        if (isFootwear) {
            // Kids shoe sizes: 24 to 35
            if (height < 90) recommendedSize = "24";
            else if (height < 100) recommendedSize = "26";
            else if (height < 110) recommendedSize = "28";
            else if (height < 120) recommendedSize = "30";
            else if (height < 130) recommendedSize = "32";
            else if (height < 140) recommendedSize = "34";
            else recommendedSize = "35";
        } else {
            // Kids clothing: letter sizes or age sizes
            const sizeList = activeModalProduct.sizes || [];
            const hasAgeSizes = sizeList.some(s => s.toUpperCase().includes("Y"));
            
            if (hasAgeSizes) {
                if (height < 95) recommendedSize = "2Y";
                else if (height < 105) recommendedSize = "4Y";
                else if (height < 115) recommendedSize = "6Y";
                else if (height < 125) recommendedSize = "8Y";
                else if (height < 135) recommendedSize = "10Y";
                else recommendedSize = "12Y";
            } else {
                // Letter sizes (S, M, L, XL) for kids
                if (height < 100) recommendedSize = "S";
                else if (height < 120) recommendedSize = "M";
                else if (height < 135) recommendedSize = "L";
                else recommendedSize = "XL";
            }
        }
    } else {
        // Adults (Men & Women)
        if (isFootwear) {
            if (activeModalProduct.department === "Women") {
                if (height < 155) recommendedSize = "36";
                else if (height < 162) recommendedSize = "37";
                else if (height < 168) recommendedSize = "38";
                else if (height < 175) recommendedSize = "39";
                else if (height < 180) recommendedSize = "40";
                else recommendedSize = "41";
            } else { // Men / Unisex
                if (height < 165) recommendedSize = "40";
                else if (height < 172) recommendedSize = "41";
                else if (height < 178) recommendedSize = "42";
                else if (height < 185) recommendedSize = "43";
                else if (height < 190) recommendedSize = "44";
                else recommendedSize = "45";
            }
        } else {
            // Clothing
            if (category === "Jeans" || catUpper.includes("PANT") || catUpper.includes("SHORT") || catUpper.includes("JEAN") || catUpper.includes("TROUSER")) {
                if (weight < 60) recommendedSize = "30";
                else if (weight < 72) recommendedSize = "32";
                else if (weight < 85) recommendedSize = "34";
                else recommendedSize = "36";
            } else { // Tops, Hoodies, Jackets, etc.
                if (weight < 62) recommendedSize = "S";
                else if (weight < 72) recommendedSize = "M";
                else if (weight < 82) recommendedSize = "L";
                else if (weight < 92) recommendedSize = "XL";
                else recommendedSize = "XXL";
            }
        }
    }

    // Verify if size recommended is in stock/available for this item
    if (activeModalProduct.sizes && activeModalProduct.sizes.length > 0) {
        if (!activeModalProduct.sizes.includes(recommendedSize)) {
            // Find closest available size
            recommendedSize = activeModalProduct.sizes[0];
        }
    }

    calculatedSizeResult = recommendedSize;

    document.getElementById("recommendedSizeValue").textContent = recommendedSize;
    
    let descriptionText = `Based on your height of ${height} cm and weight of ${weight} kg, we suggest size **${recommendedSize}** for a premium fit.`;
    if (isKids) {
        descriptionText = `Based on your child's height of ${height} cm and weight of ${weight} kg, we recommend size **${recommendedSize}** for absolute comfort.`;
    }
    
    if (category === "Hoodies") {
        descriptionText += " Our hoodies are designed with an oversized fit, so going with this size will give you a cozy, drop-shoulder look.";
    } else if (category === "Jackets") {
        descriptionText += " Our jackets feature structured fits. If you prefer to layer heavily underneath, consider sizing up.";
    } else if (category === "Jeans") {
        descriptionText += " This corresponds to your waist sizing. The jeans feature an adjustable straight leg cut.";
    } else if (isFootwear) {
        descriptionText += " This matches standard EU sizing benchmarks for footwear.";
    }

    document.getElementById("recommendedSizeText").innerHTML = descriptionText;
    document.getElementById("calculatorResult").style.display = "block";
}

function applyRecommendedSize() {
    if (!calculatedSizeResult) return;

    // Find size button in detail modal sizing list
    const sizeBtns = sizeSelectorGrid.querySelectorAll(".size-btn");
    let found = false;
    sizeBtns.forEach(btn => {
        if (btn.textContent.trim() === calculatedSizeResult) {
            selectSize(calculatedSizeResult, btn);
            found = true;
        }
    });

    if (found) {
        closeSizeGuide();
    } else {
        alert(`SIZE ${calculatedSizeResult} IS CURRENTLY OUT OF STOCK FOR THIS PRODUCT.`);
    }
}

function renderSizeChartTable() {
    const container = document.getElementById("sizeChartTableContainer");
    if (!container || !activeModalProduct) return;

    const category = activeModalProduct.category;
    const catUpper = category.toUpperCase();
    const isFootwear = category === "Footwear" || catUpper.includes("SHOE") || catUpper.includes("SNEAKER") || catUpper.includes("SLIDE") || catUpper.includes("BOOT");
    const isKids = activeModalProduct.department === "Kids";
    let html = "";

    if (isKids) {
        if (isFootwear) {
            html = `
                <table class="size-chart-table">
                    <thead>
                        <tr>
                            <th>EURO SIZE</th>
                            <th>US SIZE</th>
                            <th>UK SIZE</th>
                            <th>FOOT LENGTH (CM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>24</td><td>8C</td><td>7.5</td><td>15.0</td></tr>
                        <tr><td>26</td><td>9.5C</td><td>9</td><td>16.2</td></tr>
                        <tr><td>28</td><td>11C</td><td>10.5</td><td>17.5</td></tr>
                        <tr><td>30</td><td>12.5C</td><td>12</td><td>18.7</td></tr>
                        <tr><td>32</td><td>1Y</td><td>13.5</td><td>20.0</td></tr>
                        <tr><td>34</td><td>2.5Y</td><td>2</td><td>21.2</td></tr>
                        <tr><td>35</td><td>3.5Y</td><td>3</td><td>22.0</td></tr>
                    </tbody>
                </table>
            `;
        } else {
            html = `
                <table class="size-chart-table">
                    <thead>
                        <tr>
                            <th>KIDS SIZE</th>
                            <th>AGE GROUP</th>
                            <th>HEIGHT (CM)</th>
                            <th>CHEST (CM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>2Y (S)</td><td>1-2 Years</td><td>86-92</td><td>52-54</td></tr>
                        <tr><td>4Y (M)</td><td>3-4 Years</td><td>98-104</td><td>55-57</td></tr>
                        <tr><td>6Y (L)</td><td>5-6 Years</td><td>110-116</td><td>58-60</td></tr>
                        <tr><td>8Y (XL)</td><td>7-8 Years</td><td>122-128</td><td>61-64</td></tr>
                        <tr><td>10Y</td><td>9-10 Years</td><td>134-140</td><td>65-69</td></tr>
                        <tr><td>12Y</td><td>11-12 Years</td><td>146-152</td><td>70-75</td></tr>
                    </tbody>
                </table>
            `;
        }
    } else {
        if (isFootwear) {
            html = `
                <table class="size-chart-table">
                    <thead>
                        <tr>
                            <th>EURO SIZE</th>
                            <th>US SIZE (M)</th>
                            <th>US SIZE (W)</th>
                            <th>FOOT LENGTH (CM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>36</td><td>4.5</td><td>6</td><td>22.5</td></tr>
                        <tr><td>38</td><td>6</td><td>7.5</td><td>24.0</td></tr>
                        <tr><td>40</td><td>7.5</td><td>9</td><td>25.0</td></tr>
                        <tr><td>42</td><td>9</td><td>10.5</td><td>26.5</td></tr>
                        <tr><td>44</td><td>10.5</td><td>12</td><td>28.0</td></tr>
                    </tbody>
                </table>
            `;
        } else if (category === "Jeans" || catUpper.includes("PANT") || catUpper.includes("SHORT") || catUpper.includes("JEAN") || catUpper.includes("TROUSER")) {
            html = `
                <table class="size-chart-table">
                    <thead>
                        <tr>
                            <th>SIZE</th>
                            <th>WAIST (INCH)</th>
                            <th>HIP (CM)</th>
                            <th>LENGTH (CM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>30</td><td>30</td><td>104</td><td>106</td></tr>
                        <tr><td>32</td><td>32</td><td>108</td><td>108</td></tr>
                        <tr><td>34</td><td>34</td><td>112</td><td>110</td></tr>
                        <tr><td>36</td><td>36</td><td>116</td><td>112</td></tr>
                    </tbody>
                </table>
            `;
        } else {
            html = `
                <table class="size-chart-table">
                    <thead>
                        <tr>
                            <th>SIZE</th>
                            <th>CHEST (CM)</th>
                            <th>LENGTH (CM)</th>
                            <th>SLEEVE (CM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>S</td><td>120</td><td>68</td><td>60</td></tr>
                        <tr><td>M</td><td>126</td><td>70</td><td>61</td></tr>
                        <tr><td>L</td><td>132</td><td>72</td><td>62</td></tr>
                        <tr><td>XL</td><td>138</td><td>74</td><td>63</td></tr>
                        <tr><td>XXL</td><td>144</td><td>76</td><td>64</td></tr>
                    </tbody>
                </table>
            `;
        }
    }

    container.innerHTML = html;
}

/* 11.3 Customer Reviews System */
const SEEDED_REVIEWS = {};

let formActiveRating = 0;

function setFormRating(rating) {
    formActiveRating = rating;
    const stars = document.getElementById("starRatingSelector").querySelectorAll(".star-rating-btn");
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add("active");
            star.querySelector("i").className = "fa-solid fa-star";
        } else {
            star.classList.remove("active");
            star.querySelector("i").className = "fa-regular fa-star";
        }
    });
}

function toggleReviewForm() {
    const container = document.getElementById("writeReviewFormContainer");
    const btn = document.getElementById("writeReviewToggleBtn");
    if (!container || !btn) return;
    
    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";
        btn.textContent = "CANCEL REVIEW";
    } else {
        container.style.display = "none";
        btn.textContent = "WRITE A REVIEW";
        resetReviewForm();
    }
}

function resetReviewForm() {
    const form = document.getElementById("productReviewForm");
    if (form) form.reset();
    
    formActiveRating = 0;
    const starRatingSelector = document.getElementById("starRatingSelector");
    if (starRatingSelector) {
        const stars = starRatingSelector.querySelectorAll(".star-rating-btn");
        stars.forEach(star => {
            star.classList.remove("active");
            star.querySelector("i").className = "fa-regular fa-star";
        });
    }
}

function getReviewsStore() {
    const store = localStorage.getItem("styluxe_reviews");
    if (store) {
        try {
            const parsed = JSON.parse(store);
            let hasFake = false;
            Object.values(parsed).forEach(list => {
                if (Array.isArray(list) && list.some(r => r.name === "Lina K." || r.name === "Marc A." || r.title === "INSANE FABRIC WEIGHT!")) {
                    hasFake = true;
                }
            });
            if (!hasFake) return parsed;
        } catch (e) {}
    }
    localStorage.setItem("styluxe_reviews", JSON.stringify({}));
    return {};
}

function saveReviewsStore(store) {
    localStorage.setItem("styluxe_reviews", JSON.stringify(store));
}

function loadProductReviews(productId) {
    const store = getReviewsStore();
    const productReviews = store[productId] || [];
    renderReviewsUI(productReviews);
}

function renderReviewsUI(reviews) {
    const listContainer = document.getElementById("reviewsListContainer");
    const avgScoreEl = document.getElementById("reviewsAvgScore");
    const avgStarsEl = document.getElementById("reviewsAvgStars");
    const totalCountEl = document.getElementById("reviewsTotalCount");

    if (!listContainer) return;

    if (reviews.length === 0) {
        if (avgScoreEl) avgScoreEl.textContent = "0.0";
        if (avgStarsEl) avgStarsEl.style.width = "0%";
        if (totalCountEl) totalCountEl.textContent = "(0 reviews)";
        listContainer.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); font-size: 1.3rem; padding: 3rem 0;">NO REVIEWS YET. BE THE FIRST TO WRITE A REVIEW!</div>`;
        return;
    }

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);
    
    if (avgScoreEl) avgScoreEl.textContent = avgRating;
    if (avgStarsEl) avgStarsEl.style.width = `${(parseFloat(avgRating) / 5) * 100}%`;
    if (totalCountEl) totalCountEl.textContent = `(${reviews.length} review${reviews.length > 1 ? 's' : ''})`;

    listContainer.innerHTML = "";
    const sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(r => {
        const card = document.createElement("div");
        card.classList.add("review-card");

        const starsHTML = getStarsHTML(r.rating);

        card.innerHTML = `
            <div class="review-meta">
                <span class="review-user">${r.name.toUpperCase()}</span>
                <span class="review-date">${formatReviewDate(r.date)}</span>
            </div>
            <div class="review-stars">${starsHTML}</div>
            <h4 class="review-title">${r.title.toUpperCase()}</h4>
            <p class="review-text">${r.comment}</p>
        `;
        listContainer.appendChild(card);
    });
}

function getStarsHTML(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<i class="fa-solid fa-star"></i>';
        } else {
            html += '<i class="fa-regular fa-star"></i>';
        }
    }
    return html;
}

function formatReviewDate(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return dateStr;
    }
}

function submitProductReview(event) {
    event.preventDefault();
    if (!activeModalProduct) return;

    const name = document.getElementById("reviewName").value.trim();
    const title = document.getElementById("reviewTitle").value.trim();
    const comment = document.getElementById("reviewComment").value.trim();

    if (!name || !title || !comment) {
        alert("PLEASE FILL IN ALL REQUIRED FIELDS.");
        return;
    }

    if (formActiveRating === 0) {
        alert("PLEASE SELECT A RATING STAR VALUE.");
        return;
    }

    const store = getReviewsStore();
    if (!store[activeModalProduct.id]) {
        store[activeModalProduct.id] = [];
    }

    const newReview = {
        name,
        rating: formActiveRating,
        title,
        comment,
        date: new Date().toISOString().split('T')[0]
    };

    store[activeModalProduct.id].push(newReview);
    saveReviewsStore(store);

    // Reload reviews UI list
    loadProductReviews(activeModalProduct.id);

    // Hide review form
    toggleReviewForm();
    
    // Smooth scroll down to review list container
    document.getElementById("reviewsListContainer").scrollIntoView({ behavior: 'smooth' });
}

// ==========================================================================
// 12. COLLECTIONS, WHATSAPP CHANNELS & BRANDS FILTER
// ==========================================================================

let activeBrand = "All";

const DEPT_WHATSAPP = {
    "All": { number: "96171987654", label: "GENERAL SUPPORT" },
    "Men": { number: "96171987654", label: "MEN'S SUPPORT" },
    "Women": { number: "96103456789", label: "WOMEN'S SUPPORT" },
    "Kids": { number: "96170112233", label: "KIDS' SUPPORT" }
};

// Extract brand names dynamically from product details
function getProductBrand(product) {
    if (product && product.brand) {
        return product.brand;
    }
    const name = product && product.name ? product.name.toUpperCase() : "";
    for (const b of BRANDS) {
        if (name.includes(b.name.toUpperCase())) {
            return b.name;
        }
    }
    const standardBrands = BRANDS.map(b => b.name);
    if (standardBrands.length > 0) {
        return standardBrands[product.id % standardBrands.length];
    }
    return "Styluxe";
}

// Renders the circular brand tags filtered specifically for user-added brands
function renderBrandSlider() {
    const brandSlider = document.getElementById("brandSlider");
    if (!brandSlider) return;

    brandSlider.innerHTML = "";

    // Extract ONLY brands created by user in Admin Panel OR assigned to existing PRODUCTS
    let userBrands = [];

    // 1. From BRANDS array (Admin Panel -> Brands)
    if (Array.isArray(BRANDS)) {
        BRANDS.forEach(b => {
            const bName = typeof b === 'string' ? b : (b.name || '');
            if (bName && !userBrands.some(x => normCatName(x.name || x) === normCatName(bName))) {
                userBrands.push(typeof b === 'object' ? b : { name: bName, img: "assets/category_accessories.png" });
            }
        });
    }

    // 2. From actual PRODUCTS in database
    if (Array.isArray(PRODUCTS)) {
        PRODUCTS.forEach(p => {
            const pBrand = getProductBrand(p);
            if (pBrand && pBrand !== "Styluxe" && !userBrands.some(x => normCatName(x.name || x) === normCatName(pBrand))) {
                userBrands.push({ name: pBrand, img: "assets/category_accessories.png" });
            }
        });
    }

    // If user has not added any custom brands yet, hide the brand slider bar cleanly!
    const brandSliderParent = brandSlider.parentElement;
    if (userBrands.length === 0) {
        if (brandSliderParent) brandSliderParent.style.display = "none";
        brandSlider.style.display = "none";
        return;
    }

    if (brandSliderParent) brandSliderParent.style.display = "block";
    brandSlider.style.display = "flex";

    const displayBrands = [{ name: "All", img: "assets/category_accessories.png" }, ...userBrands];

    displayBrands.forEach(b => {
        const bName = typeof b === 'string' ? b : (b.name || '');
        if (!bName) return;

        const card = document.createElement("div");
        card.classList.add("brand-circle-card");

        const activeBrandNorm = normCatName(activeBrand || "All");
        const currBrandNorm = normCatName(bName);
        const isSelected = activeBrandNorm === currBrandNorm || (currBrandNorm === "all" && activeBrandNorm === "all");

        if (isSelected) card.classList.add("active");

        const imgUrl = (typeof b === 'object' && b.img) ? b.img : "assets/category_accessories.png";
        card.innerHTML = `
            <div class="brand-circle-logo" style="overflow: hidden; padding: 0; border: ${isSelected ? '3px solid var(--color-accent, #c9a96e)' : '1px solid var(--color-border)'}; box-shadow: ${isSelected ? '0 0 15px rgba(201, 169, 110, 0.4)' : 'none'}; transition: all 0.3s ease;">
                <img src="${imgUrl}" alt="${bName}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
            </div>
            <div class="brand-circle-name" style="font-size: 0.9rem; letter-spacing: 0.05em; font-weight: ${isSelected ? '700' : '500'}; color: ${isSelected ? 'var(--color-accent, #c9a96e)' : 'var(--color-text)'};">${bName === "All" ? "ALL" : bName.toUpperCase()}</div>
        `;

        card.onclick = () => {
            selectBrand(bName);
        };

        brandSlider.appendChild(card);
    });
}

function selectBrand(brand) {
    const brandNorm = normCatName(brand);
    const activeNorm = normCatName(activeBrand || "All");

    if (activeNorm === brandNorm && brandNorm !== "all") {
        activeBrand = "All";
    } else {
        activeBrand = brand;
    }
    const select = document.getElementById("brandFilterSelect");
    if (select) select.value = activeBrand;

    renderBrandSlider();
    renderProducts();

    // Smooth scroll down to catalog section for 100% interconnected luxury experience
    const targetElement = document.getElementById("shopSectionTitle") || document.getElementById("shop-section");
    if (targetElement) {
        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

function filterByBrand(brand) {
    selectBrand(brand);
}

function populateBrandOptions() {
    const newProdBrand = document.getElementById("newProdBrand");
    if (newProdBrand) {
        const currentVal = newProdBrand.value;
        newProdBrand.innerHTML = `<option value="" disabled selected>Select Brand</option>`;
        
        (BRANDS || []).forEach(b => {
            const bName = typeof b === 'string' ? b : (b.name || '');
            if (bName) {
                const opt = document.createElement("option");
                opt.value = bName;
                opt.textContent = bName;
                newProdBrand.appendChild(opt);
            }
        });

        if (BRANDS.length === 0 || !BRANDS.some(b => (typeof b === 'string' ? b : b.name) === "Styluxe")) {
            const opt = document.createElement("option");
            opt.value = "Styluxe";
            opt.textContent = "Styluxe";
            newProdBrand.appendChild(opt);
        }

        if (currentVal && Array.from(newProdBrand.options).some(o => o.value === currentVal)) {
            newProdBrand.value = currentVal;
        }
    }

    const brandFilterSelect = document.getElementById("brandFilterSelect");
    if (brandFilterSelect) {
        const currentFilter = brandFilterSelect.value || "All";
        brandFilterSelect.innerHTML = `<option value="All">ALL BRANDS</option>`;
        
        let availableProducts = [...PRODUCTS];
        if (activeDepartment !== "All") {
            availableProducts = availableProducts.filter(p => p.department && p.department.trim().toLowerCase() === activeDepartment.trim().toLowerCase());
        }

        const allBrandNames = [...new Set([
            ...(BRANDS || []).map(b => typeof b === 'string' ? b : b.name),
            ...availableProducts.map(p => getProductBrand(p))
        ])].filter(Boolean);

        allBrandNames.forEach(bName => {
            const opt = document.createElement("option");
            opt.value = bName;
            opt.textContent = bName.toUpperCase();
            brandFilterSelect.appendChild(opt);
        });

        if (Array.from(brandFilterSelect.options).some(o => o.value === currentFilter)) {
            brandFilterSelect.value = currentFilter;
        }
    }
}

// Helper to resolve an image for a category
function getCategoryImage(catName) {
    if (!catName || catName === "All") return 'assets/hero_bg.png';
    const nameLower = catName.trim().toLowerCase();
    
    // 1. Check DB categories
    const dbCat = (CATEGORIES || []).find(c => c.name.trim().toLowerCase() === nameLower);
    if (dbCat && dbCat.img && dbCat.img.trim()) return dbCat.img;

    // 2. Check Products matching this category
    const prod = (PRODUCTS || []).find(p => p.category && p.category.trim().toLowerCase() === nameLower);
    if (prod) return getProductMainImage(prod);

    // 3. Keyword fallback assets
    if (nameLower.includes('hoodie') || nameLower.includes('sweatshirt')) return 'assets/hoodie_black.png';
    if (nameLower.includes('jacket') || nameLower.includes('coat')) return 'assets/jacket_leather.png';
    if (nameLower.includes('jean') || nameLower.includes('pant') || nameLower.includes('trouser')) return 'assets/jeans_cargo.png';
    if (nameLower.includes('footwear') || nameLower.includes('shoe') || nameLower.includes('sneaker')) return 'assets/category_shoes.png';
    if (nameLower.includes('bag')) return 'assets/category_bags.png';
    if (nameLower.includes('accessori')) return 'assets/category_accessories.png';

    return 'assets/category_ready_to_wear.png';
}

// Renders the visual category filter cards (harmonious 3:4 cards with click effects)
function renderCategoryTags() {
    const filterTags = document.getElementById("filterTags");
    if (!filterTags) return;

    filterTags.innerHTML = "";

    // Helper to calculate total count for a category in current active department
    function getCategoryItemCount(catName) {
        let list = PRODUCTS || [];
        if (activeDepartment !== "All") {
            list = list.filter(p => p.department && p.department.trim().toLowerCase() === activeDepartment.trim().toLowerCase());
        }
        if (catName === "All") return list.length;
        return list.filter(p => p.category && p.category.trim().toLowerCase() === catName.trim().toLowerCase()).length;
    }

    // Helper to create a unified 170x220 visual card
    function createCategoryCard(catName, isAll = false, isSub = false) {
        const card = document.createElement("div");
        const isActive = isAll ? activeCategory === "All" : activeCategory.trim().toLowerCase() === catName.trim().toLowerCase();
        card.className = "cat-filter-card" + (isActive ? " active" : "");

        const count = getCategoryItemCount(catName);
        const titleText = isAll 
            ? (activeDepartment === "All" ? "ALL PRODUCTS" : `ALL ${activeDepartment.toUpperCase()}`)
            : (isSub ? `↳ ${catName.toUpperCase()}` : catName.toUpperCase());

        let mediaHTML = '';
        if (isAll) {
            mediaHTML = `
                <div class="cat-filter-img-wrapper">
                    <div class="cat-filter-all-placeholder">
                        <i class="fa-solid fa-border-all" style="font-size: 1.8rem; color: var(--color-text-muted);"></i>
                    </div>
                </div>
            `;
        } else {
            const imgUrl = getCategoryImage(catName);
            mediaHTML = `
                <div class="cat-filter-img-wrapper">
                    <img src="${imgUrl}" alt="${catName}" class="cat-filter-img" loading="lazy">
                </div>
            `;
        }

        card.innerHTML = `
            ${mediaHTML}
            <div class="cat-filter-overlay">
                <h4 class="cat-filter-title">${titleText}</h4>
                <span class="cat-filter-count">${count} Item${count !== 1 ? 's' : ''}</span>
            </div>
        `;

        card.onclick = () => {
            filterByCategory(isAll ? "All" : catName);
        };

        return card;
    }

    // 1. Render ALL Button Card
    filterTags.appendChild(createCategoryCard("All", true, false));

    // 2. Collect categories for active department
    let deptCats = (CATEGORIES || []).filter(c =>
        activeDepartment === "All" || !c.department || c.department.trim().toLowerCase() === "global" || c.department.trim().toLowerCase() === "all" || (c.department && c.department.trim().toLowerCase() === activeDepartment.trim().toLowerCase())
    );

    const parents = deptCats.filter(c => !c.parentId).sort((a,b) => (a.priority||1000) - (b.priority||1000));
    const subs    = deptCats.filter(c => !!c.parentId);

    // Collect product categories not in DB
    let prodCatNames = [];
    {
        let availProds = [...PRODUCTS];
        if (activeDepartment !== "All") {
            availProds = availProds.filter(p => p.department && p.department.trim().toLowerCase() === activeDepartment.trim().toLowerCase());
        }
        const dbNames = deptCats.map(c => c.name.trim().toLowerCase());
        [...new Set(availProds.map(p => p.category).filter(Boolean))].forEach(pn => {
            if (!dbNames.includes(pn.trim().toLowerCase())) prodCatNames.push(pn);
        });
    }

    // 3. Render Parent Categories + Subcategories
    parents.forEach(parent => {
        const children = subs.filter(s => s.parentId === parent.id).sort((a,b) => (a.priority||1000) - (b.priority||1000));
        
        filterTags.appendChild(createCategoryCard(parent.name, false, false));

        children.forEach(sub => {
            filterTags.appendChild(createCategoryCard(sub.name, false, true));
        });
    });

    // 4. Render Product-only categories
    prodCatNames.forEach(pn => {
        filterTags.appendChild(createCategoryCard(pn, false, false));
    });
}

// Updates floating WhatsApp action details
function updateWhatsAppPill(dept) {
    const btn = document.getElementById("floatingWhatsappBtn");
    const label = document.getElementById("whatsappDeptTag");

    let number = "96171987654";
    let lbl = "GENERAL SUPPORT";

    if (dept === "All") {
        number = STORE_SETTINGS.whatsapp_global || "96101123456";
        lbl = "GENERAL SUPPORT";
    } else if (dept === "Men") {
        number = STORE_SETTINGS.whatsapp_men || "96170123456";
        lbl = "MEN'S SUPPORT";
    } else if (dept === "Women") {
        number = STORE_SETTINGS.whatsapp_women || "96170123456";
        lbl = "WOMEN'S SUPPORT";
    } else if (dept === "Kids") {
        number = STORE_SETTINGS.whatsapp_kids || "96170123456";
        lbl = "KIDS' SUPPORT";
    }

    const cleanNumber = number.replace(/[^\d]/g, "");

    if (btn) {
        const msg = encodeURIComponent(`Hi Styluxe, I'm inquiring about the ${dept === 'All' ? 'collections' : dept + ' collection'}.`);
        btn.href = `https://wa.me/${cleanNumber}?text=${msg}`;
    }
    if (label) {
        label.textContent = lbl;
    }
}

// ==========================================================================
// 13. ADMIN STAFF & ROLE-BASED ACCESS CONTROL PERMISSIONS
// ==========================================================================

let staffList = [];

// Apply permissions to show/hide admin sidebar tabs
function applyStaffPermissions() {
    const perms = currentAdminStaff ? currentAdminStaff.permissions || [] : [];
    
    const btnProducts = document.getElementById("btnTabProducts");
    const btnOrders = document.getElementById("btnTabOrders");
    const btnCustomers = document.getElementById("btnTabCustomers");
    const btnStaff = document.getElementById("btnTabStaff");
    const btnPos = document.getElementById("adminPosNavBtn");
    const btnSettings = document.getElementById("btnTabSettings");
    
    const btnCategories = document.getElementById("btnTabCategories");
    const btnBrands = document.getElementById("btnTabBrands");
    const btnSuppliers = document.getElementById("btnTabSuppliers");
    
    if (btnProducts) {
        btnProducts.style.display = perms.includes("manage_products") ? "flex" : "none";
    }
    if (btnCategories) {
        btnCategories.style.display = perms.includes("manage_products") ? "flex" : "none";
    }
    if (btnBrands) {
        btnBrands.style.display = perms.includes("manage_products") ? "flex" : "none";
    }
    if (btnSuppliers) {
        btnSuppliers.style.display = (currentAdminDept === "Global") ? "flex" : "none";
    }
    if (btnSettings) {
        btnSettings.style.display = (currentAdminDept === "Global") ? "flex" : "none";
    }
    if (btnOrders) {
        btnOrders.style.display = perms.includes("manage_orders") ? "flex" : "none";
    }
    if (btnCustomers) {
        btnCustomers.style.display = perms.includes("manage_orders") ? "flex" : "none";
    }
    if (btnStaff) {
        btnStaff.style.display = perms.includes("manage_staff") ? "flex" : "none";
    }
    if (btnPos) {
        btnPos.style.display = "flex"; // Always show POS to all staff/managers
    }

    // Lock department selections for department managers
    const newCategoryDept = document.getElementById("newCategoryDept");
    const newProdDept = document.getElementById("newProdDept");

    if (currentAdminDept !== "Global" && currentAdminDept !== "") {
        // Lock Add Category Department Select to manager's department
        if (newCategoryDept) {
            newCategoryDept.value = currentAdminDept;
            newCategoryDept.disabled = true;
        }
        // Lock Add Product Department Select to manager's department
        if (newProdDept) {
            newProdDept.value = currentAdminDept;
            newProdDept.disabled = true;
            // Update product categories select
            updateCategoriesDatalist();
        }
    } else {
        // Unlock for Global Admin
        if (newCategoryDept) {
            newCategoryDept.disabled = false;
        }
        if (newProdDept) {
            newProdDept.disabled = false;
        }
    }

    // Toggle Exit POS button based on dashboard access
    const posExitBtn = document.getElementById("posExitBtn");
    if (posExitBtn) {
        const hasDashboardAccess = perms.includes("manage_products") || perms.includes("manage_orders");
        posExitBtn.style.display = hasDashboardAccess ? "flex" : "none";
    }

    // Toggle Reset Sales button (Only visible to Global Admin / General Manager)
    const resetBtn = document.getElementById("adminResetSalesBtn");
    if (resetBtn) {
        resetBtn.style.display = (currentAdminDept === "Global") ? "flex" : "none";
    }
}

// Load staff list from server API
async function loadStaffFromServer() {
    try {
        const response = await fetch('/api/staff');
        staffList = await response.json();
    } catch (err) {
        console.error("Failed to load staff list from server:", err);
    }
}

// Render active staff in admin dashboard table
function renderStaffList() {
    const tableBody = document.getElementById("adminStaffTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    staffList.forEach(s => {
        const tr = document.createElement("tr");
        
        // Formatted permissions list
        const permsFormatted = s.permissions && s.permissions.length > 0 
            ? s.permissions.map(p => p.replace('_', ' ').toUpperCase()).join(", ")
            : "NONE";

        tr.innerHTML = `
            <td><strong>${s.name}</strong></td>
            <td>${s.email}</td>
            <td>
                <span class="product-badge" style="background-color: var(--color-border); color: var(--color-text);">${s.role}</span>
                <div style="font-size: 1.1rem; color: var(--color-accent); margin-top: 0.3rem; font-weight: 600;">Dept: ${(s.department || 'Global').toUpperCase()}</div>
            </td>
            <td style="font-size: 1.1rem; color: var(--color-text-muted);">${permsFormatted}</td>
            <td><span style="color: #25d366; font-weight: 600;">● ${s.status || 'Active'}</span></td>
            <td>
                ${s.id === 1 ? '<span style="font-size: 1.1rem; color: var(--color-text-muted);">SYSTEM OWNER</span>' : `
                <button class="admin-delete-btn" onclick="deleteStaff(${s.id})" aria-label="Suspend employee"><i class="fa-solid fa-user-slash"></i></button>
                `}
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Staff Modal helper actions
function openAddStaffModal() {
    const form = document.getElementById("addStaffForm");
    if (form) form.reset();
    document.getElementById("addStaffModalBackdrop").classList.add("active");
}

function closeAddStaffModal() {
    document.getElementById("addStaffModalBackdrop").classList.remove("active");
}

// Handle Add Staff Form submit
function handleNewStaffSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("staffName").value;
    const email = document.getElementById("staffEmail").value;
    const password = document.getElementById("staffPassword").value;
    const role = document.getElementById("staffRole").value;
    const department = document.getElementById("staffDept").value;

    // Read checkboxes
    const checkboxes = document.querySelectorAll('#addStaffForm input[name="permissions"]:checked');
    const permissions = Array.from(checkboxes).map(cb => cb.value);

    if (permissions.length === 0) {
        alert("PLEASE ASSIGN AT LEAST ONE PERMISSION FOR THE STAFF MEMBER.");
        return;
    }

    const staffData = {
        name,
        email,
        password,
        role,
        permissions,
        department
    };

    fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData)
    })
    .then(async res => {
        if (res.ok) {
            closeAddStaffModal();
            await loadStaffFromServer();
            renderStaffList();
        } else {
            const err = await res.json();
            alert("Error creating staff: " + err.error);
        }
    })
    .catch(err => console.error("Error creating staff:", err));
}

// Suspend/delete staff helper
function deleteStaff(staffId) {
    if (confirm("ARE YOU SURE YOU WANT TO SUSPEND THIS STAFF PROFILE?")) {
        fetch('/api/staff?id=${staffId}', {
            method: 'DELETE'
        })
        .then(async res => {
            if (res.ok) {
                await loadStaffFromServer();
                renderStaffList();
            } else {
                const err = await res.json();
                alert("Error deleting staff: " + err.error);
            }
        })
        .catch(err => console.error("Error deleting staff:", err));
    }
}

// ==========================================================================
// ==========================================================================
// 14. HIGH-FIDELITY SOCIAL AUTHENTICATION POPUPS (GOOGLE & APPLE SIGN-IN)
// ==========================================================================

// Trigger Google Sign-In (First tries browser-native keychain, then falls back to popup)
function triggerGoogleSignIn() {
    if (navigator.credentials) {
        navigator.credentials.get({
            password: true,
            federated: {
                providers: ["https://accounts.google.com"]
            }
        })
        .then(credential => {
            if (credential) {
                console.log("Native Google Keychain credential selected:", credential);
                handleSocialLoginSuccess({
                    name: credential.name || credential.id.split('@')[0],
                    email: credential.id
                });
            } else {
                openGooglePopup();
            }
        })
        .catch(err => {
            console.warn("Native Credentials API failed or dismissed, falling back to popup:", err);
            openGooglePopup();
        });
    } else {
        openGooglePopup();
    }
}

function openGooglePopup() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = 'mock-google-login.html?redirect=true';
    } else {
        const width = 500;
        const height = 620;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        window.open(
            'mock-google-login.html', 
            'GoogleSignIn', 
            `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no`
        );
    }
}

// Trigger Apple Sign-In (First tries browser-native keychain, then falls back to popup)
function triggerAppleSignIn() {
    if (navigator.credentials) {
        navigator.credentials.get({
            password: true,
            federated: {
                providers: ["https://appleid.apple.com"]
            }
        })
        .then(credential => {
            if (credential) {
                console.log("Native Apple Keychain credential selected:", credential);
                handleSocialLoginSuccess({
                    name: credential.name || credential.id.split('@')[0],
                    email: credential.id
                });
            } else {
                openApplePopup();
            }
        })
        .catch(err => {
            console.warn("Native Credentials API failed or dismissed, falling back to popup:", err);
            openApplePopup();
        });
    } else {
        openApplePopup();
    }
}

function openApplePopup() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = 'mock-apple-login.html?redirect=true';
    } else {
        const width = 580;
        const height = 580;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        window.open(
            'mock-apple-login.html', 
            'AppleSignIn', 
            `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no`
        );
    }
}

// Common backend session success route
function handleSocialLoginSuccess(profile) {
    fetch('/api/users/social-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile.name, email: profile.email })
    })
    .then(async res => {
        const result = await res.json();
        if (res.ok) {
            currentUser = result;
            localStorage.setItem("styluxe_user", JSON.stringify(currentUser));
            updateUserSessionUI();
            closeAuthModal();
            
            if (cart.length > 0) {
                openCheckoutModal();
            }
        } else {
            alert("Social login failed: " + result.error);
        }
    })
    .catch(err => {
        console.error("Social login request failed:", err);
        alert("Failed to connect to server for social login verification.");
    });
}

// Listen for messages sent from Google/Apple popup authentication windows
window.addEventListener("message", (event) => {
    // Only accept messages from same origin
    if (event.origin !== window.location.origin) return;

    if (event.data && event.data.type === 'oauth-success') {
        console.log(`Successfully received ${event.data.provider} profile:`, event.data);
        handleSocialLoginSuccess({
            name: event.data.name,
            email: event.data.email
        });
    }
});

// ==========================================================================
// 15. DYNAMIC SERVER-SIDE OAUTH CONFIG & GOOGLE SDK RUNTIME INITIALIZERS
// ==========================================================================

let googleClientId = "";

async function loadServerConfig() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 500);
    try {
        const response = await fetch('/api/config', { signal: controller.signal });
        clearTimeout(timer);
        if (response && response.ok) {
            const data = await response.json();
            googleClientId = data.GOOGLE_CLIENT_ID || "";
        }
    } catch (err) {
        clearTimeout(timer);
    }
    renderSocialLoginButtons();
}

function renderSocialLoginButtons() {
    const area = document.getElementById("authSocialButtonsArea");
    if (!area) return;
    area.innerHTML = "";
    
    // Set container layout to side-by-side
    area.style.display = "flex";
    area.style.justifyContent = "center";
    area.style.gap = "1.5rem";
    area.style.width = "100%";
    
    // Render custom popup/redirect simulation buttons as icon only (Bypasses Google Console origin restrictions)
    area.innerHTML = `
        <button type="button" class="auth-social-icon-btn" onclick="triggerGoogleSignIn()">
            <i class="fa-brands fa-google"></i>
        </button>
        <button type="button" class="auth-social-icon-btn" onclick="triggerAppleSignIn()">
            <i class="fa-brands fa-apple"></i>
        </button>
    `;
}

function initGoogleIdentityServices() {
    if (typeof google === 'undefined') return;
    try {
        google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleGoogleOfficialCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true
        });

        const btnContainer = document.getElementById("googleBtnContainer");
        if (btnContainer) {
            google.accounts.id.renderButton(btnContainer, {
                type: "icon", // Render as icon only!
                theme: "outline",
                size: "large",
                shape: "circle" // Render as a beautiful circular icon!
            });
        }
        
        // Display floating One Tap prompt
        google.accounts.id.prompt();
    } catch (err) {
        console.warn("Google Identity Services initialization failed:", err);
    }
}

function handleGoogleOfficialCredentialResponse(response) {
    // Post token to backend secure verification endpoint
    fetch('/api/users/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(async res => {
        const result = await res.json();
        if (res.ok) {
            currentUser = result;
            localStorage.setItem("styluxe_user", JSON.stringify(currentUser));
            updateUserSessionUI();
            closeAuthModal();
            
            if (cart.length > 0) {
                openCheckoutModal();
            } else {
                openMyOrdersModal();
            }
        } else {
            alert("Google Sign-In verification failed: " + result.error);
        }
    })
    .catch(err => {
        console.error("Google Sign-In verification failed:", err);
        alert("Failed to connect to server to verify Google token.");
    });
}

async function resetAllStoreSales() {
    const confirmation = confirm("Are you sure you want to permanently reset all sales and orders? This action cannot be undone!");
    if (!confirmation) return;

    try {
        const response = await fetch('/api/orders/reset', {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("All sales and orders reset successfully!");
            // Reload dashboard metrics and database
            await initAdminDashboard();
        } else {
            alert("Failed to reset sales. Please try again later.");
        }
    } catch (err) {
        console.error("Failed to reset sales:", err);
        alert("Failed to connect to the server to reset sales.");
    }
}

// ==========================================================================
// GENERAL STORE SETTINGS & COUPON CODES MANAGEMENT FRONTEND LOGIC
// ==========================================================================
function populateSettingsFields() {
    const feeInput = document.getElementById("settingsShippingFee");
    const thresholdInput = document.getElementById("settingsFreeShippingThreshold");
    const returnPassInput = document.getElementById("settingsReturnPassword");
    const stickerPresetSelect = document.getElementById("settingsStickerPreset");
    const stickerWidthInput = document.getElementById("settingsStickerWidth");
    const stickerHeightInput = document.getElementById("settingsStickerHeight");
    const stickerQrTemplateInput = document.getElementById("settingsStickerQrTemplate");
    const smtpHostInput = document.getElementById("settingsSmtpHost");
    const smtpPortInput = document.getElementById("settingsSmtpPort");
    const smtpUserInput = document.getElementById("settingsSmtpUser");
    const smtpPassInput = document.getElementById("settingsSmtpPass");
    const smtpSenderInput = document.getElementById("settingsSmtpSender");
    const twitterCheck = document.getElementById("settingsShowTwitter");
    const tiktokCheck = document.getElementById("settingsShowTiktok");

    if (feeInput) feeInput.value = STORE_SETTINGS.shipping_fee || "5";
    if (thresholdInput) thresholdInput.value = STORE_SETTINGS.free_shipping_threshold || "150";
    if (returnPassInput) returnPassInput.value = STORE_SETTINGS.return_password || "admin123";
    if (stickerPresetSelect) stickerPresetSelect.value = STORE_SETTINGS.sticker_preset || "100x70";
    if (stickerWidthInput) stickerWidthInput.value = STORE_SETTINGS.sticker_width || "100";
    if (stickerHeightInput) stickerHeightInput.value = STORE_SETTINGS.sticker_height || "70";
    if (stickerQrTemplateInput) stickerQrTemplateInput.value = STORE_SETTINGS.sticker_qr_template || "{ORDER_ID}";
    if (smtpPortInput) smtpPortInput.value = STORE_SETTINGS.smtp_port || "";
    if (smtpUserInput) smtpUserInput.value = STORE_SETTINGS.smtp_user || "";
    if (smtpPassInput) smtpPassInput.value = STORE_SETTINGS.smtp_pass || "";
    if (smtpSenderInput) smtpSenderInput.value = STORE_SETTINGS.smtp_sender || "";
    
    if (twitterCheck) twitterCheck.checked = (STORE_SETTINGS.show_twitter === "true");
    if (tiktokCheck) tiktokCheck.checked = (STORE_SETTINGS.show_tiktok === "true");

    for (let i = 0; i < 5; i++) {
        const previewDiv = document.querySelector(`.hero-slide-preview-container[data-index="${i}"]`);
        const previewImg = previewDiv ? previewDiv.querySelector("img") : null;
        const fileInput = document.querySelector(`.hero-slide-input[data-index="${i}"]`);

        if (fileInput) fileInput.value = "";
        if (previewDiv) {
            delete previewDiv.dataset.base64;
            delete previewDiv.dataset.isChanged;
            delete previewDiv.dataset.isCleared;
            
            const savedImg = STORE_SETTINGS[`heroImage_${i}`];
            if (savedImg && previewImg) {
                previewImg.src = savedImg;
                previewDiv.style.display = "block";
            } else {
                previewDiv.style.display = "none";
            }
        }
    }

    const suffixes = ["global", "men", "women", "kids"];
    suffixes.forEach(suffix => {
        const uSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
        const whatsappInput = document.getElementById(`settingsWhatsapp${uSuffix}`);
        const instagramInput = document.getElementById(`settingsInstagram${uSuffix}`);
        const facebookInput = document.getElementById(`settingsFacebook${uSuffix}`);
        const twitterInput = document.getElementById(`settingsTwitter${uSuffix}`);
        const tiktokInput = document.getElementById(`settingsTiktok${uSuffix}`);

        if (whatsappInput) whatsappInput.value = STORE_SETTINGS[`whatsapp_${suffix}`] || "";
        if (instagramInput) instagramInput.value = STORE_SETTINGS[`instagram_${suffix}`] || "";
        if (facebookInput) facebookInput.value = STORE_SETTINGS[`facebook_${suffix}`] || "";
        if (twitterInput) twitterInput.value = STORE_SETTINGS[`twitter_${suffix}`] || "";
        if (tiktokInput) tiktokInput.value = STORE_SETTINGS[`tiktok_${suffix}`] || "";
    });

    if (typeof populateHeroTextSettings === "function") {
        populateHeroTextSettings();
    }
}

let heroSliderInterval = null;

function applyHeroBackgroundFromSettings() {
    const sliderContainer = document.getElementById("heroSlider");
    if (!sliderContainer) return;

    const images = [];
    for (let i = 0; i < 5; i++) {
        const img = STORE_SETTINGS[`heroImage_${i}`];
        if (img) {
            images.push(img);
        }
    }

    if (images.length === 0) {
        if (STORE_SETTINGS.heroImage) {
            images.push(STORE_SETTINGS.heroImage);
        } else {
            images.push('assets/hero_bg.png');
        }
    }

    sliderContainer.innerHTML = "";
    images.forEach((imgSrc, idx) => {
        const slide = document.createElement("div");
        slide.classList.add("hero-slide");
        if (idx === 0) slide.classList.add("active");
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('${imgSrc}')`;
        sliderContainer.appendChild(slide);
    });

    if (heroSliderInterval) {
        clearInterval(heroSliderInterval);
        heroSliderInterval = null;
    }

    if (images.length > 1) {
        let activeIdx = 0;
        const slides = sliderContainer.querySelectorAll(".hero-slide");
        heroSliderInterval = setInterval(() => {
            if (slides[activeIdx]) slides[activeIdx].classList.remove("active");
            activeIdx = (activeIdx + 1) % slides.length;
            if (slides[activeIdx]) slides[activeIdx].classList.add("active");
        }, 5000);
    }
}

function applyStickerPresetDimensions() {
    const preset = document.getElementById("settingsStickerPreset") ? document.getElementById("settingsStickerPreset").value : "100x70";
    const wInput = document.getElementById("settingsStickerWidth");
    const hInput = document.getElementById("settingsStickerHeight");
    if (preset === "100x70") {
        if (wInput) wInput.value = 100;
        if (hInput) hInput.value = 70;
    } else if (preset === "80x50") {
        if (wInput) wInput.value = 80;
        if (hInput) hInput.value = 50;
    } else if (preset === "100x150") {
        if (wInput) wInput.value = 100;
        if (hInput) hInput.value = 150;
    }
}

async function saveAllGeneralSettings() {
    const feeInput = document.getElementById("settingsShippingFee");
    const thresholdInput = document.getElementById("settingsFreeShippingThreshold");
    const returnPassInput = document.getElementById("settingsReturnPassword");
    const stickerPresetSelect = document.getElementById("settingsStickerPreset");
    const stickerWidthInput = document.getElementById("settingsStickerWidth");
    const stickerHeightInput = document.getElementById("settingsStickerHeight");
    const stickerQrTemplateInput = document.getElementById("settingsStickerQrTemplate");
    const smtpHostInput = document.getElementById("settingsSmtpHost");
    const smtpPortInput = document.getElementById("settingsSmtpPort");
    const smtpUserInput = document.getElementById("settingsSmtpUser");
    const smtpPassInput = document.getElementById("settingsSmtpPass");
    const smtpSenderInput = document.getElementById("settingsSmtpSender");
    const twitterCheck = document.getElementById("settingsShowTwitter");
    const tiktokCheck = document.getElementById("settingsShowTiktok");
    const heroSubtitleInput = document.getElementById("settingsHeroSubtitle");
    const heroTitleInput = document.getElementById("settingsHeroTitle");
    const heroDescInput = document.getElementById("settingsHeroDescription");

    const payload = {};
    if (feeInput) payload.shipping_fee = feeInput.value;
    if (thresholdInput) payload.free_shipping_threshold = thresholdInput.value;
    if (returnPassInput) payload.return_password = returnPassInput.value.trim();
    if (stickerPresetSelect) payload.sticker_preset = stickerPresetSelect.value;
    if (stickerWidthInput) payload.sticker_width = stickerWidthInput.value;
    if (stickerHeightInput) payload.sticker_height = stickerHeightInput.value;
    if (stickerQrTemplateInput) payload.sticker_qr_template = stickerQrTemplateInput.value.trim();
    if (smtpHostInput) payload.smtp_host = smtpHostInput.value.trim();
    if (smtpPortInput) payload.smtp_port = smtpPortInput.value.trim();
    if (smtpUserInput) payload.smtp_user = smtpUserInput.value.trim();
    if (smtpPassInput) payload.smtp_pass = smtpPassInput.value.trim();
    if (smtpSenderInput) payload.smtp_sender = smtpSenderInput.value.trim();
    if (twitterCheck) payload.show_twitter = String(twitterCheck.checked);
    if (tiktokCheck) payload.show_tiktok = String(tiktokCheck.checked);
    if (heroSubtitleInput) payload.hero_subtitle = heroSubtitleInput.value.trim();
    if (heroTitleInput) payload.hero_title = heroTitleInput.value.trim();
    if (heroDescInput) payload.hero_description = heroDescInput.value.trim();

    const suffixes = ["global", "men", "women", "kids"];
    suffixes.forEach(suffix => {
        const uSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);
        const whatsappInput = document.getElementById(`settingsWhatsapp${uSuffix}`);
        const instagramInput = document.getElementById(`settingsInstagram${uSuffix}`);
        const facebookInput = document.getElementById(`settingsFacebook${uSuffix}`);
        const twitterInput = document.getElementById(`settingsTwitter${uSuffix}`);
        const tiktokInput = document.getElementById(`settingsTiktok${uSuffix}`);

        if (whatsappInput) payload[`whatsapp_${suffix}`] = whatsappInput.value.trim();
        if (instagramInput) payload[`instagram_${suffix}`] = instagramInput.value.trim();
        if (facebookInput) payload[`facebook_${suffix}`] = facebookInput.value.trim();
        if (twitterInput) payload[`twitter_${suffix}`] = twitterInput.value.trim();
        if (tiktokInput) payload[`tiktok_${suffix}`] = tiktokInput.value.trim();
    });

    for (let i = 0; i < 5; i++) {
        const previewDiv = document.querySelector(`.hero-slide-preview-container[data-index="${i}"]`);
        if (previewDiv) {
            if (previewDiv.dataset.isCleared === "true") {
                payload[`heroImage_${i}`] = "";
            } else if (previewDiv.dataset.base64) {
                payload[`heroImage_${i}`] = previewDiv.dataset.base64;
            } else {
                payload[`heroImage_${i}`] = STORE_SETTINGS[`heroImage_${i}`] || "";
            }
        }
    }

    try {
        const response = await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("General settings saved successfully for all departments!");
            const resSettings = await fetch('/api/settings');
            if (resSettings.ok) {
                STORE_SETTINGS = await resSettings.json();
                applyHeroBackgroundFromSettings();
                applyHeroTextFromSettings();
                updateSeasonUI(STORE_SETTINGS.active_season);
            }
            await loadProductsFromServer();
            renderProducts();
            renderAdminProducts();
        } else {
            alert("Failed to save settings.");
        }
    } catch (e) {
        console.error("Error saving general settings:", e);
        alert("Failed to connect to server to save settings.");
    }
}

function applyHeroTextFromSettings() {
    const s = STORE_SETTINGS || {};
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroTitle = document.querySelector(".hero-title");
    const heroDesc = document.querySelector(".hero-description");

    if (heroSubtitle && s.hero_subtitle) heroSubtitle.textContent = s.hero_subtitle;
    if (heroTitle && s.hero_title) heroTitle.textContent = s.hero_title;
    if (heroDesc && s.hero_description) heroDesc.textContent = s.hero_description;
}

function populateHeroTextSettings() {
    const s = STORE_SETTINGS || {};
    const subtitleInput = document.getElementById("settingsHeroSubtitle");
    const titleInput = document.getElementById("settingsHeroTitle");
    const descInput = document.getElementById("settingsHeroDescription");

    if (subtitleInput) subtitleInput.value = s.hero_subtitle || document.querySelector(".hero-subtitle")?.textContent || "";
    if (titleInput) titleInput.value = s.hero_title || document.querySelector(".hero-title")?.textContent || "";
    if (descInput) descInput.value = s.hero_description || document.querySelector(".hero-description")?.textContent || "";
}

async function setStoreSeason(season) {
    STORE_SETTINGS.active_season = season;
    updateSeasonUI(season);
    try {
        await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active_season: season })
        });
    } catch (e) {
        console.error("Failed to save active season:", e);
    }
    renderProducts();
    renderCategoryTags();
    renderBrandSlider();
    renderAdminProducts();
}

function updateSeasonUI(season) {
    const activeSec = season || (STORE_SETTINGS && STORE_SETTINGS.active_season) || "All";
    document.querySelectorAll(".season-btn").forEach(btn => {
        const bSeason = btn.dataset.season;
        if (bSeason === activeSec) {
            btn.style.background = "var(--color-accent)";
            btn.style.color = "#000";
            btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
        } else {
            btn.style.background = "transparent";
            btn.style.color = "var(--color-text)";
            btn.style.boxShadow = "none";
        }
    });
}

function clearHeroSlide(index) {
    const previewDiv = document.querySelector(`.hero-slide-preview-container[data-index="${index}"]`);
    const fileInput = document.querySelector(`.hero-slide-input[data-index="${index}"]`);
    if (fileInput) fileInput.value = "";
    if (previewDiv) {
        previewDiv.style.display = "none";
        previewDiv.dataset.isCleared = "true";
        delete previewDiv.dataset.base64;
    }
}

function renderAdminCoupons() {
    const tableBody = document.getElementById("adminCouponsTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    if (COUPONS.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--color-text-muted); padding: 1.5rem 0;">No active coupons found.</td></tr>`;
        return;
    }

    COUPONS.forEach(c => {
        const tr = document.createElement("tr");
        const discountStr = c.discountType === 'percent' ? `${c.discountValue}%` : `$${c.discountValue}`;
        tr.innerHTML = `
            <td><strong>${c.code}</strong></td>
            <td>${discountStr}</td>
            <td style="text-align: center;">
                <button onclick="deleteCoupon('${c.code}')" style="background: none; border: none; color: var(--color-error); cursor: pointer; font-size: 1.3rem;"><i class="fa-regular fa-trash-can"></i></button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

async function addCouponSubmit(event) {
    event.preventDefault();
    const code = document.getElementById("newCouponCode").value.trim().toUpperCase();
    const type = document.getElementById("newCouponType").value;
    const value = parseFloat(document.getElementById("newCouponValue").value);

    if (!code || isNaN(value) || value <= 0) {
        alert("Please enter coupon details correctly.");
        return;
    }

    try {
        const response = await fetch('/api/coupons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, discountType: type, discountValue: value })
        });

        if (response.ok) {
            alert("Coupon added successfully!");
            event.target.reset();
            await loadProductsFromServer();
        } else {
            const err = await response.json();
            alert("Failed to add coupon: " + err.error);
        }
    } catch (e) {
        console.error("Error adding coupon:", e);
        alert("Failed to connect to server to add coupon.");
    }
}

async function deleteCoupon(code) {
    if (!confirm(`Are you sure you want to delete coupon ${code} permanently?`)) return;

    try {
        const response = await fetch('/api/coupons?code=${code}', {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Coupon deleted successfully!");
            await loadProductsFromServer();
        } else {
            alert("Failed to delete coupon.");
        }
    } catch (e) {
        console.error("Error deleting coupon:", e);
        alert("Failed to connect to server to delete coupon.");
    }
}

function updateSocialFooterLinks() {
    const instLink = document.getElementById("footerInsta");
    const fbLink = document.getElementById("footerFB");
    const twitterLink = document.getElementById("footerTwitter");
    const tiktokLink = document.getElementById("footerTiktok");

    const suffix = activeDepartment === "All" ? "global" : activeDepartment.toLowerCase();

    if (instLink) {
        instLink.href = STORE_SETTINGS[`instagram_${suffix}`] || "#";
    }
    if (fbLink) {
        fbLink.href = STORE_SETTINGS[`facebook_${suffix}`] || "#";
    }
    if (twitterLink) {
        twitterLink.href = STORE_SETTINGS[`twitter_${suffix}`] || "#";
        twitterLink.style.display = (STORE_SETTINGS.show_twitter === "true") ? "inline-block" : "none";
    }
    if (tiktokLink) {
        tiktokLink.href = STORE_SETTINGS[`tiktok_${suffix}`] || "#";
        tiktokLink.style.display = (STORE_SETTINGS.show_tiktok === "true") ? "inline-block" : "none";
    }
}

function openTermsModal() {
    const backdrop = document.getElementById("termsModalBackdrop");
    if (backdrop) {
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeTermsModal() {
    const backdrop = document.getElementById("termsModalBackdrop");
    if (backdrop) {
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
    }
}

const INFO_PAGES = {
    "refund": {
        title: "REFUND & RETURNS POLICY",
        content: `
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.8rem; font-weight: 600;">1. RETURNS ELIGIBILITY</h3>
                    <p>We accept returns and exchanges within 14 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached.</p>
                </div>
                <div>
                    <h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.8rem; font-weight: 600;">2. REFUND PROCESS</h3>
                    <p>Once your return is inspected and approved, your refund will be processed. Refunds are issued via the original payment method or store credit.</p>
                </div>
                <div>
                    <h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.8rem; font-weight: 600;">3. CUSTOM PIECES</h3>
                    <p>Please note that custom-made garments or altered items are not eligible for returns or exchanges unless defective.</p>
                </div>
            </div>
        `
    },
    "track": {
        title: "TRACK YOUR ORDER",
        content: `
            <div style="display: flex; flex-direction: column; gap: 2rem; text-align: center; padding: 2rem 0;">
                <i class="fa-solid fa-truck-fast" style="font-size: 4rem; color: var(--color-accent); margin-bottom: 1rem;"></i>
                <p style="font-size: 1.4rem;">Enter your Order ID (e.g. STX-12345) below to track the shipping status of your package.</p>
                <div style="display: flex; gap: 1rem; max-width: 400px; margin: 2rem auto 0; width: 100%;">
                    <input type="text" id="trackOrderInput" placeholder="Order ID (e.g. STX-12345)" style="background-color: var(--color-background); border: 1px solid var(--color-border); padding: 1rem; color: var(--color-text); flex: 1; text-align: center; text-transform: uppercase; border-radius: 4px;">
                    <button onclick="trackOrderSubmit()" style="background-color: var(--color-accent); color: #000; border: none; font-weight: 700; padding: 0 2rem; cursor: pointer; border-radius: 4px;">TRACK</button>
                </div>
                <div id="trackResult" style="margin-top: 2rem; font-size: 1.3rem; font-weight: 600; line-height: 1.6;"></div>
            </div>
        `
    },
    "shipping": {
        title: "SHIPPING & RETURNS",
        content: `
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.8rem; font-weight: 600;">1. SHIPPING DESTINATIONS</h3>
                    <p>We provide swift delivery across Lebanon (and select international regions). Local delivery takes 2-5 business days.</p>
                </div>
                <div>
                    <h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.8rem; font-weight: 600;">2. SHIPPING FEES</h3>
                    <p>Shipping fee is automatically calculated at checkout. Enjoy FREE shipping when your purchase exceeds the free delivery threshold!</p>
                </div>
                <div>
                    <h3 style="color: var(--color-accent); font-size: 1.5rem; margin-bottom: 0.8rem; font-weight: 600;">3. RETURNS</h3>
                    <p>For return pickup requests, please contact our support department on WhatsApp.</p>
                </div>
            </div>
        `
    },
    "faqs": {
        title: "FREQUENTLY ASKED QUESTIONS",
        content: `
            <div style="display: flex; flex-direction: column; gap: 2rem; text-align: left;">
                <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem;">
                    <h4 style="color: var(--color-text); font-size: 1.4rem; margin-bottom: 0.6rem; font-weight: 600;">Q: Are your hoodies oversized?</h4>
                    <p style="color: var(--color-text-muted);">A: Yes! Our streetwear pieces are designed with a relaxed, premium oversized fit. Check our size guides in product details.</p>
                </div>
                <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem;">
                    <h4 style="color: var(--color-text); font-size: 1.4rem; margin-bottom: 0.6rem; font-weight: 600;">Q: What payment methods do you accept?</h4>
                    <p style="color: var(--color-text-muted);">A: We currently support Cash on Delivery (COD) for all orders.</p>
                </div>
                <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem;">
                    <h4 style="color: var(--color-text); font-size: 1.4rem; margin-bottom: 0.6rem; font-weight: 600;">Q: Can I exchange sizes?</h4>
                    <p style="color: var(--color-text-muted);">A: Absolutely. Contact us on WhatsApp within 14 days, and we will swap sizes for you.</p>
                </div>
            </div>
        `
    },
    "support": {
        title: "CONTACT SUPPORT",
        content: `
            <div style="display: flex; flex-direction: column; gap: 2.5rem; text-align: center; padding: 2rem 0;">
                <i class="fa-solid fa-headset" style="font-size: 4rem; color: var(--color-accent); margin-bottom: 1rem;"></i>
                <p style="font-size: 1.4rem;">Our support team is available 24/7. Chat with us directly on WhatsApp or call our support lines.</p>
                <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 300px; margin: 1rem auto 0; width: 100%;">
                    <a href="https://wa.me/96171987654" target="_blank" style="background-color: #2ecc71; color: white; text-decoration: none; padding: 1.2rem 2rem; font-weight: 700; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.8rem;"><i class="fa-brands fa-whatsapp"></i> WHATSAPP CHAT</a>
                    <a href="mailto:support@styluxe.com" style="background-color: var(--color-surface); color: var(--color-text); text-decoration: none; border: 1px solid var(--color-border); padding: 1.2rem 2rem; font-weight: 700; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.8rem;"><i class="fa-regular fa-envelope"></i> EMAIL SUPPORT</a>
                </div>
            </div>
        `
    }
};

function openInfoModal(type) {
    const data = INFO_PAGES[type];
    if (!data) return;

    const titleEl = document.getElementById("infoModalTitle");
    const bodyEl = document.getElementById("infoModalBody");
    const backdrop = document.getElementById("infoModalBackdrop");

    if (titleEl) titleEl.innerHTML = data.title;
    if (bodyEl) bodyEl.innerHTML = data.content;

    if (backdrop) {
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeInfoModal() {
    const backdrop = document.getElementById("infoModalBackdrop");
    if (backdrop) {
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function trackOrderSubmit() {
    const inputVal = document.getElementById("trackOrderInput").value.trim();
    const resultEl = document.getElementById("trackResult");
    if (!resultEl) return;

    if (!inputVal) {
        resultEl.style.color = "var(--color-error)";
        resultEl.innerHTML = "Please enter your Order ID or phone number.";
        return;
    }

    resultEl.innerHTML = `<div style="text-align: center; margin-top: 1rem;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 1.8rem; color: var(--color-accent);"></i> Searching...</div>`;

    fetch('/api/orders/track?query=${encodeURIComponent(inputVal)}')
        .then(res => {
            if (!res.ok) throw new Error("Order not found");
            return res.json();
        })
        .then(orders => {
            if (!orders || orders.length === 0) {
                resultEl.style.color = "var(--color-error)";
                resultEl.innerHTML = "No orders found. Please verify and try again.";
                return;
            }

            if (orders.length === 1) {
                renderSingleOrderTracking(orders[0]);
            } else {
                resultEl.style.color = "var(--color-text)";
                let html = `<div style="text-align: left; margin-top: 2rem;">`;
                html += `<h4 style="font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; color: var(--color-accent);">We found ${orders.length} orders matching this query:</h4>`;
                html += `<div style="display: flex; flex-direction: column; gap: 1rem;">`;
                orders.forEach(o => {
                    html += `
                        <div onclick="selectOrderToTrack('${o.id}')" style="background: var(--color-surface); border: 1px solid var(--color-border); padding: 1.5rem; border-radius: 6px; cursor: pointer; transition: border-color 0.2s;" onmouseover="this.style.borderColor='var(--color-accent)'" onmouseout="this.style.borderColor='var(--color-border)'">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                <strong style="font-size: 1.1rem; color: var(--color-text);">ORDER ID: #${o.id}</strong>
                                <span style="font-size: 1rem; color: var(--color-text-muted);">${o.date}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 1.1rem; font-weight: 700; color: ${o.status === 'Cancelled' ? 'var(--color-error)' : '#2ecc71'}; text-transform: uppercase;">${o.status.toUpperCase()}</span>
                                <strong style="font-size: 1.1rem;">${formatPrice(o.total)}</strong>
                            </div>
                        </div>
                    `;
                });
                html += `</div></div>`;
                resultEl.innerHTML = html;
            }
        })
        .catch(err => {
            console.error("Error tracking order:", err);
            resultEl.style.color = "var(--color-error)";
            resultEl.innerHTML = "Failed to load tracking details. Please try again.";
        });
}

function selectOrderToTrack(orderId) {
    const resultEl = document.getElementById("trackResult");
    if (!resultEl) return;
    resultEl.innerHTML = `<div style="text-align: center; margin-top: 1rem;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 1.8rem; color: var(--color-accent);"></i> Loading timeline...</div>`;
    
    fetch('/api/orders/track?query=${encodeURIComponent(orderId)}')
        .then(res => res.json())
        .then(orders => {
            if (orders && orders[0]) {
                renderSingleOrderTracking(orders[0]);
            }
        });
}

function renderSingleOrderTracking(order) {
    const resultEl = document.getElementById("trackResult");
    if (!resultEl) return;

    let step = 1;
    let statusText = "ORDER RECEIVED";
    let linePercent = 0;

    const statusUpper = (order.status || "").toLowerCase();
    if (statusUpper === "processing" || statusUpper === "packaged") {
        step = 2;
        statusText = "PROCESSING & PACKAGING";
        linePercent = 33.3;
    } else if (statusUpper === "shipped" || statusUpper === "on the way") {
        step = 3;
        statusText = "SHIPPED & IN TRANSIT";
        linePercent = 66.6;
    } else if (statusUpper === "delivered" || statusUpper === "completed") {
        step = 4;
        statusText = "DELIVERED TO DESTINATION";
        linePercent = 100;
    } else if (statusUpper === "cancelled") {
        step = 0;
        statusText = "ORDER CANCELLED";
    }

    let stepperHtml = "";
    if (step > 0) {
        stepperHtml = `
            <div class="tracking-stepper" style="display: flex; justify-content: space-between; position: relative; margin: 3rem 0 2rem; padding: 0 1rem;">
                <div style="position: absolute; top: 15px; left: 0; right: 0; height: 4px; background: var(--color-border); z-index: 1;"></div>
                <div style="position: absolute; top: 15px; left: 0; width: ${linePercent}%; height: 4px; background: var(--color-accent); z-index: 2; transition: width 0.5s ease;"></div>
                
                <div style="display: flex; flex-direction: column; align-items: center; z-index: 3; flex: 1;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${step >= 1 ? 'var(--color-accent)' : 'var(--color-surface)'}; border: 2px solid ${step >= 1 ? 'var(--color-accent)' : 'var(--color-border)'}; color: ${step >= 1 ? '#000' : 'var(--color-text-muted)'}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-check"></i></div>
                    <span style="font-size: 0.95rem; margin-top: 0.8rem; font-weight: 600; color: ${step >= 1 ? 'var(--color-text)' : 'var(--color-text-muted)'};">PLACED</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; z-index: 3; flex: 1;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${step >= 2 ? 'var(--color-accent)' : 'var(--color-surface)'}; border: 2px solid ${step >= 2 ? 'var(--color-accent)' : 'var(--color-border)'}; color: ${step >= 2 ? '#000' : 'var(--color-text-muted)'}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-box"></i></div>
                    <span style="font-size: 0.95rem; margin-top: 0.8rem; font-weight: 600; color: ${step >= 2 ? 'var(--color-text)' : 'var(--color-text-muted)'};">PROCESSING</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; z-index: 3; flex: 1;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${step >= 3 ? 'var(--color-accent)' : 'var(--color-surface)'}; border: 2px solid ${step >= 3 ? 'var(--color-accent)' : 'var(--color-border)'}; color: ${step >= 3 ? '#000' : 'var(--color-text-muted)'}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-truck"></i></div>
                    <span style="font-size: 0.95rem; margin-top: 0.8rem; font-weight: 600; color: ${step >= 3 ? 'var(--color-text)' : 'var(--color-text-muted)'};">SHIPPED</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; z-index: 3; flex: 1;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${step >= 4 ? 'var(--color-accent)' : 'var(--color-surface)'}; border: 2px solid ${step >= 4 ? 'var(--color-accent)' : 'var(--color-border)'}; color: ${step >= 4 ? '#000' : 'var(--color-text-muted)'}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-house-chimney"></i></div>
                    <span style="font-size: 0.95rem; margin-top: 0.8rem; font-weight: 600; color: ${step >= 4 ? 'var(--color-text)' : 'var(--color-text-muted)'};">DELIVERED</span>
                </div>
            </div>
        `;
    } else {
        stepperHtml = `
            <div style="background: rgba(231, 76, 60, 0.1); border: 1px solid rgba(231, 76, 60, 0.25); padding: 1.5rem; border-radius: 4px; color: var(--color-error); text-align: center; margin: 2rem 0; font-weight: 700;">
                <i class="fa-solid fa-ban" style="font-size: 2rem; margin-bottom: 0.8rem; display: block;"></i>
                ORDER HAS BEEN CANCELLED
            </div>
        `;
    }

    resultEl.style.color = "var(--color-text)";
    resultEl.innerHTML = `
        <div style="background: var(--color-surface); border: 1px solid var(--color-border); padding: 2.5rem; border-radius: 8px; text-align: left; margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h4 style="font-size: 1.4rem; font-weight: 700; color: var(--color-accent); margin: 0;">ORDER ID: #${order.id}</h4>
                    <p style="font-size: 1rem; color: var(--color-text-muted); margin: 0.5rem 0 0;">Date: ${order.date}</p>
                </div>
                <div style="text-align: right;">
                    <span style="background: ${order.status === 'Cancelled' ? 'rgba(231,76,60,0.1)' : 'rgba(46,204,113,0.1)'}; border: 1px solid ${order.status === 'Cancelled' ? 'rgba(231,76,60,0.25)' : 'rgba(46,204,113,0.25)'}; color: ${order.status === 'Cancelled' ? 'var(--color-error)' : '#2ecc71'}; padding: 0.5rem 1.2rem; border-radius: 4px; font-weight: 700; text-transform: uppercase; font-size: 0.95rem;">${order.status}</span>
                </div>
            </div>
            
            ${stepperHtml}

            <div style="margin-top: 2.5rem;">
                <h5 style="font-size: 1.2rem; font-weight: 700; border-bottom: 1px solid var(--color-border); padding-bottom: 0.8rem; margin-bottom: 1rem;">ITEMS ORDERED</h5>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    ${order.items.map(item => `
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span style="font-weight: 600; color: var(--color-text);">${item.name}</span>
                                <span style="font-size: 0.95rem; color: var(--color-text-muted); display: block; margin-top: 0.2rem;">Size: ${item.size} | Qty: ${item.quantity}</span>
                            </div>
                            <span style="font-weight: 600;">${formatPrice(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 1.5rem; margin-top: 1.5rem; font-weight: 700; font-size: 1.2rem;">
                <span>GRAND TOTAL</span>
                <span style="color: var(--color-accent);">${formatPrice(order.total)}</span>
            </div>
        </div>
    `;
}

let activeAdminOrder = null;

function openAdminOrderDetailsModal(orderId) {
    const order = ordersList.find(o => o.id === orderId);
    if (!order) return;

    activeAdminOrder = order;

    const contentDiv = document.getElementById("adminOrderDetailsContent");
    
    // Build items rows with product images!
    let itemsHTML = "";
    order.items.forEach(item => {
        const prod = PRODUCTS.find(p => p.id === item.id);
        const imgUrl = item.image || (prod ? getProductMainImage(prod) : 'assets/favicon.jpg');
        const colorVal = item.color || "Black";
        const returnedQty = item.returnedQty || 0;
        const availableToReturn = item.quantity - returnedQty;
        
        let returnBtnHTML = "";
        if (availableToReturn > 0) {
            returnBtnHTML = `
                <button class="status-change-btn" style="background-color: var(--color-error); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: all 0.25s ease;" onclick="initiateItemReturn('${order.id}', ${item.id}, '${item.size}', '${colorVal}', ${availableToReturn})">
                    RETURN ITEM
                </button>
            `;
        }
        
        let returnStatusHTML = "";
        if (returnedQty > 0) {
            returnStatusHTML = `
                <div style="font-size: 1.05rem; color: var(--color-error); font-weight: 700; margin-top: 0.3rem;">
                    (Returned: ${returnedQty})
                </div>
            `;
        }
        
        itemsHTML += `
            <div style="display: flex; align-items: center; gap: 1.5rem; padding: 1.2rem 0; border-bottom: 1px solid var(--color-border);">
                <img src="${imgUrl}" alt="${item.name}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 4px; border: 1px solid var(--color-border);">
                <div style="flex: 1;">
                    <h4 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 0.4rem 0;">${item.name}</h4>
                    <span style="font-size: 1.1rem; color: var(--color-text-muted);">SIZE: ${item.size} / COLOR: ${colorVal}</span>
                    ${item.preorder ? '<span style="font-size: 0.9rem; font-weight: 700; color: var(--color-accent); letter-spacing: 0.05em; display: inline-block; margin-left: 0.8rem;">PRE-ORDER</span>' : ''}
                    ${returnStatusHTML}
                </div>
                <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem;">
                    <div>
                        <div style="font-weight: 700; font-size: 1.3rem;">${formatPrice(item.price * item.quantity)}</div>
                        <div style="font-size: 1.1rem; color: var(--color-text-muted); margin-top: 0.2rem;">${item.quantity} x ${formatPrice(item.price)}</div>
                    </div>
                    ${returnBtnHTML}
                </div>
            </div>
        `;
    });

    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 150 ? 0 : 5;
    const discount = Math.max(0, subtotal + shipping - order.total);

    contentDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border);">
            <div>
                <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--color-accent); margin-bottom: 1rem;">ORDER INFO</h3>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Order ID:</strong> #${order.id}</p>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Date:</strong> ${order.date}</p>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Status:</strong> <span style="font-weight:700; color: ${order.status.includes("DELIVERED") ? "var(--color-success)" : order.status.includes("SHIPPED") ? "#5ac8fa" : "var(--color-accent)"};">${order.status.toUpperCase()}</span></p>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Payment:</strong> COD (Cash on Delivery)</p>
            </div>
            <div>
                <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--color-accent); margin-bottom: 1rem;">CUSTOMER DETAILS</h3>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Name:</strong> ${order.customer || order.customerName}</p>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Phone:</strong> ${order.phone || order.customerPhone}</p>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Email:</strong> ${order.userEmail || order.customerEmail || 'N/A'}</p>
                <p style="margin: 0.4rem 0; font-size: 1.2rem;"><strong>Address:</strong> ${order.address || order.customerAddress}</p>
            </div>
        </div>

        <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--color-accent); margin-bottom: 1.5rem;">ORDER ITEMS</h3>
        <div style="margin-bottom: 2.5rem;">
            ${itemsHTML}
        </div>

        <div style="width: 280px; margin-left: auto; display: flex; flex-direction: column; gap: 0.8rem; font-size: 1.2rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 6px;">
            <div style="display: flex; justify-content: space-between;">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            ${discount > 0 ? `
            <div style="display: flex; justify-content: space-between; color: var(--color-error);">
                <span>Discount:</span>
                <span>-${formatPrice(discount)}</span>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between;">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.4rem; border-top: 1px solid var(--color-border); padding-top: 0.8rem; color: var(--color-accent);">
                <span>Total:</span>
                <span>${formatPrice(order.total)}</span>
            </div>
        </div>

        <div style="margin-top: 2.5rem; text-align: center; display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap;">
            <button onclick="printOrderSticker('${order.id}')" style="background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); color: #ffffff; border: none; font-weight: 700; padding: 1rem 2rem; font-size: 1.1rem; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 15px rgba(46, 204, 113, 0.35);">
                <i class="fa-solid fa-truck-fast"></i> PRINT DELIVERY STICKER 🚚
            </button>
            <button onclick="printOrderInvoice('${order.id}')" style="background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%); color: #000000; border: none; font-weight: 700; padding: 1rem 2rem; font-size: 1.1rem; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);">
                <i class="fa-solid fa-file-invoice-dollar"></i> PRINT SALES INVOICE 🧾
            </button>
        </div>
    `;

    document.getElementById("adminOrderDetailsModalBackdrop").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeAdminOrderDetailsModal() {
    document.getElementById("adminOrderDetailsModalBackdrop").classList.remove("active");
    document.body.style.overflow = "";
    activeAdminOrder = null;
}

function printActiveOrderInvoice() {
    if (!activeAdminOrder) return;
    const order = activeAdminOrder;

    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 150 ? 0 : 5;
    const discount = Math.max(0, subtotal + shipping - order.total);

    let itemsRows = "";
    order.items.forEach(item => {
        const colorVal = item.color || "Black";
        itemsRows += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px; text-align: left;">
                    <div style="font-weight: bold; font-size: 14px;">${item.name}</div>
                    <div style="font-size: 12px; color: #666;">Size: ${item.size} / Color: ${colorVal} ${item.preorder ? '<strong>(PRE-ORDER)</strong>' : ''}</div>
                </td>
                <td style="padding: 12px; text-align: center;">${item.quantity}</td>
                <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
                <td style="padding: 12px; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });

    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(`
        <html>
        <head>
            <title>Invoice - #${order.id}</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    color: #333;
                    padding: 40px;
                    margin: 0;
                    background-color: #fff;
                }
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    border: 1px solid #eee;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                    padding: 30px;
                    border-radius: 8px;
                }
                .invoice-header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 2px solid #333;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .logo {
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 0.1em;
                }
                .details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin-bottom: 40px;
                }
                .details-block h3 {
                    margin-top: 0;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 8px;
                    font-size: 16px;
                }
                .details-block p {
                    margin: 6px 0;
                    font-size: 14px;
                    line-height: 1.4;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }
                th {
                    background-color: #f5f5f5;
                    font-weight: bold;
                    padding: 12px;
                    text-align: left;
                    border-bottom: 2px solid #ddd;
                }
                .totals-box {
                    width: 250px;
                    margin-left: auto;
                    font-size: 14px;
                    line-height: 1.8;
                }
                .totals-box div {
                    display: flex;
                    justify-content: space-between;
                    padding: 6px 0;
                }
                .totals-box .grand-total {
                    font-size: 18px;
                    font-weight: bold;
                    border-top: 2px solid #333;
                    padding-top: 10px;
                    margin-top: 10px;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                    .invoice-box {
                        border: none;
                        box-shadow: none;
                        padding: 0;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <div class="invoice-header">
                    <div>
                        <div class="logo">STYLUXE</div>
                        <div style="font-size: 12px; color: #666; margin-top: 5px;">Riad Al Solh Street, Beirut, Lebanon</div>
                        <div style="font-size: 12px; color: #666;">Phone: +961 71 987 654</div>
                    </div>
                    <div style="text-align: right;">
                        <h2 style="margin: 0; font-size: 24px; color: #333;">INVOICE</h2>
                        <div style="font-size: 14px; margin-top: 8px;">Order: <strong>#${order.id}</strong></div>
                        <div style="font-size: 14px; color: #666;">Date: ${order.date}</div>
                    </div>
                </div>

                <div class="details-grid">
                    <div class="details-block">
                        <h3>Customer Info</h3>
                        <p><strong>Name:</strong> ${order.customer || order.customerName}</p>
                        <p><strong>Phone:</strong> ${order.phone || order.customerPhone}</p>
                        <p><strong>Email:</strong> ${order.userEmail || order.customerEmail || 'N/A'}</p>
                        <p><strong>Address:</strong> ${order.address || order.customerAddress}</p>
                    </div>
                    <div class="details-block">
                        <h3>Order Status & Payment</h3>
                        <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
                        <p><strong>Payment Method:</strong> Cash on Delivery (COD)</p>
                        <p><strong>Shipping Carrier:</strong> Local Delivery Rider</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th style="text-align: left;">Item & Description</th>
                            <th style="text-align: center; width: 80px;">Qty</th>
                            <th style="text-align: right; width: 100px;">Price</th>
                            <th style="text-align: right; width: 120px;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsRows}
                    </tbody>
                </table>

                <div class="totals-box">
                    <div>
                        <span>Subtotal:</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    ${discount > 0 ? `
                    <div style="color: #c0392b;">
                        <span>Discount:</span>
                        <span>-$${discount.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    <div>
                        <span>Shipping:</span>
                        <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
                    </div>
                    <div class="grand-total">
                        <span>Total Due:</span>
                        <span>$${order.total.toFixed(2)}</span>
                    </div>
                </div>

                <div style="margin-top: 60px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
                    Thank you for shopping at STYLUXE!
                </div>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                }
            </script>
        </body>
        </html>
    `);
    invoiceWindow.document.close();
}

async function initiateItemReturn(orderId, productId, size, color, maxQty) {
    let qtyStr = prompt(`Enter quantity to return (Maximum: ${maxQty}):`, "1");
    if (qtyStr === null) return;
    
    let qty = parseInt(qtyStr);
    if (isNaN(qty) || qty <= 0 || qty > maxQty) {
        alert(`Invalid quantity. Must be between 1 and ${maxQty}.`);
        return;
    }

    let managerPassword = "";
    
    const role = currentAdminStaff ? currentAdminStaff.role : "";
    if (role !== "Manager" && role !== "Administrator") {
        managerPassword = prompt("UNAUTHORIZED: Manager authorization required. Please enter Manager Password to approve this return:");
        if (managerPassword === null) return;
        if (!managerPassword.trim()) {
            alert("Manager password is required.");
            return;
        }
    }

    try {
        const response = await fetch('/api/orders/return', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                productId,
                size,
                color,
                quantity: qty,
                staffEmail: currentAdminStaff ? currentAdminStaff.email : "",
                staffPassword: currentAdminPassword || "",
                managerPassword
            })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert("Item returned successfully! Product inventory has been restocked.");
            
            // Refresh local order list and reopen/update the modal
            if (typeof loadOrdersFromServer === 'function') {
                await loadOrdersFromServer();
            }
            if (typeof loadProductsFromServer === 'function') {
                await loadProductsFromServer();
            }
            
            setTimeout(() => {
                openAdminOrderDetailsModal(orderId);
                if (typeof renderAdminOrders === 'function') {
                    renderAdminOrders();
                }
                if (typeof renderAdminProducts === 'function') {
                    renderAdminProducts();
                }
            }, 500);
        } else {
            alert(`Return failed: ${result.error}`);
        }
    } catch (err) {
        console.error("Failed to process item return:", err);
        alert("Failed to connect to server. Please try again.");
    }
}

function togglePosMode() {
    if (!promptManagerPermission("Switch to Return Mode")) return;

    const titleEl = document.getElementById("posTitleEl");
    const toggleBtn = document.getElementById("posModeToggleBtn");
    
    if (posMode === "sales") {
        posMode = "return";
        if (titleEl) {
            titleEl.innerHTML = `<i class="fa-solid fa-rotate-left"></i> RETURN TERMINAL`;
            titleEl.style.color = "#e74c3c";
        }
        if (toggleBtn) {
            toggleBtn.innerHTML = `<i class="fa-solid fa-cash-register"></i> SWITCH TO SALE`;
            toggleBtn.style.backgroundColor = "rgba(46, 204, 113, 0.12)";
            toggleBtn.style.borderColor = "rgba(46, 204, 113, 0.3)";
            toggleBtn.style.color = "#2ecc71";
        }
        const payBtn = document.querySelector(".pos-pay-btn");
        if (payBtn) {
            payBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i> COMPLETE RETURN`;
            payBtn.style.background = "linear-gradient(135deg, #e74c3c, #c0392b)";
            payBtn.style.color = "#ffffff";
        }
    } else {
        posMode = "sales";
        if (titleEl) {
            titleEl.innerHTML = `<i class="fa-solid fa-cash-register"></i> POS TERMINAL`;
            titleEl.style.color = "";
        }
        if (toggleBtn) {
            toggleBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i> SWITCH TO RETURN`;
            toggleBtn.style.backgroundColor = "rgba(231, 76, 60, 0.12)";
            toggleBtn.style.borderColor = "rgba(231, 76, 60, 0.3)";
            toggleBtn.style.color = "#e74c3c";
        }
        const payBtn = document.querySelector(".pos-pay-btn");
        if (payBtn) {
            payBtn.innerHTML = `<i class="fa-solid fa-check-circle"></i> COMPLETE SALE`;
            payBtn.style.background = "";
            payBtn.style.color = "";
        }
    }
    
    posCart = [];
    renderPosTicketItems();
}

function showPosReturnReceipt(order, subtotal, discount, total) {
    document.getElementById("receiptDate").textContent = new Date().toISOString().split('T')[0] + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById("receiptCustomer").textContent = order.customerName;
    
    const cashierName = currentAdminStaff ? currentAdminStaff.name : "SYSTEM ADMIN";
    const cashierEl = document.getElementById("receiptCashier");
    if (cashierEl) cashierEl.textContent = cashierName;
    
    const paper = document.getElementById("posReceiptPaper");
    if (paper) {
        const title = paper.querySelector("h2");
        if (title) title.innerHTML = "STYLUXE - REFUND";
    }
    
    const receiptItemsContainer = document.getElementById("receiptItems");
    receiptItemsContainer.innerHTML = "";

    order.items.forEach(item => {
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.innerHTML = `
            <span>[RETURN] ${item.name} (x${item.quantity}) [${item.size}]</span>
            <span>-${formatPrice(item.price * item.quantity)}</span>
        `;
        receiptItemsContainer.appendChild(div);
    });

    document.getElementById("receiptSubtotal").textContent = `-${formatPrice(subtotal)}`;
    document.getElementById("receiptDiscount").textContent = `0.00`;
    document.getElementById("receiptTotal").textContent = `-${formatPrice(total)}`;

    document.getElementById("labelOrderId").textContent = order.id;
    document.getElementById("labelName").textContent = order.customerName;
    document.getElementById("labelPhone").textContent = order.customerPhone;
    document.getElementById("labelAddress").textContent = order.customerAddress;
    document.getElementById("labelItems").innerHTML = order.items.map(item => `[RETURN] ${item.name} (${item.size}) x${item.quantity}`).join("<br>");

    document.getElementById("posReceiptModalBackdrop").classList.add("active");
    
    posCart = [];
    renderPosTicketItems();
}

function onDailyReportCashierChange(val) {
    dailyReportCashierFilter = val;
    openDailyReportModal();
}

async function handleNewsletterSubscribe(event, form) {
    event.preventDefault();
    const emailInput = document.getElementById("newsletterEmailInput");
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    if (!email) return;

    try {
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            alert("THANK YOU FOR SUBSCRIBING TO OUR NEWSLETTER!");
            form.reset();
        } else {
            const data = await response.json();
            alert(`Subscription failed: ${data.error}`);
        }
    } catch (err) {
        console.error("Newsletter subscription error:", err);
        alert("Subscription failed. Please check your connection.");
    }
}

// ==========================================
// NEW ARRIVALS & TRIPLE-PANE PRADA SIDEBAR
// ==========================================

function legacyRenderHomeNewArrivals() {
    const grid = document.getElementById("newArrivalsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const latestProducts = [...PRODUCTS]
        .sort((a, b) => b.id - a.id)
        .slice(0, 15);

    if (latestProducts.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); font-size: 1.4rem;">No new arrivals available.</p>`;
        return;
    }

    latestProducts.forEach(p => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        let badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : "";
        let videoBadgeHTML = p.video ? `<span class="product-badge video-badge" style="right: 1.5rem; left: auto; background: rgba(0,0,0,0.85); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); font-size: 0.95rem; padding: 0.3rem 0.7rem; font-weight: 600;"><i class="fa-solid fa-circle-play"></i> VIDEO</span>` : "";

        productCard.innerHTML = `
            ${badgeHTML}
            ${videoBadgeHTML}
            <div class="product-img-wrapper" onclick="openProductModal(${p.id})">
                <img src="${getProductMainImage(p)}" alt="${p.name}" loading="lazy">
                <div class="product-quick-view">
                    <button class="quick-view-btn">QUICK VIEW</button>
                </div>
            </div>
            <div class="product-info" onclick="openProductModal(${p.id})">
                <div class="product-brand">${getProductBrand(p)}</div>
                <span class="product-category">${p.department} / ${p.category}</span>
                <h3 class="product-name">${p.name}</h3>
                <span class="product-price">${formatPrice(p.price)}</span>
            </div>
        `;
        grid.appendChild(productCard);
    });
}

function getNodeEffectiveChildren(node) {
    if (!node) return [];

    // 1. If explicit children in builder
    if (Array.isArray(node.children) && node.children.length > 0) {
        return node.children;
    }
    if (Array.isArray(node.children) && node._hasUserSavedChildren) {
        return node.children;
    }

    // 2. If node is a Category Obj from CATEGORIES array, check for sub-categories (parentId === node.id)
    if (node.id && Array.isArray(CATEGORIES)) {
        const subCats = CATEGORIES.filter(c => c.parentId === node.id);
        if (subCats.length > 0) {
            return subCats.map(sub => ({
                id: sub.id,
                name: sub.name.toUpperCase(),
                linkType: "category",
                category: sub.name,
                department: sub.department || node.department || node.name,
                children: []
            }));
        }
    }

    // 3. Fallback: If department node (e.g., WOMEN, MEN, KIDS), extract parent categories from CATEGORIES array matching department
    if (node.name) {
        const deptNorm = (node.department || node.name).trim().toLowerCase();
        const catMap = new Map();

        if (Array.isArray(CATEGORIES)) {
            CATEGORIES.forEach(c => {
                if (!c || !c.name) return;
                const cDept = (c.department || "").trim().toLowerCase();
                if (!c.parentId && (!cDept || cDept === "all" || cDept === "global" || cDept === deptNorm)) {
                    catMap.set(c.id || c.name.toLowerCase(), {
                        id: c.id || ("dyn_" + c.name.toLowerCase().replace(/\s+/g, '_')),
                        name: c.name.toUpperCase(),
                        linkType: "category",
                        category: c.name,
                        department: c.department || node.name,
                        children: []
                    });
                }
            });
        }

        const availableCats = Array.from(catMap.values());
        if (availableCats.length > 0) {
            return availableCats;
        }
    }
    return [];
}

function renderPradaDrawerMenu() {
    const pane1Links = document.getElementById("pane1Links");
    if (!pane1Links) return;

    pane1Links.innerHTML = "";

    let menuToRender = Array.isArray(NAVIGATION_MENU) && NAVIGATION_MENU.length > 0 ? NAVIGATION_MENU : [
        { id: "women", name: "Women", linkType: "department", linkValue: "Women", department: "Women", children: [] },
        { id: "men", name: "Men", linkType: "department", linkValue: "Men", department: "Men", children: [] },
        { id: "kids", name: "Kids", linkType: "department", linkValue: "Kids", department: "Kids", children: [] }
    ];

    // Reset active buttons and collapse pane 2 and 3 initially
    activePane1Btn = null;
    activePane2Btn = null;
    const pane2 = document.getElementById("drawerPane2");
    const pane3 = document.getElementById("drawerPane3");
    if (pane2) pane2.classList.add("drawer-pane-collapsed");
    if (pane3) pane3.classList.add("drawer-pane-collapsed");

    menuToRender.forEach(node => {
        const children = getNodeEffectiveChildren(node);
        const btn = document.createElement("button");
        btn.classList.add("dept-link");
        btn.innerHTML = `<span>${node.name}</span> ${children.length > 0 ? '<i class="fa-solid fa-chevron-right" style="opacity: 1; font-size: 0.9rem; margin-left: auto;"></i>' : ''}`;
        
        btn.onclick = () => selectDrawerNode(node, 1, btn);
        pane1Links.appendChild(btn);
    });
}

let activePane1Btn = null;
let activePane2Btn = null;

function selectDrawerNode(node, level, element) {
    const drawer = document.getElementById("pradaDrawer");
    const isMobile = window.innerWidth <= 768;

    if (level === 1) {
        if (activePane1Btn) activePane1Btn.classList.remove("active");
        element.classList.add("active");
        activePane1Btn = element;

        const pane2 = document.getElementById("drawerPane2");
        const pane3 = document.getElementById("drawerPane3");
        if (pane3) pane3.classList.add("drawer-pane-collapsed");

        const children = getNodeEffectiveChildren(node);

        if (children.length > 0) {
            if (pane2) {
                pane2.classList.remove("drawer-pane-collapsed");
                document.getElementById("pane2Title").textContent = node.name.toUpperCase();
                if (isMobile && drawer) {
                    setTimeout(() => {
                        drawer.scrollTo({ left: window.innerWidth * 0.78, behavior: 'smooth' });
                    }, 50);
                }
            }
            
            const pane2Links = document.getElementById("pane2Links");
            if (pane2Links) {
                pane2Links.innerHTML = "";

                children.forEach(subNode => {
                    const subChildren = getNodeEffectiveChildren(subNode);
                    const subBtn = document.createElement("button");
                    subBtn.classList.add("dept-link");
                    subBtn.innerHTML = `<span>${subNode.name}</span> ${subChildren.length > 0 ? '<i class="fa-solid fa-chevron-right" style="opacity: 1; font-size: 0.85rem; margin-left: auto;"></i>' : ''}`;
                    subBtn.onclick = () => selectDrawerNode(subNode, 2, subBtn);
                    pane2Links.appendChild(subBtn);
                });
            }
            
            // Perform background department filter update
            if (node.name) {
                filterByDepartmentSilently(node.name);
            }
        } else {
            if (pane2) pane2.classList.add("drawer-pane-collapsed");
            if (isMobile && drawer) {
                drawer.scrollTo({ left: 0, behavior: 'smooth' });
            }
            executeDrawerAction(node);
        }
    } else if (level === 2) {
        if (activePane2Btn) activePane2Btn.classList.remove("active");
        element.classList.add("active");
        activePane2Btn = element;

        const pane3 = document.getElementById("drawerPane3");
        const children = getNodeEffectiveChildren(node);

        if (children.length > 0) {
            if (pane3) {
                pane3.classList.remove("drawer-pane-collapsed");
                document.getElementById("pane3Title").textContent = node.name.toUpperCase();
                if (isMobile && drawer) {
                    setTimeout(() => {
                        drawer.scrollTo({ left: window.innerWidth * 0.78 * 2, behavior: 'smooth' });
                    }, 50);
                }
            }
            
            const pane3Links = document.getElementById("pane3Links");
            if (pane3Links) {
                pane3Links.innerHTML = "";

                children.forEach(leafNode => {
                    const leafBtn = document.createElement("button");
                    leafBtn.classList.add("drawer-category-btn");
                    leafBtn.textContent = leafNode.name;
                    leafBtn.onclick = () => selectDrawerNode(leafNode, 3, leafBtn);
                    pane3Links.appendChild(leafBtn);
                });
            }

            // Perform background category filter update
            if (node.name) {
                filterByCategorySilently(node.name);
            }
        } else {
            if (pane3) pane3.classList.add("drawer-pane-collapsed");
            executeDrawerAction(node);
        }
    } else if (level === 3) {
        executeDrawerAction(node);
    }
}

function filterByDepartmentSilently(deptName) {
    let dept = "All";
    const txt = deptName.toLowerCase();
    if (txt.includes("women")) dept = "Women";
    else if (txt.includes("men")) dept = "Men";
    else if (txt.includes("kids")) dept = "Kids";
    
    if (dept !== "All") {
        activeDepartment = dept;
        activeCategory = "All";
        activeBrand = "All";
    }
}

function filterByCategorySilently(catName) {
    let cat = catName;
    const foundCat = CATEGORIES.find(c => c.name.toLowerCase() === catName.toLowerCase());
    if (foundCat) {
        cat = foundCat.name;
    } else {
        const nameLower = catName.toLowerCase();
        if (nameLower.includes("bag")) cat = "Bags";
        else if (nameLower.includes("shoe") || nameLower.includes("sneaker") || nameLower.includes("boot")) cat = "Shoes";
        else if (nameLower.includes("t-shirt") || nameLower.includes("polo")) cat = "T-Shirts";
        else if (nameLower.includes("jacket") || nameLower.includes("coat") || nameLower.includes("outerwear")) cat = "Jackets";
        else if (nameLower.includes("denim") || nameLower.includes("trouser") || nameLower.includes("jeans")) cat = "Jeans";
        else if (nameLower.includes("knitwear") || nameLower.includes("hoodie") || nameLower.includes("sweatshirt")) cat = "Hoodies";
        else if (nameLower.includes("dress")) cat = "Dresses";
        else if (nameLower.includes("top")) cat = "Tops";
        else if (nameLower.includes("accessory") || nameLower.includes("wallet") || nameLower.includes("sunglass")) cat = "Accessories";
        else if (nameLower.includes("ready to wear") || nameLower.includes("clothing") || nameLower.includes("swimwear")) cat = "Ready To Wear";
    }
    activeCategory = cat;
}

function executeDrawerAction(node) {
    togglePradaDrawer(); // Close the drawer

    if (!node) return;

    // Detect Department from node or active level 1 pane button
    let dept = node.department || node.linkValue;
    if (!dept || dept === "All") {
        if (activePane1Btn && activePane1Btn.textContent) {
            const txt = activePane1Btn.textContent.trim();
            if (txt.toLowerCase().includes("women")) dept = "Women";
            else if (txt.toLowerCase().includes("men")) dept = "Men";
            else if (txt.toLowerCase().includes("kids")) dept = "Kids";
        }
    }
    if (!dept) dept = "All";

    // Detect Category from node or name
    let cat = node.category || node.linkValue || node.name;
    if (cat) {
        const foundCat = CATEGORIES.find(c => c.name.toLowerCase() === cat.toLowerCase());
        if (foundCat) {
            cat = foundCat.name;
        } else {
            const nameLower = cat.toLowerCase();
            if (nameLower.includes("bag")) cat = "Bags";
            else if (nameLower.includes("shoe") || nameLower.includes("sneaker") || nameLower.includes("boot")) cat = "Shoes";
            else if (nameLower.includes("t-shirt") || nameLower.includes("polo")) cat = "T-Shirts";
            else if (nameLower.includes("jacket") || nameLower.includes("coat") || nameLower.includes("outerwear")) cat = "Jackets";
            else if (nameLower.includes("denim") || nameLower.includes("trouser") || nameLower.includes("jeans")) cat = "Jeans";
            else if (nameLower.includes("knitwear") || nameLower.includes("hoodie") || nameLower.includes("sweatshirt")) cat = "Hoodies";
            else if (nameLower.includes("dress")) cat = "Dresses";
            else if (nameLower.includes("top")) cat = "Tops";
            else if (nameLower.includes("accessory") || nameLower.includes("wallet") || nameLower.includes("sunglass")) cat = "Accessories";
            else if (nameLower.includes("ready to wear") || nameLower.includes("clothing") || nameLower.includes("swimwear")) cat = "Ready To Wear";
        }
    }

    if (node.linkType === "new_arrivals" || node.name.toLowerCase().includes("new arrival")) {
        window.isNewArrivalsOnly = true;
        activeDepartment = dept;
        activeCategory = "All";
        activeBrand = "All";

        const collectionsGridSec = document.getElementById("collections");
        const newArrivalsSec = document.getElementById("homeNewArrivalsSection");
        const shopSec = document.getElementById("shop-section");
        const backBtnContainer = document.getElementById("backToCollectionsContainer");

        if (collectionsGridSec) collectionsGridSec.style.display = "none";
        if (newArrivalsSec) newArrivalsSec.style.display = "none";
        if (shopSec) shopSec.style.display = "block";
        if (backBtnContainer) backBtnContainer.style.display = "block";

        const shopTitle = document.querySelector("#shop-section .section-title");
        const deptLabel = activeDepartment !== "All" ? ` — ${activeDepartment.toUpperCase()}` : "";
        if (shopTitle) shopTitle.textContent = `NEW ARRIVALS${deptLabel}`;

        syncDepartmentControlsUI();
        renderBrandSlider();
        renderCategoryTags();
        updateWhatsAppPill(activeDepartment);
        renderProducts();
        updateAppURL(true);
    } else if (node.linkType === "url") {
        if (node.url) {
            window.open(node.url, "_blank");
        }
    } else {
        window.isNewArrivalsOnly = false;
        activeDepartment = dept;

        if (cat && cat.toLowerCase() !== "view all" && cat.toLowerCase() !== dept.toLowerCase()) {
            activeCategory = cat;
        } else {
            activeCategory = "All";
        }
        activeBrand = "All";

        const collectionsGridSec = document.getElementById("collections");
        const newArrivalsSec = document.getElementById("homeNewArrivalsSection");
        const shopSec = document.getElementById("shop-section");
        const backBtnContainer = document.getElementById("backToCollectionsContainer");

        if (collectionsGridSec) collectionsGridSec.style.display = "none";
        if (newArrivalsSec) newArrivalsSec.style.display = "none";
        if (shopSec) shopSec.style.display = "block";
        if (backBtnContainer) backBtnContainer.style.display = "block";

        const shopTitle = document.querySelector("#shop-section .section-title");
        if (shopTitle) shopTitle.textContent = "SHOP ALL";

        syncDepartmentControlsUI();
        renderBrandSlider();
        renderCategoryTags();
        updateWhatsAppPill(activeDepartment);
        renderProducts();
        updateAppURL(true);
    }
}

// ==========================================
// VISUAL MENU BUILDER ADMIN EDIT PANEL
// ==========================================

function renderMenuBuilder() {
    renderMenuBuilderColumn(1);
    renderMenuBuilderColumn(2);
    renderMenuBuilderColumn(3);
    renderNodeConfigPanel();
}

function renderMenuBuilderColumn(level) {
    if (level === 1) {
        const container = document.getElementById("builderPane1");
        if (!container) return;
        container.innerHTML = "";
        
        if (NAVIGATION_MENU.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); margin-top: 50px; font-size: 1.2rem;">No root items yet</div>`;
            return;
        }

        NAVIGATION_MENU.forEach((node, index) => {
            const el = createBuilderItemEl(node, index, 1, NAVIGATION_MENU.length);
            container.appendChild(el);
        });
    } else if (level === 2) {
        const container = document.getElementById("builderPane2");
        const addBtn = document.getElementById("builderAddLvl2Btn");
        if (!container || !addBtn) return;
        container.innerHTML = "";

        if (!selectedMenuNodeLvl1) {
            addBtn.disabled = true;
            document.getElementById("builderLvl2Header").textContent = "LEVEL 2: SUB-ITEMS";
            container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); margin-top: 100px; font-size: 1.2rem;">Select a Level 1 item first</div>`;
            return;
        }

        addBtn.disabled = false;
        document.getElementById("builderLvl2Header").textContent = `SUB-ITEMS OF: ${selectedMenuNodeLvl1.name.toUpperCase()}`;

        const children = getNodeEffectiveChildren(selectedMenuNodeLvl1);
        if (children.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); margin-top: 50px; font-size: 1.2rem;">No sub-items yet</div>`;
            return;
        }

        children.forEach((node, index) => {
            const el = createBuilderItemEl(node, index, 2, children.length);
            container.appendChild(el);
        });
    } else if (level === 3) {
        const container = document.getElementById("builderPane3");
        const addBtn = document.getElementById("builderAddLvl3Btn");
        if (!container || !addBtn) return;
        container.innerHTML = "";

        if (!selectedMenuNodeLvl2) {
            addBtn.disabled = true;
            document.getElementById("builderLvl3Header").textContent = "LEVEL 3: LEAF ITEMS";
            container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); margin-top: 100px; font-size: 1.2rem;">Select a Level 2 item first</div>`;
            return;
        }

        addBtn.disabled = false;
        document.getElementById("builderLvl3Header").textContent = `LEAF ITEMS OF: ${selectedMenuNodeLvl2.name.toUpperCase()}`;

        const children = getNodeEffectiveChildren(selectedMenuNodeLvl2);
        if (children.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); margin-top: 50px; font-size: 1.2rem;">No leaf items yet</div>`;
            return;
        }

        children.forEach((node, index) => {
            const el = createBuilderItemEl(node, index, 3, children.length);
            container.appendChild(el);
        });
    }
}

function createBuilderItemEl(node, index, level, total) {
    const div = document.createElement("div");
    div.classList.add("menu-builder-item");
    if (activeSelectedNode && activeSelectedNode.id === node.id) {
        div.classList.add("active");
    }

    div.onclick = (e) => {
        if (e.target.closest("button")) return;
        selectMenuBuilderNode(node, level);
    };

    const nodeIdentifier = node.id || node.name;

    div.innerHTML = `
        <span style="font-size: 1.2rem; font-weight: 600; letter-spacing: 0.05em;">${node.name}</span>
        <div class="menu-node-actions">
            <button onclick="event.stopPropagation(); moveMenuNode('${nodeIdentifier}', ${level}, 'up')" class="menu-node-btn" title="Move Up" ${index === 0 ? 'disabled style="opacity: 0.2;"' : ''}><i class="fa-solid fa-arrow-up"></i></button>
            <button onclick="event.stopPropagation(); moveMenuNode('${nodeIdentifier}', ${level}, 'down')" class="menu-node-btn" title="Move Down" ${index === total - 1 ? 'disabled style="opacity: 0.2;"' : ''}><i class="fa-solid fa-arrow-down"></i></button>
            <button onclick="event.stopPropagation(); deleteMenuNode('${nodeIdentifier}', ${level})" class="menu-node-btn delete-btn" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    `;

    return div;
}

function selectMenuBuilderNode(node, level) {
    activeSelectedNode = node;

    if (level === 1) {
        selectedMenuNodeLvl1 = node;
        selectedMenuNodeLvl2 = null;
        selectedMenuNodeLvl3 = null;
    } else if (level === 2) {
        selectedMenuNodeLvl2 = node;
        selectedMenuNodeLvl3 = null;
    } else if (level === 3) {
        selectedMenuNodeLvl3 = node;
    }

    renderMenuBuilder();
}

function saveNavigationMenuToStorage() {
    try {
        localStorage.setItem("styluxe_custom_nav_menu", JSON.stringify(NAVIGATION_MENU));
        localStorage.setItem("styluxe_nav_user_saved", JSON.stringify(NAVIGATION_MENU));
        localStorage.setItem("styluxe_nav_menu", JSON.stringify(NAVIGATION_MENU));
    } catch(e){}
    renderPradaDrawerMenu();
}

function addMenuNode(level) {
    const id = "node_" + Math.random().toString(36).substr(2, 9);
    const newNode = {
        id: id,
        name: "New Link Item",
        linkType: "none",
        children: []
    };

    if (level === 1) {
        NAVIGATION_MENU.push(newNode);
        selectMenuBuilderNode(newNode, 1);
    } else if (level === 2) {
        if (!selectedMenuNodeLvl1) return;
        if (!selectedMenuNodeLvl1.children) selectedMenuNodeLvl1.children = [];
        selectedMenuNodeLvl1.children.push(newNode);
        selectedMenuNodeLvl1._hasUserSavedChildren = true;
        selectMenuBuilderNode(newNode, 2);
    } else if (level === 3) {
        if (!selectedMenuNodeLvl2) return;
        if (!selectedMenuNodeLvl2.children) selectedMenuNodeLvl2.children = [];
        selectedMenuNodeLvl2.children.push(newNode);
        selectedMenuNodeLvl2._hasUserSavedChildren = true;
        selectMenuBuilderNode(newNode, 3);
    }
    saveNavigationMenuToStorage();
    renderMenuBuilder();
}

function deleteMenuNode(nodeId, level) {
    if (level === 1) {
        NAVIGATION_MENU = NAVIGATION_MENU.filter(node => node.id !== nodeId && String(node.id) !== String(nodeId) && (node.name || "").toLowerCase() !== String(nodeId).toLowerCase());
        selectedMenuNodeLvl1 = null;
        selectedMenuNodeLvl2 = null;
        selectedMenuNodeLvl3 = null;
        activeSelectedNode = null;
    } else if (level === 2) {
        if (selectedMenuNodeLvl1) {
            let children = getNodeEffectiveChildren(selectedMenuNodeLvl1);

            const targetNode = children.find(node => String(node.id) === String(nodeId) || (node.name || "").toLowerCase() === String(nodeId).toLowerCase());
            const targetName = targetNode ? targetNode.name : String(nodeId);

            const remainingChildren = children.filter(node => String(node.id) !== String(nodeId) && (node.name || "").toLowerCase() !== targetName.toLowerCase());

            selectedMenuNodeLvl1.children = remainingChildren;
            selectedMenuNodeLvl1._hasUserSavedChildren = true;

            selectedMenuNodeLvl2 = null;
            selectedMenuNodeLvl3 = null;
            activeSelectedNode = null;

            if (Array.isArray(CATEGORIES)) {
                CATEGORIES = CATEGORIES.filter(c => (c.name || "").toLowerCase() !== targetName.toLowerCase());
                try {
                    localStorage.setItem("styluxe_categories", JSON.stringify(CATEGORIES));
                    localStorage.setItem("styluxe_categories_cache", JSON.stringify(CATEGORIES));
                    localStorage.setItem("styluxe_categories_user_saved", JSON.stringify(CATEGORIES));
                } catch(e){}
            }
        }
    } else if (level === 3) {
        if (selectedMenuNodeLvl2) {
            let children = getNodeEffectiveChildren(selectedMenuNodeLvl2);

            const targetNode = children.find(node => String(node.id) === String(nodeId) || (node.name || "").toLowerCase() === String(nodeId).toLowerCase());
            const targetName = targetNode ? targetNode.name : String(nodeId);

            const remainingChildren = children.filter(node => String(node.id) !== String(nodeId) && (node.name || "").toLowerCase() !== targetName.toLowerCase());

            selectedMenuNodeLvl2.children = remainingChildren;
            selectedMenuNodeLvl2._hasUserSavedChildren = true;

            selectedMenuNodeLvl3 = null;
            activeSelectedNode = null;
        }
    }

    saveNavigationMenuToStorage();
    if (typeof updateCategoriesDatalist === "function") updateCategoriesDatalist();
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof renderAdminCategories === "function") renderAdminCategories();
    if (typeof renderProducts === "function") renderProducts();
    renderMenuBuilder();
}

function moveMenuNode(nodeId, level, direction) {
    let list = [];
    if (level === 1) {
        list = NAVIGATION_MENU;
    } else if (level === 2) {
        list = selectedMenuNodeLvl1 ? selectedMenuNodeLvl1.children : [];
    } else if (level === 3) {
        list = selectedMenuNodeLvl2 ? selectedMenuNodeLvl2.children : [];
    }

    const index = list.findIndex(node => node.id === nodeId);
    if (index === -1) return;

    if (direction === "up" && index > 0) {
        const temp = list[index];
        list[index] = list[index - 1];
        list[index - 1] = temp;
    } else if (direction === "down" && index < list.length - 1) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
    }

    saveNavigationMenuToStorage();
    renderMenuBuilder();
}

function renderNodeConfigPanel() {
    const panel = document.getElementById("nodeEditorPanel");
    if (!panel) return;

    if (!activeSelectedNode) {
        panel.style.display = "none";
        return;
    }

    panel.style.display = "block";
    document.getElementById("nodeNameInput").value = activeSelectedNode.name || "";
    document.getElementById("nodeLinkTypeSelect").value = activeSelectedNode.linkType || "none";
    document.getElementById("nodeUrlInput").value = activeSelectedNode.url || "";
    
    if (activeSelectedNode.department) {
        document.getElementById("nodeDeptSelect").value = activeSelectedNode.department;
    } else {
        document.getElementById("nodeDeptSelect").selectedIndex = 0;
    }

    populateNodeConfigCategoryOptions();
    onNodeLinkTypeChange(activeSelectedNode.linkType || "none");
}

function populateNodeConfigCategoryOptions() {
    const select = document.getElementById("nodeCatSelect");
    if (!select) return;

    select.innerHTML = "";

    const deptEl = document.getElementById("nodeDeptSelect");
    const dept = deptEl ? deptEl.value : "All";
    
    // Combine categories from CATEGORIES array and PRODUCTS array
    const catMap = new Map();

    const addCat = (name, d) => {
        if (!name || typeof name !== 'string') return;
        const trimmed = name.trim();
        if (!trimmed) return;
        const key = `${trimmed.toLowerCase()}_${(d || 'all').toLowerCase()}`;
        if (!catMap.has(key)) {
            catMap.set(key, { name: trimmed, department: d || 'All' });
        }
    };

    // EXCLUSIVELY user categories in CATEGORIES tab
    if (Array.isArray(CATEGORIES)) {
        CATEGORIES.forEach(c => addCat(c.name, c.department));
    }

    const allCats = Array.from(catMap.values());
    const deptNorm = (dept || "").trim().toLowerCase();

    let filteredCats = allCats;
    if (deptNorm && deptNorm !== "all" && deptNorm !== "global") {
        filteredCats = allCats.filter(c => {
            const dNorm = (c.department || "").trim().toLowerCase();
            return !dNorm || dNorm === "all" || dNorm === "global" || dNorm === deptNorm;
        });
    }

    // If department filtering yields 0 categories, fallback to all available categories
    if (filteredCats.length === 0) {
        filteredCats = allCats;
    }

    // Deduplicate names for clean dropdown display
    const uniqueNames = [];
    const nameSet = new Set();
    filteredCats.forEach(c => {
        const u = c.name.toUpperCase();
        if (!nameSet.has(u)) {
            nameSet.add(u);
            uniqueNames.push(c.name);
        }
    });

    // Ensure selected node's category is included
    if (activeSelectedNode && activeSelectedNode.category && activeSelectedNode.category !== "All") {
        const activeCatUpper = activeSelectedNode.category.toUpperCase();
        if (!nameSet.has(activeCatUpper)) {
            uniqueNames.push(activeSelectedNode.category);
            nameSet.add(activeCatUpper);
        }
    }

    const optAll = document.createElement("option");
    optAll.value = "All";
    optAll.textContent = "All Categories";
    select.appendChild(optAll);

    uniqueNames.forEach(catName => {
        const opt = document.createElement("option");
        opt.value = catName;
        opt.textContent = catName.toUpperCase();
        select.appendChild(opt);
    });

    if (activeSelectedNode && activeSelectedNode.category) {
        const foundOpt = Array.from(select.options).find(o => o.value.toLowerCase() === activeSelectedNode.category.toLowerCase());
        if (foundOpt) {
            select.value = foundOpt.value;
        } else {
            select.value = activeSelectedNode.category;
        }
    }
}

function onNodeLinkTypeChange(type) {
    document.getElementById("nodeDeptGroup").style.display = (type === "department" || type === "category") ? "block" : "none";
    document.getElementById("nodeCatGroup").style.display = (type === "category") ? "block" : "none";
    document.getElementById("nodeUrlGroup").style.display = (type === "url") ? "block" : "none";

    if (activeSelectedNode) {
        activeSelectedNode.linkType = type;
    }
}

function updateSelectedNodeProp(prop, value) {
    if (!activeSelectedNode) return;
    activeSelectedNode[prop] = value;

    if (prop === "name") {
        if (selectedMenuNodeLvl1 && selectedMenuNodeLvl1.id === activeSelectedNode.id) {
            renderMenuBuilderColumn(1);
        } else if (selectedMenuNodeLvl2 && selectedMenuNodeLvl2.id === activeSelectedNode.id) {
            renderMenuBuilderColumn(2);
        } else if (selectedMenuNodeLvl3 && selectedMenuNodeLvl3.id === activeSelectedNode.id) {
            renderMenuBuilderColumn(3);
        }
    }

    // Instantly sync external Prada Side Drawer menu in real-time!
    renderPradaDrawerMenu();
}

async function saveMenuBuilderData() {
    try {
        // Save locally to browser localStorage as instant persistent backup across all keys
        try {
            localStorage.setItem("styluxe_custom_nav_menu", JSON.stringify(NAVIGATION_MENU));
            localStorage.setItem("styluxe_nav_user_saved", JSON.stringify(NAVIGATION_MENU));
            localStorage.setItem("styluxe_nav_menu", JSON.stringify(NAVIGATION_MENU));
        } catch(e){}

        const res = await fetch('/api/navigation-menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NAVIGATION_MENU)
        }).catch(() => null);

        if (res && res.ok) {
            const savedServerMenu = await res.json();
            if (Array.isArray(savedServerMenu)) {
                NAVIGATION_MENU = savedServerMenu;
                try {
                    localStorage.setItem("styluxe_custom_nav_menu", JSON.stringify(savedServerMenu));
                    localStorage.setItem("styluxe_nav_user_saved", JSON.stringify(savedServerMenu));
                    localStorage.setItem("styluxe_nav_menu", JSON.stringify(savedServerMenu));
                } catch(e){}
            }
        }
        
        renderPradaDrawerMenu();
        renderMenuBuilder();
        if (typeof showSuccessModal === "function") {
            showSuccessModal("تم حفظ ترتيب الفئات والقائمة الجانبية بنجاح!");
        }
    } catch(err) {
        console.error("Save navigation menu error:", err);
        renderPradaDrawerMenu();
        renderMenuBuilder();
        if (typeof showSuccessModal === "function") {
            showSuccessModal("تم حفظ ترتيب الفئات والقائمة الجانبية بنجاح!");
        }
    }
}

// --------------------------------------------------------------------------
// HOMEPAGE CATEGORY CARDS ADMIN MANAGEMENT
// --------------------------------------------------------------------------
let editingHomeCardId = null;

function renderAdminHomeCardsTable() {
    const tbody = document.getElementById("adminHomeCardsTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!HOMEPAGE_CATEGORY_CARDS || HOMEPAGE_CATEGORY_CARDS.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">No homepage cards found.</td></tr>`;
        return;
    }

    HOMEPAGE_CATEGORY_CARDS.forEach(card => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong style="color: var(--color-accent); font-size: 1.2rem;">${card.dept}</strong></td>
            <td><img src="${card.image || 'assets/category_bags.png'}" alt="${card.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid var(--color-border);"></td>
            <td><strong style="font-size: 1.2rem;">${card.title}</strong></td>
            <td><span style="background: rgba(255,255,255,0.05); padding: 0.3rem 0.8rem; border-radius: 4px;">${card.category}</span></td>
            <td style="text-align: center;">
                <button class="edit-btn" onclick="openEditHomeCardModal('${card.id}')" style="margin-right: 0.8rem; background: none; border: 1px solid var(--color-border); color: var(--color-accent); padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: 600;"><i class="fa-solid fa-pen-to-square"></i> EDIT</button>
                <button class="delete-btn" onclick="deleteHomeCard('${card.id}')" style="background: none; border: 1px solid rgba(231,76,60,0.3); color: #e74c3c; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: 600;"><i class="fa-solid fa-trash-can"></i> DELETE</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openAddHomeCardModal() {
    if (!currentAdminStaff) {
        openAdminLoginModal();
        return;
    }
    if (adminPanelOverlay && !adminPanelOverlay.classList.contains("active")) {
        initAdminDashboard();
    }
    if (typeof switchAdminTab === "function") {
        switchAdminTab('home_cards', false);
    }

    editingHomeCardId = null;
    const titleEl = document.getElementById("homeCardModalTitle");
    if (titleEl) titleEl.textContent = "ADD HOMEPAGE CATEGORY CARD";
    const form = document.getElementById("homeCardForm");
    if (form) form.reset();
    const preview = document.getElementById("homeCardImgPreview");
    if (preview) preview.style.display = "none";

    const backdrop = document.getElementById("homeCardModalBackdrop");
    if (backdrop) {
        backdrop.style.display = "flex";
        backdrop.classList.add("active");
    }
}

function closeHomeCardModal() {
    const backdrop = document.getElementById("homeCardModalBackdrop");
    if (backdrop) {
        backdrop.style.display = "none";
        backdrop.classList.remove("active");
    }
}

function openEditHomeCardModal(cardId) {
    if (!currentAdminStaff) {
        openAdminLoginModal();
        return;
    }
    if (adminPanelOverlay && !adminPanelOverlay.classList.contains("active")) {
        initAdminDashboard();
    }
    if (typeof switchAdminTab === "function") {
        switchAdminTab('home_cards', false);
    }

    const card = HOMEPAGE_CATEGORY_CARDS.find(c => String(c.id) === String(cardId));
    if (!card) return;

    editingHomeCardId = card.id;
    const titleEl = document.getElementById("homeCardModalTitle");
    if (titleEl) titleEl.textContent = "EDIT HOMEPAGE CATEGORY CARD";
    const deptEl = document.getElementById("homeCardDept");
    if (deptEl) deptEl.value = card.dept;
    const titleInput = document.getElementById("homeCardTitle");
    if (titleInput) titleInput.value = card.title;
    const catInput = document.getElementById("homeCardCategory");
    if (catInput) catInput.value = card.category;
    const urlInput = document.getElementById("homeCardImgUrl");
    if (urlInput) urlInput.value = card.image || "";

    const fileInput = document.getElementById("homeCardImgFile");
    if (fileInput) fileInput.value = "";

    const preview = document.getElementById("homeCardImgPreview");
    if (preview) {
        const previewImg = preview.querySelector("img");
        if (previewImg) previewImg.src = card.image || "";
        preview.style.display = card.image ? "block" : "none";
    }

    const backdrop = document.getElementById("homeCardModalBackdrop");
    if (backdrop) {
        backdrop.style.display = "flex";
        backdrop.classList.add("active");
    }
}

function deleteHomeCard(cardId) {
    if (!currentAdminStaff) {
        alert("Action restricted to administrators only.");
        return;
    }
    if (!confirm("Are you sure you want to delete this category card?")) return;
    HOMEPAGE_CATEGORY_CARDS = HOMEPAGE_CATEGORY_CARDS.filter(c => String(c.id) !== String(cardId));
    saveHomepageCardsToStorage();
    renderAdminHomeCardsTable();
    updateHomeDeptGridSilently('Women');
}

function updateHomeDeptGridSilently(dept) {
    const grid = document.getElementById("homepageCategoryGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const deptCards = HOMEPAGE_CATEGORY_CARDS.filter(c => c.dept && c.dept.toLowerCase() === (dept || 'women').toLowerCase());

    if (deptCards.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 3rem; font-size: 1.4rem;">No category cards added for ${dept} yet.</div>`;
        return;
    }

    deptCards.forEach(card => {
        const cardEl = document.createElement("div");
        cardEl.classList.add("collection-card");
        cardEl.style.position = "relative";
        cardEl.onclick = () => {
            filterByDepartment(card.dept);
            filterByCategory(card.category);
        };

        cardEl.innerHTML = `
            <div class="collection-card-img-wrapper"><img src="${card.image || 'assets/category_bags.png'}" alt="${card.title}"></div>
            <h3 class="collection-card-title">${card.title}</h3>
        `;
        grid.appendChild(cardEl);
    });
}

async function handleSaveHomeCard(event) {
    event.preventDefault();
    if (!currentAdminStaff) {
        alert("Action restricted to administrators only.");
        return;
    }

    const dept = document.getElementById("homeCardDept").value;
    const title = document.getElementById("homeCardTitle").value;
    const category = document.getElementById("homeCardCategory").value;
    const urlInput = document.getElementById("homeCardImgUrl").value.trim();
    const fileInput = document.getElementById("homeCardImgFile");

    let existingCard = editingHomeCardId ? HOMEPAGE_CATEGORY_CARDS.find(c => String(c.id) === String(editingHomeCardId)) : null;
    let imgPath = urlInput || (existingCard ? existingCard.image : 'assets/category_bags.png');

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        imgPath = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    if (editingHomeCardId) {
        const idx = HOMEPAGE_CATEGORY_CARDS.findIndex(c => String(c.id) === String(editingHomeCardId));
        if (idx !== -1) {
            HOMEPAGE_CATEGORY_CARDS[idx] = { id: editingHomeCardId, dept, title, category, image: imgPath };
        }
    } else {
        const newId = 'card_' + Date.now();
        HOMEPAGE_CATEGORY_CARDS.push({ id: newId, dept, title, category, image: imgPath });
    }

    saveHomepageCardsToStorage();
    renderAdminHomeCardsTable();
    closeHomeCardModal();
    updateHomeDeptGridSilently(dept);
}



// ==========================================================================
// ADMIN IMAGE PREVIEW LIGHTBOX MODAL HANDLERS
// ==========================================================================
function openAdminImagePreview(src, title) {
    if (!src) return;
    let modal = document.getElementById("adminImagePreviewModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "adminImagePreviewModal";
        modal.className = "admin-image-preview-modal";
        modal.innerHTML = `
            <div class="admin-image-preview-backdrop" onclick="closeAdminImagePreview()"></div>
            <div class="admin-image-preview-content">
                <button class="admin-image-preview-close" onclick="closeAdminImagePreview()" title="Close Preview"><i class="fa-solid fa-xmark"></i></button>
                <img id="adminPreviewImg" src="" alt="Preview">
                <div id="adminPreviewCaption" class="admin-image-preview-caption"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    const imgEl = document.getElementById("adminPreviewImg");
    const captionEl = document.getElementById("adminPreviewCaption");
    if (imgEl) imgEl.src = src;
    if (captionEl) captionEl.textContent = title || "Image Preview";
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
}

function closeAdminImagePreview() {
    const modal = document.getElementById("adminImagePreviewModal");
    if (modal) {
        modal.classList.remove("active");
        setTimeout(() => { modal.style.display = "none"; }, 200);
    }
}

window.openAdminImagePreview = openAdminImagePreview;
window.closeAdminImagePreview = closeAdminImagePreview;


// ==========================================================================
// GLOBAL EVENT DELEGATION FOR ADMIN THUMBNAIL IMAGE PREVIEW
// ==========================================================================
document.addEventListener("click", function(e) {
    const img = e.target.closest("#adminProductsTableBody img, .admin-table img, td img, .admin-prod-thumb");
    if (img && img.src && !img.closest(".admin-image-preview-modal")) {
        const src = img.src;
        const alt = img.alt || "Image Preview";
        if (typeof openAdminImagePreview === "function") {
            openAdminImagePreview(src, alt);
        }
    }
}, true);


// ==========================================================================
// AUTOMATIC CATEGORY & SUBCATEGORY SYNC HANDLER
// ==========================================================================
function syncNavigationWithCategories() {
    if (!Array.isArray(CATEGORIES)) return;

    // Save categories to local storage for offline / static client persistence
    try {
        localStorage.setItem("styluxe_categories", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_cache", JSON.stringify(CATEGORIES));
    } catch (e) {}

    // Group categories by department and parent-child hierarchy
    const departments = ["WOMEN", "MEN", "KIDS"];
    
    departments.forEach(deptName => {
        let deptNode = NAVIGATION_MENU.find(n => (n.name || "").toUpperCase() === deptName);
        if (!deptNode) {
            deptNode = { name: deptName, children: [] };
            NAVIGATION_MENU.push(deptNode);
        }

        if (!Array.isArray(deptNode.children)) {
            deptNode.children = [];
        }

        // Get all root categories for this department
        const rootCats = CATEGORIES.filter(c => !c.parentId && c.department && c.department.toUpperCase() === deptName);

        rootCats.forEach(parentCat => {
            let parentNode = deptNode.children.find(n => (n.name || "").toUpperCase() === parentCat.name.toUpperCase());
            if (!parentNode) {
                parentNode = { name: parentCat.name.toUpperCase(), children: [] };
                deptNode.children.push(parentNode);
            }

            if (!Array.isArray(parentNode.children)) {
                parentNode.children = [];
            }

            // Find all subcategories belonging to this parent category
            const subCats = CATEGORIES.filter(c => c.parentId === parentCat.id);
            subCats.forEach(subCat => {
                const subName = subCat.name.toUpperCase();
                const exists = parentNode.children.some(c => (c.name || "").toUpperCase() === subName);
                if (!exists) {
                    parentNode.children.push({ name: subName, linkType: "category", category: subCat.name });
                }
            });
        });
    });

    // Save custom nav menu
    try {
        localStorage.setItem("styluxe_custom_nav_menu", JSON.stringify(NAVIGATION_MENU));
    } catch(e) {}

    // Re-render Prada Drawer Menu
    if (typeof renderPradaDrawerMenu === "function") {
        renderPradaDrawerMenu();
    }
}

function onCategoriesUpdated() {
    try {
        localStorage.setItem("styluxe_categories", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_categories_user_saved", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_user_has_modified_db", "true");
    } catch(e){}

    if (typeof saveAllUserDataLocally === "function") saveAllUserDataLocally();
    syncNavigationWithCategories();

    if (typeof updateCategoriesDatalist === "function") updateCategoriesDatalist();
    if (typeof renderCategoryTags === "function") renderCategoryTags();
    if (typeof renderAdminCategories === "function") renderAdminCategories();
    if (typeof renderAdminProducts === "function") renderAdminProducts();
    if (typeof renderNodeConfigPanel === "function") renderNodeConfigPanel();
}

window.syncNavigationWithCategories = syncNavigationWithCategories;
window.onCategoriesUpdated = onCategoriesUpdated;


// ==========================================================================
// FULL LUXURY PRESET NAVIGATION MENU (COMPLETE 3-LEVEL CATALOG)
// ==========================================================================
DEFAULT_NAVIGATION_MENU = [
    {
        id: "men",
        name: "MEN",
        department: "Men",
        children: [
            {
                id: "men_new_arrivals",
                name: "NEW ARRIVALS",
                linkType: "new_arrivals",
                department: "Men",
                children: [
                    { id: "men_new_season", name: "New Season Arrivals", linkType: "category", category: "Ready To Wear" },
                    { id: "men_iconic_archives", name: "Iconic Archives", linkType: "category", category: "Ready To Wear" },
                    { id: "men_best_sellers", name: "Best Sellers", linkType: "category", category: "T-Shirts" }
                ]
            },
            {
                id: "men_ready_to_wear",
                name: "READY TO WEAR",
                department: "Men",
                children: [
                    { id: "men_tshirts", name: "T-SHIRTS AND POLO SHIRTS", linkType: "category", category: "T-Shirts" },
                    { id: "men_shirts", name: "SHIRTS", linkType: "category", category: "Shirts" },
                    { id: "men_jackets", name: "JACKETS AND COATS", linkType: "category", category: "Jackets" },
                    { id: "men_outerwear", name: "OUTERWEAR", linkType: "category", category: "Jackets" },
                    { id: "men_denim", name: "DENIM & JEANS", linkType: "category", category: "Jeans" },
                    { id: "men_knitwear", name: "KNITWEAR & SWEATERS", linkType: "category", category: "Hoodies" },
                    { id: "men_trousers", name: "TROUSERS AND BERMUDAS", linkType: "category", category: "Jeans" },
                    { id: "men_jogging", name: "JOGGING SUITS AND SWEATSHIRTS", linkType: "category", category: "Hoodies" },
                    { id: "men_swimwear", name: "SWIMWEAR", linkType: "category", category: "Ready To Wear" },
                    { id: "men_leather_clothing", name: "LEATHER CLOTHING", linkType: "category", category: "Jackets" }
                ]
            },
            {
                id: "men_bags",
                name: "BAGS",
                department: "Men",
                children: [
                    { id: "men_backpacks", name: "BACKPACKS", linkType: "category", category: "Bags" },
                    { id: "men_briefcases", name: "BRIEF CASES & WORK BAGS", linkType: "category", category: "Bags" },
                    { id: "men_crossbody", name: "CROSSBODY & SHOULDER BAGS", linkType: "category", category: "Bags" },
                    { id: "men_totes", name: "TOTES & SHOPPERS", linkType: "category", category: "Bags" },
                    { id: "men_travel_bags", name: "TRAVEL & DUFFEL BAGS", linkType: "category", category: "Bags" },
                    { id: "men_pouches", name: "POUCHES & CLUTCHES", linkType: "category", category: "Bags" }
                ]
            },
            {
                id: "men_shoes",
                name: "SHOES",
                department: "Men",
                children: [
                    { id: "men_sneakers", name: "SNEAKERS", linkType: "category", category: "Shoes" },
                    { id: "men_loafers", name: "LOAFERS & DRIVERS", linkType: "category", category: "Shoes" },
                    { id: "men_boots", name: "BOOTS & ANKLE BOOTS", linkType: "category", category: "Shoes" },
                    { id: "men_formal_shoes", name: "LACE-UPS & FORMAL SHOES", linkType: "category", category: "Shoes" },
                    { id: "men_sandals", name: "SANDALS & SLIDES", linkType: "category", category: "Shoes" }
                ]
            },
            {
                id: "men_small_leather",
                name: "SMALL LEATHER GOODS",
                department: "Men",
                children: [
                    { id: "men_wallets", name: "WALLETS & CARD HOLDERS", linkType: "category", category: "Accessories" },
                    { id: "men_keychains", name: "KEY CHAINS & KEY CASES", linkType: "category", category: "Accessories" },
                    { id: "men_passport", name: "PASSPORT HOLDERS", linkType: "category", category: "Accessories" }
                ]
            },
            {
                id: "men_accessories",
                name: "ACCESSORIES",
                department: "Men",
                children: [
                    { id: "men_belts", name: "BELTS", linkType: "category", category: "Accessories" },
                    { id: "men_sunglasses", name: "SUNGLASSES & EYEWEAR", linkType: "category", category: "Accessories" },
                    { id: "men_hats", name: "HATS & CAPS", linkType: "category", category: "Accessories" },
                    { id: "men_scarves", name: "SCARVES & GLOVES", linkType: "category", category: "Accessories" },
                    { id: "men_jewelry", name: "JEWELRY & CUFFLINKS", linkType: "category", category: "Accessories" },
                    { id: "men_perfumes", name: "PERFUMES & FRAGRANCES", linkType: "category", category: "Accessories" }
                ]
            },
            {
                id: "men_travel",
                name: "TRAVEL",
                department: "Men",
                children: [
                    { id: "men_suitcases", name: "SUITCASES & TROLLEYS", linkType: "category", category: "Bags" },
                    { id: "men_travel_acc", name: "TRAVEL ACCESSORIES", linkType: "category", category: "Accessories" }
                ]
            }
        ]
    },
    {
        id: "women",
        name: "WOMEN",
        department: "Women",
        children: [
            {
                id: "women_new_arrivals",
                name: "NEW ARRIVALS",
                linkType: "new_arrivals",
                department: "Women",
                children: [
                    { id: "women_new_season", name: "New Season Arrivals", linkType: "category", category: "Ready To Wear" },
                    { id: "women_runway", name: "Runway Archives", linkType: "category", category: "Dresses" },
                    { id: "women_most_wanted", name: "Most Wanted", linkType: "category", category: "Bags" }
                ]
            },
            {
                id: "women_ready_to_wear",
                name: "READY TO WEAR",
                department: "Women",
                children: [
                    { id: "women_dresses", name: "DRESSES & GOWNS", linkType: "category", category: "Dresses" },
                    { id: "women_tops", name: "TOPS & SHIRTS", linkType: "category", category: "Tops" },
                    { id: "women_tshirts", name: "T-SHIRTS & POLOS", linkType: "category", category: "T-Shirts" },
                    { id: "women_blazers", name: "JACKETS & BLAZERS", linkType: "category", category: "Jackets" },
                    { id: "women_coats", name: "COATS & OUTERWEAR", linkType: "category", category: "Jackets" },
                    { id: "women_denim", name: "DENIM & JEANS", linkType: "category", category: "Jeans" },
                    { id: "women_knitwear", name: "KNITWEAR & CARDIGANS", linkType: "category", category: "Hoodies" },
                    { id: "women_skirts", name: "SKIRTS & SHORTS", linkType: "category", category: "Ready To Wear" },
                    { id: "women_pants", name: "PANTS & TROUSERS", linkType: "category", category: "Jeans" },
                    { id: "women_swimwear", name: "SWIMWEAR & BEACHWEAR", linkType: "category", category: "Ready To Wear" }
                ]
            },
            {
                id: "women_bags",
                name: "BAGS",
                department: "Women",
                children: [
                    { id: "women_handbags", name: "HANDBAGS & TOP HANDLES", linkType: "category", category: "Bags" },
                    { id: "women_shoulder_bags", name: "SHOULDER & CROSSBODY BAGS", linkType: "category", category: "Bags" },
                    { id: "women_totes", name: "TOTES & SHOPPERS", linkType: "category", category: "Bags" },
                    { id: "women_mini_bags", name: "MINI BAGS & MICRO BAGS", linkType: "category", category: "Bags" },
                    { id: "women_clutches", name: "CLUTCHES & EVENING BAGS", linkType: "category", category: "Bags" },
                    { id: "women_backpacks", name: "BACKPACKS", linkType: "category", category: "Bags" }
                ]
            },
            {
                id: "women_shoes",
                name: "SHOES",
                department: "Women",
                children: [
                    { id: "women_sneakers", name: "SNEAKERS", linkType: "category", category: "Shoes" },
                    { id: "women_pumps", name: "PUMPS & HIGH HEELS", linkType: "category", category: "Shoes" },
                    { id: "women_sandals", name: "SANDALS & MULES", linkType: "category", category: "Shoes" },
                    { id: "women_boots", name: "BOOTS & ANKLE BOOTS", linkType: "category", category: "Shoes" },
                    { id: "women_flats", name: "LOAFERS & FLATS", linkType: "category", category: "Shoes" }
                ]
            },
            {
                id: "women_accessories",
                name: "ACCESSORIES",
                department: "Women",
                children: [
                    { id: "women_wallets", name: "WALLETS & SMALL LEATHER GOODS", linkType: "category", category: "Accessories" },
                    { id: "women_belts", name: "BELTS", linkType: "category", category: "Accessories" },
                    { id: "women_sunglasses", name: "SUNGLASSES & EYEWEAR", linkType: "category", category: "Accessories" },
                    { id: "women_hats", name: "HATS & HAIR ACCESSORIES", linkType: "category", category: "Accessories" },
                    { id: "women_scarves", name: "SCARVES & SILK SQUARES", linkType: "category", category: "Accessories" },
                    { id: "women_jewelry", name: "FINE & FASHION JEWELRY", linkType: "category", category: "Accessories" },
                    { id: "women_beauty", name: "FRAGRANCES & BEAUTY", linkType: "category", category: "Accessories" }
                ]
            }
        ]
    },
    {
        id: "kids",
        name: "KIDS",
        department: "Kids",
        children: [
            {
                id: "kids_boys",
                name: "BOYS (2-14 YRS)",
                department: "Kids",
                children: [
                    { id: "boys_rtw", name: "Ready to Wear", linkType: "category", category: "T-Shirts" },
                    { id: "boys_outerwear", name: "Outerwear & Jackets", linkType: "category", category: "Jackets" },
                    { id: "boys_shoes", name: "Shoes & Sneakers", linkType: "category", category: "Shoes" },
                    { id: "boys_accessories", name: "Accessories", linkType: "category", category: "Accessories" }
                ]
            },
            {
                id: "kids_girls",
                name: "GIRLS (2-14 YRS)",
                department: "Kids",
                children: [
                    { id: "girls_dresses", name: "Dresses & Tops", linkType: "category", category: "Dresses" },
                    { id: "girls_outerwear", name: "Outerwear & Jackets", linkType: "category", category: "Jackets" },
                    { id: "girls_shoes", name: "Shoes & Ballerinas", linkType: "category", category: "Shoes" },
                    { id: "girls_accessories", name: "Accessories", linkType: "category", category: "Accessories" }
                ]
            },
            {
                id: "kids_baby",
                name: "BABY (0-24 MOS)",
                department: "Kids",
                children: [
                    { id: "baby_boys", name: "Baby Boys Clothes", linkType: "category", category: "Ready To Wear" },
                    { id: "baby_girls", name: "Baby Girls Clothes", linkType: "category", category: "Ready To Wear" },
                    { id: "baby_gifts", name: "Gift Sets & Accessories", linkType: "category", category: "Accessories" }
                ]
            }
        ]
    }
];

function resetNavigationMenuToFullPreset() {
    if (!confirm("LOAD FULL LUXURY PRESET MENU CATALOG? THIS WILL POPULATE ALL 3-LEVEL CATEGORIES FOR MEN, WOMEN & KIDS.")) return;

    NAVIGATION_MENU = JSON.parse(JSON.stringify(DEFAULT_NAVIGATION_MENU));
    try {
        localStorage.setItem("styluxe_custom_nav_menu", JSON.stringify(NAVIGATION_MENU));
    } catch(e){}

    if (typeof syncNavigationWithCategories === "function") syncNavigationWithCategories();
    if (typeof renderPradaDrawerMenu === "function") renderPradaDrawerMenu();
    if (typeof renderMenuBuilder === "function") renderMenuBuilder();

    alert("FULL LUXURY PRESET MENU SUCCESSFULLY LOADED!");
}

window.DEFAULT_NAVIGATION_MENU = DEFAULT_NAVIGATION_MENU;
window.resetNavigationMenuToFullPreset = resetNavigationMenuToFullPreset;


// ==========================================================================
// ABSOLUTE PERMANENT LOCAL PERSISTENCE SYSTEM
// ==========================================================================
function saveAllUserDataLocally() {
    try {
        localStorage.setItem("styluxe_products_user_saved", JSON.stringify(PRODUCTS));
        localStorage.setItem("styluxe_categories_user_saved", JSON.stringify(CATEGORIES));
        localStorage.setItem("styluxe_brands_user_saved", JSON.stringify(BRANDS));
        localStorage.setItem("styluxe_nav_user_saved", JSON.stringify(NAVIGATION_MENU));
        localStorage.setItem("styluxe_user_has_modified_db", "true");
    } catch(e){}
}
window.saveAllUserDataLocally = saveAllUserDataLocally;

function resetStoreToFactoryDefaults() {
    if (!confirm("ARE YOU SURE YOU WANT TO RESET ALL PRODUCTS, CATEGORIES AND MENUS TO FACTORY DEFAULTS? ALL CUSTOM CHANGES WILL BE ERASED.")) return;
    localStorage.removeItem("styluxe_products_user_saved");
    localStorage.removeItem("styluxe_categories_user_saved");
    localStorage.removeItem("styluxe_brands_user_saved");
    localStorage.removeItem("styluxe_nav_user_saved");
    localStorage.removeItem("styluxe_user_has_modified_db");
    localStorage.removeItem("styluxe_categories");
    localStorage.removeItem("styluxe_products");
    localStorage.removeItem("styluxe_categories_cache");
    localStorage.removeItem("styluxe_products_cache");
    location.reload();
}
window.resetStoreToFactoryDefaults = resetStoreToFactoryDefaults;


function restoreSampleProducts() {
    PRODUCTS = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    saveAllUserDataLocally();
    if (typeof renderAdminProducts === "function") renderAdminProducts();
    if (typeof renderProducts === "function") renderProducts();
    alert("DEMO SAMPLE PRODUCTS SUCCESSFULLY RESTORED!");
}
window.restoreSampleProducts = restoreSampleProducts;


function restoreSampleCategories() {
    CATEGORIES = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    saveAllUserDataLocally();
    if (typeof onCategoriesUpdated === "function") onCategoriesUpdated();
    if (typeof renderAdminCategories === "function") renderAdminCategories();
    alert("DEMO CATEGORIES SUCCESSFULLY RESTORED!");
}
window.restoreSampleCategories = restoreSampleCategories;

// Real-time Mobile Mirror Auto-Sync: Refetches live server data on tab focus or visibility change
window.addEventListener("focus", function() {
    if (typeof loadProductsFromServer === "function") {
        loadProductsFromServer();
    }
});
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        if (typeof loadProductsFromServer === "function") {
            loadProductsFromServer();
        }
    }
});


// ==========================================================================
// IMAGE COMPRESSION HELPER (PREVENTS LOCALSTORAGE QUOTA OVERFLOW)
// ==========================================================================
function compressBase64Image(base64Str, maxWidth = 800, maxHeight = 800, quality = 0.75) {
    return new Promise((resolve) => {
        if (!base64Str || typeof base64Str !== 'string' || !base64Str.startsWith("data:image/")) {
            return resolve(base64Str);
        }
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                } else {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", quality);
            resolve(compressed);
        };
        img.onerror = () => resolve(base64Str);
        img.src = base64Str;
    });
}
window.compressBase64Image = compressBase64Image;


// --- GLOBAL WINDOW BINDINGS FOR ALL HTML ONCLICK HANDLERS ---
if (typeof togglePradaDrawer === "function") window.togglePradaDrawer = togglePradaDrawer;
if (typeof openPradaSearch === "function") window.openPradaSearch = openPradaSearch;
if (typeof toggleTheme === "function") window.toggleTheme = toggleTheme;
if (typeof toggleUserMenu === "function") window.toggleUserMenu = toggleUserMenu;
if (typeof openAuthModal === "function") window.openAuthModal = openAuthModal;
if (typeof openMyOrdersModal === "function") window.openMyOrdersModal = openMyOrdersModal;
if (typeof handleUserLogout === "function") window.handleUserLogout = handleUserLogout;
if (typeof togglePradaHeaderSearch === "function") window.togglePradaHeaderSearch = togglePradaHeaderSearch;
if (typeof clearPradaHeaderSearch === "function") window.clearPradaHeaderSearch = clearPradaHeaderSearch;
if (typeof closePradaSearch === "function") window.closePradaSearch = closePradaSearch;
if (typeof quickSearchCategory === "function") window.quickSearchCategory = quickSearchCategory;
if (typeof clearPradaSearch === "function") window.clearPradaSearch = clearPradaSearch;
if (typeof quickSearchTag === "function") window.quickSearchTag = quickSearchTag;
if (typeof filterByDepartment === "function") window.filterByDepartment = filterByDepartment;
if (typeof switchHomeDept === "function") window.switchHomeDept = switchHomeDept;
if (typeof switchNewArrivalsDept === "function") window.switchNewArrivalsDept = switchNewArrivalsDept;
if (typeof showCollectionsGrid === "function") window.showCollectionsGrid = showCollectionsGrid;
if (typeof filterByCategory === "function") window.filterByCategory = filterByCategory;
if (typeof openFilterOverlay === "function") window.openFilterOverlay = openFilterOverlay;
if (typeof toggleSortDropdown === "function") window.toggleSortDropdown = toggleSortDropdown;
if (typeof selectSortDropdownOption === "function") window.selectSortDropdownOption = selectSortDropdownOption;
if (typeof closeProductModal === "function") window.closeProductModal = closeProductModal;
if (typeof openSizeGuide === "function") window.openSizeGuide = openSizeGuide;
if (typeof selectSize === "function") window.selectSize = selectSize;
if (typeof addProductFromModalToCart === "function") window.addProductFromModalToCart = addProductFromModalToCart;
if (typeof toggleReviewForm === "function") window.toggleReviewForm = toggleReviewForm;
if (typeof setFormRating === "function") window.setFormRating = setFormRating;
if (typeof toggleCartDrawer === "function") window.toggleCartDrawer = toggleCartDrawer;
if (typeof openCheckoutModal === "function") window.openCheckoutModal = openCheckoutModal;
if (typeof closeCheckoutModal === "function") window.closeCheckoutModal = closeCheckoutModal;
if (typeof applyCouponCode === "function") window.applyCouponCode = applyCouponCode;
if (typeof closeSuccessModal === "function") window.closeSuccessModal = closeSuccessModal;
if (typeof closeTermsModal === "function") window.closeTermsModal = closeTermsModal;
if (typeof closeInfoModal === "function") window.closeInfoModal = closeInfoModal;
if (typeof showHomePage === "function") window.showHomePage = showHomePage;
if (typeof openInfoModal === "function") window.openInfoModal = openInfoModal;
if (typeof openTermsModal === "function") window.openTermsModal = openTermsModal;
if (typeof handleGuestEntry === "function") window.handleGuestEntry = handleGuestEntry;
if (typeof closeMyOrdersModal === "function") window.closeMyOrdersModal = closeMyOrdersModal;
if (typeof closeAdminLoginModal === "function") window.closeAdminLoginModal = closeAdminLoginModal;
if (typeof viewStorefrontAsAdmin === "function") window.viewStorefrontAsAdmin = viewStorefrontAsAdmin;
if (typeof switchAdminTab === "function") window.switchAdminTab = switchAdminTab;
if (typeof logoutAdmin === "function") window.logoutAdmin = logoutAdmin;
if (typeof resetAllStoreSales === "function") window.resetAllStoreSales = resetAllStoreSales;
if (typeof setStoreSeason === "function") window.setStoreSeason = setStoreSeason;
if (typeof openAddProductModal === "function") window.openAddProductModal = openAddProductModal;
if (typeof openAddStaffModal === "function") window.openAddStaffModal = openAddStaffModal;
if (typeof cancelBrandEdit === "function") window.cancelBrandEdit = cancelBrandEdit;
if (typeof resetNavigationMenuToFullPreset === "function") window.resetNavigationMenuToFullPreset = resetNavigationMenuToFullPreset;
if (typeof addMenuNode === "function") window.addMenuNode = addMenuNode;
if (typeof saveMenuBuilderData === "function") window.saveMenuBuilderData = saveMenuBuilderData;
if (typeof openAddHomeCardModal === "function") window.openAddHomeCardModal = openAddHomeCardModal;
if (typeof saveAllGeneralSettings === "function") window.saveAllGeneralSettings = saveAllGeneralSettings;
if (typeof clearHeroSlide === "function") window.clearHeroSlide = clearHeroSlide;
if (typeof togglePosMode === "function") window.togglePosMode = togglePosMode;
if (typeof exitPosMode === "function") window.exitPosMode = exitPosMode;
if (typeof openDailyReportModal === "function") window.openDailyReportModal = openDailyReportModal;
if (typeof printDailyReportDirectly === "function") window.printDailyReportDirectly = printDailyReportDirectly;
if (typeof openCloseRegisterModal === "function") window.openCloseRegisterModal = openCloseRegisterModal;
if (typeof openPastRegistersModal === "function") window.openPastRegistersModal = openPastRegistersModal;
if (typeof filterPosByDept === "function") window.filterPosByDept = filterPosByDept;
if (typeof processPosSale === "function") window.processPosSale = processPosSale;
if (typeof closeAddProductModal === "function") window.closeAddProductModal = closeAddProductModal;
if (typeof clearProductVideo === "function") window.clearProductVideo = clearProductVideo;
if (typeof printStickerOnly === "function") window.printStickerOnly = printStickerOnly;
if (typeof printInvoiceOnly === "function") window.printInvoiceOnly = printInvoiceOnly;
if (typeof closePosReceipt === "function") window.closePosReceipt = closePosReceipt;
if (typeof closeHomeCardModal === "function") window.closeHomeCardModal = closeHomeCardModal;
if (typeof printDailyReportOnly === "function") window.printDailyReportOnly = printDailyReportOnly;
if (typeof closeDailyReportModal === "function") window.closeDailyReportModal = closeDailyReportModal;
if (typeof closeCloseRegisterModal === "function") window.closeCloseRegisterModal = closeCloseRegisterModal;
if (typeof confirmCloseDailyRegister === "function") window.confirmCloseDailyRegister = confirmCloseDailyRegister;
if (typeof printDailyCloseReport === "function") window.printDailyCloseReport = printDailyCloseReport;
if (typeof closePastRegistersModal === "function") window.closePastRegistersModal = closePastRegistersModal;
if (typeof selectMockGoogleAccount === "function") window.selectMockGoogleAccount = selectMockGoogleAccount;
if (typeof closeMockSocialAuth === "function") window.closeMockSocialAuth = closeMockSocialAuth;
if (typeof triggerAppleBiometrics === "function") window.triggerAppleBiometrics = triggerAppleBiometrics;
if (typeof closeSizeGuide === "function") window.closeSizeGuide = closeSizeGuide;
if (typeof switchSgTab === "function") window.switchSgTab = switchSgTab;
if (typeof calculateRecommendedSize === "function") window.calculateRecommendedSize = calculateRecommendedSize;
if (typeof applyRecommendedSize === "function") window.applyRecommendedSize = applyRecommendedSize;
if (typeof closeAddStaffModal === "function") window.closeAddStaffModal = closeAddStaffModal;
if (typeof closeAdminOrderDetailsModal === "function") window.closeAdminOrderDetailsModal = closeAdminOrderDetailsModal;
if (typeof printActiveOrderInvoice === "function") window.printActiveOrderInvoice = printActiveOrderInvoice;
if (typeof openAdminLoginModal === "function") window.openAdminLoginModal = openAdminLoginModal;
if (typeof clearAllFilters === "function") window.clearAllFilters = clearAllFilters;
if (typeof closeFilterOverlay === "function") window.closeFilterOverlay = closeFilterOverlay;
if (typeof selectFilterOption === "function") window.selectFilterOption = selectFilterOption;


// --- GLOBAL WINDOW BINDINGS FOR ALL HTML ONCLICK HANDLERS ---
if (typeof togglePradaDrawer === "function") window.togglePradaDrawer = togglePradaDrawer;
if (typeof openPradaSearch === "function") window.openPradaSearch = openPradaSearch;
if (typeof toggleTheme === "function") window.toggleTheme = toggleTheme;
if (typeof toggleUserMenu === "function") window.toggleUserMenu = toggleUserMenu;
if (typeof openAuthModal === "function") window.openAuthModal = openAuthModal;
if (typeof openMyOrdersModal === "function") window.openMyOrdersModal = openMyOrdersModal;
if (typeof handleUserLogout === "function") window.handleUserLogout = handleUserLogout;
if (typeof togglePradaHeaderSearch === "function") window.togglePradaHeaderSearch = togglePradaHeaderSearch;
if (typeof clearPradaHeaderSearch === "function") window.clearPradaHeaderSearch = clearPradaHeaderSearch;
if (typeof closePradaSearch === "function") window.closePradaSearch = closePradaSearch;
if (typeof quickSearchCategory === "function") window.quickSearchCategory = quickSearchCategory;
if (typeof clearPradaSearch === "function") window.clearPradaSearch = clearPradaSearch;
if (typeof quickSearchTag === "function") window.quickSearchTag = quickSearchTag;
if (typeof filterByDepartment === "function") window.filterByDepartment = filterByDepartment;
if (typeof switchHomeDept === "function") window.switchHomeDept = switchHomeDept;
if (typeof switchNewArrivalsDept === "function") window.switchNewArrivalsDept = switchNewArrivalsDept;
if (typeof showCollectionsGrid === "function") window.showCollectionsGrid = showCollectionsGrid;
if (typeof filterByCategory === "function") window.filterByCategory = filterByCategory;
if (typeof openFilterOverlay === "function") window.openFilterOverlay = openFilterOverlay;
if (typeof toggleSortDropdown === "function") window.toggleSortDropdown = toggleSortDropdown;
if (typeof selectSortDropdownOption === "function") window.selectSortDropdownOption = selectSortDropdownOption;
if (typeof closeProductModal === "function") window.closeProductModal = closeProductModal;
if (typeof openSizeGuide === "function") window.openSizeGuide = openSizeGuide;
if (typeof selectSize === "function") window.selectSize = selectSize;
if (typeof addProductFromModalToCart === "function") window.addProductFromModalToCart = addProductFromModalToCart;
if (typeof toggleReviewForm === "function") window.toggleReviewForm = toggleReviewForm;
if (typeof setFormRating === "function") window.setFormRating = setFormRating;
if (typeof toggleCartDrawer === "function") window.toggleCartDrawer = toggleCartDrawer;
if (typeof openCheckoutModal === "function") window.openCheckoutModal = openCheckoutModal;
if (typeof closeCheckoutModal === "function") window.closeCheckoutModal = closeCheckoutModal;
if (typeof applyCouponCode === "function") window.applyCouponCode = applyCouponCode;
if (typeof closeSuccessModal === "function") window.closeSuccessModal = closeSuccessModal;
if (typeof closeTermsModal === "function") window.closeTermsModal = closeTermsModal;
if (typeof closeInfoModal === "function") window.closeInfoModal = closeInfoModal;
if (typeof showHomePage === "function") window.showHomePage = showHomePage;
if (typeof openInfoModal === "function") window.openInfoModal = openInfoModal;
if (typeof openTermsModal === "function") window.openTermsModal = openTermsModal;
if (typeof handleGuestEntry === "function") window.handleGuestEntry = handleGuestEntry;
if (typeof closeMyOrdersModal === "function") window.closeMyOrdersModal = closeMyOrdersModal;
if (typeof closeAdminLoginModal === "function") window.closeAdminLoginModal = closeAdminLoginModal;
if (typeof viewStorefrontAsAdmin === "function") window.viewStorefrontAsAdmin = viewStorefrontAsAdmin;
if (typeof switchAdminTab === "function") window.switchAdminTab = switchAdminTab;
if (typeof logoutAdmin === "function") window.logoutAdmin = logoutAdmin;
if (typeof resetAllStoreSales === "function") window.resetAllStoreSales = resetAllStoreSales;
if (typeof setStoreSeason === "function") window.setStoreSeason = setStoreSeason;
if (typeof openAddProductModal === "function") window.openAddProductModal = openAddProductModal;
if (typeof openAddStaffModal === "function") window.openAddStaffModal = openAddStaffModal;
if (typeof cancelBrandEdit === "function") window.cancelBrandEdit = cancelBrandEdit;
if (typeof resetNavigationMenuToFullPreset === "function") window.resetNavigationMenuToFullPreset = resetNavigationMenuToFullPreset;
if (typeof addMenuNode === "function") window.addMenuNode = addMenuNode;
if (typeof saveMenuBuilderData === "function") window.saveMenuBuilderData = saveMenuBuilderData;
if (typeof openAddHomeCardModal === "function") window.openAddHomeCardModal = openAddHomeCardModal;
if (typeof saveAllGeneralSettings === "function") window.saveAllGeneralSettings = saveAllGeneralSettings;
if (typeof clearHeroSlide === "function") window.clearHeroSlide = clearHeroSlide;
if (typeof togglePosMode === "function") window.togglePosMode = togglePosMode;
if (typeof exitPosMode === "function") window.exitPosMode = exitPosMode;
if (typeof openDailyReportModal === "function") window.openDailyReportModal = openDailyReportModal;
if (typeof printDailyReportDirectly === "function") window.printDailyReportDirectly = printDailyReportDirectly;
if (typeof openCloseRegisterModal === "function") window.openCloseRegisterModal = openCloseRegisterModal;
if (typeof openPastRegistersModal === "function") window.openPastRegistersModal = openPastRegistersModal;
if (typeof filterPosByDept === "function") window.filterPosByDept = filterPosByDept;
if (typeof processPosSale === "function") window.processPosSale = processPosSale;
if (typeof closeAddProductModal === "function") window.closeAddProductModal = closeAddProductModal;
if (typeof clearProductVideo === "function") window.clearProductVideo = clearProductVideo;
if (typeof printStickerOnly === "function") window.printStickerOnly = printStickerOnly;
if (typeof printInvoiceOnly === "function") window.printInvoiceOnly = printInvoiceOnly;
if (typeof closePosReceipt === "function") window.closePosReceipt = closePosReceipt;
if (typeof closeHomeCardModal === "function") window.closeHomeCardModal = closeHomeCardModal;
if (typeof printDailyReportOnly === "function") window.printDailyReportOnly = printDailyReportOnly;
if (typeof closeDailyReportModal === "function") window.closeDailyReportModal = closeDailyReportModal;
if (typeof closeCloseRegisterModal === "function") window.closeCloseRegisterModal = closeCloseRegisterModal;
if (typeof confirmCloseDailyRegister === "function") window.confirmCloseDailyRegister = confirmCloseDailyRegister;
if (typeof printDailyCloseReport === "function") window.printDailyCloseReport = printDailyCloseReport;
if (typeof closePastRegistersModal === "function") window.closePastRegistersModal = closePastRegistersModal;
if (typeof selectMockGoogleAccount === "function") window.selectMockGoogleAccount = selectMockGoogleAccount;
if (typeof closeMockSocialAuth === "function") window.closeMockSocialAuth = closeMockSocialAuth;
if (typeof triggerAppleBiometrics === "function") window.triggerAppleBiometrics = triggerAppleBiometrics;
if (typeof closeSizeGuide === "function") window.closeSizeGuide = closeSizeGuide;
if (typeof switchSgTab === "function") window.switchSgTab = switchSgTab;
if (typeof calculateRecommendedSize === "function") window.calculateRecommendedSize = calculateRecommendedSize;
if (typeof applyRecommendedSize === "function") window.applyRecommendedSize = applyRecommendedSize;
if (typeof closeAddStaffModal === "function") window.closeAddStaffModal = closeAddStaffModal;
if (typeof closeAdminOrderDetailsModal === "function") window.closeAdminOrderDetailsModal = closeAdminOrderDetailsModal;
if (typeof printActiveOrderInvoice === "function") window.printActiveOrderInvoice = printActiveOrderInvoice;
if (typeof openAdminLoginModal === "function") window.openAdminLoginModal = openAdminLoginModal;
if (typeof clearAllFilters === "function") window.clearAllFilters = clearAllFilters;
if (typeof closeFilterOverlay === "function") window.closeFilterOverlay = closeFilterOverlay;
if (typeof selectFilterOption === "function") window.selectFilterOption = selectFilterOption;
if (typeof deleteProduct === "function") window.deleteProduct = deleteProduct;
if (typeof openEditProductModal === "function") window.openEditProductModal = openEditProductModal;


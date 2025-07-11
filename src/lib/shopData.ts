// Example shop data structure for categories, subcategories, and products
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  onSale: boolean;
  isNew: boolean;
  description?: string;
  details?: string;
}

export interface SubCategory {
  id: number;
  name: string;
  products: Product[];
}

export interface Category {
  id: number;
  name: string;
  subcategories: SubCategory[];
}

export const shopCategories: Category[] = [
  {
    id: 1,
    name: 'Rings',
    subcategories: [
      {
        id: 11,
        name: 'Engagement Rings',
        products: [
          {
            id: 1,
            name: "Diamond Engagement Ring",
            price: 1250.00,
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 5,
            reviews: 25,
            onSale: false,
            isNew: false,
            description: 'A beautiful diamond ring for special occasions.',
            details: '18K gold, 1.2ct diamond, handcrafted.'
          },
          {
            id: 7,
            name: "Sapphire Ring",
            price: 875.00,
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 4,
            reviews: 12,
            onSale: false,
            isNew: false,
            description: 'Elegant sapphire ring with classic design.',
            details: 'Sapphire center, 18K gold.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Necklaces',
    subcategories: [
      {
        id: 21,
        name: 'Gold Necklaces',
        products: [
          {
            id: 2,
            name: "Gold Necklace",
            price: 890.00,
            originalPrice: 1200.00,
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 4,
            reviews: 18,
            onSale: true,
            isNew: false,
            description: 'Elegant gold necklace with intricate design.',
            details: '22K gold, 18 inches, made in Italy.'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Earrings',
    subcategories: [
      {
        id: 31,
        name: 'Pearl Earrings',
        products: [
          {
            id: 3,
            name: "Pearl Earrings",
            price: 245.00,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 5,
            reviews: 22,
            onSale: false,
            isNew: true,
            description: 'Classic pearl earrings for timeless elegance.',
            details: 'Freshwater pearls, sterling silver.'
          },
          {
            id: 8,
            name: "Emerald Earrings",
            price: 650.00,
            originalPrice: 750.00,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 5,
            reviews: 20,
            onSale: true,
            isNew: false,
            description: 'Emerald earrings with sparkling diamonds.',
            details: 'Emeralds, diamonds, 14K gold.'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Bracelets',
    subcategories: [
      {
        id: 41,
        name: 'Silver Bracelets',
        products: [
          {
            id: 4,
            name: "Silver Bracelet",
            price: 159.00,
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 4,
            reviews: 10,
            onSale: false,
            isNew: false,
            description: 'Stylish silver bracelet for everyday wear.',
            details: '925 sterling silver, adjustable.'
          },
          {
            id: 6,
            name: "Diamond Tennis Bracelet",
            price: 2350.00,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 5,
            reviews: 15,
            onSale: false,
            isNew: true,
            description: 'Diamond tennis bracelet for special occasions.',
            details: '14K white gold, 2ct diamonds.'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Watches',
    subcategories: [
      {
        id: 51,
        name: 'Luxury Watches',
        products: [
          {
            id: 5,
            name: "Luxury Watch",
            price: 1899.00,
            originalPrice: 2200.00,
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            rating: 5,
            reviews: 30,
            onSale: true,
            isNew: false,
            description: 'Luxury watch with premium leather strap.',
            details: 'Automatic movement, sapphire glass.'
          }
        ]
      }
    ]
  }
];

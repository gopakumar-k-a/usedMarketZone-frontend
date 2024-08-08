type ProductCategories = {
    electronics: string[];
    furniture: string[];
    vehicles: string[];
    clothing: string[];
    books: string[];
    sports: string[];
    home_appliances: string[];
    toys: string[];
    beauty_health: string[];
    tools: string[];
    art:string[];
  };

  export const productCategories: ProductCategories = {
    electronics: [
      "Mobile Phones",
      "Laptops",
      "Tablets",
      "Cameras",
      "Wearables",
      "Accessories",
    ],
    furniture: ["Sofas", "Beds", "Tables", "Chairs", "Cabinets", "Shelves"],
    vehicles: [
      "Cars",
      "Motorcycles",
      "Bicycles",
      "Trucks",
      "Electric Scooters",
    ],
    clothing: [
      "Men's Clothing",
      "Women's Clothing",
      "Children's Clothing",
      "Footwear",
      "Accessories",
    ],
    books: ["Fiction", "Non-Fiction", "Textbooks", "Comics", "Magazines"],
    sports: [
      "Fitness Equipment",
      "Outdoor Gear",
      "Sportswear",
      "Footwear",
      "Accessories",
    ],
    home_appliances: [
      "Refrigerators",
      "Microwaves",
      "Washing Machines",
      "Air Conditioners",
      "Vacuum Cleaners",
    ],
    toys: [
      "Action Figures",
      "Dolls",
      "Puzzles",
      "Board Games",
      "Educational Toys",
    ],
    beauty_health: [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Personal Care",
      "Health Supplements",
    ],
    tools: [
      "Power Tools",
      "Hand Tools",
      "Gardening Tools",
      "Automotive Tools",
      "Measuring Tools",
    ],
    art: [
      "Paintings",
      "Sculptures",
      "Drawings",
      "Prints",
      "Photography",
      "Crafts",
      "Ceramics"
    ]
  };

  type ProductConditions = {
    New: string;
    likeNew: string;
    veryGood: string;
    Good: string;
    Acceptable: string;
    Fair: string;
    Poor: string;
  };

 export const productConditions: ProductConditions = {
    New: "The product is unused and in its original packaging. It is in perfect condition with no signs of wear.",
    likeNew:
      "The product appears to be brand new but may have been used very lightly. There are no visible signs of wear, and it includes all original parts and packaging.",
    veryGood:
      "The product is used but well-maintained. It may show minor signs of use but is still in excellent working condition. Any defects or wear should be minimal.",
    Good: "The product is used and shows some signs of wear, such as scratches, scuffs, or minor cosmetic damage. It is fully functional and any flaws do not affect its performance.",
    Acceptable:
      "The product is visibly used and has significant signs of wear, such as heavy scratches, dents, or other cosmetic damage. It is still functional but may not be in the best condition.",
    Fair: "The product is heavily used and shows substantial wear and tear. It is still operational, but its appearance and performance may be affected by its condition.",
    Poor: "The product is in bad condition with significant damage or defects that may impair its functionality. It may require repairs to be fully functional.",
  };
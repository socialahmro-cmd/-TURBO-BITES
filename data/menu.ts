export const menuData = {
  pizzas: [
    { id: "p1", name: "Square Treat Pizza", desc: "Signature square-cut pizza loaded with premium mozzarella, rich tomato sauce, and savory toppings.", prices: { M: 1499, L: 2199 }, emoji: "🍕" },
    { id: "p2", name: "Crown Crust Pizza", desc: "Our legendary crown crust stuffed with tender chicken bites and melted cheese.", prices: { M: 1449, L: 2049, XL: 2549 }, emoji: "👑" },
    { id: "p3", name: "Chicken Cheese Pizza (Stuffed)", desc: "A cheese lover's dream! Crust stuffed with rich cheese and topped with spicy chicken chunks.", prices: { M: 1799, L: 2349, XL: 3049 }, emoji: "🧀" },
    { id: "p4", name: "Stuffed Pizza", desc: "Classic stuffed crust pizza bursting with a secret blend of herbs, cheese, and meats.", prices: { M: 1799, L: 2349, XL: 3049 }, emoji: "🍕" },
    { id: "p5", name: "Kabab Stuffed Pizza", desc: "Fusion perfection! Crust stuffed with juicy kebabs, topped with fresh veggies and BBQ drizzle.", prices: { M: 1799, L: 2349, XL: 3049 }, emoji: "🍢" },
    { id: "p6", name: "Turbo Bite Special Malai Boti Pizza", desc: "White Sauce, Malai Boti Chicken, Onions, Special Cheese, Olives", prices: { M: 1500, L: 2000, XL: 2669 }, emoji: "🌟" },
    { id: "p7", name: "Turbo Bite Special Steak Pizza", desc: "Combo of Cheese, Chicken, Crunches, Veggies & Rich Sauces", prices: { M: 1500, L: 2000, XL: 2669 }, emoji: "🥩" }
  ],
  burgers: [
    { id: "b1", name: "Zinger Burger", desc: "Crispy, golden-fried chicken breast topped with fresh lettuce and our signature zinger sauce.", price: 469, emoji: "🍔" },
    { id: "b2", name: "Big Ben Burger", desc: "A towering double-patty beast with melted cheese, crispy onions, and secret sauce.", price: 699, emoji: "🍔" },
    { id: "b3", name: "Zinger Cheese Burger", desc: "Our classic Zinger elevated with a thick slice of melting cheddar cheese.", price: 529, emoji: "🧀" },
    { id: "b4", name: "Petty Burger", desc: "Juicy grilled chicken patty, fresh tomatoes, and crisp lettuce in a toasted bun.", price: 289, emoji: "🍔" },
    { id: "b5", name: "Petty Cheese Burger", desc: "Grilled chicken patty smothered in rich cheddar cheese and creamy mayo.", price: 349, emoji: "🧀" },
    { id: "b6", name: "Chapli Kabab Burger", desc: "Authentic spicy Peshawari chapli kabab served in a soft bun with fresh mint chutney.", price: 349, emoji: "🫓" },
    { id: "b7", name: "Chapli Cheese Burger", desc: "Spicy chapli kabab perfectly balanced with a slice of mild, melting cheese.", price: 399, emoji: "🧀" },
    { id: "b8", name: "Double Maza Burger", desc: "Double the patties, double the flavor! A massive burger for serious cravings.", price: 469, emoji: "🍔" },
    { id: "b9", name: "Super Zinger Burger", desc: "An oversized, ultra-crispy chicken fillet with extra hot sauce and premium toppings.", price: 549, emoji: "⚡" }
  ],
  wraps: [
    { id: "w1", name: "Tortilla Wrap", desc: "Spicy grilled chicken wrapped in a warm, toasted tortilla with fresh veggies and garlic sauce.", price: 599, emoji: "🌯" }
  ],
  fries: [
    { id: "f1", name: "Sp. chicken/x2 Fries", desc: "Crispy golden fries loaded with double portions of spicy chicken chunks and secret sauce.", prices: { S: 349, L: 439 }, emoji: "🍟" },
    { id: "f2", name: "Sp. chicken/x2 Cheese Fries", desc: "The ultimate indulgence: loaded chicken fries smothered in a rich, melted cheese blend.", prices: { S: 399, L: 529 }, emoji: "🍟" },
    { id: "f3", name: "Mayo Garlic Fries", desc: "Crispy fries drizzled generously with our signature creamy mayo garlic sauce.", prices: { S: 249, L: 329 }, emoji: "🍟" },
    { id: "f4", name: "Plain Fries", desc: "Classic, perfectly salted thick-cut golden fries. Crispy outside, fluffy inside.", prices: { S: 179, L: 249 }, emoji: "🍟" },
    { id: "f5", name: "Masala Fries", desc: "Golden fries tossed in our fiery, tangy special masala spice mix.", prices: { S: 179, L: 249 }, emoji: "🍟" },
    { id: "f6", name: "Turbo Bite Special Fries", desc: "Our signature loaded fries topped with a mountain of chicken, cheese, jalapeños, and sauces.", prices: { S: 549, L: 799 }, emoji: "🍟" },
    { id: "f7", name: "Zinger Fries", desc: "Crispy fries topped with crunchy zinger chicken bites and spicy mayo.", price: 589, emoji: "🍟" }
  ],
  parathas: [
    { id: "pr1", name: "Achari Paratha", desc: "Tangy and spicy achari chicken rolled in a flaky, crispy, golden paratha.", price: 399, emoji: "🫓" },
    { id: "pr2", name: "Turbo Sp. Malai Boti Roll", desc: "Creamy, melt-in-your-mouth malai boti chicken wrapped tightly in our premium paratha.", price: 529, emoji: "🌯" },
    { id: "pr3", name: "Zinger Paratha", desc: "Crunchy zinger chicken strips, fresh onions, and mayo rolled in a hot paratha.", price: 469, emoji: "🫓" },
    { id: "pr4", name: "Chk Shawarma", desc: "Classic Mediterranean-style chicken shawarma with pickles and garlic sauce.", price: 289, emoji: "🫔" },
    { id: "pr5", name: "Boti Shawarma", desc: "Spicy BBQ chicken boti wrapped in soft pita bread with fresh salad and tahini.", price: 349, emoji: "🫔" },
    { id: "pr6", name: "Zinger Shawarma", desc: "The crunch of a zinger meets the wrap of a shawarma. A perfect fusion bite.", price: 469, emoji: "🌯" }
  ],
  pasta: [
    { id: "ps1", name: "Oven Baked Pasta Kababish Creamy & BBQ", desc: "Rich creamy pasta baked to perfection with smoky BBQ kabab slices and a cheese crust.", prices: { Half: 579, Full: 810 }, emoji: "🍝" },
    { id: "ps2", name: "Turbo Bites Special Crunchy Elbow Macaroni Pasta", desc: "Our signature spicy, creamy macaroni pasta topped with crunchy chicken bits.", prices: { Half: 649, Full: 949 }, emoji: "🍝" }
  ],
  deals: [
    { id: "d1", name: "Fried Deal 1", price: 619, desc: "1 Zinger, 1 Fries, 1 Regular Soda", emoji: "⚡" },
    { id: "d2", name: "Fried Deal 2", price: 2199, desc: "4 Zinger, 2 Fries, 4 Regular Soda", emoji: "💥" },
    { id: "d3", name: "Fried Deal 3", price: 399, desc: "1 Petty Burger, 1 Fries, 1 Regular Soda", emoji: "🍔" },
    { id: "d4", name: "Fried Deal 4", price: 1569, desc: "4 Petty Burgers, 2 Fries, 4 Regular Soda", emoji: "✨" },
    { id: "d5", name: "Fried Deal 5", price: 1649, desc: "2 Zinger, 12 Wings, 3 Regular Soda", emoji: "🍗" },
    { id: "d6", name: "Fried Deal 6", price: 2379, desc: "4 Petty Burgers, 20 Nuggets, 1.5 Ltr Drink", emoji: "👑" },
    { id: "d7", name: "Smart Deal", price: 1699, desc: "2 Small Pizzas, 1 Small Pasta, 1 Drink 500 Ml", emoji: "🍕" },
    { id: "d8", name: "Super Deal", price: 2299, desc: "2 Medium Pizzas, 1 Drink 1.5 Ltr", emoji: "🍕" },
    { id: "d9", name: "Double Up Deal", price: 3249, desc: "2 Large Pizzas, 1 Drink 1.5 Ltr", emoji: "🍕" },
    { id: "d10", name: "Chaska Deal", price: 1299, desc: "1 Large Pasta, 6 Pcs Wings, 1 Drink 500 Ml", emoji: "🍝" },
    { id: "d11", name: "Mega Deal", price: 4299, desc: "3 Large Pizzas, 2 Drinks 1.5 Ltr", emoji: "🔥" },
    { id: "d12", name: "Birth Day Deal", price: 6399, desc: "3 Large Pizzas, 2 Small Pastas, 12 Oven Baked Wings, 3 Drinks 1.5 Ltr", emoji: "🎉" }
  ]
};

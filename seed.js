require("dotenv").config();

const connectDB = require("./src/config/db");
const Admin = require("./src/models/Admin");
const Room = require("./src/models/Room");

const seedRooms = [
  {
    name: "Ocean View Villa",
    type: "villa",
    price: 480,
    features: ["Oceanfront", "Private pool", "Breakfast included", "King bed"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
    ],
    capacity: 2
  },
  {
    name: "Lagoon Garden Suite",
    type: "suite",
    price: 320,
    features: ["Garden access", "Outdoor shower", "Wi-Fi", "Workspace"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c"
    ],
    capacity: 3
  },
  {
    name: "Sanctuary Family Residence",
    type: "residence",
    price: 650,
    features: ["Two bedrooms", "Full kitchen", "Butler service", "Sea view"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    ],
    capacity: 5
  },
  {
    name: "Rainforest Retreat Room",
    type: "deluxe",
    price: 220,
    features: ["Balcony", "Rainfall shower", "Mini bar", "Queen bed"],
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
    ],
    capacity: 2
  }
];

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([Room.deleteMany({}), Admin.deleteMany({})]);

    await Room.insertMany(seedRooms);

    await Admin.create({
      username: process.env.ADMIN_USERNAME || "admin",
      password: process.env.ADMIN_PASSWORD || "Admin@12345",
      role: "admin"
    });

    console.log("Seed data inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();

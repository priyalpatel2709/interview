const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

const MockData = require("./models/interviewQueModel");
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected:`.underline.bgGreen);
  } catch (error) {
    console.log("File: db.js", "Line 13:", error);
    // logger.error(`Error Connect To MongoDb: ${error.message}`);
    process.exit();
  }
};

const users = [
  {
    name: "Test User",
    email: "test@mail.com",
    age: 25,
    isActive: true,
    joinDate: "2022-04-09T00:00:00Z",
    message: "This is a test message.",
    salary: 50000.5,
    hobbies: ["reading", "traveling"],
    address: {
      street: "123 Elm St",
      city: "Springfield",
      postalCode: 12345,
    },
    metadata: {
      extraInfo: "Some additional information",
    },
  },
  {
    name: "John Doe",
    age: 30,
    isActive: true,
    joinDate: "2024-09-18T00:00:00Z",
    message: "This is a test message.",
    salary: 50000.5,
    hobbies: ["reading", "traveling"],
    address: {
      street: "123 Elm St",
      city: "Springfield",
      postalCode: 12345,
    },
    metadata: {
      extraInfo: "Some additional information",
    },
  },
  {
    name: "Jane Smith",
    age: 25,
    isActive: true,
    joinDate: "2024-08-15T00:00:00Z",
    message: "Excited to be part of the team.",
    salary: 60000.75,
    hobbies: ["hiking", "photography"],
    address: {
      street: "456 Oak St",
      city: "Greenfield",
      postalCode: 54321,
    },
    metadata: {
      extraInfo: "Loves outdoor activities",
    },
  },
  {
    name: "Alice Johnson",
    age: 28,
    isActive: true,
    joinDate: "2024-07-20T00:00:00Z",
    message: "Looking forward to learning.",
    salary: 55000.0,
    hobbies: ["cooking", "reading"],
    address: {
      street: "789 Maple St",
      city: "Rivertown",
      postalCode: 67890,
    },
    metadata: {
      extraInfo: "Interested in new technologies",
    },
  },
  {
    name: "Bob Williams",
    age: 32,
    isActive: false,
    joinDate: "2024-06-10T00:00:00Z",
    message: "Glad to be a part of this organization.",
    salary: 70000.25,
    hobbies: ["music", "sports"],
    address: {
      street: "321 Pine St",
      city: "Lakewood",
      postalCode: 98765,
    },
    metadata: {
      extraInfo: "Enjoys playing the guitar",
    },
  },
  {
    name: "Charlie Brown",
    age: 40,
    isActive: true,
    joinDate: "2024-05-05T00:00:00Z",
    message: "I have years of experience in this field.",
    salary: 85000.5,
    hobbies: ["gardening", "golf"],
    address: {
      street: "654 Cedar St",
      city: "Evergreen",
      postalCode: 34567,
    },
    metadata: {
      extraInfo: "Specializes in management",
    },
  },
  {
    name: "Daisy Miller",
    age: 27,
    isActive: true,
    joinDate: "2024-04-25T00:00:00Z",
    message: "I'm passionate about coding.",
    salary: 65000.6,
    hobbies: ["coding", "baking"],
    address: {
      street: "987 Birch St",
      city: "Clearwater",
      postalCode: 11122,
    },
    metadata: {
      extraInfo: "Specializes in front-end development",
    },
  },
  {
    name: "Eve Parker",
    age: 22,
    isActive: true,
    joinDate: "2024-03-15T00:00:00Z",
    message: "New graduate ready to start working.",
    salary: 45000.0,
    hobbies: ["writing", "traveling"],
    address: {
      street: "159 Spruce St",
      city: "Meadowville",
      postalCode: 65432,
    },
    metadata: {
      extraInfo: "Recent graduate in computer science",
    },
  },
  {
    name: "Frank Harris",
    age: 45,
    isActive: false,
    joinDate: "2024-02-28T00:00:00Z",
    message: "I've been in this industry for 20 years.",
    salary: 90000.9,
    hobbies: ["fishing", "woodworking"],
    address: {
      street: "258 Fir St",
      city: "Shadytown",
      postalCode: 45678,
    },
    metadata: {
      extraInfo: "Expert in backend systems",
    },
  },
  {
    name: "George King",
    age: 35,
    isActive: true,
    joinDate: "2024-01-20T00:00:00Z",
    message: "Happy to join a dynamic team.",
    salary: 75000.75,
    hobbies: ["running", "gaming"],
    address: {
      street: "357 Redwood St",
      city: "Sunnyvale",
      postalCode: 87654,
    },
    metadata: {
      extraInfo: "Interested in DevOps and cloud",
    },
  },
  {
    name: "Helen Carter",
    age: 29,
    isActive: true,
    joinDate: "2024-09-05T00:00:00Z",
    message: "Eager to contribute to new projects.",
    salary: 65000.3,
    hobbies: ["yoga", "photography"],
    address: {
      street: "147 Walnut St",
      city: "Windyville",
      postalCode: 78901,
    },
    metadata: {
      extraInfo: "Has a creative eye for design",
    },
  },
  {
    name: "Ian Black",
    age: 31,
    isActive: true,
    joinDate: "2024-11-11T00:00:00Z",
    message: "Ready to take on new challenges.",
    salary: 78000.4,
    hobbies: ["chess", "cycling"],
    address: {
      street: "963 Juniper St",
      city: "Hilltop",
      postalCode: 54322,
    },
    metadata: {
      extraInfo: "Focuses on machine learning",
    },
  },
  {
    name: "Jack Green",
    age: 33,
    isActive: true,
    joinDate: "2024-10-20T00:00:00Z",
    message: "Experienced in agile development.",
    salary: 72000.0,
    hobbies: ["surfing", "guitar"],
    address: {
      street: "741 Cypress St",
      city: "Brookside",
      postalCode: 98760,
    },
    metadata: {
      extraInfo: "Certified Scrum Master",
    },
  },
  {
    name: "Karen White",
    age: 26,
    isActive: true,
    joinDate: "2024-11-30T00:00:00Z",
    message: "Excited to work in a fast-paced environment.",
    salary: 68000.8,
    hobbies: ["dancing", "painting"],
    address: {
      street: "842 Cherry St",
      city: "Lakeshore",
      postalCode: 22233,
    },
    metadata: {
      extraInfo: "Focused on UI/UX",
    },
  },
  {
    name: "Leo Baker",
    age: 38,
    isActive: true,
    joinDate: "2024-07-18T00:00:00Z",
    message: "Bringing years of experience to the table.",
    salary: 82000.5,
    hobbies: ["birdwatching", "golf"],
    address: {
      street: "159 Willow St",
      city: "Mapleton",
      postalCode: 32145,
    },
    metadata: {
      extraInfo: "Expert in software architecture",
    },
  },
  {
    name: "Megan Scott",
    age: 23,
    isActive: true,
    joinDate: "2024-05-10T00:00:00Z",
    message: "Excited to start my career.",
    salary: 49000.0,
    hobbies: ["sketching", "running"],
    address: {
      street: "987 Plum St",
      city: "Hightown",
      postalCode: 67821,
    },
    metadata: {
      extraInfo: "Recently graduated in design",
    },
  },
  {
    name: "Nick Adams",
    age: 29,
    isActive: false,
    joinDate: "2024-03-25T00:00:00Z",
    message: "Looking forward to contributing.",
    salary: 74000.2,
    hobbies: ["gaming", "writing"],
    address: {
      street: "753 Sycamore St",
      city: "Oldtown",
      postalCode: 43210,
    },
    metadata: {
      extraInfo: "Strong background in testing",
    },
  },
  {
    name: "Olivia Clark",
    age: 37,
    isActive: true,
    joinDate: "2024-12-05T00:00:00Z",
    message: "Excited to take on leadership roles.",
    salary: 81000.9,
    hobbies: ["swimming", "reading"],
    address: {
      street: "321 Aspen St",
      city: "Seaview",
      postalCode: 65401,
    },
    metadata: {
      extraInfo: "Experienced in managing teams",
    },
  },
  {
    name: "Paul Reed",
    age: 34,
    isActive: true,
    joinDate: "2024-02-14T00:00:00Z",
    message: "Focused on backend technologies.",
    salary: 80000.75,
    hobbies: ["basketball", "cooking"],
    address: {
      street: "123 Oak St",
      city: "Riverview",
      postalCode: 87645,
    },
    metadata: {
      extraInfo: "Specializes in API development",
    },
  },
  {
    name: "Quinn Bell",
    age: 41,
    isActive: true,
    joinDate: "2024-01-05T00:00:00Z",
    message: "Looking forward to collaborating.",
    salary: 84000.1,
    hobbies: ["traveling", "photography"],
    address: {
      street: "963 Ash St",
      city: "Clearview",
      postalCode: 34521,
    },
    metadata: {
      extraInfo: "Interested in cloud infrastructure",
    },
  },
];

const seedData = async () => {
  try {
    connectDB();
    // Clear the collection before seeding
    await MockData.deleteMany({});
    console.log("Old data removed.");

    // Insert new data
    await MockData.insertMany(users);
    console.log("Data successfully seeded.");
  } catch (err) {
    console.error("Error seeding data: ", err);
  } finally {
    mongoose.connection.close();
  }
};

seedData();

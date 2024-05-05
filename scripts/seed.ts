const { PrismaClient } = require("@prisma/client");

const databaseSeeding = new PrismaClient();

async function main() {
  try {
    const categories = [
      { name: "Computer Science" },
      { name: "Mathmatics" },
      { name: "Arts & creatives" },
      { name: "History" },
      { name: "Health and fitness" },
      { name: "Geography" },
    ];

    for (const category of categories) {
      // Check if the category already exists
      const existingCategory = await databaseSeeding.category.findUnique({
        where: { name: category.name },
      });

      // If the category doesn't exist, create it
      if (!existingCategory) {
        await databaseSeeding.category.create({
          data: category,
        });
      }
    }

    console.log("Successful database seeding !!!");
  } catch (error) {
    console.log("Something went wrong", error);
  } finally {
    await databaseSeeding.$disconnect();
  }
}

//  Function garey pachee database seed vayarw category database ma  baschha
main();

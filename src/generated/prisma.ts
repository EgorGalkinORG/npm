import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tag1 = await prisma.tag.create({ data: { name: "tag1" } });
  const tag2 = await prisma.tag.create({ data: { name: "tag2" } });

  const post = await prisma.post.create({
    data: {
      title: "1",
      description: "1",
      image: "1.png",
      tags: {
        create: [
          { tagId: tag1.id },
          { tagId: tag2.id },
        ],
      },
    },
    include: { tags: { include: { tag: true } } },
  });

  console.log(post);
}

main().finally(() => prisma.$disconnect());

export default prisma;

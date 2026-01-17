import "dotenv/config";
import { PrismaClient, TicketStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: TicketStatus.DONE,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: TicketStatus.OPEN,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: TicketStatus.IN_PROGRESS,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

async function main() {
  const t0 = performance.now();
  console.log("DB Seed: Started ...");

  // DEV-ONLY pattern:
  await prisma.ticket.deleteMany();
  await prisma.ticket.createMany({ data: tickets });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${Math.round(t1 - t0)}ms)`);
}

main()
  .catch((e) => {
    console.error("DB Seed: Failed", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

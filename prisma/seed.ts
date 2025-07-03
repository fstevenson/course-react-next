import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient()

const tickets = [
    {
        title: "Ticket 1",
        content: "This is the first ticket from the database",
        status: "DONE" as const,
        bounty: 499, // 4.99
        deadline: new Date().toISOString().split('T')[0] // Current date as default value
    },
    {
        title: "Ticket 2",
        content: "This is the second ticket from the database",
        status: "OPEN" as const,
        bounty: 399,
        deadline: new Date().toISOString().split('T')[0]
    },
    {
        title: "Ticket 3",
        content: "This is the third ticket from the database",
        status: "IN_PROGRESS" as const,
        bounty: 299,
        deadline: new Date().toISOString().split('T')[0]
    }
];

const seed = async () => {
    console.time("Seeding database");
    console.log("Seeding database...");

    // const promises = tickets.map(ticket => prisma.ticket.create({ data: ticket }));
    // await Promise.all(promises);

    await prisma.ticket.deleteMany(); // Clear existing tickets before seeding

    await prisma.ticket.createMany({
        data: tickets,  // This will insert all tickets at once 
    });

    console.log("Database seeded successfully!");
    console.timeEnd("Seeding database");
}

seed();
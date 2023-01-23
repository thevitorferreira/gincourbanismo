import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function retornaFeriado(req, res) {
    const holidays = await prisma.feriados846.findMany();
    console.log(holidays)
    res.status(200).send(holidays);
}
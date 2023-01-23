import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function seedHolidays() {

    for (const holiday of holidays) {
        const existingHoliday = await prisma.feriados846.findMany({
            where: { data: holiday.data }
        });
        if (existingHoliday.length === 0) {
            await prisma.feriados846.create({
                data: {
                    data: holiday.data,
                    nome: holiday.nome,
                    tipo: holiday.tipo,
                    descricao: holiday.descricao
                },
            });
        } else {
            console.log(`O feriado ${holiday.nome} já está no banco de dados.`);
        }
    }
    await prisma.$disconnect();
}


export { seedHolidays }
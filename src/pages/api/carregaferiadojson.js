import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const dateRegex = /\d{4}-\d{2}-\d{2}/;

export default async function seedHolidays(req, res) {
    const holidays = require('../../../feriados_nacionais_2023.json')
    const addHolidays = []
    for (const holiday of holidays) {
        const data = toDate(holiday.data)
        const existingHoliday = await prisma.feriados846.findMany({
            where: {
                nome: holiday.nome
            }
        });
        if (existingHoliday.length === 0) {
            await prisma.feriados846.create({
                data: {
                    data: data,
                    nome: holiday.nome,
                    tipo: holiday.tipo,
                    descricao: holiday.descricao
                },
            });
            addHolidays.push(holiday)
        } else {
            console.log(`O feriado ${holiday.nome} já está no banco de dados.`);
        }
    }
    res.status(201).json({ Inseridos: addHolidays })
    await prisma.$disconnect();
}


function toDate(date) {
    var parts = date.split('/')
    return new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
}

export { seedHolidays }
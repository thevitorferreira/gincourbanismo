import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dateRegex = /\d{4}-\d{2}-\d{2}/;

export default async function retornaFeriado(req, res) {
    const { date } = req.query;
    try {
        var data = toDate(date)
        const holiday = await prisma.feriados846.findMany({
            where: { data: data }
        });
        if (holiday.length === 0) {
            res.status(202).json({ error: "Essa data não é um feriado" });
        } else {
            res.status(200).json(holiday);
        }
    } catch (err) {
        res.status(201).json({ error: err.message });
    }
}

function toDate(date) {
    if (!dateRegex.test(date)) {
        throw new Error("Data inválida. Utilize o formato yyyy-mm-dd");
    }
    return new Date(date);
}
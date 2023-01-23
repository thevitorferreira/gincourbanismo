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
            res.status(404).json({ error: "Data não encontrada" });
        } else {
            res.json(holiday);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

function toDate(date) {
    if (!dateRegex.test(date)) {
        throw new Error("Data inválida. Utilize o formato yyyy-mm-dd");
    }
    return new Date(date);
}
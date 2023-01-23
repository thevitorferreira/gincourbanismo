const { PrismaClient } = require("@prisma/client")

export default async function handler(req, res) {
   const prisma = new PrismaClient();
   const { data, nome, tipo, descricao } = req.body;
   var date = toDate(data)
   try {
      console.log(`dados: ${data}, ${nome}, ${tipo}, ${descricao}`)
      const newHoliday = await prisma.feriados846.create({
         data: {
            data: date,
            nome: nome,
            tipo: tipo,
            descricao: descricao
         },
      });
      res.status(201).end();
   } catch (err) {
      console.log(err)
      res.status(500);
      res.end();

   } finally {
      await prisma.$disconnect();
   }
}

function toDate(date) {
   var parts = date.split("/");
   return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
}
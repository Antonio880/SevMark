import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MarkController {
  static async listMarks(req, res) {
    try {
      let json = { result: [] };

      // Obtenha os dados de marcas
      let markList = await prisma.marks.findMany();

      // Mapeie os dados para o formato desejado na resposta JSON
      markList.forEach(data => {
        json.result.push({
          id: data.id,
          dayOfMonth: data.dayOfMonth,
          monthYear: data.monthYear,
          shortDay: data.shortDay,
          hour: data.hour,
          local_id: data.local_id
          // Inclua outros campos conforme necessário
        });
      });

      res.json(json);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Request failed` });
    }
  }

  static async findMarkById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const markFound = await prisma.marks.findUnique({
        where: { id: id },
      });
      if (markFound) {
        res.status(200).json(markFound);
      } else {
        res.status(404).json({ message: 'Mark not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve mark` });
    }
  }

  static async findMarkByLocalID(req, res) {
    try {
      const local_id = parseInt(req.query.localId);
      const markFound = await prisma.marks.findMany({
        where: { local_id: local_id },
      });
      if (markFound.length > 0) {
        res.status(200).json(markFound);
      } else {
        res.status(404).json({ message: 'Mark not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Mark` });
    }
  }

  static async findMarkByLocalIDAndUserId(req, res) {
    try {
      const local_id = parseInt(req.query.local_id);
      const user_id = req.query.user_id;
      
      const markFound = await prisma.marks.findMany({
        where: {
          local_id: local_id,
          usuario_id: user_id,
        },
      });
      
      if (markFound.length > 0) {
        res.status(200).json(markFound);
      } else {
        res.status(404).json({ message: 'Mark or User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Mark` });
    }
  }

  static async findMarkByUserId(req, res) {
    try {
      const user_id = parseInt(req.query.userId);
      const markFound = await prisma.marks.findMany({
        where: { usuario_id: user_id },
      });
      if (markFound.length > 0) {
        res.status(200).json(markFound);
      } else {
        res.status(404).json({ message: 'Mark not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Mark` });
    }
  }

  static async createMark(req, res) {
    try {
      const { dayOfMonth, hour, localId, monthYear, userId } = req.body;
      // Verifique se já existe uma marcação para o mesmo dia e hora
      const existingMark = await prisma.marks.findFirst({
        where: {
          dayOfMonth: dayOfMonth,
          hour: hour,
          monthYear: monthYear,
          local_id: localId,
          user_id: userId,
        },
      });

      if (existingMark) {
        return res.status(409).json({ message: "Mark already exists" });
      }
    
      const newMark = await prisma.marks.create({
        data: req.body,
      });
      res.status(201).json({ message: 'Created successfully', mark: newMark });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create mark` });
    }
  }

  // Outras funções conforme necessário

}

export default MarkController;
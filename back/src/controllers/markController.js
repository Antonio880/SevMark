// Importe o modelo "mark"
import { mark } from "../models/mark.js";

class MarkController {
  static async listMarks(req, res) {
    try {
      let json = { result: [] };

      // Obtenha os dados de marcas
      let markList = await mark.find();

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
      const id = req.params.id;
      const markFound = await mark.findById(id);
      res.status(200).json(markFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve mark` });
    }
  }

  static async findMarkByLocalID(req, res) {
    try {
      const local_id = req.query.localId;
      const markFound = await mark.findOne({ local_id: local_id });
      if (markFound) {
        res.status(200).json(markFound);
      } else {
        res.status(404).json({ message: 'Mark not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Mark` });
    }
  }

  static async findMarkByUserId(req, res) {
    try {
      const usuario_id = req.query.userId;
      const userFound = await mark.findOne({ usuario_id: usuario_id });
      if (userFound) {
        res.status(200).json(userFound);
      } else {
        res.status(404).json({ message: 'Mark not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Mark` });
    }
  }

  static async createMark(req, res) {
    try {
      
      const newMark = await mark.create(req.body);
      res.status(201).json({ message: 'Created successfully', mark: newMark });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create mark` });
    }
  }

  // Outras funções conforme necessário

}

export default MarkController;

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SportController {
  static async listSports(req, res) {
    let json = { result: [] };

    try {
      let sports = await prisma.sports.findMany();

      for (let i in sports) {
        json.result.push({
          id: sports[i].id,
          name: sports[i].name
        });
      }

      res.json(json);
    } catch (error) {
      res.status(500).json({ message: `Error fetching sports: ${error.message}` });
    }
  }

  static async createSport(req, res) {
    try {
      const newSport = await prisma.sports.create({
        data: req.body
      });
      res.status(201).json({ message: 'Created successfully', sport: newSport });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create a new Sport` });
    }
  }

  static async findSportByLocalId(req, res) {
    try {
      const local_id = parseInt(req.query.id);
      const sports = await prisma.sports.findMany({
        where: { localId: local_id }
      });

      if (sports.length > 0) {
        res.status(200).json(sports);
      } else {
        res.status(404).json({ message: 'Sports not found for the specified local_id' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve sports data` });
    }
  }

  static async updateSport(req, res) {
    try {
      const id = parseInt(req.params.id);
      const sportUpdated = await prisma.sports.update({
        where: { id: id },
        data: req.body
      });
      res.status(200).json({ message: "Sport updated", sport: sportUpdated });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Update failed` });
    }
  }

  static async deleteSportByLocalId(req, res) {
    try {
      const local_id = parseInt(req.query.local_id);
      const sportFound = await prisma.sports.findMany({
        where: { localId: local_id }
      });
      if (sportFound.length > 0) {
        await prisma.sport.deleteMany({
          where: { localId: local_id }
        });
        res.status(200).json({ message: "Sport deleted successfully" });
      } else {
        res.status(404).json({ message: 'Sport not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to delete Sport` });
    }
  }
}

export default SportController;
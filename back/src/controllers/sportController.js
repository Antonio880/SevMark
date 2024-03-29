import { sport } from "../models/sport.js";

class SportController {
  static async listSports(req, res) {
    let json = { result: [] };

    let sports = await sport.find();

    for (let i in sports) {
      json.result.push({
        id: sports[i].id,
        name: sports[i].name
      });
    }

    res.json(json);
  }
  static async createSport(req, res) {
    try {
      const newSport = await sport.create(req.body);
      res.status(201).json({ message: 'Created successfully', sport: newSport });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create a new Sport` });
    }
  }

  static async findSportByLocalId(req, res) {
    try {
      const local_id = req.query.id;
      const sports = await sport.findOne({ local_id });

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
      const id = req.params.id;
      const sportUpdated = await sport.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Local updated", sport: sportUpdated });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Update failed` });
    }
  }

  static async deleteSportByLocalId(req, res) {
    try {
      const local_id = req.query.local_id;
      const sportFound = await sport.findOne({ local_id });
      if (sportFound) {
        await sport.deleteMany({ local_id });
        res.status(200).json({ message: "Sport delete with sucess" });
      } else {
        res.status(404).json({ message: 'Sport not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Sport` });
    }
  }
}

export default SportController;
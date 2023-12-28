import { sport } from "../models/sport.js";

class SportController {
    static async listSports(req, res) {
        let json = { result: []};
    
        let sports = await sport.find();
    
        for(let i in sports){
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
          const sports = await sport.findOne({ local_id: local_id });
      
          if (sports.length > 0) {
            res.status(200).json(sports);
          } else {
            res.status(404).json({ message: 'Sports not found for the specified local_id' });
          }
        } catch (error) {
          res.status(500).json({ message: `${error.message} - Failed to retrieve sports data` });
        }
      }
    
}

export default SportController;
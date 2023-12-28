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
}

export default SportController;
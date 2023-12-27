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
}

export default SportController;
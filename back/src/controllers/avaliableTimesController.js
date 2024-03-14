import { availableTime } from "../models/avaliableTimes.js";

class AvailableTimeController {
  static async listAvailableTimes(req, res) {
    try {
      const availableTimes = await availableTime.find();
      res.json(availableTimes);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve available times` });
    }
  }

  static async findAvailableTimeById(req, res) {
    try {
      const id = req.params.id;
      const availableTimeFound = await availableTime.findById(id);
      res.status(200).json(availableTimeFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve available time` });
    }
  }

  static async findAvaliableTimeByLocalId(req, res) {
    try {
      const  id  = req.query.localId;
      const avaliableTimeFound = await availableTime.findOne({ local_id : id });
  
      if (avaliableTimeFound) {
        res.status(200).json(avaliableTimeFound);
      } else {
        res.status(404).json({ message: 'Avaliable Time not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Avaliable Time` });
    }
  }

  static async createAvailableTimes(req, res) {
    try {
      
      const availableTimes = req.body.availableTimes.map(async (time) => {
        const newAvailableTime = await availableTime.create({
          day: time.day,
          startTime: time.startTime,
          endTime: time.endTime,
          local_id: time.local_id
        });
        return newAvailableTime;
      });
      res.status(201).json({ message: 'Created successfully', availableTimes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create available times' });
    }
  }

  static async updateAvailableTime(req, res) {
    try {
      console.log(req.body);
      
      const availableTimesCreate = req.body.map(async (time) => {
        const newAvailableTime = await availableTime.findByIdAndUpdate( time.id, {
          id: time.id,
          day: time.day,
          startTime: time.startTime,
          endTime: time.endTime,
          local_id: time.local_id
        });
        console.log(newAvailableTime)
        return newAvailableTime;
      });
      
      res.status(200).json({ message: 'Updated successfully', availableTimesCreate });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to update available time` });
    }
  }

  static async deleteAvailableTime(req, res) {
    try {
      const id = req.params.id;
      await availableTime.findByIdAndDelete(id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to delete available time` });
    }
  }

  // Métodos adicionais conforme necessário
}

export default AvailableTimeController;

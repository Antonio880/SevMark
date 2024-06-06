import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AvailableTimeController {
  static async listAvailableTimes(req, res) {
    try {
      const availableTimes = await prisma.avaliable_times.findMany();
      res.json(availableTimes);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve available times` });
    }
  }

  static async findAvailableTimeById(req, res) {
    try {
      const id = req.params.id;
      const availableTimeFound = await prisma.avaliable_times.findMany({
        where: { id },
      });
      if (availableTimeFound) {
        res.status(200).json(availableTimeFound);
      } else {
        res.status(404).json({ message: 'Available Time not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve available time` });
    }
  }

  static async findAvaliableTimeByLocalId(req, res) {
    try {
      const id = req.query.localId;
      const avaliableTimeFound = await prisma.avaliable_times.findMany({
        where: { localId: localId },
      });

      if (avaliableTimeFound) {
        res.status(200).json(avaliableTimeFound);
      } else {
        res.status(404).json({ message: 'Available Time not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Available Time` });
    }
  }

  static async createAvailableTimes(req, res) {
    try {
      const availableTimes = await Promise.all(req.body.availableTimes.map(async (time) => {
        const newAvailableTime = await prisma.avaliable_times.create({
          data:{
            day: time.day,
            startTime: time.startTime,
            endTime: time.endTime,
            local_id: parseInt(time.local_id)
          }
        });
        return newAvailableTime;
      }));
      res.status(201).json({ message: 'Created successfully', availableTimes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create available times' });
    }
  }

  static async updateAvailableTime(req, res) {
    try {
      const availableTimesCreate = await Promise.all(req.body.map(async (time) => {
        await prisma.avaliable_times.update({
          where:{
            id: time.id
          },
          data:{
            day: time.day,
            startTime: time.startTime,
            endTime: time.endTime,
            local_id: time.local_id
          }
        });
        
      }));

      res.status(200).json({ message: 'Updated successfully', availableTimesCreate });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to update available time` });
    }
  }

  static async deleteAvailableTime(req, res) {
    try {
      const id = req.params.id;
      await prisma.avaliable_times.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to delete available time` });
    }
  }

  // Métodos adicionais conforme necessário
}

export default AvailableTimeController;
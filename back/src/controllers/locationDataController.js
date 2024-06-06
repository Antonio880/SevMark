import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LocationDataController {
  static async listLocationData(req, res) {
    try {
      let json = { result: [] };

      // Obtenha os dados de localização
      let locationDataList = await prisma.locals.findMany();

      // Mapeie os dados para o formato desejado na resposta JSON
      locationDataList.forEach(data => {
        json.result.push({
          id: data.id,
          locationName: data.locationName,
          price: data.price,
          description: data.description,
          obs: data.obs,
          user_id: data.usuario_id
        });
      });

      res.json(json);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Request failed` });
    }
  }

  static async findLocationDataById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const locationDataFound = await prisma.locals.findUnique({
        where: { id: id },
      });
      if (locationDataFound) {
        res.status(200).json(locationDataFound);
      } else {
        res.status(404).json({ message: 'Location data not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve location data` });
    }
  }

  static async createLocationData(req, res) {
    try {
      const newLocationData = await prisma.locals.create({
        data: req.body,
      });
      return res.status(201).json({ message: 'Created successfully', local: newLocationData });
    } catch (error) {
      return res.status(500).json({ message: `Failed to create location data: ${error.message}` });
    }
  }

  static async findLocationByName(req, res) {
    try {
      const { name, description } = req.query;
      const locationDataFound = await prisma.locals.findFirst({
        where: {
          locationName: name,
          description: description,
        },
      });

      if (locationDataFound) {
        res.status(200).json(locationDataFound);
      } else {
        res.status(404).json({ message: 'Local not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve location data` });
    }
  }

  static async findLocationByUserId(req, res) {
    try {
      const usuario_id = parseInt(req.query.usuario_id);
      const locationDataFound = await prisma.locals.findMany({
        where: { usuario_id: usuario_id },
      });

      if (locationDataFound.length > 0) {
        res.status(200).json(locationDataFound);
      } else {
        res.status(404).json({ message: 'Local not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve location data` });
    }
  }

  static async getLocationsBySport(req, res) {
    try {
      const sportName = req.query.name;

      const locations = await prisma.locals.findMany({
        where: {
          sports: {
            some: {
              name: sportName,
            },
          },
        },
      });

      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve locations` });
    }
  }

  static async updateLocal(req, res) {
    try {
      const id = parseInt(req.params.id);
      const localUpdated = await prisma.locals.update({
        where: { id: id },
        data: req.body,
      });
      res.status(200).json({ message: "Local updated", local: localUpdated });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Update failed` });
    }
  }

  static async deleteLocationData(req, res) {
    try {
      const id = parseInt(req.params.id);

      const localFound = await prisma.locals.findUnique({
        where: { id: id },
      });
      if (!localFound) {
        return res.status(404).json({ message: "Local not found" });
      }

      await prisma.marks.deleteMany({
        where: { local_id: id },
      });
      await prisma.sports.deleteMany({
        where: { local_id: id },
      });
      await prisma.avaliable_times.deleteMany({
        where: { local_id: id },
      });
      await prisma.images.deleteMany({
        where: { local_id: id },
      });

      await prisma.locals.delete({
        where: { id: id },
      });

      res.status(200).json({ message: "Local successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Deletion failed` });
    }
  }

  // Métodos adicionais conforme necessário
}

export default LocationDataController;
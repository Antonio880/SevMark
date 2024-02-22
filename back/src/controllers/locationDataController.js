// Importe o modelo "local"
import { local } from "../models/locationData.js";
import { sport } from "../models/sport.js";
import { mark } from "../models/mark.js";
import { availableTime } from "../models/avaliableTimes.js";

class LocationDataController {
  static async listLocationData(req, res) {
    try {
      let json = { result: [] };

      // Obtenha os dados de localização
      let locationDataList = await local.find();

      // Mapeie os dados para o formato desejado na resposta JSON
      locationDataList.forEach(data => {
        json.result.push({
          id: data.id,
          locationName: data.locationName,
          price: data.price,
          description: data.description,
          obs: data.obs,
          usuario_id: data.usuario_id
        });
      });

      res.json(json);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Request failed` });
    }
  }

  static async findLocationDataById(req, res) {
    try {
      const id = req.params.id;
      const locationDataFound = await local.findById(id);
      res.status(200).json(locationDataFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve location data` });
    }
  }

  static async createLocationData(req, res) {
    try {
      // Verificar se o local já existe com base em algum critério (por exemplo, nome do local)
      /* const existingLocation = await local.findOne({
        where: {
          // Adapte isso para o critério que você deseja usar (por exemplo, nome)
          name: req.body.name,
        },
      });
  
      if (existingLocation) {
        // Se o local já existir, retorne uma resposta indicando que o local já está cadastrado
        return res.status(400).json({ message: 'Location already exists' });
      } */
  
      // Se o local não existir, proceda com a criação
      const newLocationData = await local.create(req.body);
      return res.status(201).json({ message: 'Created successfully', local: newLocationData });
    } catch (error) {
      // Tratar erros durante o processo
      console.error(error);
      return res.status(500).json({ message: 'Failed to create location data' });
    }
  }

  static async findLocationByName(req, res) {
    try {
      const { name, description } = req.query;
      const locationDataFound = await local.findOne({ locationName: name, description });
  
      if (locationDataFound) {
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

      // Consulta SQL para obter locais associados a um esporte específico
      const query = `
      SELECT locals.*
      FROM locals
      INNER JOIN sports ON locals.id = sports.local_id
      WHERE sports.name = ?;
      
      `;

      const locations = await sport.query(query, [sportName]);

      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve locations` });
    }
  }

  static async deleteLocationData(req, res) {
    try {
      const id = req.params.id;
  
      const localFound = await local.findById(id);
      if (!localFound) {
        return res.status(404).json({ message: "Local not found" });
      }

      const markFound = await mark.findOne({ local_id: id });
      const sportFound = await sport.findOne({ local_id: id });
      const avaliableTimeFound = await availableTime.findOne({ local_id: id });
  
      // Efficiently collect all deletion promises using Promise.all
      const deletionPromises = [];
      if (markFound) {
        deletionPromises.push(mark.deleteMany({ local_id: id }));
      }
      if (sportFound) {
        deletionPromises.push(sport.deleteMany({ local_id: id }));
      }
      if (avaliableTimeFound) {
        deletionPromises.push(availableTime.deleteMany({ local_id: id }));
      }
  
      // Ensure all deletions complete before proceeding
      await Promise.all(deletionPromises);
  
      // Delete the local record after all child deletions
      await local.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Local successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Deletion failed` });
    }
  }

  // Métodos adicionais conforme necessário

}

export default LocationDataController;
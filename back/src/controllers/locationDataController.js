// Importe o modelo "local"
import { local } from "../models/locationData.js";

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
          obs: data.obs
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
      // Lógica para criar dados de localização, similar à do createUser
      const newLocationData = await local.create(req.body);
      res.status(201).json({ message: 'Created successfully', local: newLocationData });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create location data` });
    }
  }

  // Métodos adicionais conforme necessário

}

export default LocationDataController;
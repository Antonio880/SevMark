import { image } from "../models/images.js";

class ImageController {
    static async listImages(req, res) {
        try {
          const images = await image.find();
          res.status(200).json(images);
        } catch (error) {
          res.status(500).json({ message: `${error.message} - Failed to retrieve images` });
        }
      }

      static async createImage(req, res) {
        try {
          // Verificar se a imagem já existe com base em algum critério (por exemplo, nome da imagem)
          // Adapte isso para o critério que você deseja usar (por exemplo, nome)
          const { originalname: name, size, filename: key, local_id } = req.file;
          const existingImage = await image.findOne({name});
    
          if (existingImage) {
            // Se a imagem já existir, retorne uma resposta indicando que a imagem já está cadastrada
            return res.status(400).json({ message: 'Image already exists' });
          }
          
          // Se a imagem não existir, proceda com a criação
          const newImage = await image.create({
            name,
            size,
            key,
            url: "",
            local_id
          });
          
          return res.status(201).json({ message: 'Image created successfully', image: newImage, destination: `${req.file.destination + key}` });
        } catch (error) {
          // Tratar erros durante o processo
          console.error(error);
          return res.status(500).json({ message: 'Failed to create image' });
        }
      }
}

export default ImageController;
import { image } from "../models/images.js";

class ImageController {
  static async listImages(req, res) {
    try {
      const pictures = await image.find();
      res.json(pictures);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar as imagens." });
    }
    }

  static async createImage(req, res) {
    try {
      console.log(req.body);
      const name = req.file.originalname;
      
      const file = req.file;
  
      const picture = await image.create({ name, src: file.path, local_id: req.body.localId });
      res.status(201).json(picture);
    } catch (err) {
      res.status(500).json({ message: "Erro ao salvar a imagem - " + err });
    }
  }

  static async findImagesByLocalId(req, res) {
    try {
      const local_id = req.query.local_id;
      const imageFound = await image.findOne({ local_id });
      
      if (imageFound) {
        res.status(200).json(imageFound);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Image` });
    }
  }
  
  static async removeImage(req, res){
    try {
      const picture = await image.findById(req.params.id);
      if (!picture) {
        return res.status(404).json({ message: "Imagem não encontrada" });
      }
      fs.unlinkSync(picture.src);
      await image.findByIdAndDelete(req.params.id);
      res.json({ message: "Imagem removida com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao remover a imagem" });
    }
  }
}

export default ImageController;
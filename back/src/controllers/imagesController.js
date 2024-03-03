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
      const { name } = req.body;
  
      const file = req.file;
  
      await image.create({ name, src: file.path });
      res.status(201).json(picture);
    } catch (err) {
      res.status(500).json({ message: "Erro ao salvar a imagem." });
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
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

class ImageController {
  static async listImages(req, res) {
    try {
      const pictures = await prisma.image.findMany();
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

      const picture = await prisma.images.create({
        data: {
          name,
          src: file.path,
          localId: parseInt(req.body.localId),
        },
      });
      res.status(201).json(picture);
    } catch (err) {
      res.status(500).json({ message: "Erro ao salvar a imagem - " + err });
    }
  }

  static async findImagesByLocalId(req, res) {
    try {
      const localId = parseInt(req.query.local_id);
      const imagesFound = await prisma.images.findMany({
        where: { localId: localId },
      });

      if (imagesFound.length > 0) {
        res.status(200).json(imagesFound);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve Image` });
    }
  }

  static async removeImage(req, res) {
    try {
      const picture = await prisma.images.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!picture) {
        return res.status(404).json({ message: "Imagem não encontrada" });
      }
      fs.unlinkSync(picture.src);
      await prisma.images.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json({ message: "Imagem removida com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao remover a imagem" });
    }
  }
}

export default ImageController;
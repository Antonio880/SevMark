import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserController {
  static async listUsers(req, res) {
    let json = { error: '', result: [] };

    try {
      let users = await prisma.users.findMany();
      
      for (let i in users) {
        json.result.push({
          id: users[i].id,
          username: users[i].username,
          password: users[i].password,
          email: users[i].email,
          typeUser: users[i].typeUser
        });
      }

      res.json(json);
    } catch (error) {
      res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
  }

  static async findUserById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const userFound = await prisma.users.findUnique({
        where: { id: id },
      });
      if (userFound) {
        res.status(200).json(userFound);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `Failed to retrieve user: ${error.message}` });
    }
  }

  static async createUser(req, res) {
    try {
      const { typeUser, email } = req.body;
      // Verifique se o usuário com o mesmo e-mail já existe
      const existingUser = await prisma.users.findFirst({
        where: {
          email: email,
          typeUser: typeUser,
        },
      });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      // Se o usuário não existir, crie um novo usuário
      const newUser = await prisma.users.create({
        data: req.body,
      });
      res.status(201).json({ message: 'Created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: `Failed to create user: ${error.message}` });
    }
  }

  // static async updateUser(req, res) {
  //   try {
  //     const id = parseInt(req.params.id);
  //     const userUpdated = await prisma.user.update({
  //       where: { id: id },
  //       data: req.body,
  //     });
  //     res.status(200).json({ message: "User updated", user: userUpdated });
  //   } catch (error) {
  //     res.status(500).json({ message: `Update failed: ${error.message}` });
  //   }
  // }

  /* static async findUserByLocalId(req, res) {
    try {
      const { usuario_id } = req.query;
      const userFound = await prisma.user.findFirst({
        where: { usuario_id: usuario_id },
      });

      if (userFound) {
        res.status(200).json(userFound);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: `Failed to find user: ${error.message}` });
    }
  } */

  // static async deleteUser(req, res) {
  //   try {
  //     const id = parseInt(req.params.id);
  //     await prisma.user.delete({
  //       where: { id: id },
  //     });
  //     res.status(200).json({ message: "User successfully deleted" });
  //   } catch (error) {
  //     res.status(500).json({ message: `Deletion failed: ${error.message}` });
  //   }
  // }

  static async getUser(req, res) {
    try {
      const { email, password } = req.body;
      const existingUser = await prisma.users.findFirst({
        where: {
          email: email,
          password: password,
        },
      });
      if (existingUser) {
        return res.status(200).json({ message: 'Success in requisition', user: existingUser });
      }
      return res.status(400).json({ message: "Email and/or password incorrect" });
    } catch (error) {
      res.status(500).json({ message: `Error retrieving user: ${error.message}` });
    }
  }
}

export default UserController;
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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
      const salt = await bcrypt.genSalt(12);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      // Se o usuário não existir, crie um novo usuário
      const newUser = await prisma.users.create({
        data: req.body
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
      console.log('Email:', email);
      console.log('Password:', password);
  
      const existingUser = await prisma.users.findFirst({
        where: {
          email: email
        },
      });
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('Existing User:', existingUser);
  
      if (!existingUser.password) {
        return res.status(500).json({ message: 'User password is missing in the database' });
      }
  
      console.log('Password Provided:', password);
      console.log('Stored Hashed Password:', existingUser.password);
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      console.log('Is Password Valid:', isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(422).json({ message: 'Passwords do not match' });
      }
  
      const secret = process.env.SECRET;
      const token = jwt.sign({ user: existingUser.id }, secret, { expiresIn: 86400 });
      res.status(200).json({ message: 'User logged in', token });
  
    } catch (error) {
      res.status(500).json({ message: `Error retrieving user: ${error.message}` });
    }
  }
}

export default UserController;
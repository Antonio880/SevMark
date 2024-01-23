import { user } from "../models/user.js";

class UserController {
  static async listUsers(req, res) {
    let json = {error:'', result: []};

    let users = await user.find();
    
    for(let i in users){
      json.result.push({
        id: users[i].id,
        username: users[i].username,
        password: users[i].password,
        email: users[i].email,
        typeUser: users[i].typeUser
      });
    }

    res.json(json);
  }

  static async findUserById(req, res) {
    try {
      const id = req.params.id;
      const userFound = await user.findById(id);
      res.status(200).json(userFound);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to retrieve user` });
    }
  }

  static async createUser(req, res) {
    try {
      const { typeUser, email } = req.body;
      // Verifique se o usuário com o mesmo e-mail já existe
      const usersExisting = await user.find();
      for(let i in usersExisting) {
        if(usersExisting[i].email === email && usersExisting[i].typeUser === typeUser) {
          return res.status(409).json({ message: "User already exists" });
        }
      }
      // Se o usuário não existir, crie um novo usuário
      const newUser = await user.create(req.body);
      res.status(201).json({ message: 'Created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create user` });
    }
  }

  // static async updateUser(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const userUpdated = await user.findByIdAndUpdate(id, req.body);
  //     res.status(200).json({ message: "user updated", user: userUpdated });
  //   } catch (error) {
  //     res.status(500).json({ message: `${error.message} - Update failed` });
  //   }
  // }

  // static async deleteUser(req, res) {
  //   try {
  //     const id = req.params.id;
  //     await user.findByIdAndDelete(id);
  //     res.status(200).json({ message: "user successfully deleted" });
  //   } catch (error) {
  //     res.status(500).json({ message: `${error.message} - Deletion failed` });
  //   }
  // }

  static async getUser(req, res) {
    try {
      const { email, password } = req.body;
      const existingUser = await user.findOne({ email, password });
      if (existingUser) {
        return res.status(200).json({ message: 'Success in requisition', user: existingUser });
      }
      return res.status(400).json({ message: "Email and/or password incorrect" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Error retrieving user` });
    }
  }
}

export default UserController;
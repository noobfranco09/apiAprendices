import {
  getUsersDB,
  getUserporIdDB,
  createUserDB,
  updateUserDB,
  deleteUserDB,
  authUserDB,
  updateImageDb
} from "./auth.model.js";

import { generarToken } from "../helpers/adminTokens.js";


export async function getAllUsers(req, res) {
  try {
    const users = await getUsersDB();
    res.status(200).send({
      status: "ok",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.code + "=>" + error.message,
    });
  }
}

export async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await getUserporIdDB(id);
    if (!user) {
      throw {
        status: "error",
        message: "usuario no encontrado.",
        statusCode: 404,
      };
    }
    res.status(200).send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function createUser(req, res) {
  try {
    let data = req.body;
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!

    const result = await createUserDB(data);
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const result = await updateUserDB(id, data);
    if (result.affectedRows === 0) {
      throw {
        status: "error",
        message: "usuario no encontrado o no hubo cambios para actualizar.",
        statusCode: 404,
      };
    }
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const result = await deleteUserDB(id);
    if (result.affectedRows === 0) {
      throw {
        status: "error",
        message: "usuario no encontrado para eliminar.",
        statusCode: 404,
      };
    }
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function authUser(req, res) {
  try {
    let data = req.body;
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!

    const user = await authUserDB(data);
    console.log(user);
    if (user) {
      const token = generarToken(user[0], process.env.TOKEN_LIFE,);

      res.status(200).send({
        status: "ok",
        user: user[0].user_email,
        foto: user[0].user_foto,
        token: token
      });
    }

  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function subirImagen(req, res) {
  // tratamos el archivo subido a la api
  console.log(req.file);
  if (!req.file && !req.files) {
    return res.status(404).send(
      {
        status: 'error',
        mensaje: 'Petición inválida'
      }
    )
  }
  //validamos la extensión del archivo
  let archivo = req.file.originalname;
  let archivoSeparado = archivo.split(".");
  let extension = archivoSeparado[1];
  // console.log("información de la imágen")
  // console.log(archivo,+'espacio',archivoSeparado,+'espacio',extension)
  //comprobams la extensión y actualizamos la base de datos
  if (extension !== "png" && extension !== "jpg" && extension !== "PNG" && extension !== "JPG") {
    return res.status(400).send({
      status: "error",
      mensaje: "formato de imágen no válido"
    })
  } else {
    //recibimos el parámetro del id
    let userId = req.params.id;
    //recibimos la ruta de la imágen 
    let rutaImagen = req.file.filename;

    //actualizamos en la db;
    let resultado = await updateImageDb(rutaImagen, userId)

    //enviamos mensajes
    return res.status(200).send({
      status: "ok",
      mensaje: "actualizado con éxito"
    })
  }
}

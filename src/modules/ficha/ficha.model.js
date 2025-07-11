import dbconn from "../../config/dbconexion.js";
export async function createFichaDB(fichaData) {
  let idFicha = fichaData.idficha;

  const [fichaExiste] = await dbconn.query(
    "SELECT * FROM ficha WHERE idFicha = ?",
    [idFicha]
  );

  if (fichaExiste.length > 0) {
    throw new Error("La ficha ya existe");
  }

  const fichaNueva = {
    idFicha: fichaData.idficha,
    nombre: fichaData.nombre,
    fechaInicio: fichaData.fechaInicio,
    fechaFinal: fichaData.fechaFinal,
    jornada: fichaData.jornada
  };

  const [result] = await dbconn.query("INSERT INTO ficha SET ?", [fichaNueva]);
  return result;
}

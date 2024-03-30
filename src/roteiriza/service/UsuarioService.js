import Database from './DbService';

const DB_EXEC = Database.getConnection();

export const getUsuario = async () => {
  let results = await DB_EXEC('select * from usuarios');
  return results.rows._array;
}

export const createUsuario = async (param) => {
  let results = await DB_EXEC(
    insert into usuarios(name, email, password)
    values(?,?,?)
    , [param.name, param.email, param.password]);
  return results.rowsAffected;
}

export const updateUsuario = async (param) => {
  let results = await DB_EXEC(
    update into usuarios set name=?, email=?, password=? 
    where id =?
    , [param.name, param.email, param.password, param.id]);
  return results.rowsAffected;
}

export const deleteUsuario = async (id) => {
  let results = await DB_EXEC(
    delete usuarios where id =?
    , [id]);
  return results.rowsAffected;
} 

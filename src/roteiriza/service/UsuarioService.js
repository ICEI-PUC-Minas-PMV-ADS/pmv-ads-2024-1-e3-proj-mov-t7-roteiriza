import Database from './DbService';

const DB_EXEC = Database.getConnection();

export const getUsuario = async () => {
  let results = await DB_EXEC('select * from usuarios');
  console.log(results);
  return results.rows._array;
}

export const login = async (param) => {
  let results = await DB_EXEC(
    'select usuarios.email, usuarios.password from usuarios where usuarios.email = ?',[param.email])

    if (results == null){
      return console.log('Email não existe na base de dados')
    }
    else if (results.email != param.email || results.password != param.password){
      return console.log('Email ou senha incorretos');
    }
}


export const cadastrar = async (param) => {
  await DB_EXEC(
    'insert into usuarios (name, email, password) values (?,?,?)', [param.name, param.email, param.password]
  )
  return results.rowsAffected;
}



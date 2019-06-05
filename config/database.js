module.exports = {
    Connection: {
      user : process.env.NODE_ORACLEDB_USER || "JOSUE",
      password : process.env.NODE_ORACLEDB_PASSWORD || "JOSUE",
      connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "AGSVISTA",
      externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
  };
export const config = {
	host: process.env.PD_HOST,
	port: process.env.PD_PORT,
	baseUrl: "",
	db: {
		host: process.env.DB_HOST ,
		port: process.env.DB_PORT ,
		username: process.env.DB_USERNAME ,
		database: process.env.DB_NAME ,
		password: process.env.DB_PASSWORD 
	  }
  };
  config.baseUrl = `${config.host}:${config.port}/`;
  
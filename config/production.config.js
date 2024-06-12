export const config = {
	host: process.env.PD_HOST,
	port: process.env.PD_PORT,
	baseUrl: "",
	db: {
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 3306,
		username: process.env.DB_USERNAME || "Pushkaran",
		database: process.env.DB_NAME || "Cosmical-Events",
		password: process.env.DB_PASSWORD || "push@123"
	  }
  };
  config.baseUrl = `${config.host}:${config.port}/`;
  
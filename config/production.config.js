export const config = {
	host: "https://cosmical-events-backend.onrender.com",
	port: process.env.PD_PORT,
	baseUrl: "",
	db: {
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 3306,
		username: process.env.DB_USERNAME || "Gaurav",
		database: process.env.DB_NAME || "Cosmical-Events",
		password: process.env.DB_PASSWORD || "Gaurav@123"
	  }
  };
  config.baseUrl = `${config.host}:${config.port}/`;
  
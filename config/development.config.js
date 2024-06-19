export const config = {
	host: "http://localhost",
	port: 5000,
	baseUrl: "",
	db: {
		host: "localhost",
		port: 5432,
		username: "postgres",
		database: "Cosmical-Events",
		password: "gaurav123"
	  }
  };
config.baseUrl = `${config.host}:${config.port}/`;
  
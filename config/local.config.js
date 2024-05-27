export const config = {
	host: "http://localhost",
	port: 5000,
	baseUrl: "",
	db: {
	  host: "localhost",
	  port: 3306,
	  username: "Pushkaran",
	  database: "Cosmical-Events",
	  password: "push@123"
	}
  };
config.baseUrl = `${config.host}:${config.port}/`;
  
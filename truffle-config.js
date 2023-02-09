module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*"        // Any network (default: none)
    }
  },
  migrations_directory: "./src/migrations/",
  contracts_build_directory: "./dist/contracts/",
  contracts_directory: "./src/contracts/",
  compilers: {
    solc: {
      version: "0.8.4",
    },
  },
}
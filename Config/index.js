module.exports = {
    sqlDb: {
        host: process.env.SERVER_HOST || 'localhost',
        dbUser : process.env.DB_USER || 'root',
        dbPassword : process.env.DB_PASSWORD || '',
        dbName : process.env.DB_NAME || 'bwa_db'
    },
    jwtOption: {
        secret: 'ausad4dcas68cas68c165cs546sadf46sd5f4s6d5s6df541s61sdc8sd64sa4r8g4dsfbciksahdkajsdfas',
        expiresIn: '45d'
    },
    serverAuth:{
        secret:'askaasdasas54d6as8d4as68d4as56f84sd6f8s74f154dsa21x65dds4fa7580'
    },
    country: 'en-IN',
    timeZone: 'Asia/Kolkata',
    httpStatusCode: require('./httpStatusCode'),
    errorMessage: require('./errorMessage'),
    userType: {
        ADMIN: "ADMIN",
        SHOP: "SHOP",
        DISTRIBUTOR: "DISTRIBUTOR"
      },
      status: {
          PENDING: "PENDING",
          RCPENDING: "RCPENDING",
          CLOSED: "CLOSED",
          ACTIVE: "ACTIVE",
          RCDONE: "RCDONE",
      }

};
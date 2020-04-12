db.CreateUser(
  {
    user: "root",
    pwd: "admin123",
    roles: [
      {
        role: "readWrite",
        db: "local-nestjs"
      }
    ]
  }
)
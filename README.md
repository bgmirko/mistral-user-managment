# Run the project
1. In root of project run: "docker-compose up --build -d"

2. To enter into server bash: "docker exec -it mistral-user-managment_app_1 sh"

3. Change directory: "cd src/database"

4. In bash run seeders: "npx sequelize-cli db:seed:all"
# Run the project
1. In root of project run: "docker-compose up --build -d"

2. To enter into server shell: "docker exec -it mistral-user-managment_app_1 sh"

3. Change directory: "cd src/database"

4. In shell run seeders: "npx sequelize-cli db:seed:all"
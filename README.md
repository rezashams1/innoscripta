# Take Home Task
To run the services, do as below:

- clone the repository on your machine.
- Install docker and docker compose on your machine.
- If you're running on your local machine, you're good to go. But if rou're running on your server, change the `localhost` inside `/backend/config/cors.php` and replace with  your machine's IP.
- run `docker-compose up --build -d`
- run `docker-compose exec app php artisan passport:install`
- All done! That was it!

## Access Website
To access website, you have two options. `http://localhost:4000` is a build version of react and `http://localhost:4001` is `npm run` version of react. You also have access to phpmyadmin on `http://localhost:8081`. Username is `root` and password is `secret`

## Data Scraping
Data comes from new apis using a Task which runs daily and collects articles, sources, and authors.

## Usage
When you enter the website, you can access the articles with search and filter options. When you log in, you can set your preferences inside `/profile` page. After you log in, filtering options will be disabled and your preferences will be used to fetch articles.
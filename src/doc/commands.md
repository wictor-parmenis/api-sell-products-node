# Creating Docker Image with Postgres
- docker run --name postgres -e POSTGRES_PASSWORD=5b8356c114bd47d689b456664755ae38 -p 5432:5432 -d postgres

# Watch containers in execution
- docker ps

# Run migration
- yarn typeorm migration:run

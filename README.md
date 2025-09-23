
# NestJS API Template

## Start the API
Run the bootstrap script to install dependencies, build the project, and launch the development server (using docker and bun).
```bash
./scripts/on_start.sh
```

The application listens on http://localhost:3000 and exposes Swagger UI at http://localhost:3000/swagger.

## Project Structure
- `src/main.ts` wires up the NestJS application, global pipes, and Swagger configuration.
- `src/app.module.ts` is the root module that aggregates feature modules and global providers.
- `src/controllers/` contains route handlers; create new controllers alongside their feature modules.
- `src/services/` houses injectable service classes that hold business logic shared by controllers.
- `src/modules/` defines feature modules that bind controllers, services, and providers together.
- `src/models/` contains Typegoose classes for MongoDB collections along with request/response DTOs.
- `src/utils/` stores cross-cutting helpers and configuration utilities.

Use Typegoose models from `src/models/` within your services and modules, and register them via the feature module where they are consumed.

# Weather Subscription API

A service that allows users to subscribe to regular weather forecast updates for their chosen city.

## Tasks and Routes

**Tasks:**

* Implement a REST API according to the provided Swagger specification.
* Store all application data in PostgreSQL.
* Automatically run database migrations on service startup to run with Docker.

**Routes:**

* `GET /api/weather?city=<city>`

  * Returns the current weather forecast for the specified city.
* `POST /api/subscribe`

  * Subscribes an email to receive weather updates. Expects form data or JSON:

    * `email` (string, required)
    * `city` (string, required)
    * `frequency` ("hourly" | "daily", required)
* `GET /api/confirm/{token}`

  * Confirms a subscription using the token sent via email.
* `GET /api/unsubscribe/{token}`

  * Unsubscribes an email from updates using the provided token.


## Running Locally (without Docker)

```bash
# Clone the repository
git clone https://github.com/bdendro/weather_subscription_api.git
cd weather_subscription_api

# Install dependencies
npm install

# Copy example environment file
cp .env.example .env

# Run database migrations
npm run migrate

# Start the application
npm start
```

## Additional

* Unfortunately, the repository does not include Docker or Docker Compose configuration files.
* Tests have not been implemented.
* The API has not been deployed to a hosting platform, and an HTML subscription page has not been created.
* Small feature: unconfirmed subscribers are automatically deleted after a specified period of time.

## Author

Oleh Buriachok

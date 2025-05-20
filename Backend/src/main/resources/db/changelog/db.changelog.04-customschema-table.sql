CREATE TABLE IF NOT EXISTS custom_schema (
      id                SERIAL PRIMARY KEY,
      name              VARCHAR(255),
      schema_data       JSONB NOT NULL,
      owner_id          int,
      created_at        TIMESTAMP DEFAULT now()
);
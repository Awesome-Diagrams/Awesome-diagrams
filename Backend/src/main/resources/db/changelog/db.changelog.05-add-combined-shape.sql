CREATE TABLE IF NOT EXISTS combined_shape (
      id                SERIAL PRIMARY KEY,
      name              VARCHAR(255),
      combined_shape 	JSONB NOT NULL,
      owner_id          int,
      created_at        TIMESTAMP DEFAULT now()
);
--changeset me:id1

DROP TABLE IF EXISTS diagrams;

CREATE TABLE diagrams (
      id                SERIAL PRIMARY KEY,
      name              VARCHAR(255),
      diagram_data      JSONB NOT NULL,
      created_at        TIMESTAMP DEFAULT now()
);
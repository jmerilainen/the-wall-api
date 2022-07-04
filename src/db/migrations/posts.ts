export default {
  UP: `CREATE TABLE IF NOT EXISTS posts (
        id serial PRIMARY KEY,
        content text,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )`,
};

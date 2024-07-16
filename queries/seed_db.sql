DROP DATABASE IF EXISTS to_do_list_db;
CREATE DATABASE to_do_list_db;
\c to_do_list_db;

CREATE TABLE users (
    PRIMARY KEY (id),
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()::timestamp
);

CREATE TABLE tasks (
    PRIMARY KEY (id),
    id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    summary VARCHAR(512) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()::timestamp,
    due_by TIMESTAMP WITHOUT TIME ZONE,
    completed BOOLEAN DEFAULT FALSE,
    assigned_to INT,
    CONSTRAINT fk_tasks_user_task FOREIGN KEY(assigned_to) REFERENCES users(id)
);

INSERT INTO users (username) VALUES ('Bob');

INSERT INTO tasks (title, summary, assigned_to) VALUES ('To-Do list app', 'Create the to-do list app', 1);


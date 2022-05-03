CREATE DATABASE session_auth;
CREATE USER session_admin WITH PASSWORD 'sessionpassword';
GRANT ALL PRIVILEGES ON DATABASE session_auth TO session_admin;
-- Migration dump from SQLite to Supabase
BEGIN;

-- Data for lawyers
INSERT INTO lawyers ("id", "name", "email", "oab", "specialty", "created_at") VALUES (1, 'Dr. Roberto Augusto', 'roberto@escritorio.com', 'SP123456', 'Criminal', '2025-12-23 12:46:36.036163') ON CONFLICT (id) DO NOTHING;
INSERT INTO lawyers ("id", "name", "email", "oab", "specialty", "created_at") VALUES (2, 'Dra. Ana', 'ana@escritorio.com', 'SP654321', 'Trabalhista', '2025-12-23 12:46:36.036165') ON CONFLICT (id) DO NOTHING;
INSERT INTO lawyers ("id", "name", "email", "oab", "specialty", "created_at") VALUES (3, 'Carlos Roberto', 'creaty12345@gmail.com', '5415151515', 'Família', '2025-12-23 15:30:09.717228') ON CONFLICT (id) DO NOTHING;

-- Data for contacts
INSERT INTO contacts ("id", "name", "email", "phone", "created_at") VALUES (1, 'João Silva Gomes', 'joao.silva@email.com', '31 983323121', '2025-12-23 12:46:36.032557') ON CONFLICT (id) DO NOTHING;
INSERT INTO contacts ("id", "name", "email", "phone", "created_at") VALUES (2, 'Maria Santos', 'maria.santos@email.com', '(11) 99999-2222', '2025-12-23 12:46:36.032562') ON CONFLICT (id) DO NOTHING;
INSERT INTO contacts ("id", "name", "email", "phone", "created_at") VALUES (3, 'Pedro Franco', 'pedro.franco@email.com', '(11) 99999-3333', '2025-12-23 12:46:36.032563') ON CONFLICT (id) DO NOTHING;
INSERT INTO contacts ("id", "name", "email", "phone", "created_at") VALUES (4, 'Imobiliária House', 'contato@house.com.br', '(11) 3333-4444', '2025-12-23 12:46:36.032563') ON CONFLICT (id) DO NOTHING;
INSERT INTO contacts ("id", "name", "email", "phone", "created_at") VALUES (5, 'Jean Lopes', 'creaty12345@gmail.com', '(31) 98208-7644', '2025-12-23 13:40:08.009566') ON CONFLICT (id) DO NOTHING;

-- Data for user_profiles
INSERT INTO user_profiles ("id", "email", "name", "phone", "address", "role", "created_at") VALUES (1, 'creaty12345@gmail.com', 'creaty12345', NULL, NULL, 'Admin', '2025-12-23 13:42:03.764386') ON CONFLICT (id) DO NOTHING;

-- Data for deals
INSERT INTO deals ("id", "title", "stage", "value", "contact_id", "process_number", "court", "urgency_level", "next_activity_date", "owner_id", "created_at", "description") VALUES (1, 'Divórcio Silva x Silva', 'triagem', 35000.0, 5, '0012345-67.2024.8.26.0100', '1ª Vara Família - SP', 'High', '2025-12-30 00:00:00.000000', 1, '2025-12-23 12:46:36.041395', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO deals ("id", "title", "stage", "value", "contact_id", "process_number", "court", "urgency_level", "next_activity_date", "owner_id", "created_at", "description") VALUES (2, 'Ação Trabalhista XPTO', 'execucao', 120000.0, 2, NULL, NULL, 'Low', '2026-01-01 00:00:00.000000', 1, '2025-12-23 12:46:36.041396', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO deals ("id", "title", "stage", "value", "contact_id", "process_number", "court", "urgency_level", "next_activity_date", "owner_id", "created_at", "description") VALUES (3, 'Inventário Franco', 'execucao', 850000.0, 4, '0000000000021515158', 'MG', 'Medium', '2025-12-25 00:00:00.000000', 1, '2025-12-23 12:46:36.041397', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO deals ("id", "title", "stage", "value", "contact_id", "process_number", "court", "urgency_level", "next_activity_date", "owner_id", "created_at", "description") VALUES (4, 'Execução Aluguéis', 'analise', 15000.0, 4, '0054321-12.2023.8.26.0000', NULL, 'Urgent', '2025-12-23 00:00:00.000000', 2, '2025-12-23 12:46:36.041397', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO deals ("id", "title", "stage", "value", "contact_id", "process_number", "court", "urgency_level", "next_activity_date", "owner_id", "created_at", "description") VALUES (5, 'Compra de Casa Milionária', 'analise', 350000.0, 5, '000000000000000000012151', 'Ciível / SP', 'Medium', '2025-12-26 00:00:00.000000', 1, '2025-12-23 14:28:57.398283', NULL) ON CONFLICT (id) DO NOTHING;

COMMIT;

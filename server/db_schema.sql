-- ZODIAC: RISE OF THE GOD BEAST — PRODUCTION POSTGRESQL DATABASE SCHEMA

-- 1. Accounts Table
CREATE TABLE IF NOT EXISTS accounts (
    player_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_banned BOOLEAN DEFAULT FALSE,
    ban_reason TEXT
);

-- 2. Character Progression Table (Level 0 - 100)
CREATE TABLE IF NOT EXISTS character_progression (
    player_id UUID PRIMARY KEY REFERENCES accounts(player_id) ON DELETE CASCADE,
    character_level INT DEFAULT 0 CHECK (character_level BETWEEN 0 AND 100),
    experience_points BIGINT DEFAULT 0,
    selected_path VARCHAR(20) DEFAULT 'unchosen', -- 'physical', 'arcana', 'elemental'
    serums_consumed INT DEFAULT 0,
    skill_points_available INT DEFAULT 0,
    god_beast_unlocked BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Match Statistics & Battle Royale History
CREATE TABLE IF NOT EXISTS match_history (
    match_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES accounts(player_id) ON DELETE CASCADE,
    match_mode VARCHAR(20) NOT NULL, -- 'solo', 'duo', 'squad'
    placement INT NOT NULL,
    eliminations INT DEFAULT 0,
    damage_dealt FLOAT DEFAULT 0.0,
    survival_time_seconds INT DEFAULT 0,
    rank_points_gained INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Ranked Leaderboard Table
CREATE TABLE IF NOT EXISTS player_ranks (
    player_id UUID PRIMARY KEY REFERENCES accounts(player_id) ON DELETE CASCADE,
    rank_tier VARCHAR(20) DEFAULT 'Bronze', -- 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'GodTier'
    mmr_rating INT DEFAULT 1000,
    total_wins INT DEFAULT 0,
    total_matches INT DEFAULT 0,
    season_id INT DEFAULT 1
);

-- 5. Anti-Cheat Security Audit Logs
CREATE TABLE IF NOT EXISTS anticheat_logs (
    log_id BIGSERIAL PRIMARY KEY,
    player_id UUID REFERENCES accounts(player_id),
    violation_type VARCHAR(50) NOT NULL, -- 'speed_hack', 'teleport', 'invalid_damage', 'packet_manipulation'
    severity_level VARCHAR(10) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

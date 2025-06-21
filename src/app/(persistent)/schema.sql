-- 확장 모듈 설정
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 역할(roles) 테이블
CREATE TABLE IF NOT EXISTS roles (
    id             SERIAL PRIMARY KEY,
    created_at     TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at     TIMESTAMP DEFAULT NOW() NOT NULL,
    is_system_role BOOLEAN DEFAULT FALSE NOT NULL,
    role           VARCHAR NOT NULL
);

-- 권한(permissions) 테이블
CREATE TABLE IF NOT EXISTS permissions (
    id          SERIAL PRIMARY KEY,
    created_at  TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at  TIMESTAMP DEFAULT NOW() NOT NULL,
    permission  VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

-- 사용자(users) 테이블
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    created_at    TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at    TIMESTAMP DEFAULT NOW() NOT NULL,
    nick_name     VARCHAR NOT NULL UNIQUE,
    password      VARCHAR NOT NULL,  -- JWT 토큰 저장
    role_id       INTEGER NOT NULL REFERENCES roles(id),
    permission_id INTEGER NOT NULL REFERENCES permissions(id),
    avatar_url    VARCHAR DEFAULT '' NOT NULL,
    email         VARCHAR NOT NULL UNIQUE
);

-- 게시물(posts) 테이블
CREATE TABLE IF NOT EXISTS posts (
    id          SERIAL PRIMARY KEY,
    created_at  TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at  TIMESTAMP DEFAULT NOW() NOT NULL,
    user_id     INTEGER NOT NULL REFERENCES users(id),
    title       VARCHAR NOT NULL,
    category_id INTEGER NOT NULL,
    content     TEXT NOT NULL,  -- VARCHAR에서 TEXT로 변경하여 대용량 컨텐츠 지원
    status      VARCHAR DEFAULT 'draft' NOT NULL,
    view_count  INTEGER DEFAULT 0 NOT NULL
);

-- 태그(tags) 테이블
CREATE TABLE IF NOT EXISTS tags (
    id         SERIAL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    name       VARCHAR NOT NULL,
    post_id    INTEGER NOT NULL REFERENCES posts(id),
    color_hex  VARCHAR NOT NULL,
    PRIMARY KEY (id, name, color_hex)
);

-- 게시물-태그 연결 테이블
CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- 사이드바 카테고리 테이블
CREATE TABLE IF NOT EXISTS sidebar_categories (
    id                 SERIAL PRIMARY KEY,
    created_at         TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at         TIMESTAMP DEFAULT NOW() NOT NULL,
    name               VARCHAR NOT NULL,
    display_order      INTEGER NOT NULL,
    parent_category_id INTEGER REFERENCES sidebar_categories(id),
    created_by         INTEGER NOT NULL REFERENCES users(id)
);

-- 사용자-역할 연결 테이블
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 게시물-카테고리 연결 테이블
CREATE TABLE IF NOT EXISTS post_categories (
    post_id     INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES sidebar_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- 소셜 계정 테이블
CREATE TABLE IF NOT EXISTS social_accounts (
    id          SERIAL PRIMARY KEY,
    created_at  TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at  TIMESTAMP DEFAULT NOW() NOT NULL,
    user_id     INTEGER NOT NULL REFERENCES users(id),
    provider    VARCHAR NOT NULL UNIQUE,
    provider_id VARCHAR NOT NULL UNIQUE,
    email       VARCHAR NOT NULL
);

-- 역할-권한 연결 테이블
CREATE TABLE IF NOT EXISTS role_permission (
    id            SERIAL PRIMARY KEY,
    role_id       INTEGER NOT NULL UNIQUE REFERENCES roles(id),
    permission_id INTEGER NOT NULL UNIQUE REFERENCES permissions(id)
);

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS comments (
    id         SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    post_id    INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
    content    TEXT NOT NULL
);

-- 미디어 자산 테이블
CREATE TABLE IF NOT EXISTS media_assets (
    id                SERIAL PRIMARY KEY,
    created_at       TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at       TIMESTAMP DEFAULT NOW() NOT NULL,
    asset_id          VARCHAR NOT NULL UNIQUE,
    original_filename VARCHAR NOT NULL,
    cdn_url           VARCHAR NOT NULL UNIQUE,
    file_size         INTEGER NOT NULL,
    mime_type         VARCHAR,
    uploaded_at       TIMESTAMP DEFAULT NOW() NOT NULL,
    is_cached         BOOLEAN DEFAULT FALSE NOT NULL,
    cache_expiry      TIMESTAMP,
    storage_tier      VARCHAR DEFAULT 'hot'
);

-- 각 테이블에 대한 소유자 설정
ALTER TABLE roles OWNER TO postgres;
ALTER TABLE permissions OWNER TO postgres;
ALTER TABLE users OWNER TO postgres;
ALTER TABLE posts OWNER TO postgres;
ALTER TABLE tags OWNER TO postgres;
ALTER TABLE post_tags OWNER TO postgres;
ALTER TABLE sidebar_categories OWNER TO postgres;
ALTER TABLE user_roles OWNER TO postgres;
ALTER TABLE post_categories OWNER TO postgres;
ALTER TABLE social_accounts OWNER TO postgres;
ALTER TABLE role_permission OWNER TO postgres;
ALTER TABLE comments OWNER TO postgres;
ALTER TABLE media_assets OWNER TO postgres;


-- 1. Bảng Skills (chuẩn hóa kỹ năng theo dự án)
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

-- 2. Bảng Tasks (thêm deadline)
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('Cao', 'Trung bình', 'Thấp')),
    hours INTEGER NOT NULL,
    deadline TIMESTAMPTZ -- Thêm deadline
);

-- 3. Junction table Tasks <-> Skills
CREATE TABLE task_skills (
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, skill_id)
);

-- 4. Junction table Members <-> Skills
CREATE TABLE member_skills (
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (member_id, skill_id)
);

-- 5. Bảng Assignments (loại bỏ id, dùng PK composite)
CREATE TABLE assignments (
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (task_id, member_id) -- PK composite
);

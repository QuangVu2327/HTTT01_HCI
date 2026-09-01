import os

MODULE_FILES = ["skill.md", "plan.md", "changelog.md", "messages.md"]
DATA_SUBDIRS = ["assets", "output", "raw"]

def validate_module(module_path):
    print(f"Validating module: {module_path}")
    missing = []
    
    # Check core files
    for file in MODULE_FILES:
        if not os.path.exists(os.path.join(module_path, file)):
            missing.append(file)
            
    # Check data dir
    data_dir = os.path.join(module_path, "data")
    if not os.path.exists(data_dir):
        missing.append("data/")
    else:
        for sub in DATA_SUBDIRS:
            if not os.path.exists(os.path.join(data_dir, sub)):
                missing.append(f"data/{sub}/")
                
    if missing:
        print(f"Missing items in {module_path}: {', '.join(missing)}")
    else:
        print(f"Module {module_path} is valid.")

if __name__ == "__main__":
    # Validate all subdirectories that seem to be modules
    for root, dirs, files in os.walk("."):
        if root != "." and ".opencode" not in root and "backup" not in root and "knowledge" not in root and "templates" not in root and "rules" not in root:
            # Simple heuristic: if it has a 'data' folder, it's a module
            if "data" in dirs:
                validate_module(root)

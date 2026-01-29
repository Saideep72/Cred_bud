import re

def validate_phone(phone: str) -> bool:
    # Basic validation for Indian numbers or generic
    pattern = re.compile(r"^\+?[0-9]{10,13}$")
    return bool(pattern.match(phone))

def validate_file_size(file_size: int, limit_mb: int = 5) -> bool:
    return file_size <= limit_mb * 1024 * 1024

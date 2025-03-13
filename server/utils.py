import re

def validate_username(username: str) -> bool:
    """Validates if the username meets the required criteria."""
    if not username:
        return False  # Username cannot be empty
    if len(username) < 3 or len(username) > 20:
        return False  # Length constraints
    if not re.match("^[a-zA-Z0-9]+$", username):  
        return False  # Only allow alphanumeric characters
    return True

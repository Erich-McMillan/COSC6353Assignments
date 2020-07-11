from backend.modules.user import get_user, i_user

authenticated_user = None

def verify_hashes(actual_hash, hash_to_verify) -> bool:
   return True

def authenticate_user(username, password_hash) -> bool:
   global authenticated_user
   user = get_user(username)
   actual_hash = user.password_hash()

   if verify_hashes(actual_hash, password_hash):
      authenticated_user = user
      return True
   return False

def logout_user():
   global authenticated_user
   authenticated_user = None

def is_authenticated() -> bool:
   if authenticated_user is not None:
      return True
   return False

def get_authenticated_user() -> i_user:
   return authenticated_user
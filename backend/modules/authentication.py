from backend.modules.user import get_user, i_user

authenticated_user = None

# create temporary user
# user = get_user('erich')
# user.save_to_db('erich', bytes('abc', 'utf-8'))

def verify_hashes(actual_hash: bytes, hash_to_verify: bytes) -> bool:
   return actual_hash == hash_to_verify

def authenticate_user(username, password_hash) -> bool:
   global authenticated_user
   user = get_user(username)
   actual_hash = user.password_hash()

   if verify_hashes(actual_hash, bytes(password_hash, 'utf-8')):
      authenticated_user = user
      return True
   return False

def register_user(username, password_hash) -> bool:
   global authenticated_user
   user = get_user(username)

   if user.exists_in_db(username):
      return False # can't register since username already in database

   return user.save_to_db(username, password_hash)

def logout_user():
   global authenticated_user
   authenticated_user = None

def is_authenticated() -> bool:
   if authenticated_user is not None:
      return True
   return False

def get_authenticated_user() -> i_user:
   return authenticated_user
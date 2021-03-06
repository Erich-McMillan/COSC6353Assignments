from abc import abstractmethod
from backend.modules.database_helper import i_db_obj, get_database
from pymongo import MongoClient

class i_user(i_db_obj):
   @abstractmethod
   def username(self) -> str:
      pass

   @abstractmethod
   def password_hash(self) -> bytes:
      pass

class _user(i_user):
   _database_collection_name = 'users'

   def __init__(self):
      self._database_entry = None

   def username(self) -> str:
      if self._database_entry is not None:
         return self._database_entry['username']
      return None

   def password_hash(self) -> bytes:
      if self._database_entry is not None:
         return self._database_entry['password_hash']
      return None

   def save_to_db(self, username: str, password_hash: bytes) -> bool:
      if username is None or password_hash is None:
         return False
      if self._database_entry is not None:
         self.remove_from_db()
      database_collection = self.get_database()[_user._database_collection_name]
      self._database_entry = database_collection.insert_one({'username':username, 'password_hash':bytes(password_hash, 'utf-8')})
      if self._database_entry is None:
         return False
      return True

   def load_from_db(self, username) -> bool:
      database_collection = self.get_database()[_user._database_collection_name]
      self._database_entry = database_collection.find_one({'username':username})
      if self._database_entry is None:
         return False
      return True

   def remove_from_db(self) -> bool:
      database_collection = self.get_database()[_user._database_collection_name]
      self._database_entry = database_collection.find_one_and_delete(self._database_entry)
      if self._database_entry is None:
         return False
      self._database_entry = None
      return True

   def exists_in_db(self, username) -> bool:
      if self._database_entry is not None:
         return True
      return self.load_from_db(username)

   def as_dict(self):
      raise NotImplementedError("No need for this method in _user, should not be called.")


def get_user(username) -> i_user:
   usr = _user()
   usr.load_from_db(username)
   return usr
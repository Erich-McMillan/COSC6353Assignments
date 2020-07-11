from abc import abstractmethod
from backend.modules.database_helper import i_db_obj, get_database
from pymongo import MongoClient

class i_user(i_db_obj):
   @abstractmethod
   def username(self) -> str:
      return None

   @abstractmethod
   def password_hash(self) -> bytes:
      return None

class _user(i_user):
   _database_collection = 'users'

   def __init__(self, username):
      self._username = username

   def save_to_db(self) -> bool:
      # double check that user doesn't already exist before adding?
      # if password hash update then should defintely only overwrite the previous hash
      return True

   def username(self) -> str:
      return self._username

   def password_hash(self) -> bytes:
      return bytes()


def get_user(username) -> i_user:
   return _user(username)
from abc import abstractmethod
from pymongo import MongoClient

class _database:
   _database_url = None
   _database_instance = None

   def __init__(self):
      if _database._database_url is None:
         raise AssertionError('database_url is None, and must be configured before use.')
      if _database._database_instance is None:
         _database._database_instance = MongoClient(_database._database_url)

def setup_database(url):
   if _database._database_url is None:
      _database._database_url = url

def get_database():
   return _database()._database_instance


class i_db_obj:
   @abstractmethod
   def save_to_db(self) -> bool:
      return True

   @abstractmethod
   def load_from_db(self) -> bool:
      return True

   @abstractmethod
   def remove_from_db(self) -> bool:
      return True

   @abstractmethod
   def as_json(self) -> dict:
      return None


   def get_database(self) -> MongoClient:
      return get_database()

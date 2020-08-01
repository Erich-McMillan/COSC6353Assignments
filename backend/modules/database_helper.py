from abc import abstractmethod
from pymongo import MongoClient

class _database:
   _database_url = 'localhost'
   _database_port = 27017
   _database_instance = None

   def __init__(self):
      if _database._database_url is None:
         raise AssertionError('database_url is None, and must be configured before use.')
      if _database._database_instance is None:
         _database._database_instance = MongoClient(_database._database_url, _database._database_port)

def setup_database(url):
   if _database._database_url is None:
      _database._database_url = url

def get_database() -> MongoClient:
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
   def exists_in_db(self) -> bool:
      return True

   @abstractmethod
   def as_dict(self) -> dict:
      return None

   def get_database(self) -> MongoClient:
      return get_database().appdb

   #MONGODB query examples:
   """
   def check_username(user_search):
      #get the database
      database = get_database()
      
      #get the collection (kind of like the table in SQL)
      userTable = database["userCredentials"]
      
      #make your query in json format
      search_term = {"username": user_search}
      
      #find what you were looking for, in this case it is just seeing if it exists
      x = userTable.find(search_term)
      if x["username"] == user_search:
         return true
      else:
         return false   

   def register_to_userCredentials(data):
      database = get_database()
      userTable = database["UserCredentials"]
      credentials = {"username": data.username, "password": data.password}
      exists = check_username(data.username)
      if exists:
         return
      else:
         x = userTable.insert_one(credentials)
         return
   
   def find_client_info(primary_address):
      database = get_database()
      clientTable = database["ClientInformation"]
      search_term = {"primaryAddress": primary_address}
      x = clientTable
   """

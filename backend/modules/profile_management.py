from abc import abstractmethod
from backend.modules.user import i_user
from backend.modules.database_helper import i_db_obj

class street_address():
   def __init__(self):
      self._street_house = ''
      self._city = ''
      self._state = ''
      self._zipcode = ''

   @property
   def street_house(self):
      return self._street_house

   @street_house.setter
   def street_house(self, new_street_house):
      # truncate address to 100 characters
      self._street_house = new_street_house[:100] if len(new_street_house) > 100 else new_street_house

   @property
   def city(self):
      return self._city

   @city.setter
   def city(self, new_city):
      # truncate city to 100 characters
      self._city = new_city[:100] if len(new_city) > 100 else new_city

   @property
   def state(self):
      return self._state

   @state.setter
   def state(self, new_state):
      # truncate state to 2 characters
      self._state = '' if len(new_state) != 2 else new_state

   @property
   def zipcode(self):
      return self._zipcode

   @zipcode.setter
   def zipcode(self, new_zipcode):
      # force zipcode to be 5 or 9 characters otherwise just set back to blank to force user interface update
      self._zipcode = new_zipcode if len(new_zipcode) == 5 or len(new_zipcode) == 9 else ''

   def as_dict(self):
      return {
         'address':self.street_house,
         'city':self.city,
         'state':self.state,
         'zipcode':self.zipcode
      }

def street_address_from_dict(from_dict: dict) -> street_address:
   addr = street_address()
   addr.street_house = from_dict['address']
   addr.city = from_dict['city']
   addr.state = from_dict['state']
   addr.zipcode = from_dict['zipcode']
   return addr

class i_profile(i_db_obj):
   pass

class _profile(i_profile):
   _profile_collection_name = 'profile'

   def __init__(self, user: i_user):
      self._database_entry = None
      self._user = user
      self.fullname = ''
      self.address_1 = street_address()
      self.address_2 = street_address()

   def load_from_db(self) -> bool:
      database_collection = self.get_database()[_profile._profile_collection_name]
      self._database_entry = database_collection.find_one({'username':self._user.username()})
      if self._database_entry is None:
         return False
      self.fullname = self._database_entry['fullname']
      self.address_1 = street_address_from_dict(self._database_entry['address1'])
      self.address_2 = street_address_from_dict(self._database_entry['address2'])
      return True

   def save_to_db(self) -> bool:
      if self._database_entry is not None:
         self.remove_from_db()
      database_collection = self.get_database()[_profile._profile_collection_name]
      self._database_entry = database_collection.insert_one(self.as_dict())
      if self._database_entry is None:
         return False
      return True

   def remove_from_db(self) -> bool:
      database_collection = self.get_database()[_profile._profile_collection_name]
      self._database_entry = database_collection.find_one_and_delete(self._database_entry)
      if self._database_entry is None:
         return False
      self._database_entry = None
      return True

   def as_dict(self) -> dict:
      return {
         'username':self._user.username(),
         'fullname': self.fullname,
         'address1': self.address_1.as_dict(),
         'address2': self.address_2.as_dict(),
      }

def update_profile(user: i_user, new_profile_data: dict) -> i_profile:
   user_profile = _profile(user)
   user_profile.fullname = new_profile_data['fullname']
   user_profile.address_1 = street_address_from_dict(new_profile_data['address1'])
   user_profile.address_2 = street_address_from_dict(new_profile_data['address2'])
   user_profile.save_to_db()
   return user_profile.as_dict()


def get_profile(user: i_user) -> i_profile:
   user_profile = _profile(user)
   user_profile.load_from_db()
   return user_profile.as_dict()
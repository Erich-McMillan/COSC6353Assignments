from abc import abstractmethod
from backend.modules.user import i_user
from backend.modules.database_helper import i_db_obj

class street_address():
   def __init__(self):
      self._street_house = None
      self._city = None
      self._state = None
      self._zipcode = None

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


class i_profile(i_db_obj):
   pass

class profile(i_profile):
   def __init__(self):
      pass

   def load_from_db(self, user: i_user) -> bool:
      self.fullname = 'test user'

      addr_1 = street_address()
      addr_1.street_house = '1111 test st.'
      addr_1.state = 'TX'
      addr_1.zipcode = '77002'
      self.address_1 = addr_1

      addr_2 = street_address()
      addr_2.street_house = '2222 testing st.'
      addr_2.state = 'CA'
      addr_2.zipcode = '22319'
      self.address_2 = addr_2

      return True

   def save_to_db(self) -> bool:
      return True

   def remove_from_db(self) -> bool:
      return True

   def as_json(self) -> dict:
      return {
         'fullname': self.fullname,
         'address 1': self.address_1.street_house,
         'address 2': self.address_2.street_house,
         'city': self.address_1.city,
         'state': self.address_1.state,
         'zipcode': self.address_1.zipcode
      }


# below globals are temporary for db fakeout
user_profile = profile()

def update_profile(user: i_user, new_profile_data: dict) -> i_profile:
   global user_profile
   user_profile.fullname = new_profile_data['fullname']
   addr_1 = street_address()
   addr_1.street_house = new_profile_data['address 1']
   addr_1.city = new_profile_data['city']
   addr_1.state = new_profile_data['state']
   addr_1.zipcode = new_profile_data['zipcode']
   user_profile.address_1 = addr_1

   addr_2 = street_address()
   addr_2.street_house = new_profile_data['address 2']
   addr_2.city = new_profile_data['city']
   addr_2.state = new_profile_data['state']
   addr_2.zipcode = new_profile_data['zipcode']
   user_profile.address_2 = addr_2

   user_profile.save_to_db()
   return user_profile.as_json()


def get_profile(user: i_user) -> i_profile:
   global user_profile
   user_profile.load_from_db(user)
   return user_profile.as_json()
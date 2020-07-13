from backend.modules.database_helper import i_db_obj, get_database
from backend.modules.user import i_user
from backend.modules.profile_management import street_address_from_dict, street_address

class quote(i_db_obj):

   _quote_collection_name = 'quotes'

   def __init__(self):
      self.gallons_requested = None
      self.username = None
      self.delivery_addr = street_address()
      self.delivery_date = None
      self.price_per_gallon = None

   def load_from_db(self):
      raise NotImplementedError("No need for this method, but could be implemented later.")

   def remove_from_db(self):
      raise NotImplementedError("No need for this method, but could be implemented later.")

   def save_to_db(self):
      database_collection = self.get_database()[quote._quote_collection_name]
      self._database_entry = database_collection.insert_one(self.as_dict())
      if self._database_entry is None:
         return False
      return True

   def as_dict(self) -> dict:
      if self.gallons_requested is None:
         raise AssertionError('Gallons requested must be assigned')
      if self.username is None:
         raise AssertionError('Must have username')
      if self.price_per_gallon is None:
         raise AssertionError('Must have price per gallon')
      return {
         'username':self.username,
         'gallons_requested':self.gallons_requested,
         'delivery_addr':self.delivery_addr.as_dict(),
         'price_per_gallon':self.price_per_gallon,
         'delivery_date':self.delivery_date
      }

def quote_from_dict(fromdict: dict)-> quote:
   fuel_quote = quote()
   fuel_quote.username = fromdict['username']
   fuel_quote.gallons_requested = fromdict['gallons_requested']
   fuel_quote.delivery_addr = street_address_from_dict(fromdict['delivery_addr'])
   fuel_quote.price_per_gallon = fuel_quote.gallons_requested * 10 # needs to use pricing module
   fuel_quote.delivery_date = fromdict['delivery_date']
   return fuel_quote

def get_quote(user: i_user, quote_request: dict):
   quote_request['username'] = user.username()
   q = quote_from_dict(quote_request)
   q.save_to_db() #always save the quote whenever made
   return q.as_dict()

def get_quote_history(user: i_user):
   quote_collection = (get_database().appdb)[quote._quote_collection_name]
   quotes = quote_collection.find({'username' : user.username()})
   quote_array = {}
   i = 0
   for q in quotes:
      quote_array[i] = quote_from_dict(q).as_dict()
      i += 1
   return quote_array
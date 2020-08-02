from backend.modules.database_helper import i_db_obj, get_database
from backend.modules.user import i_user
import backend.modules.user as users
from backend.modules.profile_management import street_address_from_dict, street_address
import json
from decimal import Decimal, ROUND_DOWN

class quote(i_db_obj):

   _quote_collection_name = 'quotes'

   def __init__(self):
      self.gallons_requested = None
      self.username = None
      self.delivery_addr = street_address()
      self.delivery_date = None
      self.price_per_gallon = None
      self.total_cost = None

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
         'delivery_date':self.delivery_date,
         'total_cost':self.total_cost
      }

def get_quote_history(user: i_user):
   quote_collection = (get_database().appdb)[quote._quote_collection_name]
   quotes = quote_collection.find({'username' : user.username()})
   quote_array = []
   for q in quotes:
      quote_array.append(quote_from_dict(q).as_dict())
   return quote_array

def get_number_of_user_quotes(user: i_user):
   quote_collection = (get_database().appdb)[quote._quote_collection_name]
   quotes = quote_collection.find({'username' : user.username()})
   count = 0
   for q in quotes:
      count += 1
   return count

def determine_margin(has_history: bool, is_bulk: bool, is_texas: bool) -> float:
   margin = 1.1
   
   if has_history:
      margin += 0.01
   if is_texas:
      margin += 0.02
   else:
      margin += 0.04
   if is_bulk:
      margin += 0.02
   else:
      margin += 0.03

   return margin

def calculate_quote(username: str, numGallons: int, deliveryAddr: street_address) -> str:
   user = users.get_user(username)
   has_quote_history = get_number_of_user_quotes(user) > 0
   is_texas = deliveryAddr.state.lower() == "TX"
   bulk_order = numGallons >= 1000

   margin = determine_margin(has_quote_history, bulk_order, is_texas)
   price = 1.5 * margin

   # return '{:,.2f}'.format(price)
   return price

def quote_from_dict(fromdict: dict)-> quote:
   fuel_quote = quote()
   fuel_quote.username = fromdict['username']
   fuel_quote.gallons_requested = int(fromdict['gallons_requested'])
   fuel_quote.delivery_addr = street_address_from_dict(fromdict['delivery_addr'])
   fuel_quote.price_per_gallon = float(fromdict['price_per_gallon'])
   fuel_quote.delivery_date = fromdict['delivery_date']
   fuel_quote.total_cost = fuel_quote.price_per_gallon * fuel_quote.gallons_requested
   return fuel_quote

def fill_quote_from_dict(fromdict: dict)-> quote:
   fuel_quote = quote()
   fuel_quote.username = fromdict['username']
   fuel_quote.gallons_requested = int(fromdict['gallons_requested'])
   fuel_quote.delivery_addr = street_address_from_dict(fromdict['delivery_addr'])
   fuel_quote.price_per_gallon = calculate_quote(fuel_quote.username, fuel_quote.gallons_requested, fuel_quote.delivery_addr)
   fuel_quote.delivery_date = fromdict['delivery_date']
   fuel_quote.total_cost = fuel_quote.price_per_gallon * fuel_quote.gallons_requested
   return fuel_quote

def get_quote(user: i_user, quote_request):
   quote_request['username'] = user.username()
   q = fill_quote_from_dict(quote_request)
   q.save_to_db() #always save the quote whenever made
   return q.as_dict()

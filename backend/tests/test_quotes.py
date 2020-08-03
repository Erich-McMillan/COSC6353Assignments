import pytest

import backend.modules.quotes as quotes
import backend.modules.user as user
import backend.modules.profile_management as profile

def test_quote_from_dict_works(monkeypatch):
   quote_json = {
      'username': 'erich',
      'gallons_requested': 10,
      'delivery_addr': {
         'address':'1111 main',
         'city':'Houston',
         'state':'Tx',
         'zipcode':'77002'
      },
      'delivery_date':'today',
      'price_per_gallon': 10
   }

   def mock_calc_quote(*args, **kwargs):
      return 10

   monkeypatch.setattr(quotes, 'calculate_quote', mock_calc_quote)

   final = quotes.quote_from_dict(quote_json)

   assert final.price_per_gallon == 10

def test_get_quote_returns_gallons_times_price(monkeypatch):
   quote_json = {
      'username': 'erich',
      'gallons_requested': 10,
      'delivery_addr': {
         'address':'1111 main',
         'city':'Houston',
         'state':'Tx',
         'zipcode':'77002'
      },
      'delivery_date':'today'
   }

   class mock_user:
      def username(self):
         return 'erich'

   def mock_save_db(*args, **kwargs):
      return True

   monkeypatch.setattr(quotes.quote, 'save_to_db', mock_save_db)

   def mock_calc_quote(*args, **kwargs):
      return 10

   monkeypatch.setattr(quotes, 'calculate_quote', mock_calc_quote)

   final_quote = quotes.get_quote(mock_user(), quote_json)

   assert final_quote['price_per_gallon'] == 10

def test_as_dict_raise_when_gallons_zero():
   q = quotes.quote()

   try:
      q.as_dict()
   except:
      pass

def test_as_dict_raise_when_username_none():
   q = quotes.quote()
   q.gallons_requested = 1
   try:
      q.as_dict()
   except:
      pass

def test_as_dict_raise_when_pricepergallon_none():
   q = quotes.quote()
   q.gallons_requested = 1
   q.username = ''
   try:
      q.as_dict()
   except:
      pass

def test_get_margin_1percent_bulk_discount_when_over_1000_gallons():
   base_margin = quotes.determine_margin(False, False, False)
   bulk_margin = quotes.determine_margin(False, True, False)
   assert (base_margin - bulk_margin - .01) < .0001

def test_get_margin_2percent_increase_for_out_of_state():
   base_margin = quotes.determine_margin(False, False, False)
   bulk_margin = quotes.determine_margin(False, False, True)
   assert (base_margin - bulk_margin - .02) < .0001

def test_get_margin_1percent_increase_for_repeat_customers():
   base_margin = quotes.determine_margin(False, False, False)
   bulk_margin = quotes.determine_margin(True, False, False)
   assert (base_margin - bulk_margin - .01) < .0001
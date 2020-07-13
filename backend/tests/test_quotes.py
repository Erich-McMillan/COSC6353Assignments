import pytest

import backend.modules.quotes as quotes

def test_quote_from_dict_works():
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

   final = quotes.quote_from_dict(quote_json)

   assert final.price_per_gallon == 100

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

   final_quote = quotes.get_quote(mock_user(), quote_json)

   assert final_quote['price_per_gallon'] == 100

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
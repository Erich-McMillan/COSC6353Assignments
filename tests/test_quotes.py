import pytest

import backend.modules.quotes as quotes

def test_get_quote_history_returns_list():
   hist = quotes.get_quote_history(None)

   assert isinstance(hist, list)

def test_get_quote_returns_gallons_times_price():
   quote_req = {
      'address' : '',
      'date' : '',
      'gallons' : 10
   }
   quote = quotes.get_quote(None, quote_req)

   assert quote == 100
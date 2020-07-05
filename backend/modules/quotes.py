from backend.modules.user import i_user

def get_quote(user: i_user, quote_request: dict):
   delivery_address = quote_request['address']
   delivery_date = quote_request['date']
   return quote_request['gallons'] * 10

def get_quote_history(user: i_user):
   return [
      {
            'gallons': 10,
            'delivery address': '301 Fannin St. Houston, Texas 77002',
            'order date': '08/05/2020',
            'price per gallon':'2',
            'total cost':'20'
         },
         {
            'gallons': 24,
            'delivery address': '301 Fannin St. Houston, Texas 77002',
            'order date': '05/07/2019',
            'price per gallon':'1',
            'total cost':'24'
         },
         {
            'gallons': 7,
            'delivery address': '301 Fannin St. Houston, Texas 77002',
            'order date': '10/06/2018',
            'price per gallon':'10',
            'total cost':'70'
         }
   ]
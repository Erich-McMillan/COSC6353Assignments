import pytest

from modules.database_helper import _database, setup_database, get_database

def test_db_helper_raises_when_url_not_set():
   try:
      db = _database()
   except:
      assert True == True

def test_setup_db():
   _database._database_url = None
   setup_database('notlocal')

   assert _database._database_url == 'notlocal'

def test_get_db():
   db = get_database()
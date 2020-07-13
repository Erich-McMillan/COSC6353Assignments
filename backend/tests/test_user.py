import pytest

import backend.modules.user as user

def test_user_returns_username():
   u = user._user()

   u._database_entry = {
      'username':'test'
   }

   assert u.username() == 'test'


def test_user_returns_none_when_not_loaded():
   u = user._user()

   u._database_entry = None

   assert u.username() == None

def test_get_user_returns_loaded_user(monkeypatch):

   def mock_db_load(self, username):
      self._database_entry = {
         'username':username
      }

   monkeypatch.setattr(user._user, 'load_from_db', mock_db_load)

   u = user.get_user('test')

   assert u.username() == 'test'

def test_user_returns_password_hash():
   u = user._user()

   u._database_entry = {
      'password_hash':b'test'
   }

   assert u.password_hash() == b'test'

def test_user_returns_none_password_hash_when_not_loaded():
   u = user._user()

   u._database_entry = None

   assert u.password_hash() == None

def test_exists_returns_true_when_entry_not_none():
   u = user._user()
   u._database_entry = {}

   assert u.exists_in_db('username') == True

def test_as_dict_raises():
   try:
      u = user._user()
      u.as_dict
   except:
      pass

def test_save_to_db_returns_false_when_username_none():
   u = user._user()
   ret = u.save_to_db(None, '')

   assert ret == False

def test_iuser_username():
   u = user.i_user()

   u.username()

def test_iuser_password_hash():
   u = user.i_user()

   u.password_hash()
import pytest

import backend.modules.authentication as auth
import backend.modules.user as user

def test_authenticate_user_returns_false_when_hashes_dont_match(monkeypatch):
   class mock_user:
      def password_hash(self):
         return bytes()

   def mock_get_user(*args, **kwargs):
      return mock_user()

   monkeypatch.setattr(user, 'get_user', mock_get_user)

   valid = auth.authenticate_user('testuser', 'dumbhash')

   assert valid == False

def test_authenticate_user_returns_true_when_hashes_match(monkeypatch):

   def mock_get_user(*args, **kwargs):
      class mock_user:
         def password_hash(self):
            return bytes('test', 'utf-8')
      return mock_user()

   monkeypatch.setattr(user, 'get_user', mock_get_user)

   valid = auth.authenticate_user('testuser', 'test')

   assert valid == True

def test_logout_user_sets_auth_user_to_none():
   auth.authenticated_user = "not none"
   auth.logout_user()

   assert auth.authenticated_user is None

def test_is_authenticated_returns_false_if_no_user_logged_in():
   auth.authenticated_user = None
   allowed = auth.is_authenticated()

   assert allowed == False

def test_is_authenticated_returns_true_if_user_logged_in():
   auth.authenticated_user = 'not none'
   allowed = auth.is_authenticated()

   assert allowed == True
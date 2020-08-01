import pytest

import backend.modules.authentication as auth

def test_authenticate_user_returns_false_when_hashes_dont_match(monkeypatch):
   def mock_verify_hashes(*args, **kwargs):
      return False

   monkeypatch.setattr(auth, 'verify_hashes', mock_verify_hashes)

   valid = auth.authenticate_user('testuser', 'dumbhash')

   assert valid == False

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
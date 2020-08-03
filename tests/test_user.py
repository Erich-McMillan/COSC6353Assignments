import pytest

import backend.modules.user as user

def test_user_returns_username():
   u = user._user('test')

   assert u.username() == 'test'

def test_get_user_returns_valid_user():
   u = user.get_user('test')

   assert u.username() == 'test'
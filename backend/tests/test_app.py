import os
import tempfile
import json

import backend.modules.authentication as authentication
import backend.modules.profile_management as profile
import backend.modules.quotes as quote

import pytest

from backend.app import app

@pytest.fixture
def client():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True

    with app.test_client() as client:
        yield client

    os.close(db_fd)
    os.unlink(app.config['DATABASE'])

##### authentiate #####
def test_authenticate_returns_HTTP_OK_on_valid_authenticate(monkeypatch, client):
   def mock_auth(*args, **kwargs):
      return True

   monkeypatch.setattr(authentication, 'authenticate_user', mock_auth)
   rv = client.post('/authenticate/test_user.password_hash')
   assert rv.status_code == 200

def test_authenticate_returns_HTTP_Unauthorized_on_invalid_authenticate(monkeypatch, client):
   def mock_auth(*args, **kwargs):
      return False

   monkeypatch.setattr(authentication, 'authenticate_user', mock_auth)
   rv = client.post('/authenticate/test_user.password_hash')
   assert rv.status_code == 401

def test_authenticate_returns_HTTP_MethodNotAllowed_on_get(client):
   rv = client.get('/authenticate/test_user.password_hash')
   assert rv.status_code == 405

##### /profile #####
def test_profile_returns_HTTP_Unauthorized_when_user_not_authenticated(monkeypatch, client):
   def mock_login_status(*args, **kwargs):
      return False
   
   monkeypatch.setattr(authentication, 'is_authenticated', mock_login_status)
   rv = client.get('/profile')
   assert rv.status_code == 401

def test_profile_returns_HTTP_OK_and_profile_data_on_get(monkeypatch, client):
   def mock_login_status(*args, **kwargs):
      return True

   monkeypatch.setattr(authentication, 'is_authenticated', mock_login_status)

   def mock_auth_user(*args, **kwargs):
      return None

   monkeypatch.setattr(authentication, 'get_authenticated_user', mock_auth_user)

   def mock_get_profile(*args, **kwargs):
      return {
         'test': 1
      }

   monkeypatch.setattr(profile, 'get_profile', mock_get_profile)

   rv = client.get('/profile')
   assert rv.status_code == 200
   assert json.loads(rv.data.decode('utf-8'))['test'] == 1

def test_profile_returns_HTTP_OK_and_profile_data_on_post(monkeypatch, client):
   def mock_login_status(*args, **kwargs):
      return True

   monkeypatch.setattr(authentication, 'is_authenticated', mock_login_status)

   def mock_auth_user(*args, **kwargs):
      return None

   monkeypatch.setattr(authentication, 'get_authenticated_user', mock_auth_user)

   def mock_update_profile(*args, **kwargs):
      return {
         'test': 1
      }

   monkeypatch.setattr(profile, 'update_profile', mock_update_profile)

   rv = client.post('/profile', data = dict(
      title='<Test>'
   ))
   assert rv.status_code == 200
   assert json.loads(rv.data.decode('utf-8'))['test'] == 1


##### /quote #####
def test_quote_returns_HTTP_Unauthorized_when_user_not_logged_in(monkeypatch, client):
   def mock_login_status(*args, **kwargs):
      return False

   monkeypatch.setattr(authentication, 'is_authenticated', mock_login_status)
   
   rv = client.post('/quote', data = dict())

   assert rv.status_code == 401

def test_quote_returns_HTTP_OK_and_quote_on_POST(monkeypatch, client):
   def mock_login_status(*args, **kwargs):
      return True

   monkeypatch.setattr(authentication, 'is_authenticated', mock_login_status)
   
   def mock_auth_user(*args, **kwargs):
      return None

   monkeypatch.setattr(authentication, 'get_authenticated_user', mock_auth_user)

   def mock_get_quote(*args, **kwargs):
      return {
         'price':100
      }

   monkeypatch.setattr(quote, 'get_quote', mock_get_quote)

   rv = client.post('/quote', data = dict())

   assert rv.status_code == 200
   assert json.loads(rv.data.decode('utf-8'))['price'] == 100

##### /quote_history #####
def test_quotehistory_returns_HTTP_Unauthorized_when_user_not_logged_in(monkeypatch, client):
   def mock_login_status(*args, **kwargs):
      return False

   monkeypatch.setattr(authentication, 'is_authenticated', mock_login_status)
   
   rv = client.get('/quote_history', data = dict())

   assert rv.status_code == 401

def test_quotehistory_returns_HTTP_OK_and_quote_on_POST(monkeypatch, client):
   def mock_login_status(*args, **kwargs):
      return True

   monkeypatch.setattr(authentication, 'is_authenticated', mock_login_status)
   
   def mock_auth_user(*args, **kwargs):
      return None

   monkeypatch.setattr(authentication, 'get_authenticated_user', mock_auth_user)

   def mock_get_quote_history(*args, **kwargs):
      return {
         "test":100
      }

   monkeypatch.setattr(quote, 'get_quote_history', mock_get_quote_history)

   rv = client.get('/quote_history', data = dict())

   assert rv.status_code == 200
   assert json.loads(rv.data.decode('utf-8'))['test'] == 100
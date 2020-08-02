from flask import Flask, request, jsonify
from flask_cors import CORS
import backend.modules.authentication as authentication
import backend.modules.profile_management as profile_management
import backend.modules.quotes as quotes
from backend.modules.database_helper import setup_database
from datetime import datetime
# import ptvsd

# ptvsd.enable_attach()
# ptvsd.wait_for_attach()


setup_database('https://testurl:20121')

app = Flask(__name__)
CORS(app)

def success_handler(data):
    response = jsonify(data)
    response.status_code = 200
    return response

def error_handler(error_code):
    response = jsonify(error_code)
    response.status_code = error_code
    return response

@app.route('/api', methods=['GET'])
def api():
    return {
        "userid" : 1,
        "title" : "Flask backend is working",
        "completed" : False
    }

@app.route('/authenticate/<username>.<password_hash>', methods=['POST'])
def authenticate(username: str, password_hash: str):
    """Checks whether the provided password_hash is valid for given user.

    Supported methods:
        POST

    Returns:
        HTTP success if user exists and password hash is a match
        HTTP 405 otherwise
    """
    if authentication.authenticate_user(username, password_hash):
        return success_handler({})
    else:
        return error_handler(401)

@app.route('/register/<username>.<password_hash>', methods=['POST'])
def register(username: str, password_hash: str):
    """Checks whether the provided password_hash is valid for given user.

    Supported methods:
        POST

    Returns:
        HTTP success if user exists and password hash is a match
        HTTP 405 otherwise
    """
    if authentication.register_user(username, password_hash):
        return success_handler({})
    else:
        return error_handler(401)

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    """Gets or Sets users profile data.

    Supported methods:
        GET
        POST
    
    Returns:
        HTTP sucess on successful GET or POST
        HTTP 401 if user is not logged in
        HTTP 405 otherwise

        On successful GET or POST returns json with current profile data
    """
    if not authentication.is_authenticated():
        return error_handler(401)
    if request.method == 'POST':
        return success_handler(profile_management.update_profile(authentication.get_authenticated_user(), request.get_json()))
    if request.method == 'GET':
        return success_handler(profile_management.get_profile(authentication.get_authenticated_user()))

@app.route('/quote', methods=['POST'])
def quote():
    """Gets a quote for user based on pricing module calculations
    
    Supported methods:
        POST

    Returns:
        HTTP success
        otherwise HTTP 401 or 405

        On successful POST returns quote results as json in response.
    """
    if not authentication.is_authenticated():
        return error_handler(401)
    user = authentication.get_authenticated_user()
    return success_handler(quotes.get_quote(user, request.get_json()))

@app.route('/quote_history', methods=['GET'])
def quote_history():
    """Returns quote history for logged in user

    Supported methods:
        GET

    Returns:
        HTTP success
        otherwise HTTP 401 or 405

        On successful GET returns 
    """
    if not authentication.is_authenticated():
        return error_handler(401)
    if request.method == 'GET':
        user = authentication.get_authenticated_user()
        return success_handler(quotes.get_quote_history(user))
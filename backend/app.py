from flask import Flask, request, jsonify
from backend.modules.authentication import authenticate_user, is_authenticated, get_authenticated_user
from backend.modules.profile_management import update_profile, get_profile
from backend.modules.quotes import get_quote, get_quote_history
from backend.modules.database_helper import setup_database

setup_database('https://testurl:20121')

app = Flask(__name__)

def success_handler(data):
    response = jsonify(data)
    response.status_code = 0
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

@app.route('/authenticate/<username>.<password_hash>', methods=['GET','POST'])
def authenticate(username: str, password_hash: str):
    """Checks whether the provided password_hash is valid for given user.

    Supported methods:
        POST

    Returns:
        HTTP success if user exists and password hash is a match
        HTTP 405 otherwise
    """
    # if request.method == 'POST':
    if authenticate_user(username, password_hash):
        return success_handler({})
    return error_handler(405)

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
    if not is_authenticated():
        return error_handler(401)
    if request.method == 'POST':
        return success_handler(update_profile(get_authenticated_user(), request.form))
    if request.method == 'GET':
        return success_handler(get_profile(get_authenticated_user()))
    return error_handler(405)

@app.route('/quote', methods=['GET','POST'])
def quote():
    """Gets a quote for user based on pricing module calculations
    
    Supported methods:
        POST

    Returns:
        HTTP success
        otherwise HTTP 401 or 405

        On successful POST returns quote results as json in response.
    """
    if not is_authenticated():
        return error_handler(401)
    if request.method == 'POST':
        user = get_authenticated_user()
        return get_quote(user, request.form)
    return error_handler(405)

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
    if not is_authenticated():
        return error_handler(401)
    if request.method == 'GET':
        user = get_authenticated_user()
        return success_handler(get_quote_history(user))
    return error_handler(405)
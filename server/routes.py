from flask import Blueprint, request, jsonify, redirect
from flask_cors import cross_origin
from database import db, User

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(email=username, password=password).first()

    if user:
        response = jsonify({'message': 'Successful login'})
        return response, 200
    else:
        response = jsonify({'message': 'Invalid username or password'})
        return response, 401

@auth_blueprint.route('/registration', methods=['POST'])
def register():
    registration_data = request.json

    email = registration_data.get('email')
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({'message': 'User with this email already exists'}), 409

    try:
        new_user = User(
            firstName=registration_data['firstName'],
            lastName=registration_data['lastName'],
            address=registration_data['address'],
            city=registration_data['city'],
            country=registration_data['country'],
            phoneNumber=registration_data['phoneNumber'],
            email=registration_data['email'],
            password=registration_data['password']
        )

        db.session.add(new_user)
        db.session.commit()

        # Redirect to the login page after successful registration
        return jsonify({'message': 'Registration successful'}), 200

    except Exception as e:
        # Handle any unexpected errors during registration
        print('Error during registration:', str(e))
        return jsonify({'message': 'Error during registration'}), 500


# Assuming you have a route to fetch user data
@auth_blueprint.route('/userInfo/<int:id>', methods=['GET'])  # Assuming user_id is an integer
def get_user_data(id):

    print("OVO JE TVOJ ID", id)
    matching_user = User.query.get(id)

    if matching_user:
        # Convert SQLAlchemy object to dictionary
        user_data = {
            'firstName': matching_user.firstName,
            'lastName': matching_user.lastName,
            'address': matching_user.address,
            'city': matching_user.city,
            'country': matching_user.country,
            'phoneNumber': matching_user.phoneNumber,
            'email': matching_user.email,
            'password': matching_user.password
        }
        # Set the Content-Type header to indicate JSON
        return jsonify(user_data), 200
    else:
        return jsonify({'error': 'User not found'}), 404

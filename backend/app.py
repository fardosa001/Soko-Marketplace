from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from bson.objectid import ObjectId
import os
import certifi
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)


app = Flask(__name__)
JWT = JWTManager(app)
CORS(app)

app.config['MONGO_URI'] = 'mongodb+srv://fardosaadow:1czZbqstjoeBJIp3@cluster0.cjsvyhv.mongodb.net/ecommerce_website?retryWrites=true&w=majority&tlsCAFile=' + certifi.where()
mongo = PyMongo(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-the-secret-key'


@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/adminRegister", methods=['POST', 'GET'])
def adminRegister():
    allUsers = mongo.db.admins
    if request.method == 'POST':
        user = allUsers.find_one({'email': request.json['email']})
        companyName = allUsers.find_one({'companyName': request.json['companyName']})
        phone = allUsers.find_one({'phone': request.json['phone']})

        if user:
            return jsonify(message='Email already exists'), 401
        if companyName:
            return jsonify(message='Company Name already exists'), 401
        if phone:
            return jsonify(message='Phone Number already exists'), 401

        if request.json['password'] != request.json['cpassword']:
            return jsonify(message='Passwords do not match!'), 401

        hashpw = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt())
        hashCpw = bcrypt.hashpw(request.json['cpassword'].encode('utf-8'), bcrypt.gensalt())

        access_token = create_access_token(identity=request.json['email'])

        allUsers.insert_one({
            'email': request.json['email'],
            'companyName': request.json['companyName'],
            'phone': request.json['phone'],
            'password': hashpw,
            'cpassword': hashCpw,
            'tokens': [{'token': str(access_token)}]
        })

        return jsonify(token=str(access_token)), 201

from flask import jsonify, request
import bcrypt

@app.route("/adminLogin", methods=['POST'])
def adminLogin():
    allUsers = mongo.db.admins
    user = allUsers.find_one({'email': request.json['email']})

    if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user['password']):
        access_token = create_access_token(identity=request.json['email'])
        allUsers.update_one(
            {'email': request.json['email']},
            {'$push': {'tokens': {'token': str(access_token)}}}
        )
        return jsonify(token=str(access_token)), 201

    return jsonify(message='Invalid Username/Password'), 401


@app.route("/logoutAdmin", methods=['POST'])
def logoutAdmin():
    allUsers = mongo.db.admins
    token = request.json.get('auth')
    user = allUsers.find_one({'tokens.token': token})

    if user:
        allUsers.update_one(
            {'_id': ObjectId(user['_id'])},
            {'$pull': {'tokens': {'token': token}}}
        )
        return jsonify(message='Logout Successfully!'), 201
    return jsonify(message='Invalid token'), 401


if __name__ == '__main__':
    app.run(debug=True)

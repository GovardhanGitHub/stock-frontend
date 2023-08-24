# package import statement
import json
import pyotp
from flask import Flask, request
from flask_restful import Api, Resource, abort, reqparse
from SmartApi import SmartConnect  # or from SmartApi.smartConnect import SmartConnect
from flask_cors import CORS


# import smartapi.smartExceptions(for smartExceptions)


app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

smartApi = SmartConnect()


def initAPI(api_key):
    smartApi.api_key = api_key


@app.route("/getProfile", methods=["POST"])
def getProfile():
    data = json.loads(request.data)
    refreshToken = data["refreshToken"]
    return smartApi.getProfile(refreshToken)


@app.route("/login", methods=["POST"])
def login():
    data = json.loads(request.data)
    api_key = data["api_key"]  # = "W7vuIL2g"
    clientId = data["clientId"]  # = "REUG1397"
    pwd = data["pwd"]  # = "2209"
    initAPI(api_key)
    token = data["token"]  # = "3ENHXY6BSSGFFWGFOEY2GPGQPM"
    totp = pyotp.TOTP(token).now()
    # correlation_id = "abc123"

    session = smartApi.generateSession(clientId, pwd, totp)
    print(session)
    return session


class API_Auth(Resource):
    # def get(self):
    #     return "working"

    def get(self):
        api_key = "W7vuIL2g"
        clientId = "REUG1397"
        pwd = "2209"
        initAPI(api_key)
        token = "3ENHXY6BSSGFFWGFOEY2GPGQPM"
        totp = pyotp.TOTP(token).now()
        # correlation_id = "abc123"

        data = smartApi.generateSession(clientId, pwd, totp)
        # print(data)
        authToken = data["data"]["jwtToken"]
        refreshToken = data["data"]["refreshToken"]

        # fetch the feedtoken
        feedToken = smartApi.getfeedToken()

        # fetch User Profile
        res = smartApi.getProfile(refreshToken)
        orderBook = smartApi.orderBook()
        return orderBook
        # smartApi.generateToken(refreshToken)
        # res=res['data']['exchanges']


# api.add_resource(API_Auth, "/api_auth")
# api.add_resource(login, "/login")


if __name__ == "__main__":
    app.run(debug=False)


# print(res)
# print(orderBook)

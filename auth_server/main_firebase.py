import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, jsonify

app = Flask(__name__, template_folder='.')


# Use a service account
cred = credentials.Certificate('./zpwangular-firebase-adminsdk-ipaja-28b43f2175.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


@app.route('/roles/<email>')
def index(email):
    users_ref = db.collection(u'roles')
    docs = users_ref.stream()

    all_docs = [doc.to_dict() for doc in list(docs)]

    user_roles = [doc["role"] for doc in all_docs if doc["email"] == email]

    return jsonify(user_roles), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050)

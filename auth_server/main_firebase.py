import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, jsonify, request
from firebase_admin import auth
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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


@app.route('/users/<email>')
def get_users(email):
  user = auth.get_user_by_email("szymonsadowski3@gmail.com")
  print('Successfully fetched user data: {0}'.format(user.uid))
  return "OK"


@app.route('/hello')
def make_admin():
  user = auth.get_user_by_email("szymonsadowski3@gmail.com")
  auth.set_custom_user_claims(user.uid, {'is_admin': True})
  return "DONE"


@app.route('/token/<token>')
def check_token(token):
  # Verify the ID token first.
  claims = auth.verify_id_token(token)
  return str(claims)


@app.route('/upload/<file_name>', methods=['POST'])
def upload(file_name):
  allowed_types = ['jpg', 'png', 'jpeg']
  if file_name.split(".")[-1].lower() in allowed_types:
    data = request.stream.read()

    with open(file_name, 'wb') as w:
      w.write(data)

    return jsonify({"status": "OK"}), 200
  else:
    return jsonify({"status": "NOT ALLOWED!"}), 200


if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5051, debug=True)

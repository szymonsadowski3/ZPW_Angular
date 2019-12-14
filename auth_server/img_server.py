from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


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


@app.route('/get/<file_name>', methods=['GET'])
def get_file(file_name):
  return send_from_directory('.', file_name)


if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5052, debug=True)

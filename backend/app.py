import os
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_pickle(filename):
    return pickle.load(open(os.path.join(BASE_DIR, filename), "rb"))

model = load_pickle("model.pkl")
tfidf = load_pickle("tfidf.pkl")

@app.route("/", methods=["GET"])
def home():
    return jsonify({'message': 'Fake News API Running!'})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json.get("text", "")
    if not data:
        return jsonify({"error": "No text received"}), 400

    vec = tfidf.transform([data])
    pred = model.predict(vec)[0]

    return jsonify({"result": str(pred)})

# Render uses PORT env var
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model.pkl","rb"))
tfidf = pickle.load(open("tfidf.pkl","rb"))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json.get("text","")
    vector = tfidf.transform([data])
    prediction = model.predict(vector)[0]
    return jsonify({ "result": prediction })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

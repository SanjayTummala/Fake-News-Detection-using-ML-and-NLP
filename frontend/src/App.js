import React, { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("detect"); // detect | about | dataset | stack
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use deployed backend if env var exists, otherwise local for dev
  const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

  const handleDetect = async () => {
    setError("");
    setResult("");

    if (!text.trim()) {
      setError("Please enter a news headline or short article first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      setResult((data.result || "").toLowerCase());
    } catch (err) {
      console.error("Error calling backend:", err);
      setError(
        "The prediction service is not reachable right now. Please try again in a few seconds."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult("");
    setError("");
  };

  const isFake = result === "fake";
  const isReal = result === "real";

  return (
    <div className="app">
      <div className="app-overlay">
        <div className="card">
          {/* Header */}
          <header className="card-header">
            <div>
              <h1>📰 Fake News Detection</h1>
              <p className="subtitle">
                A full-stack <strong>Machine Learning</strong> project where I
                check whether a news statement is more likely to be{" "}
                <strong>fake</strong> or <strong>real</strong> using{" "}
                <strong>TF-IDF</strong> features and a{" "}
                <strong>Multinomial Naive Bayes</strong> model running behind a
                Flask API.
              </p>
            </div>
            <div className="header-right">
              <span className="badge">ML Project</span>
              <span className="status-pill">
                ⚛ React · 🐍 Flask · 📦 scikit-learn
              </span>
            </div>
          </header>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "detect" ? "active" : ""}`}
              onClick={() => setActiveTab("detect")}
            >
              🔍 Detector
            </button>
            <button
              className={`tab ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              📘 Project Overview
            </button>
            <button
              className={`tab ${activeTab === "dataset" ? "active" : ""}`}
              onClick={() => setActiveTab("dataset")}
            >
              📊 Dataset & Samples
            </button>
            <button
              className={`tab ${activeTab === "stack" ? "active" : ""}`}
              onClick={() => setActiveTab("stack")}
            >
              🛠 System Design
            </button>
          </div>

          {/* TAB: DETECTOR */}
          {activeTab === "detect" && (
            <>
              <div className="form-group">
                <label className="label">Enter news text</label>
                <textarea
                  className="textarea"
                  rows={6}
                  placeholder="Example: The government announced a new cybersecurity policy for critical infrastructure..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="actions">
                <button
                  className="btn primary"
                  onClick={handleDetect}
                  disabled={loading || !text.trim()}
                >
                  {loading ? (
                    <span className="spinner-wrapper">
                      <span className="spinner" />
                      Running prediction...
                    </span>
                  ) : (
                    "Detect Fake News"
                  )}
                </button>
                <button
                  className="btn ghost"
                  onClick={handleClear}
                  disabled={loading && !text}
                >
                  Clear
                </button>
              </div>

              {result && (
                <div
                  className={`result-box ${
                    isFake ? "fake" : isReal ? "real" : ""
                  }`}
                >
                  <div className="result-header">
                    <span className="pill">
                      {isFake ? "🔴 Fake News" : isReal ? "🟢 Real News" : "Result"}
                    </span>
                  </div>
                  <p className="result-text">
                    The input text has been classified as{" "}
                    <strong>{result.toUpperCase()}</strong> by the trained
                    model.
                  </p>
                  <p className="note">
                    ⚠ This is only a model prediction based on the training
                    data. It should be used as a <strong>hint</strong>, not as
                    final proof. Always double-check important news with
                    trusted sources.
                  </p>
                </div>
              )}

              {error && <div className="error-box">{error}</div>}
            </>
          )}

          {/* TAB: ABOUT / PROJECT OVERVIEW */}
          {activeTab === "about" && (
            <div className="info-section">
              <h2>📘 Project Overview</h2>
              <p>
                I built this project to explore how{" "}
                <strong>Machine Learning</strong> and{" "}
                <strong>Natural Language Processing (NLP)</strong> can be used
                in a real web application, not just in a notebook.
              </p>
              <p>
                The flow is simple: the user enters some news text, the system
                converts it into numerical features using{" "}
                <strong>TF-IDF</strong>, and then a{" "}
                <strong>Multinomial Naive Bayes</strong> classifier predicts
                whether the text looks more like fake or real news based on the
                training data.
              </p>
              <p>
                This app helped me practise multiple skills together: text
                preprocessing, model training, building a Flask API, and
                connecting it to a React frontend deployed on the cloud.
              </p>
            </div>
          )}

          {/* TAB: DATASET & SAMPLES */}
          {activeTab === "dataset" && (
            <div className="info-section">
              <h2>📊 Dataset & Samples</h2>
              <p>
                The model is trained on a combined dataset of news articles
                where each sample is labeled as <strong>fake</strong> or{" "}
                <strong>real</strong>. For this project, the main goal is to
                build a working pipeline from data → model → API → UI.
              </p>
              <ul>
                <li>News text is cleaned (basic preprocessing) and lower-cased.</li>
                <li>
                  Features are extracted using{" "}
                  <strong>TF-IDF (Term Frequency–Inverse Document
                  Frequency)</strong>.
                </li>
                <li>
                  A <strong>Multinomial Naive Bayes</strong> classifier from{" "}
                  <strong>scikit-learn</strong> is trained on these features.
                </li>
                <li>
                  The trained model and TF-IDF vectorizer are saved as{" "}
                  <code>model.pkl</code> and <code>tfidf.pkl</code> and loaded
                  by the Flask backend.
                </li>
                <li>
                  Prediction endpoint:
                  <br />
                  <code>POST /predict</code> with JSON body{" "}
                  <code>{`{ "text": "your news text here" }`}</code>.
                </li>
              </ul>

              <p className="note">
                🔧 In future, this can be extended with better datasets or deep
                learning models (for example, BERT or other transformer-based
                architectures).
              </p>

              <div className="examples-section">
                <h3>Example Fake vs Real Style News</h3>
                <p>
                  These are simple example sentences just to show the kind of
                  text that usually appears as fake or real in a dataset.
                </p>

                <div className="examples-grid">
                  <div className="example-card fake-sample">
                    <h4>🔴 Fake-style Examples</h4>
                    <ul>
                      <li>
                        “Scientists confirm that drinking only hot water for
                        three days can cure all types of cancer.”
                      </li>
                      <li>
                        “A national bank has cancelled all existing loans taken
                        before 2020 with no conditions.”
                      </li>
                      <li>
                        “A new secret rule bans the use of social media after
                        9 PM without a special government licence.”
                      </li>
                      <li>
                        “Space agencies admit that the Earth is flat and all
                        images were edited in Photoshop.”
                      </li>
                    </ul>
                  </div>

                  <div className="example-card real-sample">
                    <h4>🟢 Real-style Examples</h4>
                    <ul>
                      <li>
                        “The central bank announced a 0.25% change in the repo
                        rate during its latest policy meeting.”
                      </li>
                      <li>
                        “The health ministry released updated guidelines on
                        vaccination schedules for children.”
                      </li>
                      <li>
                        “The election commission published the final list of
                        candidates for the upcoming state elections.”
                      </li>
                      <li>
                        “The national transport authority introduced updated
                        rules for highway safety and speed limits.”
                      </li>
                      <li>
                        “Two countries signed a bilateral agreement to
                        strengthen cybersecurity cooperation.”
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TECH & ARCHITECTURE / SYSTEM DESIGN */}
          {activeTab === "stack" && (
            <div className="info-section">
              <h2>🛠 System Design & Technologies</h2>
              <p>
                The project uses a simple but realistic{" "}
                <strong>frontend–backend</strong> architecture with a separate
                ML model behind the API.
              </p>

              <div className="stack-grid">
                <div className="stack-card">
                  <h3>🖥 Frontend (Client)</h3>
                  <ul>
                    <li>React Single Page Application (SPA)</li>
                    <li>Custom responsive UI built with plain CSS</li>
                    <li>Uses Fetch API to send JSON requests to the backend</li>
                    <li>
                      Reads the API base URL from{" "}
                      <code>REACT_APP_API_URL</code> environment variable
                    </li>
                    <li>Deployed on Vercel</li>
                  </ul>
                </div>

                <div className="stack-card">
                  <h3>⚙ Backend (API)</h3>
                  <ul>
                    <li>Python 3 + Flask web framework</li>
                    <li>REST endpoint: <code>POST /predict</code></li>
                    <li>Flask-CORS enabled for cross-origin requests</li>
                    <li>
                      Loads <code>model.pkl</code> and <code>tfidf.pkl</code>{" "}
                      into memory at startup
                    </li>
                    <li>Deployed as a web service on Render</li>
                  </ul>
                </div>

                <div className="stack-card">
                  <h3>🤖 ML & NLP Layer</h3>
                  <ul>
                    <li>Implemented using scikit-learn</li>
                    <li>TF-IDF vectorizer for text feature extraction</li>
                    <li>Multinomial Naive Bayes classifier</li>
                    <li>Binary classification: fake vs real</li>
                    <li>Model serialized using Python pickle</li>
                  </ul>
                </div>

                <div className="stack-card">
                  <h3>🔗 End-to-End Flow</h3>
                  <ul>
                    <li>1️⃣ User submits text from the React UI</li>
                    <li>2️⃣ Frontend sends a POST request to the Flask API</li>
                    <li>
                      3️⃣ Backend vectorizes the text and calls the ML model for
                      a prediction
                    </li>
                    <li>4️⃣ API returns the label as JSON</li>
                    <li>5️⃣ UI displays the result in a user-friendly way</li>
                  </ul>
                </div>
              </div>

              <p className="note">
                The main aim is to clearly show the ML pipeline: data → model →
                API → frontend → user, in a way that is easy to understand and
                demo for an academic project or portfolio.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer className="footer">
            <span>
              Designed & developed by <strong>Sanjay Kumar</strong> · React ·
              Flask · scikit-learn
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

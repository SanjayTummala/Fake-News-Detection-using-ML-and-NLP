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
        "The prediction service is not reachable at the moment. Please try again in a few seconds."
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
                A complete end-to-end Machine Learning project where I detect
                whether a news statement is likely to be{" "}
                <strong>fake</strong> or <strong>real</strong> using{" "}
                <strong>TF-IDF</strong> features and a{" "}
                <strong>Multinomial Naive Bayes</strong> model served via a
                Flask API.
              </p>
            </div>
            <div className="header-right">
              <span className="badge">ML Project</span>
              <span className="status-pill">
                ⚛ React  · 🐍 Flask API
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
                    ⚠ This is a machine learning prediction based on the
                    training data used. It should be treated as a{" "}
                    <strong>supporting signal</strong>, not final proof. Always
                    verify important or sensitive information with trusted
                    sources.
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
                This web application was developed to understand how{" "}
                <strong>Machine Learning (ML)</strong> and{" "}
                <strong>Natural Language Processing (NLP)</strong> can be used
                in a practical, full-stack project. The focus is not only on
                model accuracy, but also on how to serve the model through an
                API and integrate it with a modern frontend.
              </p>
              <p>
                The idea is simple: the user enters a news headline or short
                article, the text is converted into numerical features using{" "}
                <strong>TF-IDF</strong>, and a{" "}
                <strong>Multinomial Naive Bayes</strong> classifier predicts
                whether it is more likely to be <strong>fake</strong> or{" "}
                <strong>real</strong>.
              </p>
              <p>
                Through this project, I practised data preprocessing, model
                training, REST API design, and deployment using platforms like{" "}
                <strong>Render</strong> (backend) and <strong>Vercel</strong>{" "}
                (frontend).
              </p>
            </div>
          )}

          {/* TAB: DATASET & SAMPLES */}
          {activeTab === "dataset" && (
            <div className="info-section">
              <h2>📊 Dataset & Model Details</h2>
              <p>
                The model is trained on a combined dataset containing thousands
                of labeled news samples. Each news item is tagged as{" "}
                <strong>fake</strong> or <strong>real</strong> based on its
                source and verification.
              </p>
              <ul>
                <li>Text is cleaned (basic preprocessing) and lower-cased.</li>
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
                  The trained model and TF-IDF vectorizer are stored as{" "}
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
                🔧 Future ideas: try transformer-based models (e.g. BERT), use
                more recent datasets, and extend the app with support for
                multiple languages.
              </p>

              <div className="examples-section">
                <h3>Example Styles of Fake vs Real News</h3>
                <p>
                  These are synthetic examples that roughly represent the style
                  of content that often appears as fake vs real in common
                  datasets.
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
                The application follows a realistic{" "}
                <strong>frontend–backend</strong> architecture with a clear{" "}
                <strong>ML model</strong> layer behind the API. This is similar
                to how many production ML systems are structured.
              </p>

              <div className="stack-grid">
                <div className="stack-card">
                  <h3>🖥 Frontend (Client)</h3>
                  <ul>
                    <li>React Single Page Application (SPA)</li>
                    <li>Custom responsive layout using plain CSS</li>
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
                    <li>Python 3 with Flask</li>
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
                    <li>5️⃣ UI displays the result in a readable format</li>
                  </ul>
                </div>
              </div>

              <p className="note">
                The goal is to keep the implementation understandable while
                still showing a realistic ML workflow: data → model → API →
                frontend → user.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer className="footer">
            <span>
              Developed by <strong>Sanjay Kumar</strong> · React · Flask
              · Scikit-learn · TF-IDF · Naive Bayes
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

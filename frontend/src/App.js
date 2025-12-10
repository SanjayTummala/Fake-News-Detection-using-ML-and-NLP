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
              <h1>Fake News Detection System</h1>
              <p className="subtitle">
                A full-stack machine learning project that classifies news text
                as <strong>fake</strong> or <strong>real</strong> using{" "}
                <strong>TF-IDF</strong> features and a{" "}
                <strong>Multinomial Naive Bayes</strong> model.
              </p>
            </div>
            <div className="header-right">
              <span className="badge">ML Project</span>
              <span className="status-pill">
                Frontend: Vercel · API: Render
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
                  placeholder="Example: The government announced a new national cybersecurity policy for critical infrastructure..."
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
                      {isFake ? "Fake News" : isReal ? "Real News" : "Result"}
                    </span>
                  </div>
                  <p className="result-text">
                    The input text has been classified as{" "}
                    <strong>{result.toUpperCase()}</strong> by the trained
                    model.
                  </p>
                  <p className="note">
                    Note: This is a machine learning prediction based on the
                    training data used. It should be treated as a{" "}
                    <strong>supporting signal</strong>, not as final proof.
                    Always verify important information with trusted sources.
                  </p>
                </div>
              )}

              {error && <div className="error-box">{error}</div>}
            </>
          )}

          {/* TAB: ABOUT / PROJECT OVERVIEW */}
          {activeTab === "about" && (
            <div className="info-section">
              <h2>Project Overview</h2>
              <p>
                This project was developed to explore how{" "}
                <strong>Machine Learning</strong> and{" "}
                <strong>Natural Language Processing (NLP)</strong> can help in
                identifying potentially fake or misleading news content.
              </p>
              <p>
                The core idea is simple: take a piece of news text, convert it
                into numerical features using <strong>TF-IDF</strong>, and then
                apply a <strong>Multinomial Naive Bayes</strong> classifier to
                decide whether the text is more likely to be{" "}
                <strong>fake</strong> or <strong>real</strong>.
              </p>
              <p>
                The goal of this application is educational: to practice
                end-to-end ML deployment, from data preprocessing and model
                training to building a usable UI and exposing a REST API.
              </p>
            </div>
          )}

          {/* TAB: DATASET & SAMPLES */}
          {activeTab === "dataset" && (
            <div className="info-section">
              <h2>Dataset & Model Details</h2>
              <p>
                The model has been trained on a combined dataset containing
                tens of thousands of labeled news samples. Each record is
                tagged as either <strong>fake</strong> or{" "}
                <strong>real</strong> based on its source and verification.
              </p>
              <ul>
                <li>Raw text is cleaned and converted to lowercase.</li>
                <li>
                  Text is transformed into feature vectors using{" "}
                  <strong>TF-IDF</strong> (Term Frequency–Inverse Document
                  Frequency).
                </li>
                <li>
                  A <strong>Multinomial Naive Bayes</strong> classifier from{" "}
                  <strong>scikit-learn</strong> is trained on these vectors.
                </li>
                <li>
                  The trained model and vectorizer are stored as{" "}
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
                Future improvements may include experimenting with transformer
                models (e.g., BERT), more recent datasets, and support for
                multiple languages.
              </p>

              <div className="examples-section">
                <h3>Example Types of Fake vs Real News</h3>
                <p>
                  These are synthetic examples that represent the kind of
                  content that usually appears as fake or real in the training
                  data.
                </p>

                <div className="examples-grid">
                  <div className="example-card fake-sample">
                    <h4>Fake-style Examples</h4>
                    <ul>
                      <li>
                        “Scientists confirm that drinking only hot water for
                        three days can cure all types of cancer.”
                      </li>
                      <li>
                        “A major national bank has cancelled all loans taken
                        before 2020 without any conditions.”
                      </li>
                      <li>
                        “A secret law bans the use of social media after 9 PM
                        without a special license.”
                      </li>
                      <li>
                        “Space agencies admit that the Earth is flat and all
                        satellite images were edited.”
                      </li>
                    </ul>
                  </div>

                  <div className="example-card real-sample">
                    <h4>Real-style Examples</h4>
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
              <h2>System Design & Technologies</h2>
              <p>
                This application is structured as a classic{" "}
                <strong>frontend–backend</strong> system with a separate{" "}
                <strong>machine learning</strong> layer.
              </p>

              <div className="stack-grid">
                <div className="stack-card">
                  <h3>Frontend (Client)</h3>
                  <ul>
                    <li>Built with React as a Single Page Application (SPA)</li>
                    <li>Custom responsive layout using plain CSS</li>
                    <li>Uses Fetch API to send JSON requests to the backend</li>
                    <li>
                      Reads API base URL from{" "}
                      <code>REACT_APP_API_URL</code> environment variable
                    </li>
                    <li>Deployed on Vercel</li>
                  </ul>
                </div>

                <div className="stack-card">
                  <h3>Backend (API)</h3>
                  <ul>
                    <li>Python 3 with Flask web framework</li>
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
                  <h3>ML & NLP Layer</h3>
                  <ul>
                    <li>Implemented using scikit-learn</li>
                    <li>TF-IDF vectorizer for feature extraction</li>
                    <li>Multinomial Naive Bayes classifier</li>
                    <li>Binary classification: fake vs real</li>
                    <li>Serialized using Python pickle</li>
                  </ul>
                </div>

                <div className="stack-card">
                  <h3>Overall Flow</h3>
                  <ul>
                    <li>User submits text via React UI</li>
                    <li>Frontend sends POST request to Flask API</li>
                    <li>
                      Backend vectorizes text and calls the ML model for
                      prediction
                    </li>
                    <li>API returns the label as JSON</li>
                    <li>UI displays the result in a user-friendly format</li>
                  </ul>
                </div>
              </div>

              <p className="note">
                This setup is intentionally simple but complete: it covers data
                preprocessing, model training (offline), backend integration,
                and deployment on cloud platforms used in modern web projects.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer className="footer">
            <span>
              Developed by <strong>Sanjay Kumar Tummala</strong> · React · Flask
              · Scikit-learn · TF-IDF · Naive Bayes · Deployed on Vercel & Render
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

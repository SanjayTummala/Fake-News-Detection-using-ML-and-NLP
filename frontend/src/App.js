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
              <h1>📰 Fake News Detection Radar</h1>
              <p className="subtitle">
                Paste any headline or short news snippet and let this{" "}
                <strong>ML-powered radar</strong> estimate whether it looks more
                like <strong>fake</strong> or <strong>real</strong> news.
              </p>
            </div>
            <div className="header-right">
              <span className="badge">Real-time ML Scanner</span>
              <span className="status-pill">⚛ React · 🐍 Flask · 📦 scikit-learn</span>
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
              💡 How It Works
            </button>
            <button
              className={`tab ${activeTab === "dataset" ? "active" : ""}`}
              onClick={() => setActiveTab("dataset")}
            >
              📊 Examples & Insights
            </button>
            <button
              className={`tab ${activeTab === "stack" ? "active" : ""}`}
              onClick={() => setActiveTab("stack")}
            >
              🛠 Under The Hood
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
                      {isFake ? "🔴 Classified as Fake" : isReal ? "🟢 Classified as Real" : "Result"}
                    </span>
                  </div>
                  <p className="result-text">
                    The text you entered is estimated to be{" "}
                    <strong>{result.toUpperCase()}</strong> based on the model’s
                    understanding of past news data.
                  </p>
                  <p className="note">
                    ⚠ This is an automated prediction, not a final verdict.
                    Think of it as a second opinion before you trust or share
                    something.
                  </p>
                </div>
              )}

              {error && <div className="error-box">{error}</div>}
            </>
          )}

          {/* TAB: HOW IT WORKS */}
          {activeTab === "about" && (
            <div className="info-section">
              <h2>💡 How It Works</h2>
              <p>
                Fake News Radar uses a classic{" "}
                <strong>Natural Language Processing (NLP)</strong> pipeline to
                rate news text as fake or real-looking.
              </p>
              <p>
                Behind the scenes, it converts your text into numerical
                features, feeds them into a trained{" "}
                <strong>Machine Learning model</strong>, and returns a simple
                label: <strong>fake</strong> or <strong>real</strong>.
              </p>
              <p>
                It doesn&apos;t know the truth about the world, but it has
                learned patterns from many examples of fake and real news and
                tries to spot similar patterns in what you paste here.
              </p>
            </div>
          )}

          {/* TAB: DATASET & SAMPLES (renamed as Examples & Insights) */}
          {activeTab === "dataset" && (
            <div className="info-section">
              <h2>📊 Examples & Insights</h2>
              <p>
                The model was trained on a collection of news headlines and
                short articles that were already labeled as{" "}
                <strong>fake</strong> or <strong>real</strong>. Over time it
                learns the kind of wording, style and claims that appear more
                often in fake content versus normal reporting.
              </p>

              <h3>What happens to your text?</h3>
              <ul>
                <li>Your text is cleaned and broken down into important words.</li>
                <li>
                  A <strong>TF-IDF</strong> step turns those words into
                  numerical features.
                </li>
                <li>
                  A <strong>Multinomial Naive Bayes</strong> model looks at
                  those features and chooses fake / real.
                </li>
                <li>
                  The web app shows the result in a simple, friendly format.
                </li>
              </ul>

              <p className="note">
                None of your inputs are stored or logged here — this is just a
                demo tool for exploring how an ML model reacts to different
                headlines.
              </p>

              <div className="examples-section">
                <h3>Try Text Like This</h3>
                <p>
                  These are example styles of news that commonly appear closer
                  to fake or real in training data. You can copy them into the
                  detector tab and see how the model reacts.
                </p>

                <div className="examples-grid">
                  <div className="example-card fake-sample">
                    <h4>🔴 Fake-News Examples</h4>
                    <ul>
                      <li>
                        Scientists confirm that drinking only hot water for
                        three days can cure all types of cancer.
                      </li>
                      <li>
                        New study claims that eating only chocolate for a week can improve eyesight and increase height.
                      </li>
                      <li>
                        Tech companies are secretly installing microchips in 
                        smartphone chargers to read users thoughts during sleep
                      </li>
                      <li>
                        Space agencies admit that the Earth is flat and all
                        images were edited in Photoshop.
                      </li>
                    </ul>
                  </div>

                  <div className="example-card real-sample">
                    <h4>🟢 Real-News Examples</h4>
                    <ul>
                      <li>
                        The central bank announced a 0.25% change in the repo
                        rate during its latest policy meeting.
                      </li>
                      <li>
                        The health ministry released updated guidelines on
                        vaccination schedules for children.
                      </li>
                      <li>
                        The election commission published the final list of
                        candidates for the upcoming state elections.
                      </li>
                      <li>
                        The national transport authority introduced updated
                        rules for highway safety and speed limits.
                      </li>
                      <li>
                        Two countries signed a bilateral agreement to
                        strengthen cybersecurity cooperation.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: UNDER THE HOOD / SYSTEM DESIGN */}
          {activeTab === "stack" && (
            <div className="info-section">
              <h2>🛠 Under The Hood</h2>
              <p>
                Fake News Radar is a small but complete{" "}
                <strong>full-stack ML app</strong>. The frontend talks to a
                separate backend which loads the ML model and returns JSON
                responses.
              </p>

              <div className="stack-grid">
                <div className="stack-card">
                  <h3>🖥 Frontend</h3>
                  <ul>
                    <li>React Single Page Application (SPA)</li>
                    <li>Custom responsive layout using plain CSS</li>
                    <li>Uses Fetch API to call the backend</li>
                    <li>
                      API base URL comes from{" "}
                      <code>REACT_APP_API_URL</code> environment variable
                    </li>
                    <li>Deployed on Vercel</li>
                  </ul>
                </div>

                <div className="stack-card">
                  <h3>⚙ Backend</h3>
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
                  <h3>🤖 ML Layer</h3>
                  <ul>
                    <li>scikit-learn based pipeline</li>
                    <li>TF-IDF vectorizer for text features</li>
                    <li>Multinomial Naive Bayes classifier</li>
                    <li>Binary output: fake vs real</li>
                    <li>Model persisted via Python pickle</li>
                  </ul>
                </div>

                <div className="stack-card">
                  <h3>🔗 End-to-End Flow</h3>
                  <ul>
                    <li>1️⃣ User enters text on the React UI</li>
                    <li>2️⃣ Frontend sends a POST request to the Flask API</li>
                    <li>
                      3️⃣ Backend vectorizes the text and asks the ML model for
                      a prediction
                    </li>
                    <li>4️⃣ API returns the label as JSON</li>
                    <li>5️⃣ UI displays the result with a clear status badge</li>
                  </ul>
                </div>
              </div>

              <p className="note">
                The focus here is on having a clean, working pipeline rather
                than chasing the perfect accuracy score. It&apos;s a playground
                to experiment with news, text and ML.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer className="footer">
            <span>
              Designed & built by{" "}
              <strong>Sanjay Kumar</strong> · React · Flask · scikit-learn
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

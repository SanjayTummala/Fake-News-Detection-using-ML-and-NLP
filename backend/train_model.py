import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import pickle

print("📌 Loading dataset...")
df = pd.read_csv("dataset_final.csv")

# Clean
df = df.dropna(subset=["text", "label"])
df["text"] = df["text"].astype(str)
df["label"] = df["label"].str.lower().str.strip()

print("Dataset size:", df.shape)
print(df["label"].value_counts())

X = df["text"]
y = df["label"]

print("\n📌 Splitting dataset...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("\n📌 Vectorizing with TF-IDF...")
tfidf = TfidfVectorizer(
    stop_words="english",
    max_features=20000
)

X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

print("\n📌 Training Multinomial Naive Bayes...")
model = MultinomialNB()
model.fit(X_train_tfidf, y_train)

print("\n📌 Evaluating model...")
y_pred = model.predict(X_test_tfidf)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

print("\n📌 Saving model files...")
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(tfidf, open("tfidf.pkl", "wb"))

print("\n✅ Training complete!")
print("✅ model.pkl and tfidf.pkl saved successfully.")

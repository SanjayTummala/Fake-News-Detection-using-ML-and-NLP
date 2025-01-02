# Fake News Detection using Machine Learning

## Table of Contents
- [Introduction](#introduction)
- [Problem Definition](#problem-definition)
- [Project Structure](#project-structure)
- [Datasets](#datasets)
- [Model Name](#model-name)
- [Model Performance](#model-performance)
- [Prerequisites](#prerequisites)

## Introduction
This repository contains a comprehensive project for detecting fake news using machine learning techniques and various natural language processing techniques. The project includes data analysis, model training, and a web application for real-time fake news detection. The machine learning model is designed to classify news articles as either real or fake based on their content.

## Problem Definition
We aim to develop a machine learning program to identify when a news source may be producing fake news. The model will focus on identifying fake news sources, based on multiple articles originating from a source. Once a source is labeled as a producer of fake news, we can predict with high confidence that any future articles from that source will also be fake news. Focusing on sources widens our article misclassification tolerance, because we will have multiple data points coming from each source.

The intended application of the project is for use in applying visibility weights in social media. Using weights produced by this model, social networks can make stories that are highly likely to be fake news less visible.

## Project Structure
The repository is organized into the following directories and files:
- **Images**: Contains important project images, such as block diagrams, classification reports, confusion matrices, and screenshots.
- **dataset**: Includes the dataset, consisting of train and test data from Kaggle, which is used to train and test the model.
- **static**: Houses static assets for the web application, including CSS, JavaScript, etc.
- **templates**: Includes HTML templates for the web application, such as `Landingpage.html` and `prediction page.html`.
- **Fake_News_Detector-PA.ipynb**: Jupyter Notebook file for data analysis and model training.
- **app.py**: Flask web application for real-time fake news detection.
- **model.pkl**: Pre-trained machine learning model for fake news detection.
- **vector.pkl**: Pre-trained vectorizer for text data.

## Datasets 
### train.csv
A full training dataset with the following attributes:
- `id`: unique id for a news article
- `title`: the title of a news article
- `author`: author of the news article
- `text`: the text of the article; could be incomplete
- `label`: a label that marks the article as potentially unreliable
  - `1`: unreliable
  - `0`: reliable


## Model Name
The machine learning model used for fake news detection in this project is the *Naive bayes Classifier and Random forest**.

### Model Description
Naive Bayes Classifier:

The Naive Bayes classifier is a probabilistic classifier based on Bayes' Theorem. It is particularly useful for large datasets with high dimensionality, such as text classification tasks.
In this project, the Multinomial Naive Bayes variant is used, which is effective when the features (in this case, words) are discrete and follow a multinomial distribution. This model works by calculating the probability of each class (fake or real news) given the input features (word frequencies or TF-IDF scores). The model assigns the class with the highest posterior probability.
Advantages:
Fast and efficient for large datasets.
Simple to implement and interpret.
Works well with text data where feature independence is a reasonable assumption.
Random Forest:

The Random Forest is an ensemble learning method that constructs a multitude of decision trees during training and outputs the class that is the majority vote of the individual trees.
It leverages the power of bagging (Bootstrap Aggregating) to reduce variance and prevent overfitting. By averaging multiple decision trees, it creates a robust model that can generalize well to unseen data.
Advantages:
Highly accurate and less prone to overfitting compared to individual decision trees.
Can handle a large number of features and works well with both numerical and categorical data.
The model provides feature importance scores, which can be useful for feature selection.

### Model Performance
Naive Bayes Classifier: Performs well for fast and efficient classification, especially when the dataset is large and contains independent features.
Random Forest: Offers superior performance by reducing variance and is robust to overfitting, providing high accuracy on both training and test data.


### Model Accuracy
The Passive Aggressive Classifier achieved an impressive accuracy of **96%** during evaluation. This high accuracy indicates its effectiveness in classifying news articles as reliable or unreliable.


## Prerequisites
Before you begin, ensure you have met the following requirements:
- Python 3.7 or higher
- Install all dependencies from the requirements.txt file.


**Author**
- SANJAY TUMMALA (https://github.com/SanjayTummala)

- If you have any questions or need further assistance, feel free to contact us at asanjaytummala18@gmail.com

---

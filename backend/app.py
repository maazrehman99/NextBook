from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation import recommend, get_top_books  

app = Flask(__name__)
CORS(app)  

@app.route('/recommend', methods=['GET'])
def get_recommendations():
    book_name = request.args.get('book')
    if not book_name:
        return jsonify({'error': 'Please provide a book name'}), 400
    
    recommendations = recommend(book_name)
    return jsonify(recommendations)

@app.route('/top_books', methods=['GET'])
def top_books():
    n = request.args.get('n', default=30, type=int)
    top_books_list = get_top_books(n)
    return jsonify(top_books_list)

if __name__ == '__main__':
    app.run(debug=True)

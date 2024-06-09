import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from difflib import get_close_matches

# Load the data
df = pd.read_csv('final_model_data.csv')

# Perform the group by operation and count the Book-Rating values for each User-ID
x = df.groupby('User-ID')['Book-Rating'].count()

# Filter users who have more than 120 ratings
top_users = x[x > 120].index

# Filter the dataframe to include only these top users
filtered_rating = df[df['User-ID'].isin(top_users)]

# Group by "Book-Title" and count the Book-Rating values
y = filtered_rating.groupby("Book-Title")['Book-Rating'].count()

# Lowering the threshold to identify famous books
famous_books_threshold = 10 
famous_books = y[y > famous_books_threshold].index

# Filter the dataframe to include only these famous books
final_rating = filtered_rating[filtered_rating['Book-Title'].isin(famous_books)]

# Create the pivot table
pt = final_rating.pivot_table(index="Book-Title", columns="User-ID", values="Book-Rating")
pt.fillna(0, inplace=True)

# Compute the cosine similarity matrix
similarity_scores = cosine_similarity(pt)

def recommend(book_name):
    if book_name in pt.index:
        # Fetch recommendations for a book that is in the dataset
        index = np.where(pt.index == book_name)[0][0]
        similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]
    else:
        # Handle books not in the dataset
        similar_titles = get_close_matches(book_name, pt.index, n=1, cutoff=0.5)
        if similar_titles:
            # Find the most similar book in the dataset and use its recommendations
            index = np.where(pt.index == similar_titles[0])[0][0]
            similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:5]
        else:
            # Recommend the top 4 books if no close match is found
            similar_items = [(i, 0) for i in range(4)]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = df[df['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-L'].values))
        item.extend([f"{temp_df.drop_duplicates('Book-Title')['Book-Rating'].values[0]:.2f}"])  
        
        data.append(item)
    
    return data


def get_top_books(n=30):
    # Get the average rating for each book
    avg_rating = df.groupby('Book-Title')['Book-Rating'].mean()
    
    # Get the number of ratings for each book
    num_ratings = df.groupby('Book-Title')['Book-Rating'].count()
    
    # Combine the two metrics
    rating_data = pd.DataFrame({'avg_rating': avg_rating, 'num_ratings': num_ratings})
    
    # Filter to ensure books have a significant number of ratings (e.g., more than 50)
    rating_data = rating_data[rating_data['num_ratings'] > 50]
    
    # Sort the dataframe by average rating and number of ratings
    top_books = rating_data.sort_values(by=['avg_rating', 'num_ratings'], ascending=False).head(n)
    
    data = []
    for title in top_books.index:
        temp_df = df[df['Book-Title'] == title]
        item = [
            temp_df['Book-Title'].values[0],
            temp_df['Book-Author'].values[0],
            temp_df['Image-URL-L'].values[0],
             round(top_books.loc[title, 'avg_rating'], 2)
        ]
        data.append(item)
    
    return data

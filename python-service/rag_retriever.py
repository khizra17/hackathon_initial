import os

KB_FOLDER = 'knowledge_base'

def retrieve_relevant_docs(query, top_n=2):
    query_words = set(query.lower().split())
    scores = []

    for filename in os.listdir(KB_FOLDER):
        filepath = os.path.join(KB_FOLDER, filename)
        with open(filepath, 'r') as f:
            content = f.read()

        content_words = set(content.lower().split())
        overlap = len(query_words & content_words)
        scores.append((overlap, filename, content))

    scores.sort(key=lambda x: x[0], reverse=True)
    top_docs = scores[:top_n]

    return [doc[2] for doc in top_docs]
from roadmap_generator import generate_roadmap
from flask import Flask, request, jsonify
from skill_analyzer import SkillAnalyzer
from rag_retriever import retrieve_relevant_docs
from roadmap_generator import generate_roadmap, model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    skills = data.get('skills', [])
    target_role = data.get('target_role', '')

    analyzer = SkillAnalyzer(skills, target_role)

    result = {
        "score": analyzer.calculate_score(),
        "gaps": analyzer.identify_gaps(),
        "recommendations": analyzer.recommend_topics()
    }

    return jsonify(result)

@app.route('/roadmap', methods=['POST'])
def roadmap():
    data = request.get_json()
    skills = data.get('skills', [])
    target_role = data.get('target_role', '')

    analyzer = SkillAnalyzer(skills, target_role)
    gaps = analyzer.identify_gaps()

    roadmap_text = generate_roadmap(skills, target_role, gaps)

    return jsonify({"roadmap": roadmap_text})

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question', '')

    relevant_docs = retrieve_relevant_docs(question)
    context = "\n\n".join(relevant_docs)

    prompt = f"""
    Use the following knowledge base information to answer the student's question.
    Ground your answer in this information where relevant.

    Knowledge base:
    {context}

    Student's question: {question}

    Answer clearly and practically.
    """

    response = model.generate_content(prompt)

    return jsonify({
        "answer": response.text,
        "sources_used": len(relevant_docs)
    })
    
@app.route('/agent', methods=['POST'])
def agent():
    data = request.get_json()
    skills = data.get('skills', [])
    target_role = data.get('target_role', '')
    question = data.get('question', '')

    # Tool 1: get student skills (already have them, but treat as a "tool call")
    def tool_get_skills():
        return skills

    # Tool 2: search knowledge base
    def tool_search_knowledge_base(query):
        return retrieve_relevant_docs(query)

    student_skills = tool_get_skills()
    kb_results = tool_search_knowledge_base(question)
    context = "\n\n".join(kb_results)

    prompt = f"""
    You are a career planning agent. You have used two tools to gather information:
    Tool 1 (get_student_skills) returned: {student_skills}
    Tool 2 (search_knowledge_base) returned: {context}

    Student's target role: {target_role}
    Student's question: {question}

    Using the information gathered from these tools, provide a clear, actionable answer.
    """

    response = model.generate_content(prompt)

    return jsonify({
        "answer": response.text,
        "tools_used": ["get_student_skills", "search_knowledge_base"]
    })
    
if __name__ == '__main__':
    app.run(port=5001, debug=True)
from flask import Flask, request, jsonify
from skill_analyzer import SkillAnalyzer

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(port=5001, debug=True)
class SkillAnalyzer:
    def __init__(self, student_skills, target_role):
        self.student_skills = student_skills
        self.target_role = target_role
    
    ROLE_REQUIREMENTS = {
        "AI Engineer": ["Python", "Machine Learning", "Statistics", "Deep Learning", "Git"],
        "Web Developer": ["HTML", "CSS", "JavaScript", "React", "Git", "Node.js"],
        "Data Analyst": ["Python", "SQL", "Statistics", "Excel", "Data Visualization"]
    }   

    def calculate_score(self):
        required = self.ROLE_REQUIREMENTS.get(self.target_role, [])
        if not required:
            return 0

        matched = [skill for skill in self.student_skills if skill in required]
        score = (len(matched) / len(required)) * 100
        return round(score, 2)
    
    def identify_gaps(self):
        required = self.ROLE_REQUIREMENTS.get(self.target_role, [])
        gaps = [skill for skill in required if skill not in self.student_skills]
        return gaps
    
    def recommend_topics(self):
        gaps = self.identify_gaps()
        if not gaps:
            return ["You already meet the core requirements for this role!"]

        recommendations = []
        for i, skill in enumerate(gaps, start=1):
            recommendations.append(f"{i}. Learn {skill}")

        return recommendations
    
if __name__ == "__main__":
    analyzer = SkillAnalyzer(["Python", "Git"], "AI Engineer")
    print("Score:", analyzer.calculate_score())
    print("Gaps:", analyzer.identify_gaps())
    print("Recommendations:")
    for rec in analyzer.recommend_topics():
        print(rec)
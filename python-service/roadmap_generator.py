import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

model = genai.GenerativeModel('gemini-3.6-flash')

def generate_roadmap(skills, target_role, gaps):
    prompt = f"""
    A student currently knows: {', '.join(skills)}.
    Their target role is: {target_role}.
    Their skill gaps are: {', '.join(gaps)}.

    Generate a short, practical learning roadmap (5-6 steps) to help them
    go from their current skills to their target role. Be concise and actionable.
    """

    response = model.generate_content(prompt)
    return response.text
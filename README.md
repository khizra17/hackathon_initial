
## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express, MongoDB (Mongoose)
- AI Service: Python, Flask, Google Gemini API
- Auth: JWT, bcrypt

## Database Schema
**User**: name, email, password (hashed), role (student/admin), timestamps
**Skill**: student (ref: User), name, level, timestamps

## API Endpoints
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login, returns JWT
- `GET /api/protected` — example protected route (auth test)
- `GET /api/admin-only` — example role-restricted route
- `POST /api/skills` — add a skill (auth required)
- `GET /api/skills` — get logged-in student's skills (auth required)
- `POST /api/skills/assess` — get skill score/gaps via Python service
- `POST /api/skills/roadmap` — get AI-generated roadmap
- `POST http://localhost:5001/ask` — RAG-based AI assistant
- `POST http://localhost:5001/agent` — agentic AI with tool-calling

## Setup Instructions
1. Clone the repository
2. Backend: `cd backend/core-service && npm install`
3. Python service: `cd python-service && pip install flask flask-cors google-generativeai requests`
4. Frontend: `cd frontend && npm install`
5. Create `.env` files (see `.env.example`) with your own MongoDB URI, JWT secret, and Gemini API key
6. Run all three: `node server.js` (backend), `python app.py` (python service), `npm run dev` (frontend)

## DevOps Notes
Docker, Kubernetes, and Terraform configurations in the to-do-list part
of this project's architecture, but full containerized deployment was not completed
within the 24-hour window due to a hardware virtualization limitation on the
development machine (Docker Desktop requires BIOS-level virtualization support,
which was unavailable in this environment). Given more time, the next step would be
containerizing all three services with the provided Dockerfiles and deploying via
the included Kubernetes manifests.

## Future Improvements
- Full Docker/Kubernetes deployment
- Mentor role and mentor dashboard
- Vector-based (embedding) RAG retrieval instead of keyword overlap
- Skill update/delete endpoints
- Polished UI/UX styling
- CI/CD pipeline

## Demo Video
[Watch the demo video](https://drive.google.com/file/d/14jUWCvRFJjw3W2_dOfciYH0ac-ATzoq6/view?usp=sharing)
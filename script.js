// Attach event listeners for form submissions
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('signupForm').addEventListener('submit', signup);

async function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
        document.getElementById('loginFeedback').innerText = "Login successful!";
        console.log(response.data.token); // Handle the token (e.g., store it in localStorage)
    } catch (error) {
        document.getElementById('loginFeedback').innerText = "Login failed: " + error.response.data.message;
    }
}

async function signup(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', { username, password });
        document.getElementById('signupFeedback').innerText = "Sign up successful!";
    } catch (error) {
        document.getElementById('signupFeedback').innerText = "Sign up failed: " + error.response.data.message;
    }
}

async function fetchQuizzes() {
    try {
        const response = await axios.get('http://localhost:3000/api/quiz');
        const quizzes = response.data;
        const quizList = document.getElementById('quizList');
        quizList.innerHTML = '';

        quizzes.forEach(quiz => {
            const quizCard = document.createElement('div');
            quizCard.classList.add('quiz-card');
            quizCard.innerHTML = `
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <button onclick="startQuiz(${quiz.id})">Start Quiz</button>
            `;
            quizList.appendChild(quizCard);
        });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    }
}

function startQuiz(quizId) {
    alert(`Starting quiz with ID: ${quizId}`);
    // Logic to load quiz questions
}

// Fetch quizzes when the page loads
window.onload = fetchQuizzes;

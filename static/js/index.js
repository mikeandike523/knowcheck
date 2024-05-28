// A question should be loaded when the page first loads
// The "defer" keyword use to include this script will ensure that this

// is run after the DOM content is loaded
loadNextQuestion()

let currentDiagnosisNumber = null;

let currentScore = 0;

function updateQuestion(criteriaName) {
    document.getElementById('question').innerText = 'What are the INPATIENT criteria for: ' + criteriaName + '?';
    document.getElementById('answerSection').style.display = 'block';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('submitButton').disabled = false; // Enable submit button at the start of each question
}

async function submitAnswer() {
    const diagnosisName = await firebaseFetch("getCriteriaName", {
        questionNumber: currentDiagnosisNumber
    })
    document.getElementById('submitButton').disabled = true; // Disable submit button to prevent multiple submissions
    document.getElementById('answerDetails').innerHTML = "<strong>WAIT FOR IT...</strong>"; // Show waiting message
    const userAnswer = document.getElementById('answer').value; // Capture user input
    const correctCriteria = await firebaseFetch("getCorrectCriteria", {
        questionNumber: currentDiagnosisNumber
    })
    const response = await analyzeAnswer(userAnswer)
    const score = response.score;
    const explanation = response.explanation;

    // Generate bullet list HTML for criteria
    let criteriaListHtml = "<ul>";
    correctCriteria.forEach(crit => {
        criteriaListHtml += `<li>${crit}</li>`; // Make sure all HTML elements are properly closed
    });
    criteriaListHtml += "</ul>";

    currentScore += score;
    document.getElementById('score').innerText = currentScore;
    document.getElementById('questionScore').innerText = score;
    document.getElementById('answerDetails').innerHTML = `
        <strong>Diagnosis:</strong> ${diagnosisName}<br>
        <strong>User's Response:</strong> ${userAnswer}<br> <!-- Display user's response -->
        <strong>Explanation:</strong> ${explanation}<br>
        <strong>Points Awarded:</strong> ${score}<br>
        <strong>Correct Criteria:</strong>${criteriaListHtml}`;
    document.getElementById('answerSection').style.display = 'none'; // Hide the answer section
    document.getElementById('nextButton').style.display = 'block'; // Show the "Next Question" button
    checkForEmailButton();
}


function formatCriteria(criteria) {
    let criteriaHtml = '<ul>';
    criteria.forEach(crit => {
        criteriaHtml += `<li>${crit}</li>`;
    });
    criteriaHtml += '</ul>';
    return criteriaHtml;
}

async function getNumQuestions() {
    return Number(await firebaseFetch("getNumQuestions"))
}

async function loadNextQuestion() {
    const numQuestions = await getNumQuestions()
    const questionNumber = 1 + Math.floor(Math.random() * numQuestions)
    currentDiagnosisNumber = questionNumber
    const criteriaName = await firebaseFetch("getCriteriaName", {
        questionNumber
    })

    updateQuestion(criteriaName);
    document.getElementById('answer').value = ''; // Clear the textarea
    document.getElementById('answerDetails').innerHTML = ''; // Clear the answer details
}

async function firebaseFetch(functionName, args) {
    // const functionUrl = `https://us-central1-knowcheck.cloudfunctions.net/${functionName}`
    const functionUrl = `http://127.0.0.1:5001/knowcheck-7fe53/us-central1/${functionName}`

    return await new SmartFetch(functionUrl).post(args);
}

async function analyzeAnswer(userAnswer) {
    try {
        const result = await firebaseFetch("analyzeAnswer", { answer: userAnswer, questionNumber: currentDiagnosisNumber });
        return result
    } catch (error) {
        console.error('Error:', error);
        return { score: 0, explanation: 'Error processing your answer.' };
    }
}



function checkForEmailButton() {
    if (currentScore >= 10) {
        document.getElementById('emailButton').style.display = 'block'; // Added the missing quote here
    }
}


function sendEmail() {
    const email = "sohnenae@gmail.com";
    const subject = encodeURIComponent("I got " + currentScore + " points");
    const body = encodeURIComponent("I got " + currentScore + " points - and the secret code is \"UNIMAGINATIVE SECRET CODE\"");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
}
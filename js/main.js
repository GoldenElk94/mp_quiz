import Question from "./Question.js";
import Quiz from "./Quiz.js";



// caching the DOM
const App = (() => {
    const quizEl = document.querySelector(".myQuiz");
    const quizQuestionEl = document.querySelector(".myQuiz__question");
    const trackerEl = document.querySelector(".myQuiz__tracker");
    const tagLineEl = document.querySelector(".myQuiz__tagLine");
    const choicesEl = document.querySelector(".myQuiz__choices");
    const progressInnerEl = document.querySelector(".progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");
    

    const q0 = new Question(
        "Who was the 45th president of the United States?",
        ["Barack Obama", "George H.W. Bush", "George Bush", "Donald Trump"],
        3
    );
    const q1 = new Question(
        "What NFL team won Superbowl LXII?",
        ["Patriots", "Steelers", "Eagles", "Browns"],
        2
    );
    const q2 = new Question(
        "Who wrote the United States National Anthem?",
        ["Lord Baltimore", "Francis Scott Key", "Paul Revere", "John Hancock"],
        1
    );
    const q3 = new Question(
        "What is 13 squared?",
        [144, 169, 100, 13],
        1
    );
    const q4 = new Question(
        "What was Abraham Lincons wife's name?",
        ["Mary Todd", "Molly Pitcher", "Betsy Ross", "Joan London"],
        0
    );
    const q5 = new Question(
        "Who said \'Give me liberty , or give me death\?'",
        ["Ben Franklin", "John Wilks Booth", "Samual Mudd", "Patrick Henry"],
        3
    );
    const q6 = new Question(
        "What city was the original capital of the United States?",
        ["Philadelphia", "Boston", "New York", "Atlanta"],
        0
    );

    const quiz = new Quiz([q0, q1, q2, q3, q4, q5, q6]);

    // event listners
    const listeners = _ => {
        nextButtonEl.addEventListener("click", function() {
            const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
            if (selectedRadioElem) {
                const key = Number(selectedRadioElem.getAttribute("data-order"));
                quiz.guess(key);
                renderAll();
            }
        });

        restartButtonEl.addEventListener("click", function() {
            quiz.reset();
            renderAll();
            nextButtonEl.style.opacity = 1;
            
        });
    };

   const setValue = (elem, value) =>{
       elem.innerHTML = value;
   };
    
// questions
   const renderQuestion = _ => {
       const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl, question);
   };
//    choices

   const renderChoicesElements = _ => {
       let markup = "";
       const currentChoices = quiz.getCurrentQuestion().choices;
       currentChoices.forEach((elem, index) =>{
           markup += `
            <li class="myQuiz__choice">
            <input type="radio" name="choice" class="myQuiz__input" data-order="${index}" id="choice${index}">
            <label for="choice${index}" class="myQuiz__label">
                <i></i>
            <span>${elem}</span>
            </label>
                </li>
            `;
       });
       setValue(choicesEl, markup);
   };
//    set tracker
        const renderTracker = _ => {
            const index = quiz.currentIndex;
            setValue(trackerEl, `${index+1} of ${quiz.questions.length}`);
        };
        // progress bar
        const getPercentage = (num1, num2) => {
            return Math.round((num1/num2) * 100);
        };
        const launch = (width, maxPercent) => {
          let loadingBar = setInterval(function(){
            if (width > maxPercent) {
                clearInterval(loadingBar);
            }else {
                width++;
                progressInnerEl.style.width = width + "%";
            }
          }, 3);
        };
        

        const renderProgress = _ => {
            // width
            const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
            // launch(0, width)
            launch(0, currentWidth);
        };
        const renderEndScreen = _ => {
            setValue(quizQuestionEl, `Thank you for taking my quiz`);
            // setValue(tagLineEl, `Quiz Complete`);
            setValue(trackerEl, `Quiz complete: Your Score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
            nextButtonEl.style.opacity = 0;
            renderProgress();
        };

        const renderAll = _ => {
            if (quiz.hasEnded()) {
                renderEndScreen();
            } else {
                // render question
                renderQuestion();
                // render choices
                renderChoicesElements();
                // render tracker
                renderTracker();
                // render progress
                renderProgress();
            }
        };
        return {
            renderAll: renderAll,
            listeners: listeners
        };
})();
App.renderAll();
App.listeners();


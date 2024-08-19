const prev = document.getElementById('previous');
const next = document.getElementById('next');
const ques = document.querySelector('.Question');
const Answers = document.querySelectorAll('.Answer');
const show_frame = document.querySelector('.show_result');
const print_result = document.getElementById('print_result');
const Reset = document.querySelector(".Reset");

let questions = [
    {
        question: "Number of primitive data types in Java are?",
        A: "6",
        B: "7",
        C: "8",
        D: "9",
        Correct: "C"
    },
    {
        question: "What is the size of float and double in java?",
        A: "32 and 64",
        B: "32 and 32",
        C: "64 and 64",
        D: "64 and 32",
        Correct: "A"
    },
    {
        question: "Automatic type conversion is possible in which of the possible cases?",
        A: "Byte to Int",
        B: "Int to Long",
        C: "Long to Int",
        D: "Short to Int",
        Correct: "B"
    }
];

const len = questions.length;
let arr = Array(len).fill(null);
let count = 0, Result = 0;

const clear = () => {
    Answers.forEach(answer => {
        answer.classList.remove("correct", "wrong", "disable");
    });
}

const check_Answered = () => {
    if (arr[count] != null) {
        check(arr[count], arr[count].charCodeAt() - 65, "DoNotAddToResult");
    }
}

const display = () => {
    if (count >= questions.length) {
        show_frame.classList.remove('hide_frame');
        print_result.innerText = `Your score is ${Result} out of ${questions.length}`;
        prev.classList.add('disable');
        next.classList.add('disable');
    } else {
        show_frame.classList.add('hide_frame');
        clear();
        ques.innerText = questions[count].question;
        Answers[0].innerText = questions[count].A;
        Answers[1].innerText = questions[count].B;
        Answers[2].innerText = questions[count].C;
        Answers[3].innerText = questions[count].D;
        check_Answered();

        next.innerText = count === questions.length - 1 ? "Submit" : "Next";
    }
}

const check_prev = () => {
    prev.classList.toggle('disable', count === 0);
}

window.onload = () => { check_prev(); display(); };

const check = (ans, ansIndex, CheckToAdd) => {
    if (questions[count].Correct === ans) {
        Answers[ansIndex].classList.add("correct");
        if (CheckToAdd === "AddToResult") {
            Result++;
        }
    } else {
        Answers[ansIndex].classList.add("wrong");
    }

    Answers.forEach((answer, index) => {
        if (index !== ansIndex) {
            answer.classList.add("disable");
        }
    });
}

Answers.forEach(element => {
    element.addEventListener("click", () => {
        if (arr[count] === null) { 
            arr[count] = element.value;
            check(element.value, element.value.charCodeAt() - 65, "AddToResult");
        }
    });
});

prev.addEventListener("click", () => {
    if (count > 0) {
        count--;
        check_prev();
        display();
    }
});

next.addEventListener("click", () => {
    if (count < questions.length - 1) {
        count++;
        check_prev();
        display();
    } else if (count === questions.length - 1) {
        count++;
        display(); 
    }
});

Reset.addEventListener("click", () => {
    count = 0;
    Result = 0;
    arr.fill(null);
    prev.classList.remove('disable');
    next.classList.remove('disable');
    show_frame.classList.add('hide_frame');
    display();
});

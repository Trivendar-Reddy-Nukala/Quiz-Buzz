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
    },
]
const len = questions.length;
let arr = Array(len).fill(null);

let count = 0, Result = 0;
const clear = () => {
    for (let i = 0; i < Answers.length; i++) {
        Answers[i].classList.remove("correct", "wrong", "disable");
    }
}
const check_Answered = () => {
    if (arr[count] != null) {
        check(arr[count], arr[count].charCodeAt() - 65, "DoNotAddToResult");
        return;
    }
}
const display = () => {
    if (count === questions.length - 1) {
        next.innerText = "submit";
    } else {
        next.innerText = "next";
    }
    if (count === questions.length) {
        show_frame.classList.remove('hide_frame');
        prev.classList.add('disable');
        next.classList.add('disable');
        print_result.innerText = `You Score is ${Result} out of ${questions.length}`
    }
    else if (count < questions.length) {
        show_frame.classList.add('hide_frame');
        clear();
        ques.innerText = questions[count].question;
        Answers[0].innerText = questions[count].A;
        Answers[1].innerText = questions[count].B;
        Answers[2].innerText = questions[count].C;
        Answers[3].innerText = questions[count].D;
        check_Answered();
    }

}
const check_prev = () => {
    if (count === 0) {
        prev.classList.add('disable');
    }
    else {
        prev.classList.remove('disable');
    }
}
window.onload = () => { check_prev() };

const check = (ans, ansIndex, CheckToAdd) => {
    if (questions[count].Correct === ans) {
        Answers[ansIndex].classList.add("correct");
        if (CheckToAdd === "AddToResult") {
            Result++;
        }
    }
    else {
        Answers[ansIndex].classList.add("wrong");
    }
    console.log(arr);
    for (let i = 0; i < 4; i++) {
        if (i != ansIndex) {
            Answers[i].classList.add("disable");
        }
    }
    console.log(Result);
}
Answers.forEach(element => {
    element.addEventListener("click", () => {
        arr[count] = element.value;
        check(element.value, element.value.charCodeAt() - 65, "AddToResult");
    })
});

display();

prev.addEventListener("click", () => {
    count--;
    check_prev();
    display()
});

next.addEventListener("click", () => {
    count++;
    check_prev();
    display();
});
Reset.addEventListener("click", () => {
    count = 0;
    Result = 0;
    for(let i=0;i<len;i++){
        arr[i] = null;
    }
    prev.classList.remove('disable');
    next.classList.remove('disable');
    display();
});


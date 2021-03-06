let max_nums_Of_Algorithms = 5;
let number_of_questions = 50;
let sel_op;
window.onload = function(){
    modal = document.getElementById('mymodal');
    changeModal_state();
}

window.onclick = function(event) {
    if (event.target == modal) {
        changeModal_state();
    }
}
function changeModal_state(){
    let display = modal.style.display;
    if(display == 'none'){
        modal.style.display = 'flex';
        return
    }
    max_nums_Of_Algorithms = document.getElementById('maxAlg').value == "" ? 5 : document.getElementById('maxAlg').value;
    if(max_nums_Of_Algorithms > 8){
        max_nums_Of_Algorithms = 8;
        alert("Max number of algorithms is 8, seted to 8");
    }
    sel_op = document.getElementById('operations').value;
    modal.style.display = 'none';
}

let operations = [
    {
        name: "subtraction",
        symbol: "-",
        func: (a, b) => a - b
    },
    {
        name: "addition",
        symbol: "+",
        func: (a, b) => a + b
    },
    {
        name: "multiplication",
        symbol: "*",
        func: (a, b) => a * b
    },
    {
        name: "division",
        symbol: "/",
        func: (a, b) => a / b
    }
];
function generate_list_of_questions() {
    let list_of_questions = [];
    for (let i = 0; i < number_of_questions; i++) {
        let question_and_answer = generate_Question_and_Answer();   
        list_of_questions.push({"question":`${i + 1}. ${question_and_answer[0]} =`, "answer":`${i + 1}. ${question_and_answer[1]}`});
    }
    return list_of_questions;
}
function generate_Question_and_Answer() {
    let n1 = Number(generate_Number());
    let n2 = Number(generate_Number());
    n1 = !Number.isInteger(n1) ? n1.toFixed(2): n1;
    n2 = !Number.isInteger(n2) ? n2.toFixed(2): n2;
    let operation = operations.find(op => op.name == sel_op) || operations[Math.floor(Math.random() * operations.length)];
    let question = n1 + " " + operation.symbol + " " + n2;
    let answer = operation.func(parseInt(n1), parseInt(n2));
    if(!Number.isInteger(answer)){
        answer = answer.toFixed(2);
    }
    return [question, answer];
}

function generate_Number() {
    let number = [];
    let nums_Of_Algorithms = Math.floor(Math.random() * ( max_nums_Of_Algorithms -1 ) + 2);
    let isFloat = Math.random() < 0.3;
    for (let i = 0; i < nums_Of_Algorithms; i++) {
        if(i + 1 == nums_Of_Algorithms && isFloat){
            number.push(Math.random() * (9 - 1) + 1);
            break
        }
        if(i != 0) {
            number.push( Math.floor(Math.random() * (9 - 1) + 1));
        }
        else {
            number.push( Math.floor(Math.random() * 9 + 1));
        }
    }
    
    return number.join("");
}
function write_questions_on_doc(doc, questions){
    doc.setFont("courier", "bold");
    doc.text(35, 10, "Questions: ");
    doc.setFont("arial", "normal");
    doc.setFontSize(8);
    for (let i = 0; i < questions.length; i++) {
        let question_row = i;
        let question_column = 0;
        if(i + 1 > 25){
            question_row = i - 25;
            question_column = 1;
        }    
        doc.text(10 + (question_column * 60), 20 + (question_row * 10), questions[i].question);
    }
}
function write_answer_on_doc(doc, questions){
    doc.line(120, 0, 120, 297);
    doc.setFont("courier", "bold");
    doc.text(140, 10, "Answers: ");
    doc.setFont("arial", "normal");
    doc.setFontSize(6);
    for (let i = 0; i < questions.length; i++) {
        let answer_row = i;
        let answer_column = 0;
        if(i + 1 > 25){
            answer_row = i - 25;
            answer_column = 1;
        }    
        doc.text(130 + (answer_column * 25), 20 + (answer_row * 5), questions[i].answer);
    }
}
function create_and_save_doc(){
    let questions = generate_list_of_questions();
    let doc = new jsPDF()
    write_questions_on_doc(doc, questions);
    write_answer_on_doc(doc, questions);
    doc.save('MathList.pdf')

}
let fadeTimeout;
let hideTimeout;

function randomQuote() {
    // quotes
    const quotes = [
        "The best way to predict the future is to invent it. – Alan Kay",
        "Code is like humor. When you have to explain it, it's bad. – Cory House",
        "First, solve the problem. Then, write the code. – John Johnson",
        "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
        "In order to be irreplaceable, one must always be different. – Coco Chanel",
        "Java is to JavaScript what car is to Carpet. – Chris Heilmann",
        "Simplicity is the soul of efficiency. – Austin Freeman",
        "Programs must be written for people to read, and only incidentally for machines to execute. – Harold Abelson",
        "Walking on water and developing software from a specification are easy if both are frozen. – Edward V. Berard",
        "It's not a bug – it's an undocumented feature. – Anonymous",
        "The function of good software is to make the complex appear to be simple. – Grady Booch",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
        "Make it work, make it right, make it fast. – Kent Beck",
        "Testing leads to failure, and failure leads to understanding. – Burt Rutan",
        "Controlling complexity is the essence of computer programming. – Brian Kernighan",
        "The only way to go fast is to go well. – Robert C. Martin",
        "Don't comment bad code – rewrite it. – Brian Kernighan",
        "If you think your users are idiots, only idiots will use it. – Linus Torvalds",
        "The computer was born to solve problems that did not exist before. – Bill Gates",
        "Debugging is like being the detective in a crime movie where you are also the murderer. – Filipe Fortes",
        "Software is a great combination between artistry and engineering. – Bill Gates",
        "The most disastrous thing that you can ever learn is your first programming language. – Alan Kay",
        "Code never lies, comments sometimes do. – Ron Jeffries",
        "Any code of your own that you haven’t looked at for six or more months might as well have been written by someone else. – Eagleson’s law"
    ];

    // select random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const popup = document.getElementById('quotePopup');
    
    // reset timeouts
    clearTimeout(fadeTimeout);
    clearTimeout(hideTimeout);
    
    // updaet thr poput and display it
    popup.textContent = randomQuote;
    popup.classList.add('show');
    popup.classList.remove('fade');

    // fadeout afrter 5sec
    fadeTimeout = setTimeout(() => {
        popup.classList.add('fade');
        
        // remove classes after fadeout transition is complete
        hideTimeout = setTimeout(() => {
            popup.classList.remove('show', 'fade');
        }, 500); 
    }, 5000); 
}
// select
document.querySelector('.btn-rounded-white').addEventListener('click', randomQuote);

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading(){
    // show the loader
    loader.hidden = false;
    // hide the quote container 
    quoteContainer.hidden = true;
}
// hide loading
function completeLoading(){
    
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote(){
    loading();
    // due to CORS policy, we will call a proxy api first so we will call our trget api
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    // api Url (from the api website): http://api.forismatic.com/api/1.0/
    // query string : (all the request) :
    // method = getQuote (method name to invoke)
    // lang = en (language of response (english))
    // format of response : json format
     const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
   
    try {
        // response will wait the fetch of apiUrl to be set
        const response = await fetch(proxyUrl + apiUrl);
        // data will wait the response to be set so it can be set
        const data = await response.json();
        // console.log("data", data);

        // If Author is blank , add 'unknown'
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop loader , show quote
        completeLoading();
       
    } catch (error) {
        // getQuote();
        console.log("whoops, no quote", error);
        document.getElementById("quote").innerHTML = "Say something good or be quiet !";
        //     // add (display) the author
        document.getElementById("author").innerHTML = "Prophet Mohammed";
        
       
    } 
    
}
// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();

// let newQuote = getQuote();


// console.log("newQuote : ", newQuote);
// function to affect data on click
// document.getElementById("new-quote").addEventListener('click', function(){
//     // add (display) the quote
//     document.getElementById("quote").innerHTML = newQuote.quoteText;
//     // add (display) the author
//     document.getElementById("author").innerHTML = newQuote.quoteAuthor;
// })
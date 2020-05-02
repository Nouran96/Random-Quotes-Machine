let quotes = [], 
    colors = ['#ff6666', '#bb33ff', '#4d88ff', '#00e6b8', '#77b300', '#336699', '#ff9933', '#404040'];
    
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allQuotes: [] };
  }
  
  componentDidMount() {
    quotes.push(this.fetchQuotes());
    this.showQuotes()
  }
  
  fetchQuotes() {
     return fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(res => {
       return res.json()  
    })
  }
  
  showQuotes() {
    let quoteDiv = document.getElementById('text');
    let quoteAuthor = document.getElementById('author');
    
    Promise.all(quotes).then(resp => {
      this.setState(state => {
        allQuotes: state.allQuotes.push(resp[0].quotes)
      }, function() {
       let randomQuote = this.state.allQuotes[0][Math.floor(Math.random() * this.state.allQuotes[0].length)]
      
      quoteDiv.textContent = randomQuote.quote;
      
      quoteAuthor.textContent = randomQuote.author;
        
      })
      
      let randomColor = colors[Math.floor(Math.random() * colors.length)]
       
      document.documentElement.style.setProperty('--main-color', randomColor);
      
    })
  }
  
  render() {
    return (
      <div class="container">
        <div id="quote-box">
          <div id="text"></div>

          <p id="author"></p>

          <div id="buttons-container">
            <button>
              <a href="https://www.twitter.com/intent/tweet" id="tweet-quote" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </button>

            <button id="new-quote" onClick={(e) => {
                e.preventDefault();
                this.showQuotes();
              }}>New Quote</button>
          </div>
        </div>
        
        <footer>By: Nouran Samy</footer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
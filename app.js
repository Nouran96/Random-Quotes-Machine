var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var quotes = [],
    colors = ['#ff6666', '#bb33ff', '#4d88ff', '#00e6b8', '#77b300', '#336699', '#ff9933', '#404040'];

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = { allQuotes: [] };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      quotes.push(this.fetchQuotes());
      this.showQuotes();
    }
  }, {
    key: 'fetchQuotes',
    value: function fetchQuotes() {
      return fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json').then(function (res) {
        return res.json();
      });
    }
  }, {
    key: 'showQuotes',
    value: function showQuotes() {
      var _this2 = this;

      var quoteDiv = document.getElementById('text');
      var quoteAuthor = document.getElementById('author');

      Promise.all(quotes).then(function (resp) {
        _this2.setState(function (state) {
          allQuotes: state.allQuotes.push(resp[0].quotes);
        }, function () {
          var randomQuote = this.state.allQuotes[0][Math.floor(Math.random() * this.state.allQuotes[0].length)];

          quoteDiv.textContent = randomQuote.quote;

          quoteAuthor.textContent = randomQuote.author;
        });

        var randomColor = colors[Math.floor(Math.random() * colors.length)];

        document.documentElement.style.setProperty('--main-color', randomColor);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { 'class': 'container' },
        React.createElement(
          'div',
          { id: 'quote-box' },
          React.createElement('div', { id: 'text' }),
          React.createElement('p', { id: 'author' }),
          React.createElement(
            'div',
            { id: 'buttons-container' },
            React.createElement(
              'button',
              null,
              React.createElement(
                'a',
                { href: 'https://www.twitter.com/intent/tweet', id: 'tweet-quote', target: '_blank' },
                React.createElement('i', { 'class': 'fab fa-twitter' })
              )
            ),
            React.createElement(
              'button',
              { id: 'new-quote', onClick: function onClick(e) {
                  e.preventDefault();
                  _this3.showQuotes();
                } },
              'New Quote'
            )
          )
        ),
        React.createElement(
          'footer',
          null,
          'By: Nouran Samy'
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
const apiKey = 'KEY'
const oauthToken = 'KEY'
var trelloNode = require('trello-node-api')(apiKey, oauthToken)

export function boardRequest (boardId) {
  trelloNode.board.search(boardId).then(function (response) {
    console.log('response from boardREquest', response)
  }).catch(function (error) {
    console.log('error from boardREquest', error)
  })
}

export function cardRequest (boardId) {
  trelloNode.board.searchCards(boardId).then(function (response) {
    console.log('response from cardRequest', response)
  }).catch(function (error) {
    console.log('error from cardRequest', error)
  })
}

export function createCardTrello (data) {
  trelloNode.card.create(data).then(function (response) {
    console.log('response from Create card', response)
  }).catch(function (error) {
    console.log('error', error)
  })
}

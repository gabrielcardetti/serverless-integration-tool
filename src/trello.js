const apiKey = process.env.APIKEY
const oauthToken = process.env.OAUTHTOKEN

var trelloNode = require('trello-node-api')(apiKey, oauthToken)

export function boardRequest (boardId) {
  trelloNode.board.search(boardId).then(function (response) {
    console.log('response from boardREquest', response)
  }).catch((error) => {
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
  var promise = new Promise(function (resolve, reject) {
    trelloNode.card.create(data).then(function (response) {
      console.log('response from Create card', response)
      resolve(response)
    }).catch(function (error) {
      console.log('error', error)
      reject(error)
    })
  })
  return promise
}

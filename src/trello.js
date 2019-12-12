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

export function searchCardTrello (data) {
  return new Promise(function (resolve, reject) {
    trelloNode.card.search(data).then(function (response) {
      console.log('response from search card', response)
      resolve(response)
    }).catch(function (error) {
      console.log('error', error)
      reject(error)
    })
  })
}

export function updateCardTrello (data) {
  const { id, name } = data
  console.log(data, 'DATAAAAAA')
  return new Promise(function (resolve, reject) {
    trelloNode.card.update(id, { name }).then(function (response) {
      console.log('response from search card', response)
      resolve(response)
    }).catch(function (error) {
      console.log('error', error)
      reject(error)
    })
  })
}

export function createCardTrello (data) {
  return new Promise(function (resolve, reject) {
    trelloNode.card.create(data).then(function (response) {
      console.log('response from Create card', response)
      resolve(response)
    }).catch(function (error) {
      console.log('error', error)
      reject(error)
    })
  })
}

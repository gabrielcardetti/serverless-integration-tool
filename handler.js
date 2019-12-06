'use strict'

const apiKey = 'KEY'
const oauthToken = 'KEY'
var trelloNode = require('trello-node-api')(apiKey, oauthToken)

const boardRequest = (boardId) => {
  trelloNode.board.search(boardId).then(function (response) {
    console.log('response from boardREquest', response)
  }).catch(function (error) {
    console.log('error from boardREquest', error)
  })
}

const cardRequest = (boardId) => {
  trelloNode.board.searchCards(boardId).then(function (response) {
    console.log('response from cardRequest', response)
  }).catch(function (error) {
    console.log('error from cardRequest', error)
  })
}

const createCardTrello = (data) => {
  trelloNode.card.create(data).then(function (response) {
    console.log('response from Create card', response)
  }).catch(function (error) {
    console.log('error', error)
  })
}

const idList = '5d1a50166414ae44408e1785'

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`
    })
  }

  const body = JSON.parse(event.body)
  console.log(body.kind, 'KIIIIIIIIIND')

  switch (body.kind) {
    case 'todo_completed':
      todoCompleted()
      break
    case 'todo_uncompleted':
      todoUncompleted()
      break
    case 'todo_created':
      todoCreated(body)
      break
    case 'todo_trashed':
      todoDeleted()
      break
    case 'todo_unarchived':
      todoUnarchived()
      break
    case 'todo_archived':
      todoArchived()
      break
    default:
  }
  callback(null, response)
}

const todoCompleted = () => {
  console.log('TODO COMPLETE')
}

const todoUncompleted = () => {
  console.log('TODO UNCOMPLETE')
}
const todoCreated = async (body) => {
  const title = body.recording.title
  const urlCardBaseCamp = body.recording.app_url
  const creatorName = body.creator.name + ' '
  // const creatorEmail = body.creator.email_address
  const descripcion = `Url de la card en basecamp ${urlCardBaseCamp} \n creada por ${creatorName}`
  const data = {
    name: title,
    desc: descripcion,
    pos: 'top',
    idList: idList
  }
  console.log(data, 'DATA FOR CREATE CARD')
  createCardTrello(data)
}

const todoDeleted = () => {
  console.log('TODO DELETED')
}
const todoUnarchived = () => {
  console.log('TODO UNARCHIVED')
}

const todoArchived = () => {
  console.log('TODO ARCHIVED')
}

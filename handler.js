'use strict'
import { createCardTrello } from './trello'

const idList = '5d1a50166414ae44408e1785'

export function hello (event, context, callback) {
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

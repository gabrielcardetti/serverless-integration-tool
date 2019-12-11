'use strict'
import { createCardTrello, searchCardTrello } from './trello'

import { createRelation, getRelationBy, updateRelation } from './db'

// TODO: move this
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
      todoCompleted(body)
      break
    case 'todo_uncompleted':
      todoUncompleted(body)
      break
    case 'todo_created':
      todoCreated(body)
      break
    case 'todo_trashed':
      todoDeleted(body)
      break
    case 'todo_unarchived':
      todoUnarchived(body)
      break
    case 'todo_archived':
      todoArchived(body)
      break
    case 'get_item':
      getRelation(body)
      break
    default:
  }
  callback(null, response)
}

const getRelation = async (body) => {
  const baseCampCardId = String(body.recording.id)
  const item = await getRelationBy({ baseCampCardId })
  console.log(item, 'ITEM FROM GET ITEM')
  return item
}

const todoCompleted = async (body) => {
  console.log('TODO COMPLETE')
  const baseCampCardId = String(body.recording.id)
  const update = await updateRelation({ baseCampCardId }, { completed: true })
  console.log(update)
  // cardCompleted(data, 'basecamp')
}

const todoUncompleted = async (body) => {
  console.log('TODO UNCOMPLETE')
  const baseCampCardId = String(body.recording.id)
  const update = await updateRelation({ baseCampCardId }, { completed: false })
  console.log(update)
}

async function todoCreated (body) {
  const item = await getRelation(body)
  if (item !== undefined) {
    console.log('La relacion ya existe')
    return
  }
  const title = body.recording.title
  const urlCardBaseCamp = body.recording.app_url
  const creatorName = body.creator.name + ' '
  // const creatorEmail = body.creator.email_address
  const descripcion = `Url de la card en basecamp ${urlCardBaseCamp} \n creada por ${creatorName}`
  const dataForCardTrello = {
    name: title,
    desc: descripcion,
    pos: 'top',
    idList: idList
  }
  const cardTrello = await createCardTrello(dataForCardTrello)
  const relation = {
    baseCampCardId: String(body.recording.id),
    baseCampProjectId: String(body.recording.bucket.id),
    trelloCardId: cardTrello.id,
    trelloBoardId: cardTrello.idBoard,
    trelloIdList: cardTrello.idList,
    trelloShortLink: cardTrello.shortLink,
    deleted: false,
    completed: false,
    archived: false
  }
  createRelation(relation)
}

const todoDeleted = async (body) => {
  console.log('TODO DELETED')
  const baseCampCardId = String(body.recording.id)
  const update = await updateRelation({ baseCampCardId }, { deleted: true })
  console.log(update)
}
const todoUnarchived = async (body) => {
  console.log('TODO UNARCHIVED')
  const baseCampCardId = String(body.recording.id)
  const update = await updateRelation({ baseCampCardId }, { archived: false })
  console.log(update)
}

const todoArchived = async (body) => {
  console.log('TODO ARCHIVED')
  const baseCampCardId = String(body.recording.id)
  const update = await updateRelation({ baseCampCardId }, { archived: true })
  console.log(update)
}

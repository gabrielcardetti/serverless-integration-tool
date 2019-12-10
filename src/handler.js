'use strict'
import { createCardTrello } from './trello'

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
      todoDeleted()
      break
    case 'todo_unarchived':
      todoUnarchived()
      break
    case 'todo_archived':
      todoArchived()
      break
    case 'get_item':
      getItem(body)
      break
    default:
  }
  callback(null, response)
}

const getItem = async (body) => {
  const item = await getRelationBy(getSpecificationFromBody(body))
  console.log(item)
}

const getSpecificationFromBody = (body) => {
  const specification = {
    titleCard: body.recording.title,
    baseCampCardId: String(body.recording.id),
    baseCampProjectId: String(body.recording.bucket.id)
  }
  return specification
}

const todoCompleted = async (body) => {
  console.log('TODO COMPLETE')
  const specification = getSpecificationFromBody(body)
  const update = await updateRelation(specification, { completed: true })
  console.log(update)
  // cardCompleted(data, 'basecamp')
}

const todoUncompleted = async (body) => {
  console.log('TODO UNCOMPLETE')
  const specification = getSpecificationFromBody(body)
  const update = await updateRelation(specification, { completed: false })
  console.log(update)
}

async function todoCreated (body) {
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
    titleCard: title,
    baseCampCardId: String(body.recording.id),
    baseCampProjectId: String(body.recording.bucket.id),
    trelloCardId: cardTrello.id,
    trelloBoardId: cardTrello.idBoard,
    trelloIdList: cardTrello.idList,
    trelloShortLink: cardTrello.shortLink,
    deleted: false,
    completed: false
  }
  // createRelation(relation, 'basecamp')
  createRelation(relation)
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

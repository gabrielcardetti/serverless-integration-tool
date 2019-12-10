import dynamoose from 'dynamoose'

dynamoose.AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
})

const Schema = dynamoose.Schema

const relationSchema = new Schema({
  titleCard: { type: String },
  baseCampCardId: { type: String },
  baseCampProjectId: { type: String },
  trelloCardId: { type: String },
  trelloBoardId: { type: String },
  trelloIdList: { type: String },
  trelloShortLink: { type: String },
  deleted: { type: Boolean },
  completed: { type: Boolean }

})

const Relation = dynamoose.model('relation', relationSchema)

export async function createRelation (data) {
  const relation = new Relation({ ...data }, { useNativeBooleans: true })
  return relation.save({ overwrite: false })
}

export function getRelationBy (specification) { return Relation.get({ ...specification }) }

export function updateRelation (specification, options) { return Relation.update(specification, { $PUT: { ...options } }) }

export function getCompletedTrue () { return Relation.get({ completed: true }) }

export function getUserById (id) { return Relation.queryOne('id').eq(id).exec() }

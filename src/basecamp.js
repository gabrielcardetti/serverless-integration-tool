const accessToken = ''
const accountId = process.env.ACCOUNT_BASECAMP_ID

const getData = url => new Promise((resolve, reject) => {
  const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  request.setRequestHeader('Authorization', 'Bearer ' + accessToken)
  request.setRequestHeader('Accept', 'application/json')
  request.onload = function () {
    if (request.status === 400 || request.status === 401) reject(request)
    else resolve(request)
  }
  request.send()
})

export async function getCardBaseCamp (data) {
  const { baseCampProjectId, baseCampCardId } = data
  const url = `https://3.basecampapi.com/${accountId}/buckets/${baseCampProjectId}/todos/${baseCampCardId}.json`
  const response = await getData(url)
  return JSON.parse(response.responseText)
}

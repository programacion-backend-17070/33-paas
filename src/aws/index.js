const { config, SNS, DynamoDB } = require('aws-sdk')

config.update({
  region: 'us-east-1'
})

const sns = new SNS()
const db = new DynamoDB.DocumentClient()

const TOPIC = 'arn:aws:sns:us-east-1:230392243984:notifications'
const TABLE = 'products'

module.exports = {
  sns,
  db,
  TOPIC,
  TABLE
}
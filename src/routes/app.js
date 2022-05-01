const router = require('express').Router()

const { TABLE, db, sns, TOPIC } = require('../aws')

const defaultParams = {
  TableName: TABLE
}

router.get('', async (req, res) => {
  try {
    const data = await db.scan(defaultParams).promise()
    res.send(data.Items)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('', async (req, res) => {
  const { body } = req

  console.log(body)
  try {
    await db.put({ ...defaultParams, Item: body }).promise()

    console.log('saved item')

    await sns.publish({
      Message: `nuevo producto ${JSON.stringify(body, null, 2)}`,
      Subject: 'nuevo producto',
      TopicArn: TOPIC
    }).promise()

    res.sendStatus(201)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
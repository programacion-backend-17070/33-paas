const router = require('express').Router()

const { TABLE, TOPIC, sns, db } = require('../aws')

const defaultParams = {
  TableName: TABLE
}

router.get('', async (req, res) => {
  try {
    const data = await db.scan(defaultParams).promise()

    res.send(data.Items)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.post('', async (req, res) => {
  const { body } = req
  try {
    // {
    //   TableName,
    //   Item
    // }
    await db.put({ ...defaultParams, Item: body }).promise()

    await sns.publish({
      Message: `Nuevo producto creado ${JSON.stringify(body, null, 2)}`,
      Subject: 'Mensaje de Ecommerce',
      TopicArn: TOPIC
    }).promise()

    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    await db.put({
      ...defaultParams,
      Item: {
        ...req.body,
        id: +req.params.id
      }
    }).promise()

    await sns.publish({
      Message: `Actualizacion de producto con id ${req.params.id}
        A: ${JSON.stringify(req.body, null, 2)}`,
      Subject: 'Mensaje de Ecommerce',
      TopicArn: TOPIC
    }).promise()

    res.sendStatus(202)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

module.exports = router
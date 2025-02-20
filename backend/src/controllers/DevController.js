const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index (req, res) {
    const devs = await Dev.find()
    return res.json(devs)
  },

  async store (req, res) {
    const { github_username, techs, latitude, longitude } = req.body
    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`)
      const { name, avatar_url, bio } = response.data
      const techsArray = parseStringAsArray(techs)
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name: name ? name : github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })
    }

    res.json(dev)
  },

  async remove(req, res) {
    const { id } = req.params
    const dev = await Dev.findByIdAndDelete(id)
    res.json(dev)
  }
}
"use strict"

const RoonApiStatus = require("node-roon-api-status")
const Roon = require("./roon")

class Status {
    api
    /** @param {Roon} roon */
    constructor(roon) {
        this.api = new RoonApiStatus(roon.api)
    }
}

exports = module.exports = Status

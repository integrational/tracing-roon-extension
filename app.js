"use strict"

const pkg = require("./package.json")
const
    Roon = require("./roon"),
    Status = require("./status"),
    Settings = require("./settings")

const roon = new Roon(pkg)
const status = new Status(roon)
const settings = new Settings(roon, {})

roon.api.init_services({
    provided_services: [status.api, settings.api]
})

status.api.set_status("Initial status of extension", false)

roon.api.start_discovery()

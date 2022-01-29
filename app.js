"use strict"

const humanize = require("underscore.string/humanize")
const titleize = require("underscore.string/titleize")
const RoonApi  = require("node-roon-api")

const pkg  = require("./package.json")
const roon = new RoonApi({
    extension_id:        pkg.config.extension_id,
    display_name:        titleize(humanize(pkg.name)),
    display_version:     pkg.version,
    publisher:           pkg.author.name,
    email:               pkg.author.email,
    website:             pkg.config.website
})

roon.init_services({})

roon.start_discovery()
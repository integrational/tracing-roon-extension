"use strict"

const RoonApi = require("node-roon-api")
const
    humanize = require("underscore.string/humanize"),
    titleize = require("underscore.string/titleize")

class Roon {
    api
    /** @param {object} pkg  */
    constructor(pkg) {
        this.api = new RoonApi({
            extension_id: pkg.config.extension_id,
            display_name: titleize(humanize(pkg.name)),
            display_version: pkg.version,
            publisher: pkg.author.name,
            email: pkg.author.email,
            website: pkg.config.website,
            log_level: "all", // "all" or "none"
            core_paired: this.logWithCore("Core paired"),
            core_unpaired: this.logWithCore("Core unpaired")
        })
    }

    logWithCore(message) {
        return core => console.log(message, ":", {
            name: core.display_name,
            version: core.display_version,
            id: core.core_id
        })
    }

}

exports = module.exports = Roon

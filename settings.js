"use strict"

const RoonApiSettings = require("node-roon-api-settings")
const Roon = require("./roon")

const CONFIG_STORE_SETTINGS_KEY = "settings"

const defaultSettings = {
    zone: null,
    percentage: 42
}

class Settings {
    api
    currentSettings
    /**
     * @param {Roon} roon
     * @param {object} opts
     */
    constructor(roon, opts) {
        const storedSettings = roon.api.load_config(CONFIG_STORE_SETTINGS_KEY)
        this.currentSettings = Object.assign(defaultSettings, storedSettings || {})
        this.api = new RoonApiSettings(roon.api, {
            get_settings: cb => cb(this.layoutFromSettings(this.currentSettings)),
            save_settings: (req, isdryrun, settings) => {
                const l = this.layoutFromSettings(settings.values)
                req.send_complete(l.has_error ? "NotValid" : "Success", { settings: l })

                if (!isdryrun && !l.has_error) {
                    this.currentSettings = l.values
                    this.api.update_settings(l)
                    roon.api.save_config(CONFIG_STORE_SETTINGS_KEY, this.currentSettings)
                    this.updateModel()
                }
            }
        })
    }

    layoutFromSettings(settings) {
        const l = {
            values: settings,
            layout: [],
            has_error: false
        }
        l.layout.push({
            type: "zone",
            title: "Zone",
            setting: "zone",
        })
        let perc = {
            type: "integer",
            min: 0,
            max: 100,
            title: "Percentage",
            setting: "percentage",
        }
        if (settings.percentage < perc.min || settings.percentage > perc.max) {
            perc.error = "Percentage must be between 0 and 100."
            l.has_error = true
        }
        l.layout.push(perc)
        return l
    }

    updateModel() {
        console.log("Should update model here to match", this.currentSettings)
    }
}

exports = module.exports = Settings

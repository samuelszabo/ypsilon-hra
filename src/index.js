import {Application} from "@hotwired/stimulus"
import {definitionsFromContext} from "@hotwired/stimulus-webpack-helpers"

import './styles/global.scss'
import './styles/app.scss'

window.Stimulus = Application.start()
const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))
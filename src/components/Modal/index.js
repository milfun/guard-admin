import events from './events'
import Modal from './Modal'

const api = {
  /**
   * open new tab on route fullPath
   * @param config
   */
  open: function (config) {
    events.$emit('open', config)
  },
  /**
   * close current page
   */
  closeCurrentPage: function () {
    this.close()
  },
  /**
   * open new tab on route fullPath
   * @param config
   */
  confirm: function (config) {
    events.$emit('confirm', config)
  },
  /**
   * close route fullPath tab
   * @param config
   */
  close: function (config) {
    events.$emit('close', config)
  },
}

Modal.install = function (Vue, options) {
  if (Vue.prototype.$modal) {
    return
  }
  api.instance = events
  Vue.prototype.$modal = api
  Vue.component('tc-modal', Modal)
}

export default Modal

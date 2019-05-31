import Rails from 'rails-ujs'
import Notifications from '../snibox/utils/notifications'
import smoothscroll from 'smoothscroll-polyfill'

import '../styles/application.scss'

import '../images/logo.png'
import '../images/favicon.ico'
import '../images/apple-touch-icons/apple-touch-icon.png'
import '../images/apple-touch-icons/apple-touch-icon-57x57.png'
import '../images/apple-touch-icons/apple-touch-icon-72x72.png'
import '../images/apple-touch-icons/apple-touch-icon-76x76.png'
import '../images/apple-touch-icons/apple-touch-icon-114x114.png'
import '../images/apple-touch-icons/apple-touch-icon-120x120.png'
import '../images/apple-touch-icons/apple-touch-icon-144x144.png'
import '../images/apple-touch-icons/apple-touch-icon-152x152.png'
import '../images/apple-touch-icons/apple-touch-icon-180x180.png'

// rails ujs and sweetalert2 integration
// based on https://dev.to/peterfication/how-to-use-sweetalert2-for-your-rails-51-rails-ujs-confirms-withoutjquery-67h
const handleConfirm = function(element) {
  if (!allowAction(this)) {
    Rails.stopEverything(element)
  }
}

const allowAction = element => {
  if (element.getAttribute('data-confirm-swal') === null) {
    return true
  }

  showConfirmationDialog(element)
  return false
}

const showConfirmationDialog = element => {
  Notifications.confirm(
      element.getAttribute('data-text'),
      result => confirmed(element, result)
  )
}

const confirmed = (element, result) => {
  if (result.value) {
    element.removeAttribute('data-confirm-swal')
    element.click()
  }
}

Rails.delegate(document, 'a[data-confirm-swal]', 'click', handleConfirm)

Rails.start()

smoothscroll.polyfill()

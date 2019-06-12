import Swal from 'sweetalert2'

const options = {
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  customClass: 'snibox-swal2-slideInLeft'
}

export default {
  confirm(html, callback) {
    Swal.mixin({
      title: "Are you sure?",
      type: "error",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      focusCancel: true,
      heightAuto: false
    })({html}).then(callback)
  },

  toast: {
    success(title) {
      Swal.mixin(Object.assign({type: 'success', timer: 3000}, options))({title})
    },

    warning(title) {
      Swal.mixin(Object.assign({type: 'warning', timer: 6000}, options))({title})
    },

    info(title) {
      Swal.mixin(Object.assign({type: 'info', timer: 6000}, options))({title})
    },

    error(title) {
      Swal.mixin(Object.assign({type: 'error', timer: 6000}, options))({title})
    }
  }
}

import Swal from 'sweetalert2'

const options = {
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  customClass: 'snibox-swal2-slideInRight'
}

export default {
  confirm(text, callback) {
    Swal.mixin({
      title: "Are you sure?",
      type: "error",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      focusCancel: true
    })({text}).then(callback)
  },

  toast: {
    success(title) {
      Swal.mixin(Object.assign({type: 'success', timer: 300000}, options))({title})
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

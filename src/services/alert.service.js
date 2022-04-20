import Swal from 'sweetalert2'

export class AlertService {

  static errorMessage(title = 'Error', text = 'Error') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text
    })
  }

  static successMessage(title = 'Success', timer = 1500) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      timer: timer,
      showConfirmButton: false
    })
  }

  static selectMessage(title = 'Are you sure?', confirmButtonText = 'Confirm',
    denyButtonText = 'Cancel', confirmedText = 'Confirmed', DenyText = 'Deny') {
    Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      denyButtonText: denyButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        this.successMessage(confirmedText)
        return false
      } else if (result.isDenied) {
        Swal.fire(DenyText, '', 'info')
        return true
      }
    })
  }

  static confirmMessage(title = 'Are you sure?', text = 'Are you realy sure?',
    confirmedText = 'Confirm') {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmedText
    }).then((result) => {
      if (result.isConfirmed) {
        this.successMessage(confirmedText)
      }
    })
  }
}

export default AlertService;

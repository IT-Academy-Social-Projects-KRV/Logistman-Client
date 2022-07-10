import Swal from "sweetalert2";

export function errorMessage(
    title = "Error",
    text = "Something went wrong!") {
    return Swal.fire({
        icon: "error",
        title: title,
        text: text
    });
}

export function successMessage(
    title = "Success",
    timer = 1500) {
    return Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        timer: timer,
        showConfirmButton: false
    });
}

export function confirmMessage(
    title = "Confirm",
    text = "Are you sure?",
    confirmedText = "Confirm"
) {
    return Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmedText
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        }
    });
}

export function confirmDeleteMessage(
    title = "Are you sure?",
    text = "This action cannot be canceled!",
    confirmedText = "Delete"
) {
    return Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: confirmedText
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        }
    });
}

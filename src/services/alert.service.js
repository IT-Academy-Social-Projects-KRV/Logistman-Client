import Swal from "sweetalert2";

export function errorMessage(title = "Error", text = "Error") {
    return Swal.fire({
        icon: "error",
        title: title,
        text: text,
    });
}

export function successMessage(title = "Success", timer = 1500) {
    return Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        timer: timer,
        showConfirmButton: false,
    });
}

export function selectMessage(
    title = "Are you sure?",
    confirmButtonText = "Confirm",
    denyButtonText = "Cancel",
    confirmedText = "Confirmed",
    DenyText = "Deny"
) {
    return Swal.fire({
        title: title,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        denyButtonText: denyButtonText,
    }).then((result) => {
        if (result.isConfirmed) {
            this.successMessage(confirmedText);
            return false;
        } else if (result.isDenied) {
            Swal.fire(DenyText, "", "info");
            return true;
        }
    });
}

export function confirmMessage(
    title = "Are you sure?",
    text = "Are you realy sure?",
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
            return  true;
        }
    });
}

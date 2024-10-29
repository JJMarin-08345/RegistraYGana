import Swal from "sweetalert2";

export const alertaCargandoProceso = ({ mensaje, funcionAsync }) => {
    Swal.fire({
        title: mensaje,
        showConfirmButton: false,
        allowOutsideClick: false,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            funcionAsync();
        }
    })
}

export const alerta = (mensaje, icon = 'success') => {
    Swal.fire({
        text: mensaje,
        toast: true,
        position: "top-right",
        icon: icon,
        timer: 3500,
        timerProgressBar: true,
        showConfirmButton: false
    })
}
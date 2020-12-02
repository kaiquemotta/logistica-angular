import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
})

export class MessageService {

    constructor() { }

    public errorMessage(err: any): void {
        if (err.error.errors.length < 2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.errors[0]
            })
        } else {
            const errors = '';
            for (const error of err.error.errors) {
                errors.concat(error + ' ,');
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors,
                footer: '<a href>Why do I have this issue?</a>'
            })
        }
    }

    public succesMessage(): void {
        Swal.fire(
            'Sucesso',
            'Operação realizada com sucesso',
            'success'
        )
    }

}
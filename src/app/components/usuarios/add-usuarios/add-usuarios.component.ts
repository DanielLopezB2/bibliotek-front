import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { UsuariosService } from '../../../api/usuarios.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-usuarios',
  standalone: true,
  imports: [InputTextModule, SelectButtonModule, InputNumberModule, ButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './add-usuarios.component.html',
  styleUrl: './add-usuarios.component.css',
  providers: [MessageService]
})
export class AddUsuariosComponent {

  private readonly _usersService = inject(UsuariosService);

  userForm!: FormGroup;
  user!: Usuario;

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
        nombre: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required)
    });

    this.userForm.reset();
  }

  onSubmit() {

    const nombre = this.userForm.get('nombre')?.value;
    const email = this.userForm.get('email')?.value;
    console.log(this.userForm.value);
    this.user = new Usuario(nombre, email);
    this._usersService.createUser(this.user).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario agregado correctamente', life: 2000 });
        setTimeout(() => {
          this.userForm.reset();
          this.router.navigate(['/users']);
        } , 2500);
      }
    });
    
  }

  onCancel() {
    this.userForm.reset();
    this.router.navigate(['/users']);
  }

  onReset() {
    this.userForm.reset();
  }

}

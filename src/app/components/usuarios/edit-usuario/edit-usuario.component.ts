import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { UsuariosService } from '../../../api/usuarios.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [InputTextModule, SelectButtonModule, InputNumberModule, ButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css',
  providers: [MessageService]
})
export class EditUsuarioComponent {

  private readonly _usersService = inject(UsuariosService);

  userForm!: FormGroup;
  user!: Usuario;
  id!: string | null;

  constructor(private messageService: MessageService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {

    this._usersService.getUserById(this.id!).subscribe(user => {
      this.user = user;
      this.userForm.patchValue({
        nombre: user.nombre,
        email: user.email
      });
    });

    this.userForm = new FormGroup({
        nombre: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required)
    });
  }

  onSubmit() {

    const nombre = this.userForm.get('nombre')?.value;
    const email = this.userForm.get('email')?.value;
    this.user = new Usuario(nombre, email);
    this._usersService.updateUser(this.id!, this.user).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario modificado correctamente', life: 2000 });
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

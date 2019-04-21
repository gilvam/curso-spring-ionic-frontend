import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/domain/client.service';
import { StateDto } from '../../models/state.dto';
import { CityDto } from '../../models/city.dto';
import { CityService } from '../../services/domain/city.service';
import { StateService } from '../../services/domain/state.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  formGroup: FormGroup;
  states: StateDto[];
  cities: CityDto[];

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clienteService: ClientService,
    public alertCtrl: AlertController,
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      cpfOrCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      addressName: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      complement: ['Apto 3', []],
      district: ['Copacabana', []],
      zipCode: ['10828333', [Validators.required]],
      phone1: ['977261827', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.stateService.findAll()
      .subscribe(response => {
          this.states = response;
          this.formGroup.controls.stateId.setValue(this.states[0].id);
          this.updateCities();
        },
        error => {
        });
  }

  ionViewDidLoad() {
  }

  updateCities() {
    const stateId = this.formGroup.value.stateId;
    this.cityService.findAll(stateId)
      .subscribe(response => {
          this.cities = response;
          this.formGroup.controls.cityId.setValue(null);
        },
        error => {
        });
  }

  signupUser() {
    // this.clienteService.insert(this.formGroup.value)
    //   .subscribe(response => {
    //       this.showInsertOk();
    //     },
    //     error => {});
  }


}

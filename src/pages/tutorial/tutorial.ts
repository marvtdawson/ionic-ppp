import { Component } from '@angular/core';
import { AlertController, IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { LoadingController } from "ionic-angular";

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  loader: any;
  dob: number;
  alert: any;


  constructor(public navCtrl: NavController,
              public menu: MenuController, translate: TranslateService,
              public platform: Platform,
              public loadCtrl: LoadingController,
              public alertCtrl: AlertController) {
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/smile.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ppv_1.jpg',
          }
        ];
      });
  }

  startApp() {
    const alert = this.alertCtrl.create({
      title: "How old are you?",
      message: "This site contain nude images, video, adult scene and language.  Are you 18 years old?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.setRoot('WelcomePage', {}, {
              animate: true,
              direction: 'forward'
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            this.navCtrl.setRoot('TutorialPage', {}, {
              animate: true,
              direction: 'forward'
            });
          }
        }
      ]
      });
      alert.present();
  }

  showDobForm() {

    let checkAge = this.alertCtrl.create();
    checkAge.setTitle('Date of Birth');
    /*checkAge.addInput ({
      type: 'checkbox',
      label: 'DOB',
      value: 12,
    });*/
  }


  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}

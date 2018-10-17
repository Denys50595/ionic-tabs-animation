import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Tabs, Tab } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  @ViewChild(Tabs)
  public tabs: Tabs;
  public observer: MutationObserver;

  public tabsEffects: Array<any> = []

  constructor() {
  }

  ngAfterViewInit() {
    const element = document.querySelector('ion-tabs .tabbar');
    const tabs = element.querySelectorAll('a');
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-selected') {
          const target = document.querySelector(`[data-effect-for-tab=${(mutation.target as HTMLElement).id.slice(4)}]`);
          const tabControlTarget = mutation.target as HTMLElement;
          if (target != null && tabControlTarget.getAttribute('aria-selected') === 'true') {
            target.classList.add('active-tab');
            target.classList.remove('unactive-tab');
          } else {
            target.classList.add('unactive-tab');
            target.classList.remove('active-tab');
          }
        }
      });
    });
    const config = { attributes: true };

    for (let i = 0; i < tabs.length; i++) {
      this.observer.observe(tabs[i], config);
    }

    this.tabs._tabs.forEach(tab => {
      this.tabsEffects.push(tab.id);
    })
  }

}

import { Injectable } from '@angular/core';
declare var $:any;

type ScrollElement = string | JQuery | HTMLElement;

@Injectable()
export class MalihuScrollbarService {

  constructor() {
    window['$'] = window['jQuery'] = $;
  }

  initScrollbar(element: ScrollElement, options: MCustomScrollbar.CustomScrollbarOptions) {
    this.getElement(element).mCustomScrollbar(options);
  }

  scrollTo(element: ScrollElement, parameter: any, options: MCustomScrollbar.ScrollToParameterOptions) {
    this.getElement(element).mCustomScrollbar('scrollTo', parameter, options);
  }

  update(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('update');
  }

  stop(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('stop');
  }

  disable(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('disable');
  }

  destroy(element: ScrollElement) {
    this.getElement(element).mCustomScrollbar('destroy');
  }

  private getElement(element: ScrollElement): any {
    if (typeof element === 'string' || element instanceof String) {
      return window['jQuery'](element);
    }
    if ((typeof element === 'object' || element instanceof Object) && element instanceof HTMLElement) {
      return window['jQuery'](element);
    }
    if (element instanceof window['jQuery'] || 'jquery' in Object(element)) {
      return element;
    }
    throw Error(`Unsupported element type in MalihuScrollbarService: ${element}`);
  }
}

export class debounce {

  constructor() {
    this.state = {
      debounces: {}
    }
  }

  debounce(context, func, ms=0) {
    if(this.state.debounces[func]) {
      clearTimeout(this.state.debounces[func]);
    }
    var timeout = setTimeout(() => {
      context[func]();
    }, ms);
    this.state.debounces[func] = timeout;
  }

}
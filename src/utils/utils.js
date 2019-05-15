export class debounce {

  constructor() {
    this.state = {
      debounces: {}
    }
  }

  debounce(context, func, ms=0) {

    let args = [],
        funcName = func;

    if(typeof func === 'object') {
      args = func.args || [];
      funcName = func.name;
    }

    if(this.state.debounces[funcName]) {
      clearTimeout(this.state.debounces[funcName]);
    }

    var timeout = setTimeout(() => {
      context[funcName](...args);
    }, ms);

    this.state.debounces[funcName] = timeout;
    
  }

}
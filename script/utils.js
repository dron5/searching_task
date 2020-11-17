function debounce(cb, debounceTime){
    let timeout;
    return function() {
        const self = this;
        const args = arguments;
        const functionCall = () => {
            return cb.apply(self, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, debounceTime);
    }
};

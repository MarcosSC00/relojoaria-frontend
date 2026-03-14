export function phoneMask(value: string){
    value = value.replace(/\D/g,"");
    value = value.slice(0,11);
    if(value.length <= 10) {
        return value
            .replace(/^(\d{2})(\d)/,"($1) $2")
            .replace(/(\d{4})(\d)/,"$1-$2");
    }
    return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}
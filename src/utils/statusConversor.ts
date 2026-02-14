export const statusConversor = (status: string) => {
    switch(status){
        case "TODO":
            return "PENDENTE";
        case "DONE":
            return "FEITO";
        case "IN_PROGRESS":
            return "EM ANDAMENTO";
        default:
            return status;
    }
}
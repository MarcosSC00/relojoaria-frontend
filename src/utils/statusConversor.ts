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

export const revertStatusConversor = (status: string) => {
    switch(status){
        case "PENDENTE":
            return "TODO";
        case "FEITO":
            return "DONE";
        case "EM ANDAMENTO":
            return "IN_PROGRESS";
        default:
            return status;
    }
}
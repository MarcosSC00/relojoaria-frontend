export const formatDate = (dateString: string) => {
    if(!dateString) return "-";
    const patternedDate = dateString.split(".")[0];
    return new Date(patternedDate).toLocaleDateString("pt-BR");
}
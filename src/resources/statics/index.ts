export const defaultDateFormat = "DD.MM.YYYY";
export const defaultNumberFormat = "de-DE";

export const allowedDocumentExtenstions =
    ".doc, .docx, .ppt, .pptx, .xls, .xlsx, .gdoc, .gsheet, .gslides, .pdf, .txt, .zip, .rar, .csv, .tsv, .jpg, .jpeg, .png";

export const allowedProfilePictureExtensions = ".jpg, .gif, .png";

export const thousandsSeparatorRegex = /\B(?=(\d{3})+(?!\d))/g;

export const dotMatcherRegex = /\./g;

export const languageOptions = [
    { value: "En", label: "English" },
    { value: "De", label: "Deutsch / German (Standard)" },
];

export const graphDownloadAsOptions = [
    {
        value: "pdf",
        label: "Pdf",
    },
    { value: "excel", label: "Excel" },
];

export const defaultPropertyStatistics = {
    loanManaged: 0,
    averageLtv: 0,
    avgAnnualRateOfReturn: 0
}

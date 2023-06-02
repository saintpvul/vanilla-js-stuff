case "@number": {
    let [variableName, currency] = args;
    let value;
    if (typeof variableName === "string") {
        variableName = variableName.substring(1);
        value = variables[variableName];
    } else {
        value = variableName;
    }

    const formatterOptions = {
        useGrouping: true,
        minimumFractionDigits: 2,
    };
// This should work
    if (currency) {
        formatterOptions.style = "currency";
        formatterOptions.currency = currency;
    } else {
        formatterOptions.style = "currency";
    }

    const formatter = new Intl.NumberFormat(locale, formatterOptions);
    i18nText += formatter.format(+value);
    break;
}

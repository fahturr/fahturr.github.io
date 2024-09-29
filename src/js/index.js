
document.addEventListener("DOMContentLoaded", async function (event) {
    const { food, kupi, matcha } = await getData();

    const foodTable = document.getElementById("food-table");
    const kupiTable = document.getElementById("kupi-table");
    const matchaTable = document.getElementById("matcha-table");

    setTable(foodTable, food);
    setTable(kupiTable, kupi);
    setTable(matchaTable, matcha);
});

const setTable = (table, data) => {
    data.map((v, i) => {
        table.insertRow().innerHTML = addRow(i + 1, v);
    });
};

const getData = async () => {
    const res = await fetch("/data.json");
    const data = await res.json();

    return data;
};

const addRow = (row, data) => {
    return `<tr>
                <td
                    class="border border-slate-300 text-center p-1">
                    ${row}
                    ${getTrend(data?.trend)}
                </td>
                <td class="border border-slate-300 p-2">
                    <figure class="max-w-lg">
                        <img
                            loading="lazy"
                            class="w-full rounded-lg mx-auto"
                            src="${getImage(data?.image)}"
                            alt="${data.name}" />
                        <figcaption
                            class="mt-2 text-xs text-center text-wrap text-gray-500 dark:text-gray-400">
                            ${data.name}
                        </figcaption>
                    </figure>
                </td>
            </tr>`;
};

const getTrend = (trend) => {
    switch (trend) {
        case "up":
            return `<i class="fa-solid fa-caret-up text-green-500"></i>`;
        case "down":
            return `<i class="fa-solid fa-caret-down text-red-500"></i>`;
        case "equal":
            return `<i class="fa-solid fa-equals fa-sm"></i>`;
        default:
            return "";
    }
};

const getImage = (image) => {
    const srcFile = "/src/img";
    if (!image) {
        return `${srcFile}/placeholder.svg`;
    }

    return `${srcFile}/${image}`;
};
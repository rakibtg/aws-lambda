const path = require("path");
const xl = require("excel4node");
const isProd = process.env.ENV === "production";

const WriteExcel = ({ headers, data, fileName }) => {
  return new Promise(async (res, rej) => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Meta Tags");

    const headerStyle = wb.createStyle({
      font: {
        size: 12,
        bold: true,
        color: "#000000",
      },
      fill: {
        type: "pattern",
        bgColor: "#9ACD32",
        fgColor: "#9ACD32",
        patternType: "solid",
      },
      border: {
        left: {
          style: "medium",
          color: "#000000",
        },
        right: {
          style: "medium",
          color: "#000000",
        },
        top: {
          style: "medium",
          color: "#000000",
        },
        bottom: {
          style: "medium",
          color: "#000000",
        },
        outline: true,
      },
    });

    const subHeaderStyle = wb.createStyle({
      font: {
        size: 11,
        bold: true,
        color: "#000000",
      },
      fill: {
        type: "pattern",
        bgColor: "#FFFF00",
        fgColor: "#FFFF00",
        patternType: "solid",
      },
      border: {
        left: {
          style: "medium",
          color: "#000000",
        },
        right: {
          style: "medium",
          color: "#000000",
        },
        top: {
          style: "medium",
          color: "#000000",
        },
        bottom: {
          style: "medium",
          color: "#000000",
        },
        outline: true,
      },
    });

    const cellStyle = wb.createStyle({
      font: {
        color: "#000000",
        size: 11,
      },
    });

    // Curate the data.
    const dataKeys = Object.keys(headers);
    const columns = dataKeys.map((name) => {
      const info = headers.hasOwnProperty(name) ? headers[name] : "";
      const cells = data.map((d) => (d.hasOwnProperty(name) ? d[name] : "-"));
      return { name, info, cells };
    });

    // Default column.
    columns.unshift({
      name: "Ref",
      info: "Field",
      cells: [],
    });

    // Prepare excel file.
    columns.map((column, index) => {
      const columnIndex = index + 1;
      const { name, info, cells } = column;

      ws.cell(1, columnIndex).string(name).style(headerStyle);
      ws.cell(2, columnIndex).string(info).style(subHeaderStyle);

      // Add cells.
      cells.map((cell, index) => {
        const cellIndex = index + 3;
        const cellValue =
          typeof cell === "boolean" ? (cell ? "Yes" : "No") : cell;

        ws.cell(cellIndex, columnIndex).string(cellValue).style(cellStyle);
      });

      ws.column(columnIndex).setWidth(columnIndex === 1 ? 5 : 30);
    });

    ws.row(2).setHeight(50);

    const dst = isProd
      ? `/tmp/${fileName}`
      : path.join(__dirname, "../../..", "tmp", fileName);

    wb.write(dst, function (err) {
      if (err) {
        rej();
      } else {
        res();
      }
    });
  });
};

exports.WriteExcel = WriteExcel;
